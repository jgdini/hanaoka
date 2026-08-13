/* Hanaoka blog — protótipo client-side.
   Os posts vivem no localStorage deste navegador (semeados a partir de
   SEED_POSTS no primeiro acesso). Não há backend: isto demonstra a
   experiência de edição, não é um CMS multiusuário. A versão real chega
   com a migração para WordPress (login wp-admin + editor de blocos). */
(function (global) {
  "use strict";

  var STORAGE_KEY = "hanaoka_blog_posts_v2"; // v2: added lang field + EN demo post
  var AUTH_KEY = "hanaoka_admin_session";
  var DEMO_USER = "admin";
  var DEMO_PASS = "hanaoka2026";

  var SEED_POSTS = [
    {
      slug: "difference-between-technical-pa-and-acs-grade",
      lang: "en",
      title: "Difference between technical, PA, and ACS grade",
      category: "Products",
      date: "2026-07-15",
      image: "",
      excerpt: "Technical, PA, and ACS are not just labels — each grade represents a different level of analytical control. Find out which one fits your process.",
      body: [
        "Not all acid is the same, even when the chemical formula is identical. The purity grade determines where and how a reagent can be used safely and with reliable results.",
        "Technical grade suits general industrial processes, where small purity variations don't compromise the final outcome — such as metal pickling or effluent treatment.",
        "PA grade (analytical reagent) carries stricter analytical control, with low contaminant levels, making it suitable for laboratories and processes that require reproducibility.",
        "PA-ACS grade meets American Chemical Society specifications, the most demanding standard, used in ultra-high-precision analysis and research.",
        "At Hanaoka, every grade is manufactured and diluted to specification, with analysis in our own laboratory prior to release — ensuring the delivered product matches exactly the declared grade."
      ]
    },
    {
      slug: "controle-de-metais-por-icp-oes",
      lang: "pt",
      title: "Controle de metais por ICP-OES: por que isso importa",
      category: "Qualidade",
      date: "2026-08-07",
      image: "",
      excerpt: "Um reagente pode parecer puro a olho nu e ainda assim conter contaminantes metálicos capazes de invalidar um resultado analítico. Entenda como o ICP-OES resolve isso.",
      body: [
        "Pureza declarada em rótulo e pureza comprovada em bancada nem sempre são a mesma coisa. Traços de metais — ferro, chumbo, cobre, zinco, entre outros — podem estar presentes em concentrações mínimas, invisíveis a olho nu, e ainda assim interferir de forma significativa em uma análise química sensível.",
        "O ICP-OES (Espectrometria de Emissão Óptica com Plasma Indutivamente Acoplado) é uma das técnicas mais confiáveis para detectar e quantificar esses traços metálicos, com sensibilidade suficiente para identificar contaminantes na faixa de partes por bilhão.",
        "Para reagentes de grau PA e PA-ACS, esse controle não é opcional: é o que garante que o produto realmente atenda à especificação declarada, e não apenas ao teor nominal do princípio ativo.",
        "Na Hanaoka, o controle analítico por ICP-OES faz parte do processo de purificação própria dos reagentes prioritários, com verificação antes da liberação de cada lote — para que a pureza no papel corresponda à pureza real."
      ]
    },
    {
      slug: "acido-sulfurico-nacional-versus-importado",
      lang: "pt",
      title: "Ácido sulfúrico nacional versus importado: o que considerar",
      category: "Produtos",
      date: "2026-08-06",
      image: "",
      excerpt: "Comprar um reagente importado nem sempre significa mais qualidade — e quase sempre significa menos previsibilidade de prazo. Veja o que pesar antes de decidir.",
      body: [
        "É comum associar produto importado a maior qualidade, mas no caso de reagentes químicos de grau analítico essa equação não é tão simples. O que determina a qualidade real é o processo de purificação e controle — não a origem geográfica do rótulo.",
        "Do lado prático, o ácido sulfúrico importado costuma trazer prazos de entrega mais longos, custos logísticos maiores, exposição a variação cambial e risco de desabastecimento em caso de atraso alfandegário — fatores que pesam especialmente quando o insumo é crítico para a linha de produção.",
        "Um fabricante nacional com laboratório próprio e controle analítico documentado (por exemplo, por ICP-OES) pode entregar o mesmo nível de especificação técnica, com rastreabilidade completa e prazo de entrega muito mais previsível.",
        "Antes de decidir, vale pedir de qualquer fornecedor — nacional ou importado — o certificado de análise do lote, não apenas a ficha técnica genérica do produto."
      ]
    },
    {
      slug: "como-avaliar-um-fabricante-de-acido-sulfurico-pa-acs",
      lang: "pt",
      title: "Como avaliar um fabricante de ácido sulfúrico PA-ACS",
      category: "Produtos",
      date: "2026-08-04",
      image: "",
      excerpt: "Nem toda empresa que vende ácido sulfúrico PA-ACS o fabrica. Veja os pontos que realmente diferenciam um fabricante de um simples revendedor.",
      body: [
        "No mercado de reagentes de alta pureza, é fácil confundir quem fabrica com quem apenas revende um produto de terceiros com etiqueta própria. Para quem depende de consistência de lote a lote, essa diferença importa — e muito.",
        "Um primeiro ponto a verificar é se a empresa possui unidade industrial própria, com processo de purificação documentado — e não apenas um centro de distribuição.",
        "O segundo é o controle analítico: pergunte qual técnica é usada para verificar contaminantes (ICP-OES é hoje um dos padrões mais confiáveis) e se cada lote recebe certificado de análise antes de ser liberado.",
        "Por fim, vale checar rastreabilidade — se é possível identificar a origem e o histórico de qualidade de um lote específico — e há quanto tempo a empresa atua no setor, sem trocar de controle acionário ou nome com frequência.",
        "Fabricantes com décadas de atuação contínua e laboratório próprio tendem a ser mais transparentes sobre esses pontos, justamente porque têm o processo sob seu próprio controle."
      ]
    },
    {
      slug: "como-interpretar-certificado-de-analise-reagente",
      lang: "pt",
      title: "Como interpretar o certificado de análise de um reagente",
      category: "Qualidade",
      date: "2026-08-02",
      image: "",
      excerpt: "O certificado de análise é o documento que prova, lote a lote, que o reagente entregue corresponde à especificação declarada. Veja o que observar nele.",
      body: [
        "O certificado de análise (CoA) é o documento que acompanha um lote de reagente e comprova, com dados de ensaio reais, que aquele lote específico atende à especificação declarada — diferente da ficha técnica, que descreve o produto de forma genérica.",
        "Ao receber um certificado, o primeiro ponto a checar é se o número do lote no documento corresponde exatamente ao lote físico recebido — certificados genéricos ou desatualizados são um sinal de alerta.",
        "Em seguida, observe os parâmetros analisados: teor do princípio ativo, aparência, e — no caso de reagentes de alta pureza — os limites de contaminantes metálicos, idealmente verificados por uma técnica como ICP-OES.",
        "Por fim, verifique se o certificado indica a data de análise e é assinado ou emitido por um laboratório identificável — de preferência o laboratório próprio do fabricante, não um terceiro genérico.",
        "Um fornecedor que emite certificado de análise por lote, de forma consistente, está demonstrando controle real de processo — não apenas uma promessa de qualidade no rótulo."
      ]
    },
    {
      slug: "quem-fabrica-acido-nitrico-pa-65-no-brasil",
      lang: "pt",
      title: "Quem fabrica Ácido Nítrico PA 65% no Brasil?",
      category: "Produtos",
      date: "2026-08-01",
      image: "https://hanaoka.com.br/wp-content/uploads/2025/06/Banner-Principal-Hanoka.webp",
      excerpt: "Poucas empresas no Brasil fabricam e diluem Ácido Nítrico grau PA 65% com controle analítico próprio. Entenda o que diferencia um fabricante de um simples revendedor.",
      body: [
        "Encontrar um fabricante nacional de Ácido Nítrico grau PA 65% — e não apenas um distribuidor — é decisivo para quem depende de consistência de lote a lote em processos analíticos e industriais.",
        "A Hanaoka Soluções Químicas fabrica e dilui o Ácido Nítrico PA 65% sob especificação do cliente, com controle de qualidade em laboratório próprio antes da liberação de cada lote.",
        "Isso significa rastreabilidade documentada, certificado de análise disponível e um único ponto de contato — da produção à entrega — sem depender de intermediários que apenas revendem o produto de terceiros.",
        "Para especificações completas, consulte a página do produto: Ácido Nítrico PA 65%."
      ]
    },
    {
      slug: "diferenca-entre-grau-tecnico-pa-e-acs",
      lang: "pt",
      title: "Diferença entre grau técnico, PA e ACS",
      category: "Produtos",
      date: "2026-07-15",
      image: "",
      excerpt: "Técnico, PA e ACS não são apenas rótulos — cada grau representa um nível diferente de controle analítico. Entenda qual é o adequado para o seu processo.",
      body: [
        "Nem todo ácido é igual, mesmo quando a fórmula química é a mesma. O grau de pureza determina onde e como um reagente pode ser usado com segurança e confiabilidade de resultado.",
        "O grau técnico é indicado para processos industriais gerais, onde pequenas variações de pureza não comprometem o resultado final — como decapagem de metais ou tratamento de efluentes.",
        "O grau PA (Para Análise) tem controle analítico mais rigoroso, com baixos níveis de contaminantes, sendo indicado para laboratórios e processos que exigem reprodutibilidade.",
        "Já o grau PA-ACS atende às especificações da American Chemical Society, o padrão mais exigente, usado em análises de altíssima precisão e pesquisa.",
        "Na Hanaoka, cada grau é fabricado e diluído sob especificação, com análise em laboratório próprio antes da liberação — garantindo que o produto entregue corresponda exatamente ao grau declarado."
      ]
    },
    {
      slug: "o-que-e-acido-sulfurico",
      lang: "pt",
      title: "O que é o Ácido Sulfúrico?",
      category: "Produtos",
      date: "2026-05-12",
      image: "https://hanaoka.com.br/wp-content/uploads/2026/05/2023H201-e1779533341693.jpg.webp",
      excerpt: "Um dos compostos químicos mais produzidos do mundo está por trás de fertilizantes, baterias e processos industriais inteiros. Entenda o que é e onde ele atua.",
      body: [
        "O Ácido Sulfúrico (H₂SO₄) é um dos insumos mais utilizados da indústria química mundial, presente desde a fabricação de fertilizantes até o refino de metais e a produção de baterias automotivas.",
        "Sua versatilidade vem da alta reatividade e da capacidade de atuar como agente desidratante, catalisador e matéria-prima em diferentes concentrações e graus de pureza — do técnico ao PA-ACS.",
        "Na Hanaoka, o Ácido Sulfúrico é produzido e diluído sob rigoroso controle de qualidade em laboratório próprio, respeitando a especificação de cada cliente e os padrões da American Chemical Society (ACS)."
      ]
    },
    {
      slug: "acido-sulfurico-pa-acs-98-pureza-seguranca",
      lang: "pt",
      title: "Ácido Sulfúrico PA-ACS 98%: pureza, segurança e excelência",
      category: "Produtos",
      date: "2026-04-28",
      image: "",
      excerpt: "No universo da indústria química, precisão e segurança são inegociáveis. Veja por que o grau PA-ACS é referência para laboratórios e processos analíticos.",
      body: [
        "Quando o assunto é reagente para análise, o grau de pureza determina a confiabilidade do resultado. O Ácido Sulfúrico PA-ACS 98% atende às especificações da American Chemical Society, garantindo baixíssimos níveis de contaminantes.",
        "Esse padrão é essencial para laboratórios de controle de qualidade, universidades e indústrias que não podem correr o risco de interferências analíticas.",
        "Cada lote produzido pela Hanaoka passa por análises internas antes de ser liberado, assegurando rastreabilidade do laboratório até a entrega."
      ]
    },
    {
      slug: "importancia-da-hidrogenacao-na-industria",
      lang: "pt",
      title: "A importância da hidrogenação na indústria",
      category: "Indústria",
      date: "2026-04-10",
      image: "",
      excerpt: "Da produção de alimentos à fabricação de polímeros, a hidrogenação é um processo químico vital. Entenda como ele funciona e onde é aplicado.",
      body: [
        "A hidrogenação é a reação química que adiciona hidrogênio a um composto, normalmente na presença de um catalisador — um processo central em diversas cadeias produtivas.",
        "Na indústria alimentícia, é usada na produção de gorduras vegetais; na química fina, viabiliza a síntese de intermediários para fármacos, plásticos e outros materiais.",
        "Entender esse processo ajuda a dimensionar a importância de insumos de alta pureza, já que impurezas podem desativar catalisadores e comprometer todo o lote de produção."
      ]
    },
    {
      slug: "conheca-as-certificacoes-da-hanaoka",
      lang: "pt",
      title: "Conheça as certificações da Hanaoka",
      category: "Institucional",
      date: "2026-03-22",
      image: "https://hanaoka.com.br/wp-content/uploads/2025/06/imgs5.png.webp",
      excerpt: "ISO 9001, ISO 14001, EcoVadis e outros reconhecimentos refletem um compromisso constante com qualidade, meio ambiente e ética nos negócios.",
      body: [
        "A busca pela excelência é um dos valores fundamentais da Hanaoka — e as certificações que conquistamos ao longo dos anos são a comprovação externa desse compromisso.",
        "A ISO 9001 atesta a robustez do nosso sistema de gestão da qualidade; a ISO 14001, o compromisso com a gestão ambiental. Já o selo EcoVadis avalia práticas de sustentabilidade em toda a cadeia de fornecimento.",
        "Além disso, reconhecimentos como o Prêmio FIESP de Mérito Ambiental e a adesão aos Objetivos de Desenvolvimento Sustentável da ONU reforçam nosso papel como agente de mudança no setor químico."
      ]
    },
    {
      slug: "armazenamento-seguro-acido-sulfurico",
      lang: "pt",
      title: "Armazenamento seguro e manuseio adequado do Ácido Sulfúrico",
      category: "Segurança",
      date: "2026-03-05",
      image: "",
      excerpt: "Boas práticas de armazenamento evitam acidentes e preservam a qualidade do produto. Veja os cuidados essenciais no manuseio do Ácido Sulfúrico.",
      body: [
        "O armazenamento correto de ácidos concentrados começa pela escolha do recipiente: materiais compatíveis, como determinados polímeros e aços revestidos, evitam corrosão e vazamentos.",
        "Ventilação adequada, sinalização de segurança e distanciamento de materiais incompatíveis (como bases fortes e metais reativos) são exigências básicas em qualquer planta industrial.",
        "Todo colaborador que manuseia o produto deve utilizar EPIs apropriados — óculos de proteção, luvas resistentes a químicos e, quando necessário, trajes como o DuPont Tychem®, usados nos processos internos da Hanaoka."
      ]
    },
    {
      slug: "transporte-de-produtos-quimicos-com-seguranca",
      lang: "pt",
      title: "Transporte de produtos químicos: como fazer com segurança",
      category: "Segurança",
      date: "2026-02-18",
      image: "https://hanaoka.com.br/wp-content/uploads/2025/06/imgs5.png.webp",
      excerpt: "O transporte de produtos perigosos exige licenciamento específico, veículos adequados e motoristas capacitados. Entenda os principais requisitos.",
      body: [
        "O transporte rodoviário de produtos químicos perigosos no Brasil é regulado por normas específicas, incluindo o licenciamento LETPP (Licença Especial para Transporte de Produtos Perigosos).",
        "Veículos precisam de equipamentos de contenção, sinalização de risco (rótulos ONU) e manutenção preventiva rigorosa, além de motoristas com treinamento MOPP.",
        "Na Hanaoka, a frota própria licenciada permite controle direto sobre cada etapa da entrega, reduzindo riscos e garantindo agilidade — sem depender de transportadoras terceirizadas."
      ]
    }
  ];

  function readStore() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  function writeStore(posts) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }

  function ensureSeeded() {
    var existing = readStore();
    if (!existing) {
      writeStore(SEED_POSTS);
      return SEED_POSTS.slice();
    }
    return existing;
  }

  function getAll(lang) {
    var posts = ensureSeeded();
    if (lang) {
      posts = posts.filter(function (p) { return (p.lang || "pt") === lang; });
    }
    return posts.slice().sort(function (a, b) { return new Date(b.date) - new Date(a.date); });
  }

  function getBySlug(slug) {
    return ensureSeeded().find(function (p) { return p.slug === slug; }) || null;
  }

  function slugify(title) {
    return title
      .toLowerCase()
      .normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  function upsert(post) {
    var posts = ensureSeeded();
    if (!post.slug) post.slug = slugify(post.title) + "-" + Date.now().toString(36);
    if (!post.lang) post.lang = "pt";
    var idx = posts.findIndex(function (p) { return p.slug === post.slug; });
    if (idx >= 0) posts[idx] = post; else posts.unshift(post);
    writeStore(posts);
    return post;
  }

  function remove(slug) {
    var posts = ensureSeeded().filter(function (p) { return p.slug !== slug; });
    writeStore(posts);
  }

  function isLoggedIn() {
    return sessionStorage.getItem(AUTH_KEY) === "1";
  }

  function login(user, pass) {
    if (user === DEMO_USER && pass === DEMO_PASS) {
      sessionStorage.setItem(AUTH_KEY, "1");
      return true;
    }
    return false;
  }

  function logout() {
    sessionStorage.removeItem(AUTH_KEY);
  }

  global.HanaokaBlog = {
    getAll: getAll,
    getBySlug: getBySlug,
    upsert: upsert,
    remove: remove,
    isLoggedIn: isLoggedIn,
    login: login,
    logout: logout,
    DEMO_USER: DEMO_USER,
    DEMO_PASS: DEMO_PASS
  };
})(window);
