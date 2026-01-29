/**
 * Format bytes to human-readable size (KB, MB, GB)
 */
export function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

/**
 * Get icon name based on mime type
 */
export function getFileIcon(mimeType: string): string {
    if (mimeType.startsWith('image/')) return 'Image'
    if (mimeType.startsWith('video/')) return 'Video'
    if (mimeType.startsWith('audio/')) return 'Audio'
    if (mimeType === 'application/pdf') return 'FileText'
    if (mimeType.includes('word')) return 'FileText'
    if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) return 'FileText'
    if (mimeType.includes('zip') || mimeType.includes('archive')) return 'Archive'
    return 'FileText'
}
