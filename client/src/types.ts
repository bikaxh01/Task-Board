export interface TaskProp {
  id: string;
  title: string;
  assignedUser: string;
  label: "HIGH" | "MEDIUM" | "LOW";
  col?: string;
}