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
import type { UploadFileFormValues } from '@/lib/schemas'
import { UploadFileSchema } from '@/lib/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Upload } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function FileManagerUpload() {
    const [isUploadOpen, setIsUploadOpen] = useState(false)
    const currentDir = useDirSearchParam()

    const uploadFileForm = useForm<UploadFileFormValues>({
        resolver: zodResolver(UploadFileSchema),
        defaultValues: {
            file: undefined as unknown as File,
        },
    })

    const onUploadSubmit = (data: UploadFileFormValues) => {
        const file = data.file as File
        console.log('Upload file:', file.name, 'to dir:', currentDir)
        uploadFileForm.reset()
        setIsUploadOpen(false)
    }

    return (
        <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload File</DialogTitle>
                    <DialogDescription>Select a file to upload to {currentDir}</DialogDescription>
                </DialogHeader>
                <Form {...uploadFileForm}>
                    <form onSubmit={uploadFileForm.handleSubmit(onUploadSubmit)} className="space-y-4">
                        <FormField
                            control={uploadFileForm.control}
                            name="file"
                            render={({ field: { onChange, value, ...field } }) => (
                                <FormItem>
                                    <FormLabel>File</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0]
                                                if (file) {
                                                    onChange(file as unknown as File)
                                                } else {
                                                    onChange(undefined as unknown as File)
                                                }
                                            }}
                                            {...field}
                                            value={undefined}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    {value && (
                                        <p className="text-sm text-muted-foreground">
                                            Selected: {(value as File).name}
                                        </p>
                                    )}
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsUploadOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit">Upload</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
