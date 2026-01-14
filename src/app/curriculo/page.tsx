"use client";

import { Button } from "@/components/ui/button";
import { Download, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { curriculoData } from "./data";

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
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 leading-tight">{curriculoData.informacoesPessoais.nome}</h1>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600 mb-2">
              <span>{curriculoData.informacoesPessoais.localizacao}</span>
              <span>{curriculoData.informacoesPessoais.idade}</span>
              <span>{curriculoData.informacoesPessoais.estadoCivil}</span>
            </div>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-700">
              <span>{curriculoData.informacoesPessoais.telefone}</span>
              <span className="break-all sm:break-normal">{curriculoData.informacoesPessoais.email}</span>
            </div>
          </header>

          {/* Objetivo Profissional */}
          <section className="mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 border-b border-gray-300 pb-2">
              OBJETIVO PROFISSIONAL
            </h3>
            <p className="text-gray-700 leading-relaxed text-xs sm:text-sm">
              {curriculoData.objetivoProfissional}
            </p>
          </section>

          {/* Formação Acadêmica */}
          <section className="mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 border-b border-gray-300 pb-2">
              FORMAÇÃO ACADÊMICA
            </h3>
            {curriculoData.formacaoAcademica.map((formacao, index) => (
              <div key={index} className="mb-3">
                <h4 className="text-base sm:text-lg font-semibold text-gray-900">{formacao.curso}</h4>
                <p className="text-gray-600 text-xs sm:text-sm">{formacao.instituicao}</p>
              </div>
            ))}
          </section>

          {/* Cursos Complementares */}
          <section className="mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 border-b border-gray-300 pb-2">
              CURSOS COMPLEMENTARES
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs sm:text-sm text-gray-700">
              {curriculoData.cursosComplementares.map((curso, index) => (
                <div key={index} className="leading-snug">
                  <div className="font-medium text-gray-900">• {curso.titulo}</div>
                  <div className="text-gray-600">
                    {[curso.cargaHoraria, curso.ano ? String(curso.ano) : undefined, curso.instituicao, curso.plataforma]
                      .filter(Boolean)
                      .join(" · ")}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Experiência Profissional */}
          <section className="mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 border-b border-gray-300 pb-2">
              EXPERIÊNCIA PROFISSIONAL
            </h3>
            {curriculoData.experienciaProfissional.map((experiencia, index) => (
              <div key={index} className="mb-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-1 sm:gap-0">
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-gray-900">{experiencia.cargo}</h4>
                    <p className="text-gray-600 text-xs sm:text-sm">{experiencia.empresa}</p>
                  </div>
                  <span className="text-gray-500 text-xs sm:text-sm">{experiencia.periodo}</span>
                </div>
                <ul className="list-disc list-inside text-gray-700 text-xs sm:text-sm space-y-1 ml-2">
                  {experiencia.atividades.map((atividade, idx) => (
                    <li key={idx}>{atividade}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* Projetos Próprios */}
          <section className="mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 border-b border-gray-300 pb-2">
              PROJETOS PRÓPRIOS
            </h3>
            
            {curriculoData.projetosProprios.map((projeto, index) => (
              <div key={index} className={index < curriculoData.projetosProprios.length - 1 ? "mb-4" : "mb-3"}>
                <h4 className="text-base sm:text-lg font-semibold text-gray-900">{projeto.titulo}</h4>
                <p className="text-gray-600 text-xs sm:text-sm mb-2">
                  <strong>Stack:</strong> {projeto.stack}
                </p>
                <ul className="list-disc list-inside text-gray-700 text-xs sm:text-sm space-y-1 ml-2">
                  {projeto.descricao.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
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
                  {curriculoData.habilidadesTecnicas.linguagens.map((linguagem, index) => (
                    <li key={index}>{linguagem}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 text-xs sm:text-sm">Frameworks</h4>
                <ul className="list-disc list-inside text-gray-700 text-xs sm:text-sm space-y-1">
                  {curriculoData.habilidadesTecnicas.frameworks.map((framework, index) => (
                    <li key={index}>{framework}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 text-xs sm:text-sm">Ferramentas</h4>
                <ul className="list-disc list-inside text-gray-700 text-xs sm:text-sm space-y-1">
                  {curriculoData.habilidadesTecnicas.ferramentas.map((ferramenta, index) => (
                    <li key={index}>{ferramenta}</li>
                  ))}
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
              <p><strong>Idiomas:</strong> {curriculoData.informacoesAdicionais.idiomas}</p>
              <p><strong>Soft Skills:</strong> {curriculoData.informacoesAdicionais.softSkills}</p>
              <p><strong>Interesses:</strong> {curriculoData.informacoesAdicionais.interesses}</p>
              <p><strong>Diferenciais:</strong> {curriculoData.informacoesAdicionais.diferenciais}</p>
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
