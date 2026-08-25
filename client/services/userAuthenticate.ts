import { createUser, getUserByEmail } from "@/db/users";
import { loginSchema, registerSchema } from "@/schema/authFormSchema";
import z from "zod";
import { ApiResponse } from "./types/apiResponseType";

type LoginData = z.infer<typeof loginSchema>;
type RegisterData = z.infer<typeof registerSchema>;

export const userLogin = async (
	data: LoginData,
): Promise<ApiResponse<number>> => {
	const user = await getUserByEmail(data.email);

	if (!user) {
		return {
			status: 404,
			success: false,
			message: "User not found",
			data: null,
		};
	}

	if (user.password !== data.password) {
		return {
			status: 401,
			success: false,
			message: "Invalid email or password",
			data: null,
		};
	}

	return {
		status: 200,
		success: true,
		message: "Login successful",
		data: user.id!,
	};
};

export const userRegister = async (
	data: RegisterData,
): Promise<ApiResponse<number>> => {
	const existingUser = await getUserByEmail(data.email);

	if (existingUser) {
		return {
			status: 409,
			success: false,
			message: "User with same email exists",
			data: null,
		};
	}

	const userId = await createUser(data);

	return {
		status: 201,
		success: true,
		message: "Registration successful",
		data: userId,
	};
};
