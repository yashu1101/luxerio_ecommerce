import { z } from 'zod';

export const registerSchema = z.object({
    username: z.string().min(2, "Username must be at least 2 characters long").max(100, "Username must be at most 100 characters long").regex(/^[A-Za-z\s]+$/, "Name should not contain numbers"),
    email: z.string().email("Please provide a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long").max(100, "Password must be at most 100 characters long")
});

export const loginSchema = z.object({
    email: z.string().email("Please provide a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long").max(100, "Password must be at most 100 characters long")
});


export const passwordSchema = z.object({
    password: z.string().min(6, "Password must be at least 6 characters long").max(100, "Password must be at most 100 characters long")

})