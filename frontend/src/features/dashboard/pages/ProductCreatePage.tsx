import { useState } from "react";
import type { FormEvent } from "react";

import { ImagePlus, Plus, Trash2, Tag, X } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export interface ProductImageInput {
  imageUrl: string;
}

export interface ProductCreateInput {
  name: string;
  author: string;
  description: string;
  price: number;
  discount: number;
  inventory: number;
  categoryId: string;
  images: ProductImageInput[];
  tags: string[];
}

interface Category {
  id: string;
  name: string;
}

interface ProductCreationFormProps {
  categories?: Category[];

  onSubmit?: (data: ProductCreateInput) => void;
}

export default function ProductCreatePage({
  categories = [],
  onSubmit,
}: ProductCreationFormProps) {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");

  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [inventory, setInventory] = useState("");

  const [categoryId, setCategoryId] = useState("");

  const [tagInput, setTagInput] = useState("");

  const [tags, setTags] = useState<string[]>([]);

  const [imageInput, setImageInput] = useState("");

  const [images, setImages] = useState<ProductImageInput[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const addTag = () => {
    const tag = tagInput.trim();

    if (!tag) {
      return;
    }

    if (tags.includes(tag)) {
      setTagInput("");
      return;
    }

    setTags((current) => [...current, tag]);
    setTagInput("");
  };

  const removeTag = (tagToRemove: string) => {
    setTags((current) => current.filter((tag) => tag !== tagToRemove));
  };

  const addImage = () => {
    const imageUrl = imageInput.trim();

    if (!imageUrl) {
      return;
    }

    setImages((current) => [
      ...current,
      {
        imageUrl,
      },
    ]);

    setImageInput("");
  };

  const removeImage = (index: number) => {
    setImages((current) =>
      current.filter((_, imageIndex) => imageIndex !== index),
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const productData: ProductCreateInput = {
      name: name.trim(),
      author: author.trim(),
      description: description.trim(),
      price: Number(price),
      discount: Number(discount || 0),
      inventory: Number(inventory),
      categoryId,
      images,
      tags,
    };

    try {
      setIsSubmitting(true);

      // Later:
      //
      // await api.post("/products", productData);

      onSubmit?.(productData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-5xl">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl">
          Create New Product
        </CardTitle>

        <CardDescription>
          Add a new book to your online bookstore.
        </CardDescription>
      </CardHeader>

      <Separator />

      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <section className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold">Basic Information</h2>

              <p className="text-sm text-muted-foreground">
                Information about the book.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Book Name</Label>

                <Input
                  id="name"
                  placeholder="e.g. The Great Gatsby"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </div>

              {/* Author */}
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>

                <Input
                  id="author"
                  placeholder="e.g. F. Scott Fitzgerald"
                  value={author}
                  onChange={(event) => setAuthor(event.target.value)}
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>

              <Textarea
                id="description"
                placeholder="Write a description about this book..."
                className="min-h-32 resize-none"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
          </section>

          <Separator />

          {/* Pricing & Inventory */}
          <section className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold">Pricing & Inventory</h2>

              <p className="text-sm text-muted-foreground">
                Set the price, discount and available stock.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {/* Price */}
              <div className="space-y-2">
                <Label htmlFor="price">Price (MMK)</Label>

                <Input
                  id="price"
                  type="number"
                  min="0"
                  placeholder="25000"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                  required
                />
              </div>

              {/* Discount */}
              <div className="space-y-2">
                <Label htmlFor="discount">Discount (%)</Label>

                <Input
                  id="discount"
                  type="number"
                  min="0"
                  max="100"
                  placeholder="10"
                  value={discount}
                  onChange={(event) => setDiscount(event.target.value)}
                />
              </div>

              {/* Inventory */}
              <div className="space-y-2">
                <Label htmlFor="inventory">Inventory</Label>

                <Input
                  id="inventory"
                  type="number"
                  min="0"
                  placeholder="50"
                  value={inventory}
                  onChange={(event) => setInventory(event.target.value)}
                  required
                />
              </div>
            </div>
          </section>

          <Separator />

          {/* Category */}
          <section className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold">Category</h2>

              <p className="text-sm text-muted-foreground">
                Select the category for this book.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>

              <select
                id="category"
                value={categoryId}
                onChange={(event) => setCategoryId(event.target.value)}
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">Select a category</option>

                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </section>

          <Separator />

          {/* Tags */}
          <section className="space-y-4">
            <div>
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <Tag className="size-5" />
                Tags
              </h2>

              <p className="text-sm text-muted-foreground">
                Add tags to help customers find this book.
              </p>
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="e.g. fiction"
                value={tagInput}
                onChange={(event) => setTagInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addTag();
                  }
                }}
              />

              <Button type="button" variant="secondary" onClick={addTag}>
                <Plus className="mr-2 size-4" />
                Add
              </Button>
            </div>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="gap-1 px-3 py-1"
                  >
                    {tag}

                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 rounded-full hover:text-destructive"
                    >
                      <X className="size-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </section>

          <Separator />

          {/* Images */}
          <section className="space-y-4">
            <div>
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <ImagePlus className="size-5" />
                Product Images
              </h2>

              <p className="text-sm text-muted-foreground">
                Add image URLs for this book.
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <Input
                placeholder="https://example.com/book-cover.jpg"
                value={imageInput}
                onChange={(event) => setImageInput(event.target.value)}
              />

              <Button
                type="button"
                variant="secondary"
                onClick={addImage}
                className="sm:w-auto"
              >
                <Plus className="mr-2 size-4" />
                Add Image
              </Button>
            </div>

            {images.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {images.map((image, index) => (
                  <div
                    key={`${image.imageUrl}-${index}`}
                    className="group relative overflow-hidden rounded-lg border"
                  >
                    <img
                      src={image.imageUrl}
                      alt={`Product image ${index + 1}`}
                      className="aspect-square w-full object-cover"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />

                    <div className="flex items-center justify-between gap-2 p-3">
                      <p className="truncate text-xs text-muted-foreground">
                        {image.imageUrl}
                      </p>

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="shrink-0 text-destructive hover:text-destructive"
                        onClick={() => removeImage(index)}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <Separator />

          {/* Submit */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              className="sm:w-auto"
              onClick={() => {
                setName("");
                setAuthor("");
                setDescription("");
                setPrice("");
                setDiscount("");
                setInventory("");
                setCategoryId("");
                setTags([]);
                setImages([]);
                setTagInput("");
                setImageInput("");
              }}
            >
              Clear
            </Button>

            <Button type="submit" disabled={isSubmitting} className="sm:w-auto">
              {isSubmitting ? "Creating..." : "Create Product"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
