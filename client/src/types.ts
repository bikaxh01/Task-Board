export interface TaskProp extends Task {
  col?: string;
}

export interface Task {
  title: string;
  id: string;
  description?: string;
  assignedUser: string;
  label: "HIGH" | "MEDIUM" | "LOW";
  
}

export interface TaskDetailProp extends Task {
  setActiveDetail:React.Dispatch<React.SetStateAction<boolean>> 
  col:string

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


