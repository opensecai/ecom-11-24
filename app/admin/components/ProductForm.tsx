'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { databases, storage, BUCKET_ID, DATABASE_ID, PRODUCTS_COLLECTION_ID } from '@/lib/appwrite';
import { ID } from 'appwrite';

interface ProductFormProps {
  editingProduct: any;
  setEditingProduct: (product: any) => void;
  onSuccess: () => void;
}

export function ProductForm({ editingProduct, setEditingProduct, onSuccess }: ProductFormProps) {
  const [loading, setLoading] = useState(false);
  const [productForm, setProductForm] = useState({
    name: editingProduct?.name || '',
    description: editingProduct?.description || '',
    actualPrice: editingProduct?.actualPrice?.toString() || '',
    offerPrice: editingProduct?.offerPrice?.toString() || '',
    category: editingProduct?.category || '',
    stock: editingProduct?.stock?.toString() || '',
    image: null as File | null,
  });
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageId = editingProduct?.image || '';
      if (productForm.image) {
        const uploadResponse = await storage.createFile(
          BUCKET_ID,
          ID.unique(),
          productForm.image
        );
        imageId = uploadResponse.$id;
      }

      const productData = {
        name: productForm.name,
        description: productForm.description,
        actualPrice: parseFloat(productForm.actualPrice),
        offerPrice: parseFloat(productForm.offerPrice),
        category: productForm.category,
        stock: parseInt(productForm.stock),
        ...(imageId && { image: imageId }),
      };

      if (editingProduct) {
        await databases.updateDocument(
          DATABASE_ID,
          PRODUCTS_COLLECTION_ID,
          editingProduct.$id,
          productData
        );
        toast({
          title: 'Success',
          description: 'Product updated successfully',
        });
      } else {
        await databases.createDocument(
          DATABASE_ID,
          PRODUCTS_COLLECTION_ID,
          ID.unique(),
          productData
        );
        toast({
          title: 'Success',
          description: 'Product added successfully',
        });
      }

      setProductForm({
        name: '',
        description: '',
        actualPrice: '',
        offerPrice: '',
        category: '',
        stock: '',
        image: null,
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setEditingProduct(null);
      onSuccess();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save product',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{editingProduct ? 'Edit Product' : 'Add Product'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleProductSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <Input
                value={productForm.name}
                onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Input
                value={productForm.category}
                onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={productForm.description}
              onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Actual Price</label>
              <Input
                type="number"
                value={productForm.actualPrice}
                onChange={(e) => setProductForm({ ...productForm, actualPrice: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Offer Price</label>
              <Input
                type="number"
                value={productForm.offerPrice}
                onChange={(e) => setProductForm({ ...productForm, offerPrice: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Stock</label>
              <Input
                type="number"
                value={productForm.stock}
                onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Product Image</label>
            <Input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => setProductForm({ ...productForm, image: e.target.files?.[0] || null })}
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : editingProduct ? 'Update Product' : 'Add Product'}
            </Button>
            {editingProduct && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEditingProduct(null);
                  setProductForm({
                    name: '',
                    description: '',
                    actualPrice: '',
                    offerPrice: '',
                    category: '',
                    stock: '',
                    image: null,
                  });
                  if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                  }
                }}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}