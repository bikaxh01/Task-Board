import { create } from "zustand";
import type { Columns, User } from "../types";

interface UserStore {
  user: User | null;
  updateUser: (user: User) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,

  updateUser: (user: User) => {
    return set({ user: user });
  },
}));
