export type CurriculoYearMonth = `${number}-${number}` | string

export type CurriculoFormacaoAcademica = {
  curso: string
  instituicao: string
  inicio?: CurriculoYearMonth
  fim?: CurriculoYearMonth
  campus?: string
  periodoAtual?: string
  status?: "Cursando" | "Concluído" | string
  previsaoConclusao?: CurriculoYearMonth
  totalPeriodos?: number
  periodoBase?: number
  periodoBaseInicio?: CurriculoYearMonth
  descricao?: string
  disciplinas?: string[]
  atividades?: string[]
  projetos?: string[]
  competencias?: string[]
  matrizCurricular?: Array<{
    periodo: number
    disciplinas: Array<{ nome: string; cargaHoraria: number }>
  }>
  optativas?: Array<{ nome: string; cargaHoraria: number }>
}

export type CurriculoExperienciaProfissional = {
  cargo: string
  empresa: string
  periodo: string
  inicio?: CurriculoYearMonth
  fim?: CurriculoYearMonth
  atividades: string[]
}

export type CurriculoProjetoProprio = {
  titulo: string
  stack: string
  inicio?: CurriculoYearMonth
  fim?: CurriculoYearMonth
  descricao: string[]
}

export type CurriculoCursoComplementar = {
  titulo: string
  instituicao?: string
  plataforma?: string
  modalidade?: "Online" | "Presencial" | string
  cargaHoraria?: string
  ano?: number
  inicio?: CurriculoYearMonth
  fim?: CurriculoYearMonth
  resumo?: string
  topicos?: string[]
  tags?: string[]
  certificadoUrl?: string
}

export type CurriculoData = {
  informacoesPessoais: {
    nome: string
    localizacao: string
    idade: string
    estadoCivil: string
    telefone: string
    email: string
  }
  objetivoProfissional: string
  formacaoAcademica: CurriculoFormacaoAcademica[]
  cursosComplementares: CurriculoCursoComplementar[]
  experienciaProfissional: CurriculoExperienciaProfissional[]
  projetosProprios: CurriculoProjetoProprio[]
  habilidadesTecnicas: {
    linguagens: string[]
    frameworks: string[]
    ferramentas: string[]
  }
  informacoesAdicionais: {
    idiomas: string
    softSkills: string
    interesses: string
    diferenciais: string
  }
}

export const curriculoData: CurriculoData = {
  informacoesPessoais: {
    nome: "JOSÉ LUIZ DOS SANTOS AZEREDO MENDES",
    localizacao: "📍 Ilha das Caieiras, Vitória/ES",
    idade: "21 anos",
    estadoCivil: "Solteiro",
    telefone: "📞 (27) 99630-0333",
    email: "josemendess004@gmail.com",
  },

  objetivoProfissional:
    "Desenvolvedor Full Stack em formação, com vivência prática em manutenção e desenvolvimento de sistemas, APIs, testes e bancos de dados, buscando oportunidades com JavaScript, Next.js, React, Java, Spring e PostgreSQL. Experiência em práticas de CI/CD (Git/Azure DevOps), qualidade de software e modelagem de processos, aliada a forte proatividade e resolução de problemas. Meu objetivo é trabalhar com equipes que valorizem colaboração e aprendizado contínuo, aplicando essas tecnologias para criar soluções web escaláveis e de alto impacto.",

  formacaoAcademica: [
    {
      curso: "Ciência da Computação",
      instituicao: "FAESA",
      inicio: "2024-08",
      fim: undefined,
      campus: "Vitória/ES",
      periodoAtual: "5º período",
      status: "Cursando",
      previsaoConclusao: "2027-12",
      totalPeriodos: 8,
      // Ajuste essas duas linhas para o período real atual.
      // A cada 6 meses desde `periodoBaseInicio`, o período é incrementado até `totalPeriodos`.
      periodoBase: 5,
      periodoBaseInicio: "2025-08",
      descricao:
        "Graduação com foco em fundamentos de computação e desenvolvimento de software, com prática em modelagem, banco de dados e engenharia de software.",
      disciplinas: [
        "Estrutura de Dados",
        "Banco de Dados",
        "Engenharia de Software",
        "Sistemas Operacionais",
        "Redes de Computadores",
      ],
      atividades: [
        "Projetos acadêmicos com trabalho em equipe e versionamento",
        "Modelagem e documentação (UML e fluxos)",
        "Resolução de problemas e exercícios práticos",
      ],
      competencias: [
        "Lógica de programação",
        "POO",
        "Modelagem de dados",
        "UML",
      ],
      matrizCurricular: [
        {
          periodo: 1,
          disciplinas: [
            { nome: "Habilidades de estudo e comunicação", cargaHoraria: 40 },
            { nome: "Laboratório de Programação I", cargaHoraria: 80 },
            { nome: "Modelos Lógicos Computacionais", cargaHoraria: 80 },
            { nome: "Universo Computacional", cargaHoraria: 80 },
            { nome: "Sistemas de Informação Organizacionais", cargaHoraria: 80 },
          ],
        },
        {
          periodo: 2,
          disciplinas: [
            { nome: "Sistemas Digitais e Microprocessados", cargaHoraria: 80 },
            { nome: "Engenharia de Software", cargaHoraria: 80 },
            { nome: "Sociedade, Cidadania e Diversidade", cargaHoraria: 80 },
            { nome: "Álgebra Linear e Tecnologias Digitais", cargaHoraria: 80 },
            { nome: "Laboratório de Programação II", cargaHoraria: 80 },
          ],
        },
        {
          periodo: 3,
          disciplinas: [
            { nome: "Matemática Discreta", cargaHoraria: 80 },
            { nome: "Arquitetura de Computadores", cargaHoraria: 80 },
            { nome: "Análise Orientada a Objetos", cargaHoraria: 80 },
            { nome: "Padrões de Linguagens de Programação", cargaHoraria: 80 },
            { nome: "Estrutura de Dados", cargaHoraria: 80 },
            { nome: "Projeto Integrador Computação I", cargaHoraria: 40 },
          ],
        },
        {
          periodo: 4,
          disciplinas: [
            { nome: "Linguagem de Programação Orientada a Objetos", cargaHoraria: 80 },
            { nome: "Projeto Integrador Computação II", cargaHoraria: 40 },
            { nome: "Banco de Dados", cargaHoraria: 80 },
            { nome: "Pesquisa e Ordenação", cargaHoraria: 80 },
            { nome: "Projeto Orientado a Objetos", cargaHoraria: 80 },
          ],
        },
        {
          periodo: 5,
          disciplinas: [
            { nome: "Sistemas Operacionais", cargaHoraria: 80 },
            { nome: "Análise de dados aplicada à computação", cargaHoraria: 80 },
            { nome: "Business Intelligence", cargaHoraria: 40 },
            { nome: "Projeto Integrador Computação III", cargaHoraria: 40 },
            { nome: "Redes de Computadores e Dispositivos Inteligentes", cargaHoraria: 80 },
          ],
        },
        {
          periodo: 6,
          disciplinas: [
            { nome: "Inteligência Artificial, Machine Learning e Deep Learning", cargaHoraria: 80 },
            { nome: "Economia", cargaHoraria: 80 },
            { nome: "Projeto Integrador Computação IV", cargaHoraria: 40 },
            { nome: "Teoria da Computação e Autômatos", cargaHoraria: 80 },
            { nome: "Teste de Software", cargaHoraria: 80 },
          ],
        },
        {
          periodo: 7,
          disciplinas: [
            { nome: "Compiladores", cargaHoraria: 40 },
            { nome: "Complexidade de algoritmos", cargaHoraria: 80 },
            { nome: "Empreendedorismo e inovação", cargaHoraria: 40 },
            { nome: "Projeto de trabalho de conclusão de curso", cargaHoraria: 40 },
            { nome: "Tópicos especiais I", cargaHoraria: 40 },
          ],
        },
        {
          periodo: 8,
          disciplinas: [
            { nome: "Interface homem-computador", cargaHoraria: 40 },
            { nome: "Trabalho de conclusão de curso", cargaHoraria: 120 },
            { nome: "Tópicos especiais II", cargaHoraria: 80 },
            { nome: "Sistemas distribuídos e computação em nuvem", cargaHoraria: 80 },
          ],
        },
      ],
      optativas: [
        { nome: "IoT", cargaHoraria: 80 },
        { nome: "Cibersegurança", cargaHoraria: 80 },
        { nome: "Governança de TI", cargaHoraria: 80 },
        { nome: "Desenvolvimento de aplicações WEB I", cargaHoraria: 80 },
        { nome: "Desenvolvimento de aplicações WEB II", cargaHoraria: 80 },
        { nome: "Libras", cargaHoraria: 80 },
        { nome: "Data Science", cargaHoraria: 80 },
        { nome: "Internet das Coisas", cargaHoraria: 80 },
      ],
    },
  ],

  cursosComplementares: [
    {
      titulo: "Curso de Next.js",
      cargaHoraria: "20h",
      ano: 2025,
      modalidade: "Online",
      tags: ["Next.js"],
      topicos: [
        "App Router e estrutura do projeto",
        "Server Components x Client Components",
        "Rotas, layouts e loading/error boundaries",
        "Data fetching e renderização (SSR/SSG)",
        "SEO e metadata",
        "Deploy e boas práticas",
      ],
    },
    {
      titulo: "Curso de Node",
      cargaHoraria: "20h",
      ano: 2025,
      modalidade: "Online",
      tags: ["Node.js"],
      topicos: [
        "Fundamentos do Node.js e event loop",
        "APIs REST com Express",
        "Middlewares, validação e tratamento de erros",
        "Autenticação (JWT) e segurança básica",
        "Integração com banco de dados",
        "Boas práticas e estrutura de projeto",
      ],
    },
    {
      titulo: "Curso de TypeScript",
      cargaHoraria: "20h",
      ano: 2025,
      modalidade: "Online",
      tags: ["TypeScript"],
      topicos: [
        "Tipagem estática e inferência",
        "Interfaces, tipos, union e generics",
        "Narrowing, type guards e utility types",
        "Configuração (tsconfig) e organização",
        "Tipagem em APIs e React",
        "Boas práticas de tipagem",
      ],
    },
    {
      titulo: "Curso de React",
      cargaHoraria: "20h",
      ano: 2025,
      modalidade: "Online",
      tags: ["React"],
      topicos: [
        "Componentização e JSX",
        "Props, estado e ciclo de vida",
        "Hooks (useState, useEffect, useMemo)",
        "Listas, chaves e renderização condicional",
        "Formulários e validação",
        "Boas práticas e performance",
      ],
    },
    {
      titulo: "Python",
      cargaHoraria: "40h",
      ano: 2024,
      modalidade: "Online",
      tags: undefined,
      topicos: [
        "Sintaxe básica e tipos",
        "Operadores e estruturas condicionais",
        "Laços (for/while)",
        "Listas, tuplas e dicionários",
        "Funções e módulos",
        "Boas práticas e exercícios",
      ],
    },
    {
      titulo: "Pacote Office",
      cargaHoraria: "50h",
      ano: 2024,
      modalidade: "Presencial",
      tags: ["Word","Excel", "PowerPoint"],
      topicos: [
        "Excel: fórmulas, gráficos e tabelas dinâmicas",
        "Word: formatação e padronização de documentos",
        "PowerPoint: apresentações e storytelling",
        "Outlook: organização e produtividade",
      ],
    },
    {
      titulo: "Engenharia de Prompts",
      cargaHoraria: "3h",
      ano: 2024,
      modalidade: "Online",
      tags: ["IA", "Persona"],
      topicos: [
        "Estrutura de prompt (contexto, objetivo, restrições)",
        "Técnicas: few-shot e chain-of-thought (quando aplicável)",
        "Refinamento iterativo e avaliação",
        "Criação de prompts para tarefas de dev",
      ],
    },
    {
      titulo: "Desenvolvimento Ágil de Software",
      cargaHoraria: "32h",
      ano: 2024,
      modalidade: "Online",
      tags: ["Kanbam","Scrum", "Trello", "Sprints"],
      topicos: [
        "Valores e princípios do Manifesto Ágil",
        "Scrum: papéis, cerimônias e artefatos",
        "Kanban: fluxo, WIP e métricas",
        "User stories e critérios de aceitação",
        "Estimativas e planejamento",
      ],
    },
    {
      titulo: "Laboratório de POO",
      cargaHoraria: "20h",
      ano: 2024,
      modalidade: "Presencial",
      tags: ["POO","Java","Estruturas de Dados", "Herança", "Polimorfismo"],
      topicos: [
        "Classes, objetos e encapsulamento",
        "Herança, polimorfismo e abstração",
        "Interfaces e composição",
        "Boas práticas (SOLID - visão geral)",
        "Modelagem básica com UML",
      ],
    },
    {
      titulo: "Marketing Pessoal",
      cargaHoraria: "2h",
      ano: 2024,
      modalidade: "Online",
      tags: ["Soft skills"],
      topicos: [
        "Posicionamento e branding pessoal",
        "Comunicação e networking",
        "LinkedIn e portfólio",
        "Entrevistas e apresentação profissional",
      ],
    },
    {
      titulo: "Pré-Mestrado Internacional de Inteligência Artificial",
      tags: ["IA"],
      topicos: [
        "Conceitos fundamentais de IA e aprendizado de máquina",
        "Modelos supervisionados vs não supervisionados (visão geral)",
        "Ética e aplicações de IA",
      ],
    },
    {
      titulo: "C# com .NET Framework",
      cargaHoraria: "40h",
      ano: 2024,
      modalidade: "Online",
      tags: ["C#", ".NET"],
      topicos: [
        "Sintaxe C# e orientação a objetos",
        "LINQ e coleções",
        "Tratamento de exceções",
        "APIs/serviços e integração básica",
        "Boas práticas e organização de projetos",
      ],
    },
  ],

  experienciaProfissional: [
    {
      cargo: "Analista de TI - PRODEST",
      empresa: "Instituto de Tecnologia da Informação e Comunicação do Estado do Espírito Santo",
      periodo: "Out/2024 - Atual",
      inicio: "2024/10",
      fim: "2026/10",
      atividades: [
        "Atendimento técnico de primeiro e segundo nível, com registro, qualificação e resolução de demandas",
        "Desenvolvimento e manutenção de sistemas em C# (.NET / ASP.NET), incluindo correção de bugs e novas funcionalidades",
        "Criação e manutenção de APIs, garantindo integração entre sistemas",
        "Testes unitários para validação de funcionalidades e garantia da qualidade do código",
        "Comunicação e colaboração: Desenvolvi habilidades interpessoais ao interagir com equipes multidisciplinares, sendo responsável por alinhar informações entre diferentes áreas e garantir clareza nos processos. ",
        "Levantamento e análise de sistemas: Realizei um mapeamento completo dos sistemas integrados ao SIARHES (Sistema de RH do Estado do Espírito Santo), conduzindo entrevistas com responsáveis pelo desenvolvimento e manutenção para consolidar dados e elaborar um roadmap estratégico do SIARHES. ",
        "Liderei o levantamento, o estudo e a análise de sistemas integrados ao sistema SIARHES atual, para serem transportados para o novo sistema de RH do governo – O Novo SIARHES. O projeto já foi levado pra Santa Catarina para ser estudado e implementado, assim como em Vitória, no Espírito Santo.",
        "Qualidade de software com SonarQube: Assumi a responsabilidade pelo Portal do Servidor, Sistema de Seleção e Sistema CHE, implementando melhorias que elevaram as métricas de qualidade para nota A em todas as categorias avaliadas pelo SonarQube.",
        "Gestão de versionamento e ciclo de vida de aplicações via Azure DevOps e Git, com utilização de repositórios, pipelines e boas práticas de integração contínua.",
        "Administração de banco de dados com SQL Developer (criação de tabelas, views, consultas avançadas)",
        "Modelagem de processos com UML (diagramas de atividades e fluxogramas)",
        "Participação em projetos estratégicos do Governo do Estado",
      ],
    },
  ],

  projetosProprios: [
    {
      titulo: "Wedding-New – Aplicação Web Que Desenvolvi Pro Meu Casamento",
      stack: "Next.js 15, TypeScript, Prisma, PostgreSQL, Mercado Pago API, Tailwind CSS, Jest/Playwright",
      inicio: "2025-08",
      fim: "2025-12",
      descricao: [
        "Desenvolvimento de plataforma Full Stack com Next.js 15, utilizando Server Components e Client Components para alta performance",
        "Integração completa com API do Mercado Pago para processamento de pagamentos e gestão de webhooks",
        "Sistema de RSVP e gestão de convidados com validações em tempo real e persistência via Prisma",
        "Lista de presentes interativa com reserva de itens e contribuição em cotas de 'Lua de Mel' com progresso dinâmico",
        "Galeria colaborativa com upload de fotos, curtidas e comentários integrados a rotas de API",
        "Garantia de qualidade através de Testes Unitários (Jest) e Testes de Ponta a Ponta (Playwright)",
        "Validação rigorosa de dados com Zod em toda a aplicação (Client/Server)",
      ],
    },
    {
      titulo: "SaaS – Sistema de Agendamento para Barbearias",
      stack: "Next.js, React, TypeScript, Prisma, PostgreSQL, Docker, NextAuth",
      inicio: "2025-08",
      fim: undefined,
      descricao: [
        "Levantamento de requisitos com entrevistas e definição de funcionalidades",
        "Modelagem do banco de dados e criação de queries complexas",
        "Desenvolvimento de APIs REST com Prisma e PostgreSQL",
        "Implementação de autenticação e autorização completa com NextAuth",
        "Interface responsiva focada em usabilidade",
        "Configuração de containers com Docker e deploy em produção",
      ],
    },
    {
      titulo: "API em Java/Spring Boot",
      stack: "Java, Spring Boot, PostgreSQL, Docker",
      inicio: "2024-06",
      fim: "2024-06",
      descricao: [
        "Definição de arquitetura e padrão de camadas com segurança",
        "Modelagem de dados e consultas otimizadas",
        "Desenvolvimento de endpoints REST com autenticação e regras de negócio",
        "Testes unitários e documentação",
        "Conteinerização com Docker para produção",
      ],
    },
    {
      titulo: "Desafios Técnicos – Itaú e PicPay",
      stack: "Java, Spring Boot",
      inicio: "2024-02",
      fim: "2024-02",
      descricao: [
        "Resolução de problemas algorítmicos para entrevistas técnicas",
        "Implementação de soluções performáticas com foco em eficiência",
        "Criação de APIs e microsserviços simulando cenários de produção",
      ],
    },
  ],

  habilidadesTecnicas: {
    linguagens: [
      "JavaScript/TypeScript",
      "C# (.NET)",
      "Java",
      "Python",
      "SQL",
    ],
    frameworks: [
      "Next.js & React",
      "Spring Boot",
      "ASP.NET",
      "Node.js",
      "Prisma",
    ],
    ferramentas: [
      "Git & Azure DevOps",
      "Docker",
      "PostgreSQL",
      "SonarQube",
      "UML",
      "Postman",
      "SQL Server",
      "MongoDB",
      "Swagger",
      "GitHub",
    ],
  },

  informacoesAdicionais: {
    idiomas:
      "Leitura fluente em inglês e espanhol, com boa compreensão auditiva",
    softSkills:
      "Comunicativo, analítico, rápida capacidade de aprendizado, perfil voltado à resolução de problemas, persistência e potencial de liderança",
    interesses: "Desenvolvimento de software e ciência de dados",
    diferenciais:
      "Facilidade no relacionamento com clientes, elaboração de documentações e apresentações técnicas",
  },
};
