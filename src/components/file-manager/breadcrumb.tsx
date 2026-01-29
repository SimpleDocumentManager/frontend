'use client'

import {
    Breadcrumb as BreadcrumbWrapper,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { useDirSearchParam } from '@/hooks/dir'
import { useMemo } from 'react'

export default function Breadcrumb() {
    const currentDir = useDirSearchParam()

    const breadcrumbSegments = useMemo(() => {
        if (currentDir === '/') return [{ name: 'Home', path: '/' }]
        const parts = currentDir.split('/').filter(Boolean)
        const segments = [{ name: 'Home', path: '/' }]
        let path = ''
        for (const part of parts) {
            path += `/${part}`
            segments.push({ name: part, path })
        }
        return segments
    }, [currentDir])

    return (
        <BreadcrumbWrapper>
            <BreadcrumbList>
                {breadcrumbSegments.map((segment, index) => (
                    <div key={segment.path} className="flex items-center">
                        <BreadcrumbItem>
                            {index === breadcrumbSegments.length - 1 ? (
                                <BreadcrumbPage>{segment.name}</BreadcrumbPage>
                            ) : (
                                <BreadcrumbLink href={{ query: { dir: segment.path } }} className="cursor-pointer">
                                    {segment.name}
                                </BreadcrumbLink>
                            )}
                        </BreadcrumbItem>
                        {index < breadcrumbSegments.length - 1 && <BreadcrumbSeparator />}
                    </div>
                ))}
            </BreadcrumbList>
        </BreadcrumbWrapper>
    )
}
