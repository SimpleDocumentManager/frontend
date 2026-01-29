'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import jsCookie from 'js-cookie'

export default function LoginGuard() {
    const router = useRouter()

    useEffect(() => {
        const token = jsCookie.get('access_token')

        if (token) {
            router.replace('/?dir=/')
        }
    }, [router])

    return null
}
