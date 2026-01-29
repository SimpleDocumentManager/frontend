'use client'

import FileManagerNewFolder from '@/components/file-manager/new-folder'
import FileManagerUpload from '@/components/file-manager/upload'
import { Input } from '@/components/ui/input'
import { useDirSearchParam } from '@/hooks/dir'
import axios, { getAxiosErrorMessage } from '@/lib/axios'
import { StorageData } from '@/types/storage'
import { Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import Breadcrumb from './breadcrumb'
import DataTable from './data-table'

export default function FileManager() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const currentDir = useDirSearchParam()
    const searchQuery = searchParams.get('search') || ''

    const [searchInput, setSearchInput] = useState(searchQuery)
    const [storages, setStorages] = useState<StorageData[]>([])

    const loadStorages = useCallback(async () => {
        try {
            const res = await axios.get('/v1/storages', {
                params: {
                    dir: currentDir,
                    search: searchQuery,
                },
            })
            setStorages(res.data.data)
        } catch (err) {
            console.error(getAxiosErrorMessage(err))
        }
    }, [currentDir, searchQuery])

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        void loadStorages()
    }, [loadStorages])

    return (
        <div className="flex flex-col gap-6 p-6">
            <Breadcrumb />

            <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search documents..."
                        value={searchInput}
                        onChange={(e) => {
                            const params = new URLSearchParams(searchParams)

                            params.set('search', e.target.value)
                            setSearchInput(e.target.value)

                            router.replace(`/?${params.toString()}`, { scroll: false })
                        }}
                        className="pl-10"
                    />
                </div>

                <div className="flex gap-2 justify-between">
                    <FileManagerNewFolder reload={loadStorages} />
                    <FileManagerUpload reload={loadStorages} />
                </div>
            </div>

            <DataTable items={storages} />
        </div>
    )
}
