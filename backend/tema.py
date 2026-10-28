"""Identidade visual premium para a aplicação mise. — receitas com agentes de IA."""

CSS = r"""
<style>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&display=swap');
:root{--ink:#18251d;--ink2:#26372c;--olive:#52683e;--lime:#c9d7a5;--cream:#f6f4ec;--paper:#fffdf8;--muted:#596457;--line:#d1d5c8;--copper:#9a5b2e;--danger:#963d30;--success:#3f6645;}
html{color-scheme:light}html,body,button,input,textarea,[class*="st-"]{font-family:'DM Sans',sans-serif}
.stApp{background:var(--cream);color:var(--ink)}#MainMenu,footer{visibility:hidden}header[data-testid="stHeader"]{background:transparent}
.block-container{padding-top:1.35rem;padding-bottom:3.5rem;max-width:1440px}
.stApp [data-testid="stWidgetLabel"] p,.stApp [data-testid="stWidgetLabel"] label{color:var(--ink);font-weight:600;font-size:.9rem}
.stApp [data-testid="stCaptionContainer"] p{color:var(--muted)}
.stApp textarea,.stApp input{background:var(--paper)!important;color:var(--ink)!important;border-color:var(--line)!important;border-radius:12px!important}
.stApp [data-baseweb="select"]>div{background:var(--paper);color:var(--ink);border-color:var(--line);border-radius:12px}
.stApp [data-testid="stSlider"] [role="slider"]{background:var(--olive)}
/* Brand */
.topo{display:flex;align-items:center;gap:.75rem;margin:0 0 1.1rem;padding:.25rem 0}.marca-simbolo{display:grid;place-items:center;width:42px;height:42px;border-radius:14px;background:var(--ink);color:var(--lime);font-size:1.6rem;box-shadow:0 5px 14px #18251d20}.marca-texto{display:flex;flex-direction:column;gap:0}.topo .nome{font-family:'Playfair Display',serif;font-size:1.8rem;line-height:1;color:var(--ink);letter-spacing:-.06em}.marca-sub{font-size:.59rem;font-weight:700;letter-spacing:.17em;color:var(--muted);margin-top:.28rem}.estado{margin-left:auto;display:inline-flex;align-items:center;gap:.5rem;font-size:.68rem;font-weight:700;letter-spacing:.08em;color:var(--muted);padding:.55rem .8rem;border:1px solid var(--line);border-radius:999px;background:#fffdf8cc}.estado::before{content:"";width:.48rem;height:.48rem;border-radius:50%;background:var(--danger)}.estado.on::before{background:#5c9a65;box-shadow:0 0 0 4px #5c9a651a}
/* Cinematic hero */
.hero{position:relative;overflow:hidden;min-height:435px;border-radius:25px;background:radial-gradient(ellipse at 78% 42%,#43583a 0%,transparent 37%),linear-gradient(112deg,#18251d 0%,#25372a 58%,#35452f 100%);color:#fff;margin:0 0 1.8rem;box-shadow:0 22px 55px #1b2a1c18;isolation:isolate}.hero:before{content:"";position:absolute;inset:0;opacity:.13;background-image:radial-gradient(#d6dfbd 0.7px,transparent .7px);background-size:17px 17px;mask-image:linear-gradient(90deg,#000,transparent 75%);pointer-events:none}.hero-copy{position:relative;z-index:3;width:57%;padding:3.25rem 0 3.6rem 3.2rem}.eyebrow{display:flex;align-items:center;gap:.55rem;font-size:.68rem;font-weight:700;letter-spacing:.16em;color:#d2dfb5;margin-bottom:1.5rem}.eyebrow-dot{width:7px;height:7px;background:#d2dfb5;border-radius:50%;box-shadow:0 0 12px #d2dfb5}.hero h1{font-family:'Playfair Display',serif;font-size:clamp(2.3rem,4.3vw,4.15rem);font-weight:500;line-height:1.04;letter-spacing:-.045em;color:#fff;margin:0 0 1.2rem}.hero h1 em{font-weight:500;color:#d1dda9}.hero-desc{font-size:1rem;line-height:1.8;color:#e1e6d9;max-width:450px;margin:0 0 1.55rem}.hero-meta{display:flex;flex-wrap:wrap;gap:.6rem 1.1rem;font-size:.73rem;color:#d6dfcc}.hero-meta span{white-space:nowrap}.hero-bottom{position:absolute;bottom:0;left:0;right:0;padding:1rem 1.5rem;border-top:1px solid #ffffff20;display:flex;justify-content:space-between;gap:1rem;font-size:.61rem;letter-spacing:.13em;font-weight:700;color:#b9c5ae}.hero-bottom-right b{color:#d1dda9;font-size:1rem;margin-left:.5rem}
/* CSS 3D food still-life */
.food-stage{position:absolute;z-index:2;right:1.5%;top:0;width:46%;height:100%;perspective:1000px;transform-style:preserve-3d}.stage-glow{position:absolute;width:74%;height:68%;top:13%;left:13%;border-radius:50%;background:#b3c8871a;filter:blur(32px);animation:glowPulse 5s ease-in-out infinite}.orbit{position:absolute;left:50%;top:45%;border:1px solid #dce7c62b;border-radius:50%;transform:translate(-50%,-50%) rotate(-24deg)}.orbit-one{width:78%;height:57%;animation:orbitSpin 26s linear infinite}.orbit-two{width:92%;height:72%;transform:translate(-50%,-50%) rotate(32deg);border-style:dashed;animation:orbitSpin 40s linear infinite reverse}.plate-shadow{position:absolute;left:50%;top:51%;width:64%;height:22%;background:#090f0a99;border-radius:50%;filter:blur(19px);transform:translate(-50%,-30%) rotate(-12deg)}.plate{position:absolute;left:50%;top:43%;width:min(62%,330px);aspect-ratio:1;border-radius:50%;transform-style:preserve-3d;transform:translate(-50%,-50%) rotateX(58deg) rotateZ(-24deg);animation:plateFloat 6s ease-in-out infinite}.plate-back{background:linear-gradient(140deg,#c4c7b2,#f5f0dd 45%,#9ba18c);box-shadow:0 28px 28px #0b110b6e;border:7px solid #e9e7d8}.plate-main{width:min(54%,290px);background:radial-gradient(circle at 36% 29%,#faf8ed,#d9d7c4 58%,#8e9681 100%);border:12px solid #f7f3e5;box-shadow:inset 0 0 0 2px #a8ad98,0 12px 24px #0b110b4d;overflow:visible}.dish-ring{position:absolute;inset:10%;border:2px solid #c8bda0;border-radius:50%;box-shadow:0 0 0 7px #ffffff35}.dish-sauce{position:absolute;inset:24%;border-radius:50%;background:radial-gradient(ellipse at 38% 36%,#d69c4e,#a75b2f 55%,#6d3e25);box-shadow:inset 5px 6px 12px #4e2b234d;transform:translateZ(8px)}.food-leaf{position:absolute;z-index:2;width:25%;height:11%;border-radius:100% 0 100% 0;background:linear-gradient(120deg,#789451,#25492d);box-shadow:inset 2px 1px 3px #d8e0a55c,0 2px 4px #243b2440;transform:translateZ(18px)}.food-leaf:after{content:"";position:absolute;width:80%;height:1px;left:8%;top:50%;background:#d0d8a5;transform:rotate(-16deg)}.leaf-one{left:31%;top:35%;transform:translateZ(20px) rotate(-28deg)}.leaf-two{left:47%;top:47%;transform:translateZ(23px) rotate(28deg) scale(1.1)}.leaf-three{left:28%;top:55%;transform:translateZ(17px) rotate(42deg) scale(.8)}.tomato{position:absolute;z-index:3;width:14%;aspect-ratio:1;border-radius:50%;background:radial-gradient(circle at 30% 24%,#ffb477,#d65b36 45%,#8c3325 100%);box-shadow:inset -3px -4px 5px #67251f55,0 3px 6px #51291c44;transform:translateZ(27px)}.tomato-one{left:52%;top:30%}.tomato-two{left:59%;top:55%;width:11%}.food-dot{position:absolute;z-index:4;width:3%;aspect-ratio:1;border-radius:50%;background:#f2d99b;transform:translateZ(28px);box-shadow:0 0 5px #fff3c6}.dot-one{left:40%;top:42%}.dot-two{left:56%;top:43%}.dot-three{left:42%;top:59%}.float-ingredient{position:absolute;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#d8e4bd;background:linear-gradient(145deg,#8a9a68a8,#344a31a8);border:1px solid #e2e9d344;backdrop-filter:blur(8px);box-shadow:0 12px 30px #07100736}.herb{left:12%;top:25%;width:66px;height:66px;border-radius:22px;font-size:1.7rem;transform:rotate(-12deg);animation:ingredientFloat 5.2s ease-in-out infinite}.herb small{font-size:.46rem;letter-spacing:.15em;font-weight:700}.oil{right:8%;top:27%;width:45px;height:45px;border-radius:50%;font-size:1.2rem;animation:ingredientFloat 4.6s ease-in-out -1.4s infinite}.stage-caption{position:absolute;bottom:17%;right:5%;display:flex;align-items:center;gap:.5rem;color:#d4ddc8;font-size:.55rem;letter-spacing:.14em;font-weight:700}.caption-line{width:25px;height:1px;background:#cbd9b2}
@keyframes plateFloat{0%,100%{margin-top:0;filter:drop-shadow(0 12px 16px #0a120b24)}50%{margin-top:-12px;filter:drop-shadow(0 25px 19px #0a120b30)}}@keyframes ingredientFloat{0%,100%{translate:0 0;rotate:0deg}50%{translate:0 -13px;rotate:5deg}}@keyframes orbitSpin{to{rotate:360deg}}@keyframes glowPulse{0%,100%{opacity:.55;scale:1}50%{opacity:1;scale:1.08}}
/* Tabs and controls */
.stTabs [data-baseweb="tab-list"]{gap:.5rem;border-bottom:1px solid var(--line);background:transparent}.stTabs [data-baseweb="tab"]{padding:.85rem 1rem;font-weight:700;color:var(--muted);border-radius:10px 10px 0 0}.stTabs [aria-selected="true"]{color:var(--ink)!important;background:#e9ecdf!important}.stTabs [data-baseweb="tab-highlight"]{background:var(--olive)}
.titulo-bloco{font-family:'Playfair Display',serif;font-size:1.55rem;color:var(--ink);margin:0 0 .6rem}.st-key-form{background:var(--paper);border:1px solid var(--line);border-radius:18px;padding:1.45rem 1.45rem 1.2rem;box-shadow:0 10px 28px #1e2a1b08}
.stApp .stButton>button{border-radius:11px;font-weight:700;border:1px solid var(--line);background:var(--paper);color:var(--ink);transition:all .2s ease;min-height:2.65rem}.stApp .stButton>button:hover{border-color:var(--olive);color:var(--ink);background:#edf0e5;transform:translateY(-1px)}.stApp .stButton>button:focus-visible{outline:3px solid #687b5044;outline-offset:2px}.stApp .stButton>button[kind="primary"]{background:var(--ink);border-color:var(--ink);color:#fff;padding:.78rem 1rem;font-size:1rem;box-shadow:0 6px 15px #18251d20}.stApp .stButton>button[kind="primary"]:hover{background:#344b35;border-color:#344b35;color:#fff}.stApp .stButton>button:disabled{opacity:.45}.stApp [data-testid="stDownloadButton"] button{border-radius:11px;font-weight:700;background:var(--paper);border:1px solid var(--olive);color:var(--ink)}.stApp [data-testid="stDownloadButton"] button:hover{background:var(--ink);color:#fff}
/* Agent pipeline */
.passos{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:.7rem;margin-bottom:1.1rem}.passo{display:flex;flex-direction:column;gap:.15rem;padding:1rem;background:var(--paper);border:1px solid var(--line);border-radius:14px;opacity:.62;transition:all .25s ease}.passo .n{width:2.15rem;height:2.15rem;border-radius:12px;display:grid;place-items:center;font-weight:700;margin-bottom:.45rem;background:#e8ebde;color:var(--olive)}.passo b{color:var(--ink)}.passo small{color:var(--muted);font-size:.86rem;line-height:1.4}.passo.ativo{opacity:1;border-color:var(--olive);box-shadow:0 0 0 3px #687b501b;transform:translateY(-2px)}.passo.ativo .n{background:var(--olive);color:#fff;animation:pulso 1.5s ease-in-out infinite}.passo.feito{opacity:1}.passo.feito .n{background:var(--success);color:#fff}.passos.previa .passo{opacity:1}@keyframes pulso{50%{box-shadow:0 0 0 7px #687b5026}}
/* Empty state, recipe and pantry cards */
.vazio{border:1px dashed #c9cebd;border-radius:16px;padding:1.6rem 1.7rem .8rem;margin-bottom:1rem;background:#fffdf8a8;color:var(--muted);line-height:1.6}.vazio b{display:block;font-family:'Playfair Display',serif;font-weight:500;font-size:1.35rem;color:var(--ink);margin-bottom:.35rem}.vazio p{margin:0 0 1.1rem}.st-key-receita{background:var(--paper);border:1px solid var(--line)!important;border-radius:18px;padding:.75rem 1rem;box-shadow:0 12px 32px #1e2a1b09}.rec-titulo{font-family:'Playfair Display',serif;font-size:clamp(1.65rem,2.6vw,2.35rem);line-height:1.12;color:var(--ink);margin:.35rem 0 .8rem}.chips-r{display:flex;flex-wrap:wrap;gap:.4rem;margin-bottom:.8rem}.chip{font-size:.78rem;font-weight:700;color:#465c39;background:#e8eddd;padding:.3rem .7rem;border-radius:999px}.st-key-receita table{width:100%;border-collapse:collapse;margin:.5rem 0 1rem;font-size:.97rem}.st-key-receita th{text-align:left;background:#e9eddf;color:var(--ink);padding:.65rem .75rem;border-bottom:2px solid var(--olive)}.st-key-receita td{padding:.65rem .75rem;border-bottom:1px solid var(--line)}.st-key-receita h2,.st-key-receita h3{font-family:'Playfair Display',serif;font-weight:500;color:var(--ink)}.st-key-receita ol li{margin-bottom:.5rem;line-height:1.65}
.resumo{display:grid;grid-template-columns:repeat(3,1fr);border:1px solid var(--line);border-radius:16px;background:var(--paper);margin:1.1rem 0 1.2rem;overflow:hidden}.resumo div{padding:1.05rem 1.25rem;border-right:1px solid var(--line)}.resumo div:last-child{border-right:0}.resumo b{display:block;font-family:'Playfair Display',serif;font-weight:500;font-size:2rem;color:var(--ink);line-height:1.1}.resumo span{color:var(--muted);font-size:.87rem}.resumo .alerta b{color:var(--danger)}[class*="st-key-card_"]{background:var(--paper);border:1px solid var(--line)!important;border-radius:16px;padding:.5rem .6rem;box-shadow:0 6px 20px #1e2a1b06}.al-topo{display:flex;justify-content:space-between;align-items:flex-start;gap:.5rem}.al-nome{font-weight:700;font-size:1rem;color:var(--ink);line-height:1.3}.al-qtd{font-family:'Playfair Display',serif;font-size:2.15rem;color:var(--olive);margin:.4rem 0 .5rem;line-height:1}.al-qtd small{font-family:'DM Sans',sans-serif;font-size:.9rem;color:var(--muted);margin-left:.35rem}.selo{font-size:.7rem;font-weight:700;padding:.25rem .55rem;border-radius:999px;white-space:nowrap}.selo.ok{background:#e8eddf;color:#465c39}.selo.perto{background:#f7e8c8;color:#815a17}.selo.fora{background:#f4ddd5;color:#8c392b}
@media(max-width:850px){.hero{min-height:590px}.hero-copy{width:100%;padding:2.2rem 1.7rem 0}.hero h1{font-size:2.7rem}.hero-desc{max-width:520px}.food-stage{width:100%;height:300px;top:auto;bottom:1rem;right:0;opacity:.92}.plate{width:205px}.plate-main{width:175px}.hero-bottom{z-index:4}.stage-caption{bottom:14%;right:8%}}
@media(max-width:640px){.block-container{padding-top:.8rem}.hero{min-height:610px;border-radius:19px}.hero-copy{padding:1.8rem 1.25rem 0}.hero h1{font-size:2.35rem}.hero-desc{font-size:.92rem}.hero-meta{gap:.5rem .8rem}.food-stage{height:285px;bottom:1.4rem}.hero-bottom{font-size:.5rem;padding:.8rem}.estado{font-size:.58rem;padding:.45rem .55rem}.marca-sub{font-size:.49rem}.resumo{grid-template-columns:1fr}.resumo div{border-right:0;border-bottom:1px solid var(--line)}.resumo div:last-child{border-bottom:0}.stTabs [data-baseweb="tab"]{padding:.7rem .45rem;font-size:.8rem}.st-key-form{padding:1rem}.stage-caption{font-size:.46rem}}
@media(prefers-reduced-motion:reduce){*,*:before,*:after{animation-duration:.01ms!important;animation-iteration-count:1!important;scroll-behavior:auto!important;transition:none!important}}

/* Acabamento dos componentes Streamlit */
.stApp,
.stApp p,
.stApp label,
.stApp [data-testid="stMarkdownContainer"] {
    color: var(--ink);
}

.stApp [data-testid="stWidgetLabel"] p,
.stApp [data-testid="stWidgetLabel"] label {
    color: var(--ink);
}

.titulo-bloco {
    font-family: 'Playfair Display', serif;
    font-size: 1.65rem;
    line-height: 1.2;
    color: var(--ink);
    margin: 0 0 1rem;
}

.stApp input,
.stApp textarea,
.stApp [data-baseweb="select"] > div,
.stApp [data-testid="stDateInput"] input,
.stApp [data-testid="stNumberInput"] input {
    background-color: var(--paper) !important;
    color: var(--ink) !important;
    -webkit-text-fill-color: var(--ink) !important;
    border-color: var(--line) !important;
    border-radius: 11px !important;
}

.stApp input::placeholder,
.stApp textarea::placeholder {
    color: #858a7d !important;
    -webkit-text-fill-color: #858a7d !important;
    opacity: 1;
}

.stApp [data-baseweb="select"] [aria-selected="true"],
.stApp [role="listbox"],
.stApp [role="option"],
.stApp ul[data-baseweb="menu"] {
    background-color: var(--paper);
    color: var(--ink);
}

.stApp [role="option"] *,
.stApp ul[data-baseweb="menu"] * {
    color: var(--ink);
}

.stApp [data-testid="stAlert"] p,
.stApp [data-testid="stExpander"] p,
.stApp [data-testid="stDialog"] p {
    color: var(--ink);
}

.stApp [data-testid="stExpander"],
.stApp [data-testid="stDialog"] > div {
    border-color: var(--line);
    border-radius: 14px;
}

.stApp [data-testid="stAlert"] {
    border-radius: 12px;
}

.stApp .stButton > button,
.stApp .stDownloadButton > button {
    min-height: 2.65rem;
    border: 1px solid var(--line);
    border-radius: 11px;
    color: var(--ink);
    background: var(--paper);
    font-weight: 600;
    transition: background-color .18s ease, border-color .18s ease, transform .18s ease, box-shadow .18s ease;
}

.stApp .stButton > button:hover,
.stApp .stDownloadButton > button:hover {
    border-color: var(--olive);
    color: var(--ink);
    background: #f0f2e9;
    transform: translateY(-1px);
    box-shadow: 0 5px 14px #18251d10;
}

.stApp .stButton > button[kind="primary"] {
    border-color: var(--ink);
    color: #fff;
    background: var(--ink);
    box-shadow: 0 6px 16px #18251d20;
}

.stApp .stButton > button[kind="primary"]:hover {
    border-color: #314638;
    color: #fff;
    background: #314638;
}

.stApp button:focus-visible,
.stApp input:focus-visible,
.stApp textarea:focus-visible,
.stApp [tabindex="0"]:focus-visible {
    outline: 3px solid #8fa56b;
    outline-offset: 2px;
}

.stTabs [data-baseweb="tab"]:hover {
    color: var(--ink);
    background: #e9ecdf;
}

.stTabs [aria-selected="true"] {
    color: var(--ink) !important;
    box-shadow: inset 0 -2px 0 var(--olive);
}

.stApp [data-testid="stCaptionContainer"] p,
.stApp small {
    color: var(--muted);
}

.stApp code,
.stApp pre {
    border-radius: 8px;
}

@media (max-width: 640px) {
    .titulo-bloco {
        font-size: 1.45rem;
    }

    .stApp .stButton > button,
    .stApp .stDownloadButton > button {
        min-height: 2.8rem;
    }
}

/* Contraste reforçado em todos os controlos e estados interativos */
.stApp [data-testid="stWidgetLabel"],
.stApp [data-testid="stWidgetLabel"] *,
.stApp [data-testid="stMarkdownContainer"],
.stApp [data-testid="stMarkdownContainer"] li,
.stApp [data-testid="stCaptionContainer"] p,
.stApp [data-testid="stTooltipContent"] {
    color: var(--ink);
}

.stApp [data-testid="stCaptionContainer"] p,
.stApp [data-testid="stHelp"] p {
    color: var(--muted);
}

.stApp input,
.stApp textarea,
.stApp [data-baseweb="select"] > div,
.stApp [data-baseweb="select"] input,
.stApp [data-testid="stDateInput"] input,
.stApp [data-testid="stNumberInput"] input {
    background-color: var(--paper) !important;
    color: var(--ink) !important;
    -webkit-text-fill-color: var(--ink) !important;
    border-color: #b9c0b1 !important;
}

.stApp input::placeholder,
.stApp textarea::placeholder {
    color: #626b5f !important;
    -webkit-text-fill-color: #626b5f !important;
    opacity: 1;
}

.stApp [data-baseweb="tag"] {
    background-color: #e4ead8;
    color: #34472e;
}

.stApp [data-baseweb="tag"] *,
.stApp [data-baseweb="select"] [data-testid="stMarkdownContainer"] *,
.stApp [role="option"],
.stApp [role="option"] *,
.stApp ul[data-baseweb="menu"],
.stApp ul[data-baseweb="menu"] * {
    color: var(--ink);
}

.stApp [role="listbox"],
.stApp [role="option"],
.stApp ul[data-baseweb="menu"] {
    background-color: var(--paper);
}

.stApp [role="option"][aria-selected="true"],
.stApp [role="option"]:hover {
    background-color: #e8eddf;
}

.stApp [data-testid="stCheckbox"] label,
.stApp [data-testid="stRadio"] label,
.stApp [data-testid="stSlider"] label,
.stApp [data-testid="stPills"] button {
    color: var(--ink);
}

.stApp [data-testid="stSlider"] [role="slider"] {
    background-color: var(--olive);
    border-color: var(--paper);
}

.stApp .stButton > button:disabled,
.stApp .stDownloadButton > button:disabled {
    color: #525b50;
    background-color: #e8e9e2;
    border-color: #c6cbbf;
    opacity: 1;
}

.stApp [data-testid="stAlert"] p,
.stApp [data-testid="stExpander"] p,
.stApp [data-testid="stDialog"] p {
    color: var(--ink);
}

.stApp .hero-desc {
    color: #e1e6d9;
}

.stApp a {
    color: #355c39;
    text-decoration-thickness: 1px;
    text-underline-offset: 2px;
}

.stApp a:hover {
    color: #213c27;
}
</style>
"""
