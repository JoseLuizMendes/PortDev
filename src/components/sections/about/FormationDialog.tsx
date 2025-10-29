import { FormationData } from "./types";

interface FormationDialogProps {
  data: FormationData;
}

export function FormationDialog({ data }: FormationDialogProps) {
  const renderLabel = (text: string) => (
    <span className="font-semibold text-primary">
      {text}:
    </span>
  );

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-3">
        <p className="text-sm">
          {renderLabel("Modalidade")} <span className="text-foreground">{data.mode}</span>
        </p>
        <p className="text-sm">
          {renderLabel("Curso")} <span className="text-foreground">{data.course}</span>
        </p>
        <p className="text-sm">
          {renderLabel("Instituição")} <span className="text-foreground">{data.institution}</span>
        </p>
      </div>
      <div className="space-y-3">
        <p className="text-sm">
          {renderLabel("Período")} <span className="text-foreground">{data.start} - {data.end}</span>
        </p>
        <p className="text-sm">
          {renderLabel("Período Atual")} <span className="text-foreground">{data.currentPeriod}</span>
        </p>
        <p className="text-sm">
          {renderLabel("Status")}{" "}
          <span className="text-chart-2 font-medium">{data.status}</span>
        </p>
      </div>
    </div>
  );
}
