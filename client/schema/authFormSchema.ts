import { z } from "zod";

const authSchema = z.object({
	email: z.email("Please enter a valid email address"),

	name: z
		.string()
		.trim()
		.min(2, "Name must be at least 2 characters")
		.max(50, "Name cannot exceed 50 characters"),

	password: z.string().min(6, "Password should be at least 6 characters"),

	confirmPassword: z.string().min(1, "Please confirm your password"),
});

export const loginSchema = authSchema.omit({
	confirmPassword: true,
});

export const registerSchema = authSchema.refine(
	(data) => data.password === data.confirmPassword,
	{
		message: "Passwords do not match",
		path: ["confirmPassword"],
	},
);
