import type { UserData } from './user'

export interface StorageData {
    id: string
    filename: string
    folder: string // The virtual directory path (e.g., "/" or "/finance")
    fullUrl: string
    mimeType: string
    isFolder: boolean
    size: number
    uploader: UserData
    uploaderId: string
    createdAt: string
    updatedAt: string
}
