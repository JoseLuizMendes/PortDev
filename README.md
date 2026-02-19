# Portfólio de Projetos - José Luiz Mendes

Este repositório contém uma coleção de projetos desenvolvidos utilizando tecnologias modernas de desenvolvimento web, com foco em TypeScript, React e Next.js.

## 📚 Projetos

### 1. PortDev - Portfólio Pessoal
[![Deploy](https://portdev-bice.vercel.app)](https://portdev-bice.vercel.app)

**Repositório:** [JoseLuizMendes/PortDev](https://github.com/JoseLuizMendes/PortDev)

Um portfólio pessoal moderno e interativo desenvolvido com Next.js 15 e React 19, apresentando animações 3D e uma experiência visual única.

#### 🛠️ Tecnologias Principais
- **Framework:** Next.js 15.5.3 com Turbopack
- **UI Library:** React 19.1.0
- **Estilização:** Tailwind CSS 4.0
- **Animações:** GSAP + @gsap/react (migrado de Framer Motion)
- **Smooth Scrolling:** Lenis
- **3D Graphics:** Three.js com React Three Fiber
- **Componentes UI:** Radix UI
- **Ícones:** Lucide React, React Icons
- **Gráficos:** Recharts
- **Tema:** Next Themes (modo claro/escuro)

#### ✨ Características
- Interface responsiva e moderna
- **Experiência web imersiva** com animações cinematográficas
- **Smooth scrolling** integrado com GSAP ScrollTrigger
- **Performance otimizada** (target 120fps)
- Elementos 3D interativos
- **Preloader splash screen** com animações GSAP
- Sistema de temas (claro/escuro)
- **Transições entre páginas** com efeito curtain
- **Acessibilidade** com suporte a prefers-reduced-motion
- Otimizado com Vercel Speed Insights
- Carrossel de projetos com Embla Carousel

#### 📖 Documentação
Para detalhes sobre o sistema de animações imersivas, consulte:
- [Documentação de Refatoração Imersiva](docs/immersive-refactor.md)

#### 📄 Licença
MIT License

---

## 🔐 Painel Admin (MVP)

O painel admin fica em `/admin` e é protegido por **Basic Auth** via middleware.

### Variáveis de ambiente
- Copie `.env.example` → `.env` e preencha:
	- `DATABASE_URL` (Neon Postgres)
	- `ADMIN_USER`
	- `ADMIN_PASSWORD`

Na Vercel, configure as mesmas env vars no Project Settings.

### Preparar o banco (primeira vez)
1) Gerar/aplicar migration:
- `pnpm prisma:migrate`

2) Popular com os dados atuais do currículo:
- `pnpm db:seed`

### URLs
- Admin timeline (pins + lista): `/admin/timeline`
- Criar item: `/admin/items/new`
