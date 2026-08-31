import {
	createTask,
	deleteAllTasksByList,
	deleteSingleTask,
	getTaskById,
	getTasksByList,
	updateSingleTask,
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

export const updateTask = async (task: Task): Promise<ApiResponse<Task>> => {
	try {
		if (task.id === undefined) {
			return {
				status: 400,
				success: false,
				message: "Task ID is required",
				data: {} as Task,
			};
		}

		await updateSingleTask(task);

		const updatedTaskStatus = await getTaskById(task.id);

		if (!updatedTaskStatus) {
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
			data: updatedTaskStatus,
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

export const deleteTask = async (
	taskId: number,
): Promise<ApiResponse<null>> => {
	try {
		await deleteSingleTask(taskId);

		return {
			status: 200,
			success: true,
			message: "Tasks deleted successfully",
			data: null,
		};
	} catch (error) {
		console.error("deleteTask error:", error);

		return {
			status: 500,
			success: false,
			message: "Internal Server Error",
			data: null,
		};
	}
};

export const deleteAllTasks = async (
	listId: number,
): Promise<ApiResponse<Task>> => {
	try {
		await deleteAllTasksByList(listId);

		return {
			status: 200,
			success: true,
			message: "Tasks deleted successfully",
			data: null,
		};
	} catch (error) {
		console.error("deleteAllTasks error:", error);

		return {
			status: 500,
			success: false,
			message: "Internal Server Error",
			data: null,
		};
	}
};
