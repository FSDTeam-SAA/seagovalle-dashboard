'use client'

import { useState, useCallback } from 'react'
import { Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ImageUploaderProps {
  onImageSelect: (file: File | null) => void
  currentImage?: string
  isLoading?: boolean
}

export function ImageUploader({
  onImageSelect,
  currentImage,
  isLoading = false,
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(currentImage || null)

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setPreview(reader.result as string)
          onImageSelect(file)
        }
        reader.readAsDataURL(file)
      }
    },
    [onImageSelect]
  )

  const handleClear = useCallback(() => {
    setPreview(null)
    onImageSelect(null)
  }, [onImageSelect])

  return (
    <div className="space-y-3">
      <div
        className={cn(
          'relative border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer transition-colors hover:bg-muted/50 hover:border-primary/50',
          isLoading && 'opacity-50 pointer-events-none'
        )}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isLoading}
        />

        {preview ? (
          <div className="space-y-3">
            <img
              src={preview || "/placeholder.svg"}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-lg mx-auto"
            />
            <p className="text-xs text-muted-foreground">Click to change image</p>
          </div>
        ) : (
          <div className="space-y-2">
            <Upload className="w-8 h-8 mx-auto text-muted-foreground" />
            <p className="text-sm font-medium">Upload an image</p>
            <p className="text-xs text-muted-foreground">
              PNG, JPG, GIF up to 5MB
            </p>
          </div>
        )}
      </div>

      {preview && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleClear}
          disabled={isLoading}
          className="w-full gap-2"
        >
          <X className="w-4 h-4" />
          Remove Image
        </Button>
      )}
    </div>
  )
}
