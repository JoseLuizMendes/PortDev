import { FormationDialog } from "./FormationDialog";
import { SimpleDialog } from "./SimpleDialog";
import { StackDialog } from "./StackDialog";
import { DialogAchievements } from "./types";

interface DialogContentProps {
  title: string;
  dialogData: DialogAchievements;
}

export function DialogContent({ title, dialogData }: DialogContentProps) {
  switch (title) {
    case "Formação":
      return <FormationDialog data={dialogData.Formação} />;

    case "Stack":
      return <StackDialog data={dialogData.Stack} />;

    case "Foco":
      return <SimpleDialog data={dialogData.Foco} />;

    case "Colaboração":
      return <SimpleDialog data={dialogData.Colaboração} />;

    default:
      return <p className="text-muted-foreground text-sm">Informações não disponíveis.</p>;
  }
}
