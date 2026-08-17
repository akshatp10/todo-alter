import { TodoList } from "@/types/todo";

const sampleList: TodoList[] = [
	{
		id: 1,
		listName: "Groceries",
		items: [
			{
				id: 1,
				item_name: "Snacks",
				status: "pending",
				tags: ["important", "time-sensitive"],
			},
			{
				id: 2,
				item_name: "Vegetables",
				status: "pending",
				tags: ["healthy", "time-sensitive"],
			},
		],
	},
	{
		id: 2,
		listName: "My Second List",
		items: [
			{
				id: 1,
				item_name: "List Item 1",
				status: "pending",
				tags: ["important", "time-sensitive"],
			},
			{
				id: 2,
				item_name: "List Item 2",
				status: "pending",
				tags: ["healthy", "time-sensitive"],
			},
			{
				id: 3,
				item_name: "List Item 3",
				status: "completed",
				tags: ["healthy"],
			},
		],
	},
	{
		id: 3,
		listName: "Food Haul",
		items: [
			{
				id: 1,
				item_name: "Soda",
				status: "completed",
				tags: ["important", "time-sensitive"],
			},
			{
				id: 2,
				item_name: "Momos",
				status: "pending",
				tags: ["healthy", "time-sensitive"],
			},
			{
				id: 3,
				item_name: "Grilled Chicken",
				status: "completed",
				tags: ["healthy"],
			},
			{
				id: 4,
				item_name: "Broasted Chicken",
				status: "pending",
				tags: ["healthy"],
			},
			{
				id: 5,
				item_name: "Idli Vada",
				status: "pending",
				tags: ["healthy"],
			},
		],
	},
];

export { sampleList };
