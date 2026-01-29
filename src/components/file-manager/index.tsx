'use client'

import FileManagerNewFolder from '@/components/file-manager/new-folder'
import FileManagerUpload from '@/components/file-manager/upload'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import Breadcrumb from './breadcrumb'
import DataTable from './data-table'

export default function FileManager() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const searchQuery = searchParams.get('search') || ''

    const [searchInput, setSearchInput] = useState(searchQuery)

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
                    <FileManagerNewFolder />

                    <FileManagerUpload />
                </div>
            </div>

            <DataTable items={[]} />
        </div>
    )
}
