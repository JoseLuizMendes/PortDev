import { StackData } from "./types";

interface StackDialogProps {
  data: StackData;
}

export function StackDialog({ data }: StackDialogProps) {
  const renderLabel = (text: string) => (
    <span className="font-semibold text-primary">
      {text}:
    </span>
  );

  return (
    <div className="space-y-4">
      {/* Dois dialogs lado a lado */}
      <div className="grid grid-cols-2 gap-4">
        {/* Dialog Frontend */}
        <div className="border border-border rounded-lg p-4 bg-card">
          <h4 className="text-lg font-semibold text-primary mb-3 text-center border-b border-border pb-2">
            Frontend
          </h4>
          <div className="space-y-2">
            <p className="text-sm">
              {renderLabel("Linguagens")} <span className="text-foreground">{data.frontend.language}</span>
            </p>
            <p className="text-sm">
              {renderLabel("Frameworks")} <span className="text-foreground">{data.frontend.framework}</span>
            </p>
            <p className="text-sm">
              {renderLabel("Estilização")} <span className="text-foreground">{data.frontend.styling}</span>
            </p>
            <p className="text-sm">
              {renderLabel("Deploy")} <span className="text-foreground">{data.frontend.tools}</span>
            </p>
          </div>
        </div>

        {/* Dialog Backend */}
        <div className="border border-border rounded-lg p-4 bg-card">
          <h4 className="text-lg font-semibold text-primary mb-3 text-center border-b border-border pb-2">
            Backend
          </h4>
          <div className="space-y-2">
            <p className="text-sm">
              {renderLabel("Linguagens")} <span className="text-foreground">{data.backend.language}</span>
            </p>
            <p className="text-sm">
              {renderLabel("Frameworks")} <span className="text-foreground">{data.backend.framework}</span>
            </p>
            <p className="text-sm">
              {renderLabel("APIs")} <span className="text-foreground">{data.backend.api}</span>
            </p>
            <p className="text-sm">
              {renderLabel("Banco de Dados")} <span className="text-foreground">{data.backend.database}</span>
            </p>
            <p className="text-sm">
              {renderLabel("Ferramentas")} <span className="text-foreground">{data.backend.tools}</span>
            </p>
            <p className="text-sm">
              {renderLabel("Infraestrutura")} <span className="text-foreground">{data.backend.infra}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Área de descrição embaixo */}
      <div className="border border-border rounded-lg p-3 bg-muted/30 min-h-16 flex items-center">
        <p className="text-muted-foreground text-sm leading-relaxed">
          {data.description}
        </p>
      </div>
    </div>
  );
}
