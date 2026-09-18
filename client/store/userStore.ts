import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserState = {
	userId: number | null;
};

type UserActions = {
	login: (userId: number) => void;
	logout: () => void;
};

type UserStore = UserState & UserActions;

const initialState: UserState = {
	userId: null,
};

const useUserStore = create<UserStore>()(
	persist(
		(set) => ({
			...initialState,
			login: (userId) => set(() => ({ userId: userId })),
			logout: () => set(() => ({ userId: null })),
		}),
		{
			name: "user-storage",
		},
	),
);

export default useUserStore;
