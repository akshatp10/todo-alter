import { createTask, getTasksByList } from "@/db/tasks";
import { Task } from "@/db/databaseTypes";
import { ApiResponse } from "../types/apiResponseType";

export const createNewTask = async (
	task: Omit<Task, "id" | "status">,
): Promise<ApiResponse<number>> => {
	try {
		const taskWithDefaultStatus: Task = {
			...task,
			status: "pending",
		};
		const taskId = await createTask(taskWithDefaultStatus);

		return {
			status: 201,
			success: true,
			message: "Task created successfully",
			data: taskId,
		};
	} catch (error) {
		console.error("createNewTask error:", error);

		return {
			status: 500,
			success: false,
			message: "Internal Server Error",
			data: 0,
		};
	}
};

export const getAllTasksByList = async (
	listId: number,
): Promise<ApiResponse<Task[]>> => {
	try {
		const tasks = await getTasksByList(listId);

		return {
			status: 200,
			success: true,
			message: "Tasks fetched successfully",
			data: tasks,
		};
	} catch (error) {
		console.error("getAllTasksByList error:", error);

		return {
			status: 500,
			success: false,
			message: "Internal Server Error",
			data: [],
		};
	}
};
