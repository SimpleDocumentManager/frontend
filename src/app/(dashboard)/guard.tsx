'use client'
import LoadingScreen from '@/components/loading-screen'
import jsCookie from 'js-cookie'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function DashboardGuard({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const token = jsCookie.get('access_token')
        if (!token) {
            router.replace('/login')
        } else {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsAuthenticated(true)
        }
    }, [router])

    if (!isAuthenticated) {
        return <LoadingScreen />
    }

    return <>{children}</>
}
