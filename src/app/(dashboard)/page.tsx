import FileManager from '@/components/file-manager'

export default function Home() {
    return (
        <div className="min-h-screen bg-background">
            <main className="container mx-auto py-8">
                <FileManager />
            </main>
        </div>
    )
}
