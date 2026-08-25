import { sampleList } from "@/components/sampleData";
import { Task, TodoList } from "@/types/todo";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type TodoStates = {
	// lists: TodoList[];
	lists: Record<number, TodoList>;
	activeListId: number | null;
	nextListId: number;
};

type TodoActions = {
	addList: (name: string) => void;
	addTask: (item_name: string, tags?: string[]) => void;
	toggleTask: (taskId: number) => void;
	setActiveList: (listId: number) => void;
};

type TodoStore = TodoStates & TodoActions;

const initialList: Record<number, TodoList> = Object.fromEntries(
	sampleList.map((list) => [
		list.id,
		{
			...list,
			nextTaskId: Math.max(0, ...list.items.map((item) => item.id)) + 1,
		},
	]),
);

const initialState: TodoStates = {
	lists: initialList,
	activeListId: sampleList[0]?.id ?? null,
	nextListId: Math.max(0, ...sampleList.map((list) => list.id)) + 1,
};

const useTodoStore = create<TodoStore>()(
	persist(
		(set) => ({
			...initialState,
			addList: (name) =>
				set((state) => {
					const newList: TodoList = {
						id: state.nextListId,
						listName: name,
						items: [],
						nextTaskId: 1,
					};

					return {
						lists: { ...state.lists, [newList.id]: newList },
						activeListId: newList.id,
						nextListId: state.nextListId + 1,
					};
				}),

			addTask: (item_name, tags) =>
				set((state) => {
					if (state.activeListId === null) return state;

					const list = state.lists[state.activeListId];

					if (!list) return state;

					const newTask: Task = {
						id: list.nextTaskId,
						item_name,
						status: "pending",
						tags: tags ?? [],
					};

					return {
						lists: {
							...state.lists,
							[list.id]: {
								...list,
								items: [...list.items, newTask],
								nextTaskId: list.nextTaskId + 1,
							},
						},
					};
				}),

			toggleTask: (taskId) =>
				set((state) => {
					if (state.activeListId === null) return state;

					const list = state.lists[state.activeListId];

					if (!list) return state;

					return {
						lists: {
							...state.lists,
							[list.id]: {
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
							},
						},
					};
				}),

			setActiveList: (listId) => set(() => ({ activeListId: listId })),
		}),
		{
			name: "todo-storage",
		},
	),
);

export default useTodoStore;
