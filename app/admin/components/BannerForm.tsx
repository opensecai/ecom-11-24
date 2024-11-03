'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { databases, storage, DATABASE_ID, BANNERS_COLLECTION_ID } from '@/lib/appwrite';
import { ID } from 'appwrite';

const BANNER_BUCKET_ID = 'banner-images'; // Your banner images bucket ID

interface BannerFormProps {
  editingBanner: any;
  setEditingBanner: (banner: any) => void;
  onSuccess: () => void;
}

export function BannerForm({ editingBanner, setEditingBanner, onSuccess }: BannerFormProps) {
  const [loading, setLoading] = useState(false);
  const [bannerForm, setBannerForm] = useState({
    title: editingBanner?.title || '',
    subtitle: editingBanner?.subtitle || '',
    buttonText: editingBanner?.buttonText || '',
    buttonLink: editingBanner?.buttonLink || '',
    image: null as File | null,
  });
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBannerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageId = editingBanner?.image || '';
      if (bannerForm.image) {
        const uploadResponse = await storage.createFile(
          BANNER_BUCKET_ID,
          ID.unique(),
          bannerForm.image
        );
        imageId = uploadResponse.$id;
      }

      const bannerData = {
        title: bannerForm.title,
        subtitle: bannerForm.subtitle,
        buttonText: bannerForm.buttonText,
        buttonLink: bannerForm.buttonLink,
        ...(imageId && { image: imageId }),
      };

      if (editingBanner) {
        await databases.updateDocument(
          DATABASE_ID,
          BANNERS_COLLECTION_ID,
          editingBanner.$id,
          bannerData
        );
        toast({
          title: 'Success',
          description: 'Banner updated successfully',
        });
      } else {
        await databases.createDocument(
          DATABASE_ID,
          BANNERS_COLLECTION_ID,
          ID.unique(),
          bannerData
        );
        toast({
          title: 'Success',
          description: 'Banner added successfully',
        });
      }

      setBannerForm({
        title: '',
        subtitle: '',
        buttonText: '',
        buttonLink: '',
        image: null,
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setEditingBanner(null);
      onSuccess();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save banner',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{editingBanner ? 'Edit Banner' : 'Add Banner'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleBannerSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input
              value={bannerForm.title}
              onChange={(e) => setBannerForm({ ...bannerForm, title: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Subtitle</label>
            <Input
              value={bannerForm.subtitle}
              onChange={(e) => setBannerForm({ ...bannerForm, subtitle: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Button Text</label>
              <Input
                value={bannerForm.buttonText}
                onChange={(e) => setBannerForm({ ...bannerForm, buttonText: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Button Link</label>
              <Input
                value={bannerForm.buttonLink}
                onChange={(e) => setBannerForm({ ...bannerForm, buttonLink: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Banner Image</label>
            <Input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => setBannerForm({ ...bannerForm, image: e.target.files?.[0] || null })}
              required={!editingBanner}
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : editingBanner ? 'Update Banner' : 'Add Banner'}
            </Button>
            {editingBanner && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEditingBanner(null);
                  setBannerForm({
                    title: '',
                    subtitle: '',
                    buttonText: '',
                    buttonLink: '',
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