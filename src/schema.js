import z from 'zod';

export const DocumentRequestSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    message: z.string().optional().default("Hello, This is a message from the user"),
})