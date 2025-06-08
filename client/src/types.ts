export interface TaskProp extends Task {
  col?: string;
  createdBy?:string
}

export interface Task {
  title: string;
  id: string;
  description?: string;
  dueDate?: string;
  assignedTo: string;
  label: "HIGH" | "MEDIUM" | "LOW";
}

export interface User {
  email: string;
  id: string;
  fullName: string;
  createdAt:string
}
export interface TaskDetailProp extends Task {
  setActiveDetail: React.Dispatch<React.SetStateAction<boolean>>;
  col: string;
}

export interface Columns {
  [key: string]: Task[];
}

export interface AddTaskProp {
  colName: string;
}
export interface ColumnProp {
  title: string;
  tasks: TaskProp[];
}
