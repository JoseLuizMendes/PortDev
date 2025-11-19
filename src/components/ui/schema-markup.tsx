export function SchemaMarkup() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Seu Nome Completo", // ALTERE
    jobTitle: "Desenvolvedor Full Stack",
    description: "Desenvolvedor Full Stack especializado em Java, Spring, React, Next.js e TypeScript",
    url: "https://seudominio.com.br", // ALTERE
    image: "https://seudominio.com.br/profile-photo.jpg", // ALTERE - Foto profissional
    email: "seuemail@exemplo.com", // ALTERE
    telephone: "+55-XX-XXXXX-XXXX", // ALTERE (opcional)
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sua Cidade", // ALTERE
      addressRegion: "SP", // ALTERE
      addressCountry: "BR",
    },
    sameAs: [
      "https://linkedin.com/in/seuperfil", // ALTERE
      "https://github.com/seuperfil", // ALTERE
      "https://twitter.com/seuperfil", // ALTERE (opcional)
    ],
    knowsAbout: [
      "Java",
      "Spring Boot",
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "MongoDB",
      "Web Development",
      "Full Stack Development",
    ],
    alumniOf: {
      "@type": "Organization",
      name: "Nome da sua Universidade", // ALTERE
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Portfólio Profissional - Desenvolvedor Full Stack",
    url: "https://seudominio.com.br", // ALTERE
    description: "Portfólio profissional mostrando projetos e habilidades em desenvolvimento web",
    author: {
      "@type": "Person",
      name: "Seu Nome Completo", // ALTERE
    },
    inLanguage: "pt-BR",
  };

  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Serviços de Desenvolvimento Full Stack",
    description: "Desenvolvimento de aplicações web e mobile com tecnologias modernas",
    provider: {
      "@type": "Person",
      name: "Seu Nome Completo", // ALTERE
    },
    areaServed: "BR",
    serviceType: "Software Development",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      price: "0",
      priceCurrency: "BRL",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://seudominio.com.br", // ALTERE
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Sobre",
        item: "https://seudominio.com.br#about", // ALTERE
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Projetos",
        item: "https://seudominio.com.br#projects", // ALTERE
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Habilidades",
        item: "https://seudominio.com.br#skills", // ALTERE
      },
    ],
  };

  return (
    <>
      <script
        suppressHydrationWarning
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        suppressHydrationWarning
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        suppressHydrationWarning
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(professionalServiceSchema),
        }}
      />
      <script
        suppressHydrationWarning
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
