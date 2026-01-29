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
import type { CreateFolderFormValues } from '@/lib/schemas'
import { CreateFolderSchema } from '@/lib/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { FolderPlus } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function FileManagerNewFolder() {
    const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false)
    const currentDir = useDirSearchParam()

    // Create Folder Form
    const createFolderForm = useForm<CreateFolderFormValues>({
        resolver: zodResolver(CreateFolderSchema),
        defaultValues: {
            name: '',
        },
    })

    const onCreateFolderSubmit = (data: CreateFolderFormValues) => {
        console.log('Create folder:', data.name, 'in dir:', currentDir)
        createFolderForm.reset()
        setIsCreateFolderOpen(false)
    }

    return (
        <Dialog open={isCreateFolderOpen} onOpenChange={setIsCreateFolderOpen}>
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
                                        <Input placeholder="Enter folder name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsCreateFolderOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit">Create</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
