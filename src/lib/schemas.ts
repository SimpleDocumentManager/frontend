import { z } from 'zod'

export const CreateFolderSchema = z.object({
    name: z
        .string()
        .min(1, 'Folder name is required')
        .max(255, 'Folder name must be at most 255 characters')
        .regex(/^[^/]+$/, 'Folder name cannot contain "/" character'),
})

export const UploadFileSchema = z.object({
    file: z
        .any()
        .refine((file) => file instanceof File, 'Please select a file')
        .refine((file) => file instanceof File && file.size > 0, 'File cannot be empty')
        .refine((file) => file instanceof File && file.size <= 100 * 1024 * 1024, 'File size must be less than 100MB'),
})

export type CreateFolderFormValues = z.infer<typeof CreateFolderSchema>
export type UploadFileFormValues = z.infer<typeof UploadFileSchema>
