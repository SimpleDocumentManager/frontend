'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useDirSearchParam } from '@/hooks/dir'
import { formatFileSize, getFileIcon } from '@/lib/file-utils'
import { sanitizePath } from '@/lib/path'
import type { StorageData } from '@/types/storage'
import { Archive, FileText, Folder, Image as ImageIcon, Music, Video } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

interface FileManagerDataTableProps {
    items: StorageData[]
}

export default function FileManagerDataTable({ items }: FileManagerDataTableProps) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const currentDir = useDirSearchParam()

    const searchQuery = searchParams.get('search') || ''

    const handleItemClick = (item: StorageData) => {
        if (item.isFolder) {
            const newPath = sanitizePath(`${currentDir}/${item.filename}`)
            const params = new URLSearchParams(searchParams.toString())
            params.set('dir', newPath === '/' ? '' : newPath.slice(1))
            if (searchQuery) {
                params.set('search', searchQuery)
            }
            router.push(`/?${params.toString()}`)
        } else {
            window.open(item.fullUrl, '_blank')
        }
    }

    const getFileIconComponent = (item: StorageData) => {
        if (item.isFolder) {
            return <Folder className="h-5 w-5 text-yellow-500" />
        }
        const iconType = getFileIcon(item.mimeType)
        switch (iconType) {
            case 'Image':
                return <ImageIcon className="h-5 w-5 text-blue-500" />
            case 'Video':
                return <Video className="h-5 w-5 text-purple-500" />
            case 'Audio':
                return <Music className="h-5 w-5 text-green-500" />
            case 'Archive':
                return <Archive className="h-5 w-5 text-orange-500" />
            default:
                return <FileText className="h-5 w-5 text-gray-500" />
        }
    }

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-12"></TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Updated</TableHead>
                        <TableHead>Uploader</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="h-24 text-center">
                                No files or folders found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        items.map((item) => (
                            <TableRow key={item.id} className="cursor-pointer" onClick={() => handleItemClick(item)}>
                                <TableCell>{getFileIconComponent(item)}</TableCell>
                                <TableCell className="font-medium">
                                    <span>{item.filename}</span>
                                    {item.folder !== currentDir && (
                                        <span className="ml-1.5 mt-1.5 inline-flex max-w-full items-center gap-1 rounded-md border border-border/60 bg-muted/50 px-2 py-0.5 text-xs text-muted-foreground">
                                            <Folder className="h-3 w-3 shrink-0 opacity-70" />
                                            <span className="truncate">
                                                {item.folder === '/' ? 'root' : item.folder}
                                            </span>
                                        </span>
                                    )}
                                </TableCell>
                                <TableCell>{item.isFolder ? '-' : formatFileSize(item.size)}</TableCell>
                                <TableCell>{item.isFolder ? 'Folder' : item.mimeType || 'Unknown'}</TableCell>
                                <TableCell>{new Date(item.updatedAt).toLocaleDateString()}</TableCell>
                                <TableCell>{item.uploader.username}</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
