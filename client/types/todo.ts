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
