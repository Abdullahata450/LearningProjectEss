import { create } from "zustand";


interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

interface AuthState {
    user: User | null;
    isloggedIn: boolean;
    setUser: (user: User) => void;
    logout: () => void;
}


export const useAuth = create<AuthState>((set)=>({
    user: null,
    isloggedIn: false,
    setUser: (user: User) => set({ user, isloggedIn: true }),
    logout: () => set({ user: null, isloggedIn: false }),
}))
