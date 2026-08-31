import { create } from "zustand";
import { persist } from "zustand/middleware";

type TodoStates = {
	activeListId: number | null;
};

type TodoActions = {
	setActiveList: (listId: number | null) => void;
};

type TodoStore = TodoStates & TodoActions;

const initialState: TodoStates = {
	activeListId: null,
};

const useTodoStore = create<TodoStore>()(
	persist(
		(set) => ({
			...initialState,

			setActiveList: (listId) => set(() => ({ activeListId: listId })),
		}),
		{
			name: "todo-storage",
		},
	),
);

export default useTodoStore;
