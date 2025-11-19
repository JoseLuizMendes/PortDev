"use client";

import { Button } from "@/components/ui/button";
import { Download, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CurriculoPage() {
  const router = useRouter();

  const handlePrint = () => {
    window.print();
  };

  const handleBack = () => {
    // Se foi aberto em nova aba/janela, fecha a janela
    if (window.opener) {
      window.close();
    } else {
      // Se não, navega de volta
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 print:bg-white">
      {/* Header fixo com botões */}
      <header className="print:hidden fixed top-0 left-0 right-0 z-50 bg-slate-900 border-b border-slate-700/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-end items-center gap-3">
          <Button
            onClick={handleBack}
            variant="outline"
            size="sm"
            className="bg-slate-800 border-slate-600 text-white hover:bg-slate-700 hover:border-slate-500"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
          <Button
            onClick={handlePrint}
            size="sm"
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg shadow-blue-500/25"
          >
            <Download className="mr-2 h-4 w-4" />
            Salvar PDF
          </Button>
        </div>
      </header>

      {/* Conteúdo do currículo - formato A4 */}
      <div className="max-w-[210mm] mx-auto bg-white shadow-2xl shadow-black/50 print:shadow-none pt-16 print:pt-0">
        <div className="p-4 sm:p-6 md:p-8 lg:p-12 print:p-8">
          {/* Cabeçalho */}
          <header className="text-center mb-6 sm:mb-8 pb-4 sm:pb-6 border-b-2 border-gray-300">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 leading-tight">JOSÉ LUIZ DOS SANTOS AZEREDO MENDES</h1>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600 mb-2">
              <span>📍 Ilha das Caieiras, Vitória/ES</span>
              <span>21 anos</span>
              <span>Solteiro</span>
            </div>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-700">
              <span>📞 (27) 99630-0333</span>
              <span className="break-all sm:break-normal">josemendess004@gmail.com</span>
            </div>
          </header>

          {/* Objetivo Profissional */}
          <section className="mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 border-b border-gray-300 pb-2">
              OBJETIVO PROFISSIONAL
            </h3>
            <p className="text-gray-700 leading-relaxed text-xs sm:text-sm">
              Desenvolvedor Full Stack em formação, com vivência prática em manutenção e desenvolvimento de sistemas, APIs, testes e bancos de dados, 
              buscando oportunidades com Next.js, React, Java, Spring e PostgreSQL. Experiência em práticas de versionamento (Git/Azure DevOps), 
              qualidade de software e modelagem de processos, aliada a forte proatividade e resolução de problemas. Meu objetivo é trabalhar com 
              equipes que valorizem colaboração e aprendizado contínuo, aplicando essas tecnologias para criar soluções web escaláveis e de alto impacto.
            </p>
          </section>

          {/* Formação Acadêmica */}
          <section className="mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 border-b border-gray-300 pb-2">
              FORMAÇÃO ACADÊMICA
            </h3>
            <div className="mb-3">
              <h4 className="text-base sm:text-lg font-semibold text-gray-900">Ciência da Computação</h4>
              <p className="text-gray-600 text-xs sm:text-sm">FAESA - Cursando 4º período (noturno)</p>
            </div>
          </section>

          {/* Cursos Complementares */}
          <section className="mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 border-b border-gray-300 pb-2">
              CURSOS COMPLEMENTARES
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs sm:text-sm text-gray-700">
              <div>• Curso de Next.js - 20h (2025)</div>
              <div>• Curso de Node - 20h (2025)</div>
              <div>• Curso de TypeScript - 20h (2025)</div>
              <div>• Curso de React - 20h (2025)</div>
              <div>• Python 3 – Mundo 1 - 40h (2024)</div>
              <div>• Pacote Office - 50h (2024)</div>
              <div>• Eng. de Prompts - 3h (2024)</div>
              <div>• Des. Ágil de Software - 32h (2024)</div>
              <div>• Lab. POO - 20h (2024)</div>
              <div>• Marketing Pessoal - 2h (2024)</div>
            </div>
          </section>

          {/* Experiência Profissional */}
          <section className="mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 border-b border-gray-300 pb-2">
              EXPERIÊNCIA PROFISSIONAL
            </h3>
            <div className="mb-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-1 sm:gap-0">
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-gray-900">Estagiário - PRODEST</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">Processamento de Dados do Espírito Santo</p>
                </div>
                <span className="text-gray-500 text-xs sm:text-sm">Out/2024 - Atual</span>
              </div>
              <ul className="list-disc list-inside text-gray-700 text-xs sm:text-sm space-y-1 ml-2">
                <li>Atendimento técnico de primeiro e segundo nível, com registro, qualificação e resolução de demandas</li>
                <li>Desenvolvimento e manutenção de sistemas em C# (.NET / ASP.NET), incluindo correção de bugs e novas funcionalidades</li>
                <li>Criação e manutenção de APIs, garantindo integração entre sistemas</li>
                <li>Testes unitários para validação de funcionalidades e garantia da qualidade do código</li>
                <li>Controle de qualidade de software com SonarQube</li>
                <li>Gestão de versionamento via Azure DevOps e Git, com boas práticas de integração contínua</li>
                <li>Administração de banco de dados com SQL Developer (criação de tabelas, views, consultas avançadas)</li>
                <li>Modelagem de processos com UML (diagramas de atividades e fluxogramas)</li>
                <li>Participação em projetos estratégicos do Governo do Estado</li>
              </ul>
            </div>
          </section>

          {/* Projetos Próprios */}
          <section className="mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 border-b border-gray-300 pb-2">
              PROJETOS PRÓPRIOS
            </h3>
            
            <div className="mb-4">
              <h4 className="text-base sm:text-lg font-semibold text-gray-900">SaaS – Sistema de Agendamento para Barbearias</h4>
              <p className="text-gray-600 text-xs sm:text-sm mb-2">
                <strong>Stack:</strong> Next.js, React, TypeScript, Prisma, PostgreSQL, Docker, NextAuth
              </p>
              <ul className="list-disc list-inside text-gray-700 text-xs sm:text-sm space-y-1 ml-2">
                <li>Levantamento de requisitos com entrevistas e definição de funcionalidades</li>
                <li>Modelagem do banco de dados e criação de queries complexas</li>
                <li>Desenvolvimento de APIs REST com Prisma e PostgreSQL</li>
                <li>Implementação de autenticação e autorização completa com NextAuth</li>
                <li>Interface responsiva focada em usabilidade</li>
                <li>Configuração de containers com Docker e deploy em produção</li>
              </ul>
            </div>

            <div className="mb-4">
              <h4 className="text-base sm:text-lg font-semibold text-gray-900">API em Java/Spring Boot</h4>
              <p className="text-gray-600 text-xs sm:text-sm mb-2">
                <strong>Stack:</strong> Java, Spring Boot, PostgreSQL, Docker
              </p>
              <ul className="list-disc list-inside text-gray-700 text-xs sm:text-sm space-y-1 ml-2">
                <li>Definição de arquitetura e padrão de camadas com segurança</li>
                <li>Modelagem de dados e consultas otimizadas</li>
                <li>Desenvolvimento de endpoints REST com autenticação e regras de negócio</li>
                <li>Testes unitários e documentação</li>
                <li>Conteinerização com Docker para produção</li>
              </ul>
            </div>

            <div className="mb-3">
              <h4 className="text-base sm:text-lg font-semibold text-gray-900">Desafios Técnicos – Itaú e PicPay</h4>
              <p className="text-gray-600 text-xs sm:text-sm mb-2">
                <strong>Stack:</strong> Java, Spring Boot
              </p>
              <ul className="list-disc list-inside text-gray-700 text-xs sm:text-sm space-y-1 ml-2">
                <li>Resolução de problemas algorítmicos para entrevistas técnicas</li>
                <li>Implementação de soluções performáticas com foco em eficiência</li>
                <li>Criação de APIs e microsserviços simulando cenários de produção</li>
              </ul>
            </div>
          </section>

          {/* Habilidades Técnicas */}
          <section className="mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 border-b border-gray-300 pb-2">
              HABILIDADES TÉCNICAS
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 text-xs sm:text-sm">Linguagens</h4>
                <ul className="list-disc list-inside text-gray-700 text-xs sm:text-sm space-y-1">
                  <li>JavaScript/TypeScript</li>
                  <li>C# (.NET)</li>
                  <li>Java</li>
                  <li>Python</li>
                  <li>SQL</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 text-xs sm:text-sm">Frameworks</h4>
                <ul className="list-disc list-inside text-gray-700 text-xs sm:text-sm space-y-1">
                  <li>Next.js & React</li>
                  <li>Spring Boot</li>
                  <li>ASP.NET</li>
                  <li>Node.js</li>
                  <li>Prisma</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 text-xs sm:text-sm">Ferramentas</h4>
                <ul className="list-disc list-inside text-gray-700 text-xs sm:text-sm space-y-1">
                  <li>Git & Azure DevOps</li>
                  <li>Docker</li>
                  <li>PostgreSQL</li>
                  <li>SonarQube</li>
                  <li>UML</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Informações Adicionais */}
          <section className="mb-4">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 border-b border-gray-300 pb-2">
              INFORMAÇÕES ADICIONAIS
            </h3>
            <div className="text-gray-700 text-xs sm:text-sm space-y-2">
              <p><strong>Idiomas:</strong> Leitura fluente em inglês e espanhol, com boa compreensão auditiva</p>
              <p><strong>Soft Skills:</strong> Comunicativo, analítico, rápida capacidade de aprendizado, perfil voltado à resolução de problemas, persistência e potencial de liderança</p>
              <p><strong>Interesses:</strong> Desenvolvimento de software e ciência de dados</p>
              <p><strong>Diferenciais:</strong> Facilidade no relacionamento com clientes, elaboração de documentações e apresentações técnicas</p>
            </div>
          </section>
        </div>
      </div>

      {/* Estilos para impressão */}
      <style jsx global>{`
        @media print {
          body {
            background: white;
          }
          @page {
            size: A4;
            margin: 0;
          }
        }
      `}</style>
    </div>
  );
}
