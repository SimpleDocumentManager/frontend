import { Loader2, Folder, FileText } from 'lucide-react'
import React from 'react'

export default function LoadingScreen() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
            <div className="flex flex-col items-center gap-8">
                {/* Animated Icons */}
                <div className="relative flex items-center justify-center">
                    <div className="absolute h-32 w-32 animate-pulse rounded-full bg-primary/10 blur-2xl" />

                    <div className="relative z-10">
                        <Loader2 className="h-16 w-16 animate-spin text-primary" />
                    </div>

                    <Folder className="absolute -left-8 top-0 h-8 w-8 animate-bounce text-yellow-500 [animation-delay:0s] animation-duration-[2s]" />
                    <FileText className="absolute -right-8 top-0 h-8 w-8 animate-bounce text-blue-500 [animation-delay:0.5s] animation-duration-[2s]" />
                    <Folder className="absolute -bottom-8 left-0 h-8 w-8 animate-bounce text-yellow-500 [animation-delay:1s] animation-duration-[2s]" />
                    <FileText className="absolute -bottom-8 right-0 h-8 w-8 animate-bounce text-blue-500 [animation-delay:1.5s] animation-duration-[2s]" />
                </div>

                <div className="flex flex-col items-center gap-2">
                    <h2 className="text-xl font-semibold text-foreground">Loading Document Manager</h2>
                    <p className="text-sm text-muted-foreground">Preparing your workspace...</p>
                </div>

                <div className="flex gap-2">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:0s]" />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:0.2s]" />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:0.4s]" />
                </div>
            </div>
        </div>
    )
}
