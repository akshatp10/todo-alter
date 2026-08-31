import { getDatabase, List } from "./databaseTypes";
import { deleteAllTasksByList } from "./tasks";

export async function createList(list: Omit<List, "id">) {
	const db = await getDatabase();
	const id = await db.add("lists", list);
	return id;
}

export async function getListById(id: number) {
	const db = await getDatabase();
	return db.get("lists", id);
}

export async function getAllListsByUser(userId: number) {
	const db = await getDatabase();
	return db.getAllFromIndex("lists", "userId", userId);
}

export async function updateList(list: List) {
	const db = await getDatabase();
	return db.put("lists", list);
}

export async function deleteCompleteList(listId: number) {
	const db = await getDatabase();
	await deleteAllTasksByList(listId);
	await db.delete("lists", listId);
}
