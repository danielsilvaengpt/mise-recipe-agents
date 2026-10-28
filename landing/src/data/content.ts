export interface NavLink {
  label: string;
  href: string;
}

export interface AgentInfo {
  role: string;
  title: string;
  description: string;
}

export interface StepInfo {
  number: string;
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface RecipeTicketExample {
  number: string;
  dishName: string;
  time: string;
  servings: string;
  ingredients: {
    name: string;
    qty: string;
    status: 'disponivel' | 'falta';
    note?: string;
  }[];
}

const appUrl = import.meta.env.VITE_APP_URL || '/app';

export const content = {
  appUrl,
  navbar: {
    logo: 'MiseAI',
    links: [
      { label: 'Como funciona', href: '#como-funciona' },
      { label: 'Agentes', href: '#agentes' },
      { label: 'Despensa', href: '#despensa' },
      { label: 'FAQ', href: '#faq' },
    ] as NavLink[],
    cta: 'Experimentar',
  },
  hero: {
    badge: 'MISE EN PLACE · COZINHA DE APROVEITAMENTO',
    h1: 'Abre a despensa. Nós inventamos o jantar.',
    subtitle:
      'Diz o que te apetece. Três especialistas — um chef, um redator e um revisor — desenham a receita ideal com o que realmente tens em casa e dizem-te, sem rodeios, o que te falta.',
    primaryCta: 'Experimentar agora →',
    secondaryCta: 'Ver como funciona',
    note: 'Gratuito para experimentar · Em português de Portugal',
    ticket: {
      number: 'RECEITA Nº 014',
      dishName: 'Massa com Ovos Escalfados e Toque de Limão',
      time: '15 min',
      servings: '2 pessoas',
      disclaimer: 'Exemplo ilustrativo',
      ingredients: [
        { name: 'Massa (esparguete)', qty: '200g', status: 'disponivel' },
        { name: 'Ovos frescos', qty: '2 un', status: 'disponivel' },
        { name: 'Limão (raspa e sumo)', qty: '1 un', status: 'disponivel' },
        { name: 'Azeite e sal', qty: 'q.b.', status: 'disponivel', note: 'Básicos da cozinha' },
        { name: 'Queijo parmesão ralado', qty: '30g', status: 'falta', note: 'Opcional / Substituível' },
      ],
    } as RecipeTicketExample & { disclaimer: string },
  },
  problem: {
    h2: 'Tens comida em casa. Só não sabes o que fazer com ela.',
    text: 'Meio pacote de massa, um limão a murchar, dois ovos. Pesquisar receitas dá voltas e quase todas pedem ingredientes que não tens. O resultado? Desperdício, encomendas desnecessárias e o mesmo prato de sempre.',
  },
  agents: {
    h2: 'Uma equipa na tua cozinha',
    intro: 'Cada receita passa por três especialistas, em sequência, como numa cozinha a sério.',
    list: [
      {
        role: '1',
        title: 'Chef criativo',
        description:
          'Olha para o teu pedido e para a despensa, propõe dois pratos e escolhe o melhor. Cozinha simples, de aproveitamento, sem técnicas de restaurante.',
      },
      {
        role: '2',
        title: 'Redator de receitas',
        description:
          'Transforma a ideia do chef numa receita clara: quantidades exatas, passos numerados, uma ação por passo, tempos e temperaturas.',
      },
      {
        role: '3',
        title: 'Revisor',
        description:
          'A última linha de defesa. Confirma que é realista e segura, que respeita as tuas restrições e o tempo que tens, e que a lista e os passos batem certo.',
      },
    ] as AgentInfo[],
  },
  howItWorks: {
    h2: 'Do frigorífico ao prato em três passos',
    steps: [
      {
        number: '1',
        title: 'Regista a despensa',
        description: 'Adiciona o que tens: quantidade, unidade, restrições alimentares e validade.',
      },
      {
        number: '2',
        title: 'Faz o teu pedido',
        description: '«Algo rápido para duas pessoas, sem glúten.» Escreve como falarias com um amigo.',
      },
      {
        number: '3',
        title: 'Recebe a receita',
        description: 'Receita completa em Markdown, com tabela do que tens e do que falta.',
      },
    ] as StepInfo[],
  },
  pantry: {
    h2: 'A tua despensa, sempre à mão',
    text: 'Guarda cada alimento com quantidade, unidade, restrições e data de validade. Se registares o mesmo alimento outra vez, a quantidade soma-se. Podes ajustar ou remover a qualquer momento.',
    bullets: [
      'Validade por alimento',
      'Restrições (vegan, sem glúten…)',
      'Ajuste rápido de quantidades',
    ],
  },
  honesty: {
    h2: 'Se faltar alguma coisa, dizemos-te.',
    text: 'Não fingimos que tens o que não tens. Cada receita traz uma tabela clara com os ingredientes disponíveis e os que faltam, e sugestões de substituição quando existem. Sal, azeite, água e pimenta contam sempre como disponíveis.',
    stamps: {
      available: 'DISPONÍVEL',
      missing: 'EM FALTA',
    },
  },
  recipePreview: {
    h2: 'Assim se vê uma receita',
    badge: 'Exemplo ilustrativo',
    title: 'Massa com Ovos Escalfados e Toque de Limão',
    time: '15 min',
    servings: '2 pessoas',
    steps: [
      'Coloca uma panela com água e sal ao lume até levantar fervura.',
      'Coze a massa pelo tempo indicado na embalagem até ficar al dente.',
      'Numa frigideira com um fio de azeite brando, escalfa cuidadosamente os dois ovos.',
      'Escorre a massa, junta à frigideira e adiciona a raspa e umas gotas de limão.',
      'Envolve suavemente, tempera com pimenta preta e serve de imediato.',
    ],
  },
  safety: {
    h2: 'Pensado para cozinhares com confiança',
    text: 'O revisor verifica quantidades, tempos e temperaturas internas seguras (por exemplo, frango bem cozinhado) antes de a receita chegar a ti.',
  },
  faq: {
    items: [
      {
        question: 'Preciso de registar todos os alimentos?',
        answer: 'Não. Quanto mais registares, mais ajustada fica a receita. Se faltar algo, a receita indica-o.',
      },
      {
        question: 'E se não tiver todos os ingredientes?',
        answer: 'A receita é gerada na mesma e diz-te claramente o que falta, com substituições quando possível.',
      },
      {
        question: 'Respeita restrições alimentares?',
        answer: 'Sim. Podes indicar restrições nos alimentos e no pedido, e o revisor confirma-as.',
      },
      {
        question: 'Em que língua vêm as receitas?',
        answer: 'Português de Portugal.',
      },
      {
        question: 'As receitas ficam guardadas?',
        answer: 'Sim, a app guarda o histórico das receitas geradas.',
      },
      {
        question: 'A IA pode enganar-se?',
        answer: 'Pode. Por isso há um revisor e temperaturas seguras de referência, mas usa sempre o bom senso, sobretudo com alergias.',
      },
    ] as FaqItem[],
  },
  ctaFinal: {
    h2: 'O que há para jantar? Vamos descobrir.',
    button: 'Experimentar agora →',
  },
  footer: {
    text: 'Mise · Projeto feito com Streamlit, CrewAI e FastAPI',
    year: new Date().getFullYear(),
    repoLinkText: 'GitHub',
    repoUrl: 'https://github.com/danielsilvaengpt/mise-recipe-agents',
  },
  seo: {
    title: 'Mise — Receitas com IA a partir da tua despensa',
    description: 'Mise usa uma equipa de agentes de IA para criar receitas com os ingredientes que tens em casa e diz-te o que falta. Em português de Portugal.',
  },
};
