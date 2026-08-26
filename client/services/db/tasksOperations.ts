import {
	createTask,
	getTaskById,
	getTasksByList,
	toggleTaskStatus,
} from "@/db/tasks";
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
		// console.error("createNewTask error:", error);

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
		// console.error("getAllTasksByList error:", error);

		return {
			status: 500,
			success: false,
			message: "Internal Server Error",
			data: [],
		};
	}
};

export const toggleTask = async (task: Task): Promise<ApiResponse<Task>> => {
	try {
		if (task.id === undefined) {
			return {
				status: 400,
				success: false,
				message: "Task ID is required",
				data: {} as Task,
			};
		}

		await toggleTaskStatus(task);

		const updatedTask = await getTaskById(task.id);

		if (!updatedTask) {
			return {
				status: 404,
				success: false,
				message: "Task not found after update",
				data: {} as Task,
			};
		}

		return {
			status: 200,
			success: true,
			message: "Task updated successfully",
			data: updatedTask,
		};
	} catch (error) {
		console.error("toggleTask error:", error);

		return {
			status: 500,
			success: false,
			message: "Internal Server Error",
			data: {} as Task,
		};
	}
};
