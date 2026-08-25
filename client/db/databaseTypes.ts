import { openDB, DBSchema, IDBPDatabase } from "idb";

export interface User {
	id?: number;
	name: string;
	email: string;
	password: string;
}

export interface List {
	id?: number;
	userId: number;
	listName: string;
}

export interface Task {
	id?: number;
	listId: number;
	taskName: string;
	tags: string[];
	status: "completed" | "pending";
}

interface TodoDB extends DBSchema {
	users: {
		key: number;
		value: User;
		indexes: {
			email: string;
		};
	};

	lists: {
		key: number;
		value: List;
		indexes: {
			userId: number;
		};
	};

	tasks: {
		key: number;
		value: Task;
		indexes: {
			listId: number;
		};
	};
}

//This functions opens the db, and creates the db if not present, and returns us the openedDB to work with
export async function getDatabase(): Promise<IDBPDatabase<TodoDB>> {
	return openDB<TodoDB>("todo-app", 1, {
		upgrade(db) {
			console.log("Creating todo app database...");

			//Uers Object
			if (!db.objectStoreNames.contains("users")) {
				const userStore = db.createObjectStore("users", {
					keyPath: "id",
					autoIncrement: true,
				});

				userStore.createIndex("email", "email", {
					unique: true,
				});
			}

			//Lists Object
			if (!db.objectStoreNames.contains("lists")) {
				const listStore = db.createObjectStore("lists", {
					keyPath: "id",
					autoIncrement: true,
				});

				listStore.createIndex("userId", "userId");
			}

			//Tasks Object
			if (!db.objectStoreNames.contains("tasks")) {
				const taskStore = db.createObjectStore("tasks", {
					keyPath: "id",
					autoIncrement: true,
				});

				taskStore.createIndex("listId", "listId");
			}
		},
	});
}
