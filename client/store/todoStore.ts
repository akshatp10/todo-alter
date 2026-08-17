import { sampleList } from "@/components/sampleData";
import { TodoList } from "@/types/todo";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type TodoStates = {
	lists: TodoList[];
	activeListId: number | null;
};

type TodoActions = {
	addList: (name: string) => void;
	addTask: (item_name: string, tags?: string[]) => void;
	toggleTask: (taskId: number) => void;
	setActiveList: (listId: number) => void;
};

type TodoStore = TodoStates & TodoActions;

const initialState: TodoStates = {
	lists: sampleList,
	activeListId: sampleList[0]?.id ?? null,
};

const useTodoStore = create<TodoStore>()(
	persist(
		(set) => ({
			...initialState,
			addList: (name) =>
				set((state) => {
					const newId =
						Math.max(0, ...state.lists.map((list) => list.id)) + 1;

					const newList: TodoList = {
						id: newId,
						listName: name,
						items: [],
					};

					return {
						lists: [...state.lists, newList],
						activeListId: newId,
					};
				}),

			addTask: (item_name, tags) => {},

			toggleTask: (taskId) =>
				set((state) => ({
					lists: state.lists.map((list) => {
						if (list.id !== state.activeListId) {
							return list;
						}

						return {
							...list,
							items: list.items.map((item) =>
								item.id === taskId
									? {
											...item,
											status:
												item.status === "completed"
													? "pending"
													: "completed",
										}
									: item,
							),
						};
					}),
				})),

			setActiveList: (listId) => set(() => ({ activeListId: listId })),
		}),
		{
			name: "todo-storage",
		},
	),
);
