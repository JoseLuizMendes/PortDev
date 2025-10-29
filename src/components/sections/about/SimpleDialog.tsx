import { SimpleData } from "./types";

interface SimpleDialogProps {
  data: SimpleData;
}

export function SimpleDialog({ data }: SimpleDialogProps) {
  return <p className="text-muted-foreground text-sm leading-relaxed">{data.description}</p>;
}
