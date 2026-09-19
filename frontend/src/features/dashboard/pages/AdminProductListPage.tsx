import { useMemo, useState } from "react";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Search,
  Package,
  Pencil,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export interface ProductImage {
  id: string;
  imageUrl: string;
  imageId: string;
}

export interface ProductTag {
  id: string;
  name: string;
}

export interface ProductCategory {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  author: string;
  description?: string | null;

  price: number;
  discount?: number | null;
  inventory: number;

  categoryId: string;
  category: ProductCategory;

  productImages: ProductImage[];

  productTag: ProductTag[];

  deletedAt?: string | null;

  createdAt: string;
  updatedAt: string;
}

/* -------------------------------------------------------------------------- */
/* Props                                                                      */
/* -------------------------------------------------------------------------- */

interface ProductListProps {
  products?: Product[];

  categories?: ProductCategory[];

  onViewProduct?: (product: Product) => void;

  onEditProduct?: (product: Product) => void;

  onDeleteProduct?: (product: Product) => void;
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export default function AdminProductListPage({
  products = [],
  categories = [],
  onViewProduct,
  onEditProduct,
  onDeleteProduct,
}: ProductListProps) {
  const [search, setSearch] = useState("");

  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");

  const [inventoryFilter, setInventoryFilter] = useState<
    "ALL" | "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK"
  >("ALL");

  const [page, setPage] = useState(1);

  const pageSize = 10;

  /* ------------------------------------------------------------------------ */
  /* Filtering                                                                */
  /* ------------------------------------------------------------------------ */

  const filteredProducts = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return products.filter((product) => {
      const matchesSearch =
        !searchValue ||
        product.name.toLowerCase().includes(searchValue) ||
        product.author.toLowerCase().includes(searchValue);

      const matchesCategory =
        categoryFilter === "ALL" || product.categoryId === categoryFilter;

      const matchesInventory =
        inventoryFilter === "ALL" ||
        getInventoryStatus(product.inventory) === inventoryFilter;

      return matchesSearch && matchesCategory && matchesInventory;
    });
  }, [products, search, categoryFilter, inventoryFilter]);

  /* ------------------------------------------------------------------------ */
  /* Pagination                                                               */
  /* ------------------------------------------------------------------------ */

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));

  const currentPage = Math.min(page, totalPages);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  /* ------------------------------------------------------------------------ */
  /* Handlers                                                                  */
  /* ------------------------------------------------------------------------ */

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleCategoryFilter = (value: string) => {
    setCategoryFilter(value);
    setPage(1);
  };

  const handleInventoryFilter = (
    value: "ALL" | "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK",
  ) => {
    setInventoryFilter(value);
    setPage(1);
  };

  /* ------------------------------------------------------------------------ */
  /* Render                                                                   */
  /* ------------------------------------------------------------------------ */

  return (
    <Card className="w-full">
      {/* Header */}
      <CardHeader className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-xl">Products</CardTitle>

            <p className="mt-1 text-sm text-muted-foreground">
              Manage books in your online bookstore.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <BookOpen className="size-4" />

            <span>{filteredProducts.length} products</span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 lg:flex-row">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              value={search}
              onChange={(event) => handleSearch(event.target.value)}
              placeholder="Search product or author..."
              className="pl-9"
            />
          </div>

          {/* Category */}
          <Select value={categoryFilter} onValueChange={handleCategoryFilter}>
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="ALL">All Categories</SelectItem>

              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Inventory */}
          <Select
            value={inventoryFilter}
            onValueChange={(value) =>
              handleInventoryFilter(
                value as "ALL" | "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK",
              )
            }
          >
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue placeholder="Inventory" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="ALL">All Inventory</SelectItem>

              <SelectItem value="IN_STOCK">In Stock</SelectItem>

              <SelectItem value="LOW_STOCK">Low Stock</SelectItem>

              <SelectItem value="OUT_OF_STOCK">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        {paginatedProducts.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* ---------------------------------------------------------------- */}
            {/* Desktop table                                                     */}
            {/* ---------------------------------------------------------------- */}

            <div className="hidden overflow-x-auto md:block">
              <div className="min-w-262.5">
                {/* Header */}
                <div className="grid grid-cols-[2fr_1.4fr_1fr_1.1fr_1fr_1.1fr_48px] items-center gap-4 border-b px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  <span>Product</span>
                  <span>Category</span>
                  <span>Price</span>
                  <span>Inventory</span>
                  <span>Tags</span>
                  <span>Created</span>
                  <span />
                </div>

                {/* Rows */}
                {paginatedProducts.map((product) => (
                  <DesktopProductRow
                    key={product.id}
                    product={product}
                    onView={() => onViewProduct?.(product)}
                    onEdit={() => onEditProduct?.(product)}
                    onDelete={() => onDeleteProduct?.(product)}
                  />
                ))}
              </div>
            </div>

            {/* ---------------------------------------------------------------- */}
            {/* Mobile cards                                                      */}
            {/* ---------------------------------------------------------------- */}

            <div className="space-y-3 md:hidden">
              {paginatedProducts.map((product) => (
                <MobileProductCard
                  key={product.id}
                  product={product}
                  onView={() => onViewProduct?.(product)}
                  onEdit={() => onEditProduct?.(product)}
                  onDelete={() => onDeleteProduct?.(product)}
                />
              ))}
            </div>
          </>
        )}

        {/* Pagination */}
        {filteredProducts.length > 0 && (
          <div className="mt-6 flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-medium text-foreground">
                {Math.min(
                  (currentPage - 1) * pageSize + 1,
                  filteredProducts.length,
                )}
              </span>{" "}
              to{" "}
              <span className="font-medium text-foreground">
                {Math.min(currentPage * pageSize, filteredProducts.length)}
              </span>{" "}
              of{" "}
              <span className="font-medium text-foreground">
                {filteredProducts.length}
              </span>
            </p>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                disabled={currentPage === 1}
                onClick={() => setPage((current) => Math.max(1, current - 1))}
              >
                <ChevronLeft className="size-4" />
              </Button>

              <span className="min-w-20 text-center text-sm">
                Page {currentPage} / {totalPages}
              </span>

              <Button
                variant="outline"
                size="icon"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setPage((current) => Math.min(totalPages, current + 1))
                }
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/* Desktop Product Row                                                        */
/* -------------------------------------------------------------------------- */

interface ProductRowProps {
  product: Product;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

function DesktopProductRow({
  product,
  onView,
  onEdit,
  onDelete,
}: ProductRowProps) {
  return (
    <div className="grid grid-cols-[2fr_1.4fr_1fr_1.1fr_1fr_1.1fr_48px] items-center gap-4 border-b px-4 py-4 last:border-b-0">
      {/* Product */}
      <ProductIdentity product={product} />

      {/* Category */}
      <div>
        <Badge variant="outline">{product.category.name}</Badge>
      </div>

      {/* Price */}
      <ProductPrice product={product} />

      {/* Inventory */}
      <InventoryStatus inventory={product.inventory} />

      {/* Tags */}
      <ProductTags tags={product.productTag} />

      {/* Created */}
      <p className="text-sm text-muted-foreground">
        {formatDate(product.createdAt)}
      </p>

      {/* Actions */}
      <ProductActions
        product={product}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Mobile Product Card                                                        */
/* -------------------------------------------------------------------------- */

function MobileProductCard({
  product,
  onView,
  onEdit,
  onDelete,
}: ProductRowProps) {
  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-start justify-between gap-3">
        <ProductIdentity product={product} />

        <ProductActions
          product={product}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>

      <div className="mt-4 space-y-4">
        {/* Category */}
        <div>
          <p className="text-xs text-muted-foreground">Category</p>

          <Badge variant="outline" className="mt-1">
            {product.category.name}
          </Badge>
        </div>

        {/* Price + Inventory */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Price</p>

            <div className="mt-1">
              <ProductPrice product={product} />
            </div>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Inventory</p>

            <div className="mt-1">
              <InventoryStatus inventory={product.inventory} />
            </div>
          </div>
        </div>

        {/* Tags */}
        {product.productTag.length > 0 && (
          <div>
            <p className="mb-2 text-xs text-muted-foreground">Tags</p>

            <ProductTags tags={product.productTag} />
          </div>
        )}

        {/* Created */}
        <div>
          <p className="text-xs text-muted-foreground">Created</p>

          <p className="mt-1 text-sm">{formatDate(product.createdAt)}</p>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Product Identity                                                           */
/* -------------------------------------------------------------------------- */

function ProductIdentity({ product }: { product: Product }) {
  const image = product.productImages[0]?.imageUrl;

  return (
    <div className="flex min-w-0 items-center gap-3">
      {/* Image */}
      <div className="size-12 shrink-0 overflow-hidden rounded-md border bg-muted">
        {image ? (
          <img
            src={image}
            alt={product.name}
            className="size-full object-cover"
          />
        ) : (
          <div className="flex size-full items-center justify-center">
            <BookOpen className="size-5 text-muted-foreground" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="min-w-0">
        <p className="truncate font-medium">{product.name}</p>

        <p className="truncate text-sm text-muted-foreground">
          {product.author}
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Price                                                                      */
/* -------------------------------------------------------------------------- */

function ProductPrice({ product }: { product: Product }) {
  const discount = product.discount ?? 0;

  const discountedPrice = product.price - (product.price * discount) / 100;

  if (discount > 0) {
    return (
      <div>
        <p className="font-semibold">{formatCurrency(discountedPrice)}</p>

        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground line-through">
            {formatCurrency(product.price)}
          </span>

          <Badge variant="secondary" className="text-[10px]">
            -{discount}%
          </Badge>
        </div>
      </div>
    );
  }

  return <p className="font-semibold">{formatCurrency(product.price)}</p>;
}

/* -------------------------------------------------------------------------- */
/* Inventory                                                                  */
/* -------------------------------------------------------------------------- */

function InventoryStatus({ inventory }: { inventory: number }) {
  const status = getInventoryStatus(inventory);

  if (status === "OUT_OF_STOCK") {
    return <Badge variant="destructive">Out of stock</Badge>;
  }

  if (status === "LOW_STOCK") {
    return (
      <Badge
        variant="secondary"
        className="border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-900 dark:bg-yellow-950 dark:text-yellow-400"
      >
        {inventory} left
      </Badge>
    );
  }

  return (
    <Badge
      variant="secondary"
      className="border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-400"
    >
      {inventory} in stock
    </Badge>
  );
}

/* -------------------------------------------------------------------------- */
/* Tags                                                                       */
/* -------------------------------------------------------------------------- */

function ProductTags({ tags }: { tags: ProductTag[] }) {
  if (tags.length === 0) {
    return <span className="text-xs text-muted-foreground">No tags</span>;
  }

  const visibleTags = tags.slice(0, 2);

  return (
    <div className="flex flex-wrap gap-1">
      {visibleTags.map((tag) => (
        <Badge key={tag.id} variant="outline" className="text-xs">
          {tag.name}
        </Badge>
      ))}

      {tags.length > 2 && (
        <Badge variant="secondary" className="text-xs">
          +{tags.length - 2}
        </Badge>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Actions                                                                    */
/* -------------------------------------------------------------------------- */

function ProductActions({
  onView,
  onEdit,
  onDelete,
}: {
  product: Product;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="size-4" />

          <span className="sr-only">Product actions</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onView}>
          <Package className="mr-2 size-4" />
          View Product
        </DropdownMenuItem>

        <DropdownMenuItem onClick={onEdit}>
          <Pencil className="mr-2 size-4" />
          Edit Product
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={onDelete}
          className="text-destructive focus:text-destructive"
        >
          <Trash2 className="mr-2 size-4" />
          Delete Product
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/* -------------------------------------------------------------------------- */
/* Empty State                                                                */
/* -------------------------------------------------------------------------- */

function EmptyState() {
  return (
    <div className="flex min-h-60 flex-col items-center justify-center rounded-lg border border-dashed">
      <div className="flex size-12 items-center justify-center rounded-full bg-muted">
        <BookOpen className="size-5 text-muted-foreground" />
      </div>

      <h3 className="mt-4 font-semibold">No products found</h3>

      <p className="mt-1 text-center text-sm text-muted-foreground">
        There are no products matching your filters.
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function getInventoryStatus(
  inventory: number,
): "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK" {
  if (inventory === 0) {
    return "OUT_OF_STOCK";
  }

  if (inventory <= 10) {
    return "LOW_STOCK";
  }

  return "IN_STOCK";
}

function formatCurrency(value: number) {
  return `${value.toLocaleString()} MMK`;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}
