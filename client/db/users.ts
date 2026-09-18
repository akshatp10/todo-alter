import { getDatabase, User } from "./databaseTypes";

export async function createUser(user: Omit<User, "id">) {
	const db = await getDatabase();
	const id = await db.add("users", user);
	return id;
}

export async function getUser(id: number) {
	const db = await getDatabase();
	return db.get("users", id);
}

export async function getUserByEmail(email: string) {
	const db = await getDatabase();
	return db.getFromIndex("users", "email", email);
}
