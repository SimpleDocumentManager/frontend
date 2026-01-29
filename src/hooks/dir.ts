'use client'
import { sanitizePath } from '@/lib/path'
import { useSearchParams } from 'next/navigation'

/**
 * Hook to get the sanitized directory path from the search params
 *
 * @returns The sanitized directory path from the search params
 */
export const useDirSearchParam = () => {
    const searchParams = useSearchParams()

    const dir = sanitizePath(searchParams.get('dir') || '')

    return dir
}
