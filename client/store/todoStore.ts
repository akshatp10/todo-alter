import { sampleList } from "@/components/sampleData";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TaskStatus = "pending" | "completed";

export interface Task {
	id: number;
	item_name: string;
	status: TaskStatus;
	tags: string[];
}

export interface TodoList {
	id: number;
	listName: string;
	items: Task[];
}

type TodoStates = {
	lists: TodoList[];
	activeListId: number | null;
};

type TodoActions = {
	addList: (name: string) => void;
	addTask: (listId: number, title: string, tags?: string[]) => void;
	toggleTask: (listId: number, taskId: number) => void;
	setActiveList: (listId: number) => void;
};

type TodoStore = TodoStates & TodoActions;

const initialState: TodoStates = {
	lists: sampleList,
	activeListId: sampleList[0]?.id ?? null,
};
