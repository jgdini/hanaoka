/* Hanaoka blog — protótipo client-side.
   Os posts vivem no localStorage deste navegador (semeados a partir de
   SEED_POSTS no primeiro acesso). Não há backend: isto demonstra a
   experiência de edição, não é um CMS multiusuário. A versão real chega
   com a migração para WordPress (login wp-admin + editor de blocos). */
(function (global) {
  "use strict";

  var STORAGE_KEY = "hanaoka_blog_posts_v1";
  var AUTH_KEY = "hanaoka_admin_session";
  var DEMO_USER = "admin";
  var DEMO_PASS = "hanaoka2026";

  var SEED_POSTS = [
    {
      slug: "quem-fabrica-acido-nitrico-pa-65-no-brasil",
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

  function getAll() {
    var posts = ensureSeeded();
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
