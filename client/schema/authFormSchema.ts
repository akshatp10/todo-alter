import { z } from "zod";

const passwordSchema = z
	.string()
	.min(6, "Password must be at least 6 characters")
	.regex(/[0-9]/, "Password needs at least one number")
	.regex(
		/[!@#$%^&*(),.?":{}|<>_\-+=/\\[\];'`~]/,
		"Password needs at least one special character",
	)
	.regex(/[A-Z]/, "Password needs at least one uppercase letter")
	.regex(/[a-z]/, "Password needs at least one lowercase letter")
	.regex(/^\S*$/, "Password should not have spaces");

const authSchema = z.object({
	email: z.email("Please enter a valid email address"),

	name: z
		.string()
		.trim()
		.min(2, "Name must be at least 2 characters")
		.max(50, "Name cannot exceed 50 characters"),

	password: passwordSchema,

	confirmPassword: passwordSchema,
});

export const loginSchema = authSchema.omit({
	confirmPassword: true,
	name: true,
});

export const registerSchema = authSchema.refine(
	(data) => data.password === data.confirmPassword,
	{
		message: "Passwords do not match",
		path: ["confirmPassword"],
	},
);
