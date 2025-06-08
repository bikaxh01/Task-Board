import { create } from "zustand";
import type { Columns } from "../types";

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
