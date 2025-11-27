"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Upload, Plus, Minus } from "lucide-react";
import { toast } from "sonner";
import { MenuFormData, MenuItem, MenuImage } from "@/lib/services/menu-service";

interface MenuFormProps {
  initialData?: MenuItem;
  onSubmit: (data: MenuFormData) => Promise<void>;
  isLoading?: boolean;
}

export function MenuForm({
  initialData,
  onSubmit,
  isLoading = false,
}: MenuFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    category: initialData?.category || "",
    description: initialData?.description || "",
  });

  // dynamic sections: each section holds size, pieces and price (strings for inputs)
  const [sections, setSections] = useState<{ size: string; pieces: string; price: string }[]>(
    () => {
      // If initialData already has arrays (new shape), map them
      const anyInit = initialData as any;
      if (anyInit?.sizes || anyInit?.pieces || anyInit?.price) {
        const sizes = Array.isArray(anyInit?.sizes) ? anyInit.sizes : [];
        const pieces = Array.isArray(anyInit?.pieces) ? anyInit.pieces : [];
        const price = Array.isArray(anyInit?.price) ? anyInit.price : [];
        const max = Math.max(sizes.length, pieces.length, price.length, 1);
        return Array.from({ length: max }).map((_, i) => ({
          size: sizes[i] != null ? String(sizes[i]) : "",
          pieces: pieces[i] != null ? String(pieces[i]) : "",
          price: price[i] != null ? String(price[i]) : "",
        }));
      }

      // fallback for legacy initialData.price with small/medium/large
      const legacyPrice = (initialData as any)?.price;
      if (legacyPrice && typeof legacyPrice === "object" && ("small" in legacyPrice)) {
        return [
          { size: "", pieces: "", price: String(legacyPrice.small ?? "") },
          { size: "", pieces: "", price: String(legacyPrice.medium ?? "") },
          { size: "", pieces: "", price: String(legacyPrice.large ?? "") },
        ];
      }

      // default single empty section
      return [{ size: "", pieces: "", price: "" }];
    }
  );

  console.log(initialData);

  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<MenuImage[]>(
    initialData?.images || []
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  // const categories = ["Vegetarian", "Meat", "Seafood", "Premium", "Special", "Sides"];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Pizza name is required";
    }
    if (!formData.category) {
      newErrors.category = "Category is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    // validate dynamic sections
    if (!sections.length) {
      newErrors.sections = "At least one size/pieces/price entry is required";
    } else {
      for (let i = 0; i < sections.length; i++) {
        const s = sections[i];
        if (!s.size.trim() || isNaN(Number(s.size))) {
          newErrors.sections = "Each section must have a valid numeric size";
          break;
        }
        if (!s.pieces.trim() || isNaN(Number(s.pieces))) {
          newErrors.sections = "Each section must have a valid numeric pieces value";
          break;
        }
        if (!s.price.trim() || isNaN(Number(s.price))) {
          newErrors.sections = "Each section must have a valid numeric price";
          break;
        }
      }
    }

    if (!initialData && images.length === 0) {
      newErrors.images = "At least one image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    files.forEach((file) => {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image must be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prev) => [...prev, file]);
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  // section handlers
  const addSection = (afterIndex?: number) => {
    setSections((prev) => {
      const next = [...prev];
      const newSection = { size: "", pieces: "", price: "" };
      if (afterIndex == null || afterIndex < 0 || afterIndex >= next.length) {
        next.push(newSection);
      } else {
        next.splice(afterIndex + 1, 0, newSection);
      }
      return next;
    });
  };

  const removeSection = (index: number) => {
    setSections((prev) => {
      if (prev.length === 1) return prev; // keep at least one
      return prev.filter((_, i) => i !== index);
    });
  };

  const updateSection = (index: number, field: "size" | "pieces" | "price", value: string) => {
    setSections((prev) => prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    try {
      const menuFormData = {
        name: formData.name,
        category: formData.category,
        description: formData.description,
        // arrays as numbers (use parseFloat to allow decimals for price, sizes may be integer)
        pieces: sections.map((s) => Number(s.pieces)),
        sizes: sections.map((s) => Number(s.size)),
        price: sections.map((s) => Number(s.price)),
        images,
        existingImages: existingImages.map((img) => img?.url),
      } as unknown as MenuFormData;

      await onSubmit(menuFormData);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Field */}
      <div>
        <Label htmlFor="name">Pizza Name</Label>
        <Input
          id="name"
          placeholder="e.g., Classic Pepperoni"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={errors.name ? "border-destructive" : ""}
          disabled={isLoading}
        />
        {errors.name && (
          <p className="text-xs text-destructive mt-1">{errors.name}</p>
        )}
      </div>

      {/* Category Field */}
      <div>
        <Label htmlFor="category">Category</Label>
        <Input
          id="category"
          placeholder="e.g., Sides"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className={errors.category ? "border-destructive" : ""}
          disabled={isLoading}
        />
        {errors.category && (
          <p className="text-xs text-destructive mt-1">{errors.category}</p>
        )}
      </div>

      {/* Description Field */}
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Describe your pizza..."
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className={`min-h-24 ${
            errors.description ? "border-destructive" : ""
          }`}
          disabled={isLoading}
        />
        {errors.description && (
          <p className="text-xs text-destructive mt-1">{errors.description}</p>
        )}
      </div>

      {/* Sizes / Pieces / Prices - dynamic sections */}
      <div>
        <Label>Sizes, Pieces, Prices</Label>
        {errors.sections && (
          <p className="text-xs text-destructive mt-1">{errors.sections}</p>
        )}
        <div className="space-y-3 mt-2">
          {sections.map((sec, idx) => (
            <div key={idx} className="grid grid-cols-12 gap-2 items-end">
              <div className="col-span-4">
                <Label className="text-xs">Size</Label>
                <Input
                  value={sec.size}
                  onChange={(e) => updateSection(idx, "size", e.target.value)}
                  placeholder="e.g., 21"
                  className=""
                  disabled={isLoading}
                />
              </div>

              <div className="col-span-4">
                <Label className="text-xs">Pieces</Label>
                <Input
                  value={sec.pieces}
                  onChange={(e) => updateSection(idx, "pieces", e.target.value)}
                  placeholder="e.g., 10"
                  className=""
                  disabled={isLoading}
                />
              </div>

              <div className="col-span-3">
                <Label className="text-xs">Price ($)</Label>
                <Input
                  value={sec.price}
                  onChange={(e) => updateSection(idx, "price", e.target.value)}
                  placeholder="e.g., 22.00"
                  className=""
                  disabled={isLoading}
                />
              </div>

              <div className="col-span-1 flex gap-1">
                <button
                  type="button"
                  onClick={() => addSection(idx)}
                  className="p-2 rounded-md border hover:bg-muted"
                  title="Add section"
                  disabled={isLoading}
                >
                  <Plus size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => removeSection(idx)}
                  className="p-2 rounded-md border hover:bg-muted disabled:opacity-50"
                  title="Remove section"
                  disabled={isLoading || sections.length === 1}
                >
                  <Minus size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Upload */}
      <div>
        <Label>Pizza Images</Label>
        <label className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:bg-muted transition-colors block disabled:opacity-50 disabled:cursor-not-allowed">
          <div className="flex flex-col items-center gap-2">
            <Upload className="w-8 h-8 text-muted-foreground" />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium">Click to upload or drag and drop</p>
              <p className="text-xs">PNG, JPG, GIF up to 5MB</p>
            </div>
          </div>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            disabled={isLoading}
          />
        </label>
        {errors.images && (
          <p className="text-xs text-destructive mt-1">{errors.images}</p>
        )}

        {/* Image Previews */}
        {existingImages.length > 0 && (
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">
              Existing Images
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
              {existingImages.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image?.url || "/placeholder.svg"}
                    alt={`Existing ${index}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeExistingImage(index)}
                    className="absolute top-1 right-1 bg-destructive text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                    disabled={isLoading}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        {imagePreviews.length > 0 && (
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">
              New Images
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative group">
                  <img
                    src={preview || "/placeholder.svg"}
                    alt={`Preview ${index}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-destructive text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                    disabled={isLoading}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Submit Buttons */}
      <div className="flex gap-3 pt-4 border-t border-border">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="flex-1 bg-primary hover:bg-primary/90"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : initialData ? "Update Pizza" : "Add Pizza"}
        </Button>
      </div>
    </form>
  );
}
