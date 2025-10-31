import { SimpleData } from "./types";

interface ColabDialogProps {
  data: SimpleData;
}

export function ColabDialog({ data }: ColabDialogProps) {
  return (
    <div className="space-y-3 text-slate-300">
      <p className="text-sm leading-relaxed">{data.description}</p>
      <ul className="mt-2 text-sm list-disc list-inside text-slate-400">
        <li>Comunicação clara e documentada</li>
        <li>Revisões de código construtivas</li>
        <li>Trabalho com metodologias ágeis</li>
      </ul>
    </div>
  );
}