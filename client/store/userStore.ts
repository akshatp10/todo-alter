import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserState = {
	name: string | null;
};

type UserActions = {
	login: (user: string) => void;
	logout: () => void;
};

type UserStore = UserState & UserActions;

const initialState: UserState = {
	name: null,
};

const useUserStore = create<UserStore>()(
	persist(
		(set) => ({
			...initialState,
			login: (user) => set(() => ({ name: user })),
			logout: () => set(() => ({ name: null })),
		}),
		{
			name: "user-storage",
		},
	),
);

export default useUserStore;
