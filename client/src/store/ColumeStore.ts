import { create } from "zustand";

export interface Task {
  title: string;
  id: string;
  description?: string;
  assignedUser: string;
  label: "HIGH" | "MEDIUM" | "LOW";
}

export interface Columns {
  [key: string]: Task[];
}

interface BoardStore {
  columns: Columns | null;
  updateColumns: (updatedColumns: Columns) => void;
}

export const useBoardStore = create<BoardStore>((set) => ({
  columns: null,

  updateColumns: (updatedColumns: Columns) => {
    return set({ columns: updatedColumns });
  },
}));
