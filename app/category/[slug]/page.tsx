import { databases, DATABASE_ID, PRODUCTS_COLLECTION_ID } from '@/lib/appwrite';
import { ProductCard } from '@/app/ProductCard';
import { Query } from 'appwrite';

async function getProductsByCategory(category: string) {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      PRODUCTS_COLLECTION_ID,
      [Query.equal('category', category)]
    );
    return response.documents;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const products = await getProductsByCategory(params.slug);
  const categoryTitles = {
    'laser-wood': 'Laser Wood Art',
    'neon-lights': 'Neon Lights',
    '3d-prints': '3D Prints',
  };

  if (params.slug === '3d-prints') {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text mb-6">
          Coming Soon
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl">
          Our 3D printing services are currently under development. Stay tuned for amazing custom 3D printed products!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {categoryTitles[params.slug as keyof typeof categoryTitles]}
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Discover our collection of handcrafted {categoryTitles[params.slug as keyof typeof categoryTitles].toLowerCase()}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product.$id} product={product} />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">No products found in this category.</p>
        </div>
      )}
    </div>
  );
}