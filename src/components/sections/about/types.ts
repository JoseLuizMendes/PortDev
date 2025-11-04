export interface FormationData {
  mode: string;
  course: string;
  start: string;
  end: string;
  institution: string;
  currentPeriod: string;
  status: string;
}

export interface StackData {
  frontend: {
    language: string;
    framework: string;
    styling: string;
  };
  backend: {
    language: string;
    framework: string;
    database: string;
    api: string;
  };
  description: string;
}

export interface SimpleData {
  description: string;
}

export interface Achievement {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

export interface DialogAchievements {
  Formação: FormationData;
  Stack: StackData;
  Foco: SimpleData;
  Colaboração: SimpleData;
}
