import {
	createList,
	updateList,
	getAllListsByUser,
	getListById,
	deleteCompleteList,
} from "@/db/lists";

import { ApiResponse } from "../types/apiResponseType";

import { List } from "@/db/databaseTypes";

//Get all the lists present by the user
export const getAllUserList = async (
	userid: number,
): Promise<ApiResponse<List[]>> => {
	try {
		const lists = await getAllListsByUser(userid);

		return {
			status: 200,
			success: true,
			message: "Successfully Fetched Data",
			data: lists,
		};
	} catch (error) {
		// console.error("getAllUserList error:", error);
		return {
			status: 500,
			success: false,
			message: "Internal Server Error",
			data: null,
		};
	}
};

//Get a particular list by the list id
export const getUserListById = async (
	id: number,
): Promise<ApiResponse<List>> => {
	try {
		const list = await getListById(id);

		if (!list) {
			return {
				status: 404,
				success: false,
				message: "List not found",
				data: {} as List,
			};
		}

		return {
			status: 200,
			success: true,
			message: "List fetched successfully",
			data: list,
		};
	} catch (error) {
		// console.error("getUserListById error:", error);

		return {
			status: 500,
			success: false,
			message: "Internal Server Error",
			data: null,
		};
	}
};

//Create a new list for a user
export const createUserList = async (
	list: Omit<List, "id">,
): Promise<ApiResponse<List>> => {
	try {
		const id = await createList(list);

		const createdList = await getListById(id);

		if (!createdList) {
			return {
				status: 500,
				success: false,
				message: "Failed to create list",
				data: {} as List,
			};
		}

		return {
			status: 201,
			success: true,
			message: "List created successfully",
			data: createdList,
		};
	} catch (error) {
		// console.error("createUserList error:", error);

		return {
			status: 500,
			success: false,
			message: "Internal Server Error",
			data: null,
		};
	}
};

//Update the list - Essentially for updating name of list
export const updateUserList = async (
	list: List,
): Promise<ApiResponse<List>> => {
	try {
		if (!list.id) {
			return {
				status: 400,
				success: false,
				message: "List ID is required",
				data: {} as List,
			};
		}

		await updateList(list);

		const updatedList = await getListById(list.id);

		if (!updatedList) {
			return {
				status: 404,
				success: false,
				message: "List not found after update",
				data: {} as List,
			};
		}

		return {
			status: 200,
			success: true,
			message: "List updated successfully",
			data: updatedList,
		};
	} catch (error) {
		// console.error("updateUserList error:", error);

		return {
			status: 500,
			success: false,
			message: "Internal Server Error",
			data: null,
		};
	}
};

export const deleteList = async (
	listId: number,
): Promise<ApiResponse<null>> => {
	try {
		await deleteCompleteList(listId);

		return {
			status: 200,
			success: true,
			message: "List deleted successfully",
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
