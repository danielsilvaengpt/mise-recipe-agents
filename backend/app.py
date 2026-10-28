"""Despensa: interface Streamlit para o projeto de receitas com agentes CrewAI.

Tudo passa pela API (api.py), incluindo a despensa e as receitas guardadas.

    1) uvicorn api:app --reload
    2) streamlit run app.py

Variável opcional no .env:  API_URL=http://127.0.0.1:8000
"""

import html
import os
import time
from concurrent.futures import ThreadPoolExecutor
from datetime import date, datetime, timedelta

import requests
import streamlit as st
from dotenv import load_dotenv

load_dotenv()

API_URL = os.getenv("API_URL", "http://127.0.0.1:8000").rstrip("/")

st.set_page_config(
    page_title="Despensa | Receitas com o que tens em casa",
    page_icon="🫒",
    layout="wide",
)

UNIDADES = ["g", "kg", "ml", "l", "unidades", "colheres de sopa"]
ETIQUETAS_ALIMENTO = ["Vegano", "Vegetariano", "Sem glúten", "Sem lactose", "Sem frutos secos"]
RESTRICOES_PEDIDO = ["Vegetariano", "Vegano", "Sem glúten", "Sem lactose", "Sem frutos secos"]
PASSOS = [
    ("Chef", "Escolhe o prato"),
    ("Redator", "Escreve a receita"),
    ("Revisor", "Verifica e corrige"),
]
SEGUNDOS_POR_PASSO = 10  # só para animar o progresso; a API devolve tudo no fim

# --------------------------------------------------------------------------- #
# Estilo — identidade visual definida em tema.py
# --------------------------------------------------------------------------- #
from tema import CSS

st.markdown(CSS, unsafe_allow_html=True)

# --------------------------------------------------------------------------- #
# API
# --------------------------------------------------------------------------- #
class ApiErro(Exception):
    pass


def _chamar(metodo: str, caminho: str, timeout: float = 15, **kwargs):
    try:
        r = requests.request(metodo, f"{API_URL}{caminho}", timeout=timeout, **kwargs)
    except requests.RequestException:
        raise ApiErro(f"Sem ligação à API em {API_URL}. Confirma que o uvicorn está a correr.")
    if not r.ok:
        try:
            detalhe = r.json().get("detail", r.text)
        except ValueError:
            detalhe = r.text
        raise ApiErro(str(detalhe))
    return r.json() if r.content else None


@st.cache_data(ttl=5, show_spinner=False)
def api_online() -> bool:
    try:
        return requests.get(f"{API_URL}/", timeout=2).ok
    except requests.RequestException:
        return False


def pedir_receita(pedido: str) -> str:
    """Corre o crew através da API. Pode demorar; corre numa thread."""
    r = _chamar("POST", "/ask", timeout=600, json={"question": pedido})
    return r["answer"]


# --------------------------------------------------------------------------- #
# Utilitários
# --------------------------------------------------------------------------- #
def estado_validade(texto: str):
    """Devolve (classe_css, rótulo, dias_restantes)."""
    try:
        d = datetime.strptime(texto, "%Y-%m-%d").date()
    except (ValueError, TypeError):
        return "ok", "Sem data", None
    dias = (d - date.today()).days
    if dias < 0:
        return "fora", f"Expirou há {-dias} d", dias
    if dias == 0:
        return "perto", "Expira hoje", dias
    if dias <= 7:
        return "perto", f"Expira em {dias} d", dias
    return "ok", f"Até {d:%d/%m/%Y}", dias


def passo_quantidade(unidade: str) -> float:
    return {"g": 50, "ml": 50, "kg": 0.5, "l": 0.5}.get(unidade, 1)


def separar_receita(texto: str):
    linhas = texto.strip().splitlines()
    for i, linha in enumerate(linhas):
        if linha.lstrip().startswith("#"):
            titulo = linha.lstrip("# ").strip().replace("**", "")
            return titulo or "A tua receita", "\n".join(linhas[:i] + linhas[i + 1:]).strip()
    return "A tua receita", texto.strip()


def html_passos(ativo: int, previa: bool = False) -> str:
    itens = []
    for i, (nome, desc) in enumerate(PASSOS):
        cls = "feito" if i < ativo else ("ativo" if i == ativo else "")
        marca = "✓" if i < ativo else str(i + 1)
        itens.append(
            f'<div class="passo {cls}"><span class="n">{marca}</span><b>{nome}</b><small>{desc}</small></div>'
        )
    return f'<div class="passos{" previa" if previa else ""}">{"".join(itens)}</div>'


def flash(msg: str, icone: str = "✅"):
    st.session_state["flash"] = (msg, icone)


# --- Callbacks (correm antes do resto do script, por isso a página já vê os dados novos)
def cb_ajustar(nome: str, atual: float, delta: float):
    try:
        if atual + delta <= 0:
            _chamar("DELETE", "/alimentos", params={"nome": nome})
            flash(f"{nome} acabou e foi retirado da despensa", "🧺")
        else:
            _chamar("PATCH", "/alimentos/quantidade", params={"nome": nome}, json={"delta": delta})
    except ApiErro as erro:
        flash(str(erro), "⚠️")


def cb_retirar(nome: str):
    try:
        _chamar("DELETE", "/alimentos", params={"nome": nome})
        flash(f"{nome} retirado da despensa", "🗑️")
    except ApiErro as erro:
        flash(str(erro), "⚠️")


def cb_expirar(nomes: list[str]):
    st.session_state["escolhidos"] = nomes


def cb_abrir(ficheiro: str):
    st.session_state["aberta"] = ficheiro


@st.dialog("Novo alimento")
def dialogo_novo():
    nome = st.text_input("Nome", placeholder="Ex.: Arroz carolino")
    c1, c2 = st.columns(2)
    quantidade = c1.number_input("Quantidade", min_value=0.0, value=1.0, step=1.0)
    unidade = c2.selectbox("Unidade", UNIDADES)
    etiquetas = st.multiselect(
        "Etiquetas", ETIQUETAS_ALIMENTO, help="O que este alimento cumpre. Ajuda o Chef a respeitar restrições."
    )
    validade = st.date_input(
        "Validade", value=date.today() + timedelta(days=30), format="DD/MM/YYYY"
    )
    if st.button("Guardar alimento", type="primary", use_container_width=True):
        if not nome.strip():
            st.warning("Escreve o nome do alimento.")
        elif quantidade <= 0:
            st.warning("A quantidade tem de ser maior que zero.")
        else:
            try:
                _chamar(
                    "POST",
                    "/alimentos",
                    json={
                        "nome": nome.strip(),
                        "quantidade": quantidade,
                        "unidade": unidade,
                        "restricoes": etiquetas,
                        "validade": validade.strftime("%Y-%m-%d"),
                    },
                )
            except ApiErro as erro:
                st.error(str(erro))
            else:
                flash(f"{nome.strip()} adicionado à despensa")
                st.rerun()


def mostrar_receita(texto: str, nome_ficheiro: str, duracao: float | None = None, chave: str = "r"):
    titulo, corpo = separar_receita(texto)
    with st.container(border=True, key=f"receita_{chave}"):
        chips = f'<span class="chip">Criada em {duracao:.0f} s</span>' if duracao else ""
        st.markdown(
            f'<div class="rec-titulo">{html.escape(titulo)}</div>'
            + (f'<div class="chips-r">{chips}</div>' if chips else ""),
            unsafe_allow_html=True,
        )
        st.markdown(corpo)
        st.download_button(
            "Descarregar receita",
            data=texto,
            file_name=nome_ficheiro,
            mime="text/markdown",
            key=f"dl_{chave}",
        )


# --------------------------------------------------------------------------- #
# Dados e cabeçalho
# --------------------------------------------------------------------------- #
if "flash" in st.session_state:
    mensagem, icone = st.session_state.pop("flash")
    st.toast(mensagem, icon=icone)

online = api_online()
alimentos: list[dict] = []
if online:
    try:
        alimentos = _chamar("GET", "/alimentos") or []
    except ApiErro as erro:
        st.error(str(erro))

st.markdown(
    '<div class="topo"><div class="marca-simbolo">✳</div><div class="marca-texto">'
    '<span class="nome">mise.</span><span class="marca-sub">STUDIO DE RECEITAS COM IA</span></div>'
    f'<span class="estado {"on" if online else ""}" title="{html.escape(API_URL)}">'
    f'{"SISTEMA ONLINE" if online else "API DESLIGADA"}</span></div>'
    '<section class="hero">'
    '<div class="hero-copy"><div class="eyebrow"><span class="eyebrow-dot"></span> A TUA COZINHA, AUMENTADA POR IA</div>'
    '<h1>Transforma o que tens<br>em <em>algo extraordinário.</em></h1>'
    '<p class="hero-desc">Ingredientes reais. Ideias inesperadas. Três agentes inteligentes a trabalhar em equipa para criar a tua próxima receita favorita.</p>'
    '<div class="hero-meta"><span>✦ Personalizado para ti</span><span>◷ Pronto em minutos</span><span>♧ Menos desperdício</span></div></div>'
    '<div class="food-stage" aria-label="Composição artística de ingredientes frescos">'
    '<div class="stage-glow"></div><div class="orbit orbit-one"></div><div class="orbit orbit-two"></div>'
    '<div class="plate-shadow"></div><div class="plate plate-back"></div><div class="plate plate-main">'
    '<div class="dish-ring"></div><div class="dish-sauce"></div><div class="food-leaf leaf-one"></div>'
    '<div class="food-leaf leaf-two"></div><div class="food-leaf leaf-three"></div>'
    '<div class="tomato tomato-one"></div><div class="tomato tomato-two"></div><div class="food-dot dot-one"></div><div class="food-dot dot-two"></div><div class="food-dot dot-three"></div></div>'
    '<div class="float-ingredient herb">✳<small>FRESCO</small></div><div class="float-ingredient oil">✦</div>'
    '<div class="stage-caption"><span class="caption-line"></span><span>CRIATIVIDADE EM CADA INGREDIENTE</span></div></div>'
    '<div class="hero-bottom"><span>01 / DESCOBRE O QUE PODES COZINHAR</span><span class="hero-bottom-right">FEITO À TUA MEDIDA <b>↘</b></span></div></section>',
    unsafe_allow_html=True,
)

if not online:
    st.error(
        f"A API não responde em {API_URL}. Arranca-a com `uvicorn api:app --reload` "
        "e recarrega esta página."
    )

tab_cozinhar, tab_despensa, tab_guardadas = st.tabs(["✦  Criar receita", "▦  A minha despensa", "♡  Livro de receitas"])

# --------------------------------------------------------------------------- #
# Cozinhar
# --------------------------------------------------------------------------- #
with tab_cozinhar:
    nomes = list(dict.fromkeys(a["nome"] for a in alimentos))
    a_expirar = [
        a["nome"]
        for a in alimentos
        if (d := estado_validade(a["validade"])[2]) is not None and 0 <= d <= 7
    ]
    st.session_state["escolhidos"] = [
        n for n in st.session_state.get("escolhidos", []) if n in nomes
    ]

    col_form, col_res = st.columns([5, 6], gap="large")

    with col_form:
        with st.container(key="form"):
            st.markdown('<div class="titulo-bloco">O que vai ao tacho?</div>', unsafe_allow_html=True)
            if nomes:
                if hasattr(st, "pills"):
                    escolhidos = st.pills(
                        "Alimentos da despensa", nomes, selection_mode="multi", key="escolhidos"
                    )
                else:
                    escolhidos = st.multiselect("Alimentos da despensa", nomes, key="escolhidos")
                st.button(
                    "Usar o que expira primeiro",
                    on_click=cb_expirar,
                    args=(a_expirar,),
                    disabled=not a_expirar,
                    help="Seleciona o que expira nos próximos 7 dias.",
                )
            else:
                escolhidos = []
                st.info("A despensa está vazia. Adiciona alimentos no separador Despensa.")

            extra = st.text_input(
                "Pedido especial (opcional)", placeholder="Ex.: algo leve para o jantar"
            )
            restricoes = st.multiselect("Restrições alimentares", RESTRICOES_PEDIDO)
            c1, c2 = st.columns(2)
            tempo = c1.slider("Tempo disponível (min)", 10, 120, 40, 5)
            doses = c2.number_input("Doses", 1, 12, 2)

            gerar = st.button(
                "✦  Gerar a minha receita",
                type="primary",
                use_container_width=True,
                disabled=not online or not alimentos,
            )

    with col_res:
        area_passos = st.empty()
        area_resultado = st.container()

    if gerar:
        partes = []
        if escolhidos:
            partes.append("Quero gastar estes alimentos da despensa: " + ", ".join(escolhidos) + ".")
        else:
            partes.append("Usa os alimentos disponíveis no inventário.")
        if extra.strip():
            partes.append(f"Pedido especial: {extra.strip()}.")
        if restricoes:
            partes.append("Restrições alimentares: " + ", ".join(restricoes) + ".")
        partes.append(f"Tempo máximo de preparação: {tempo} minutos.")
        partes.append(f"Doses: {int(doses)}.")
        pedido = " ".join(partes)

        inicio = time.perf_counter()
        try:
            with ThreadPoolExecutor(max_workers=1) as pool:
                futuro = pool.submit(pedir_receita, pedido)
                while not futuro.done():
                    passo = min(len(PASSOS) - 1, int((time.perf_counter() - inicio) // SEGUNDOS_POR_PASSO))
                    area_passos.markdown(html_passos(passo), unsafe_allow_html=True)
                    time.sleep(0.4)
                receita = futuro.result()
        except ApiErro as erro:
            st.session_state.pop("resultado", None)
            area_passos.empty()
            with col_res:
                st.error("Não foi possível criar a receita.")
                with st.expander("Detalhes do erro"):
                    st.code(str(erro))
        else:
            area_passos.markdown(html_passos(len(PASSOS)), unsafe_allow_html=True)
            time.sleep(0.6)
            area_passos.empty()
            st.session_state["resultado"] = {
                "texto": receita,
                "ficheiro": datetime.now().strftime("receita_%Y%m%d_%H%M%S.md"),
                "duracao": time.perf_counter() - inicio,
            }

    with area_resultado:
        if st.session_state.get("resultado"):
            r = st.session_state["resultado"]
            mostrar_receita(r["texto"], r["ficheiro"], r["duracao"], chave="atual")
        elif not gerar:
            st.markdown(
                '<div class="vazio"><b>A tua receita aparece aqui</b>'
                "<p>Escolhe os alimentos à esquerda e carrega em Criar receita. "
                "Costuma demorar cerca de meio minuto. O trabalho passa por três pessoas:</p></div>"
                + html_passos(-1, previa=True),
                unsafe_allow_html=True,
            )

# --------------------------------------------------------------------------- #
# Despensa
# --------------------------------------------------------------------------- #
with tab_despensa:
    c_busca, c_novo = st.columns([4, 1.3], vertical_alignment="bottom")
    busca = c_busca.text_input(
        "Procurar", placeholder="Procurar na despensa", label_visibility="collapsed"
    )
    if c_novo.button("Novo alimento", type="primary", use_container_width=True, disabled=not online):
        dialogo_novo()

    expirados = sum(1 for a in alimentos if estado_validade(a["validade"])[0] == "fora")
    st.markdown(
        '<div class="resumo">'
        f"<div><b>{len(alimentos)}</b><span>alimentos na despensa</span></div>"
        f'<div class="{"alerta" if a_expirar else ""}"><b>{len(a_expirar)}</b><span>a expirar em 7 dias</span></div>'
        f'<div class="{"alerta" if expirados else ""}"><b>{expirados}</b><span>já expirados</span></div>'
        "</div>",
        unsafe_allow_html=True,
    )

    visiveis = [
        a for a in sorted(alimentos, key=lambda x: x.get("validade", "9999"))
        if busca.strip().lower() in a["nome"].lower()
    ]

    if not alimentos:
        st.markdown(
            '<div class="vazio"><b>A despensa está vazia</b>'
            "<p>Adiciona o primeiro alimento para o Chef poder cozinhar com ele.</p></div>",
            unsafe_allow_html=True,
        )
    elif not visiveis:
        st.info(f"Nenhum alimento corresponde a “{busca}”.")
    else:
        for inicio_linha in range(0, len(visiveis), 3):
            colunas = st.columns(3, gap="medium")
            for col, (idx, a) in zip(colunas, list(enumerate(visiveis))[inicio_linha:inicio_linha + 3]):
                classe, rotulo, _ = estado_validade(a["validade"])
                etiquetas = "".join(
                    f'<span class="chip">{html.escape(t)}</span>' for t in a.get("restricoes", [])
                )
                passo = passo_quantidade(a["unidade"])
                with col:
                    with st.container(border=True, key=f"card_{idx}"):
                        st.markdown(
                            f'<div class="al-topo"><span class="al-nome">{html.escape(a["nome"])}</span>'
                            f'<span class="selo {classe}">{rotulo}</span></div>'
                            f'<div class="al-qtd">{a["quantidade"]:g}<small>{html.escape(a["unidade"])}</small></div>'
                            + (f'<div class="chips-r">{etiquetas}</div>' if etiquetas else ""),
                            unsafe_allow_html=True,
                        )
                        b1, b2, b3 = st.columns([1, 1, 2])
                        b1.button(
                            "−", key=f"menos_{idx}", on_click=cb_ajustar,
                            args=(a["nome"], a["quantidade"], -passo), use_container_width=True,
                            help=f"Tirar {passo:g} {a['unidade']}",
                        )
                        b2.button(
                            "+", key=f"mais_{idx}", on_click=cb_ajustar,
                            args=(a["nome"], a["quantidade"], passo), use_container_width=True,
                            help=f"Juntar {passo:g} {a['unidade']}",
                        )
                        b3.button(
                            "Retirar", key=f"retirar_{idx}", on_click=cb_retirar,
                            args=(a["nome"],), use_container_width=True,
                        )

# --------------------------------------------------------------------------- #
# Receitas guardadas
# --------------------------------------------------------------------------- #
with tab_guardadas:
    guardadas: list[dict] = []
    if online:
        try:
            guardadas = _chamar("GET", "/receitas") or []
        except ApiErro as erro:
            st.error(str(erro))

    if not guardadas:
        st.markdown(
            '<div class="vazio"><b>Ainda não há receitas guardadas</b>'
            "<p>Cada receita que criares fica aqui, pronta a voltar a cozinhar.</p></div>",
            unsafe_allow_html=True,
        )
    else:
        col_lista, col_ver = st.columns([4, 7], gap="large")
        with col_lista:
            for g in guardadas[:30]:
                st.button(
                    g["titulo"], key=f"abrir_{g['ficheiro']}", on_click=cb_abrir,
                    args=(g["ficheiro"],), use_container_width=True,
                )
                st.caption(g["data"])
        with col_ver:
            ficheiro = st.session_state.get("aberta")
            if ficheiro:
                try:
                    dados = _chamar("GET", f"/receitas/{ficheiro}")
                    mostrar_receita(dados["texto"], ficheiro, chave="guardada")
                except ApiErro as erro:
                    st.error(str(erro))
            else:
                st.markdown(
                    '<div class="vazio"><b>Escolhe uma receita</b>'
                    "<p>Seleciona uma da lista para a ler aqui.</p></div>",
                    unsafe_allow_html=True,
                )