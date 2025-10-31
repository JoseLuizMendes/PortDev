import { SimpleData } from "./types";

interface FocusDialogProps {
  data: SimpleData;
}

export function FocusDialog({ data }: FocusDialogProps) {
  return (
    <div className="space-y-3 text-slate-300">
      <p className="text-sm leading-relaxed">{data.description}</p>
      {/* Opcional: destacar pontos principais em lista */}
      <ul className="mt-2 text-sm list-disc list-inside text-slate-400">
        <li>Performance e otimização</li>
        <li>Código limpo e testável</li>
        <li>Foco em experiência do usuário</li>
      </ul>
    </div>
  );
}