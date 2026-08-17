import { z } from "zod";

export const loginSchema = z.object({
	email: z.email("Please enter a valid email address"),

	name: z
		.string()
		.trim()
		.min(2, "Name must be at least 2 characters")
		.max(50, "Name cannot exceed 50 characters"),

	password: z.string().min(6, "Password should be atleast 6 characters"),
});

export const registerSchema = z
	.object({
		email: z.email("Please enter a valid email address"),

		name: z
			.string()
			.trim()
			.min(2, "Name must be at least 2 characters")
			.max(50, "Name cannot exceed 50 characters"),

		password: z.string().min(6, "Password should be atleast 6 characters"),

		confirmPassword: z.string().min(1, "Please confirm your password"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});
