'use client'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useDirSearchParam } from '@/hooks/dir'
import axios, { getAxiosErrorMessage } from '@/lib/axios'
import type { CreateFolderFormValues } from '@/lib/schemas'
import { CreateFolderSchema } from '@/lib/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { FolderPlus, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface FileManagerNewFolderProps {
    reload: () => void
}

export default function FileManagerNewFolder({ reload }: FileManagerNewFolderProps) {
    const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const currentDir = useDirSearchParam()

    const createFolderForm = useForm<CreateFolderFormValues>({
        resolver: zodResolver(CreateFolderSchema),
        defaultValues: {
            name: '',
        },
    })

    const handleOpenChange = (open: boolean) => {
        if (!open) setError(null)
        setIsCreateFolderOpen(open)
    }

    const onCreateFolderSubmit = async (data: CreateFolderFormValues) => {
        setIsLoading(true)
        setError(null)
        try {
            await axios.post('/v1/storages/folder', {
                name: data.name,
                dir: currentDir,
            })
            createFolderForm.reset()
            setIsCreateFolderOpen(false)
            reload()
        } catch (err) {
            setError(getAxiosErrorMessage(err))
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isCreateFolderOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <FolderPlus className="mr-2 h-4 w-4" />
                    New Folder
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Folder</DialogTitle>
                    <DialogDescription>Enter a name for the new folder in {currentDir}</DialogDescription>
                </DialogHeader>
                <Form {...createFolderForm}>
                    <form onSubmit={createFolderForm.handleSubmit(onCreateFolderSubmit)} className="space-y-4">
                        <FormField
                            control={createFolderForm.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Folder Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter folder name" disabled={isLoading} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {error && (
                            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>
                        )}
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsCreateFolderOpen(false)}
                                disabled={isLoading}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Creating...
                                    </>
                                ) : (
                                    <>
                                        <FolderPlus className="mr-2 h-4 w-4" />
                                        Create
                                    </>
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
