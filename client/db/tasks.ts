import { getDatabase, Task } from "./databaseTypes";

export async function createTask(task: Omit<Task, "id">) {
	const db = await getDatabase();
	return db.add("tasks", task);
}

export async function getTasksByList(listId: number) {
	const db = await getDatabase();
	return db.getAllFromIndex("tasks", "listId", listId);
}
