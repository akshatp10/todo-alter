import { getDatabase, Task } from "./databaseTypes";

export async function createTask(task: Omit<Task, "id">) {
	const db = await getDatabase();
	return db.add("tasks", task);
}

export async function getTaskById(id: number) {
	const db = await getDatabase();
	return db.get("tasks", id);
}

export async function getTasksByList(listId: number) {
	const db = await getDatabase();
	return db.getAllFromIndex("tasks", "listId", listId);
}

export async function toggleTaskStatus(task: Task) {
	const db = await getDatabase();
	return db.put("tasks", task);
}

export async function deleteSingleTask(taskId: number) {
	const db = await getDatabase();
	await db.delete("tasks", taskId);
}

export async function deleteAllTasksByList(listId: number) {
	const db = await getDatabase();

	const tasks = await db.getAllFromIndex("tasks", "listId", listId);

	for (const task of tasks) {
		if (task.id !== undefined) {
			await db.delete("tasks", task.id);
		}
	}
}
