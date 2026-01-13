import { useState } from 'react';
import { ShoppingBag, Star, Filter, Search, Heart, ShoppingCart } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const products = [
  {
    id: 1,
    name: 'नीलम रत्न',
    english: 'Blue Sapphire',
    price: 15000,
    originalPrice: 20000,
    rating: 4.8,
    reviews: 156,
    image: '/placeholder.svg',
    category: 'Gemstones',
    description: 'Natural Blue Sapphire for Saturn planet. Certified and energized.',
    benefits: ['Career Growth', 'Mental Peace', 'Financial Stability'],
    inStock: true,
  },
  {
    id: 2,
    name: 'पन्ना रत्न',
    english: 'Emerald',
    price: 25000,
    originalPrice: 30000,
    rating: 4.9,
    reviews: 203,
    image: '/placeholder.svg',
    category: 'Gemstones',
    description: 'Premium quality Emerald for Mercury planet. Lab certified.',
    benefits: ['Intelligence', 'Communication', 'Business Success'],
    inStock: true,
  },
  {
    id: 3,
    name: 'रुद्राक्ष माला',
    english: 'Rudraksha Mala',
    price: 2500,
    originalPrice: 3500,
    rating: 4.7,
    reviews: 89,
    image: '/placeholder.svg',
    category: 'Rudraksha',
    description: '108 beads Rudraksha mala for meditation and spiritual growth.',
    benefits: ['Spiritual Growth', 'Peace of Mind', 'Protection'],
    inStock: true,
  },
  {
    id: 4,
    name: 'श्री यंत्र',
    english: 'Shri Yantra',
    price: 5000,
    originalPrice: 7000,
    rating: 4.6,
    reviews: 67,
    image: '/placeholder.svg',
    category: 'Yantras',
    description: 'Copper Shri Yantra for wealth and prosperity. Energized by mantras.',
    benefits: ['Wealth', 'Prosperity', 'Success'],
    inStock: false,
  },
  {
    id: 5,
    name: 'मूंगा रत्न',
    english: 'Red Coral',
    price: 8000,
    originalPrice: 12000,
    rating: 4.5,
    reviews: 134,
    image: '/placeholder.svg',
    category: 'Gemstones',
    description: 'Natural Red Coral for Mars planet. Boosts energy and confidence.',
    benefits: ['Energy', 'Confidence', 'Leadership'],
    inStock: true,
  },
  {
    id: 6,
    name: 'गणेश यंत्र',
    english: 'Ganesh Yantra',
    price: 3000,
    originalPrice: 4000,
    rating: 4.8,
    reviews: 92,
    image: '/placeholder.svg',
    category: 'Yantras',
    description: 'Brass Ganesh Yantra for removing obstacles and bringing success.',
    benefits: ['Remove Obstacles', 'Success', 'New Beginnings'],
    inStock: true,
  },
];

const categories = ['All', 'Gemstones', 'Rudraksha', 'Yantras', 'Crystals', 'Books'];

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.english.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // popular (default order)
    });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-4">
            <ShoppingBag className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Astro Shop</span>
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold text-foreground mb-2">
            <span className="text-shimmer">रत्न</span> दुकान
          </h1>
          <p className="text-muted-foreground">Certified Gemstones, Rudraksha, Yantras & More</p>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-lg border border-input bg-background"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
            </select>

            {/* Filter Toggle */}
            <Button variant="spiritual" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>

          {/* Category Filters */}
          {showFilters && (
            <div className="flex flex-wrap gap-2 p-4 rounded-xl bg-muted/50">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-primary text-white'
                      : 'bg-card border border-border hover:border-primary'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="card-spiritual p-4 hover:shadow-elevated transition-all group">
              {/* Product Image */}
              <div className="relative mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-xl bg-muted"
                />
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
                    <span className="text-white font-medium">Out of Stock</span>
                  </div>
                )}
                <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors">
                  <Heart className="w-4 h-4 text-muted-foreground hover:text-red-500" />
                </button>
              </div>

              {/* Product Info */}
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-foreground font-hindi">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.english}</p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-accent fill-accent" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">({product.reviews} reviews)</span>
                </div>

                {/* Benefits */}
                <div className="flex flex-wrap gap-1">
                  {product.benefits.slice(0, 2).map((benefit) => (
                    <span key={benefit} className="px-2 py-0.5 rounded-full bg-primary/10 text-xs text-primary">
                      {benefit}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button 
                    variant="spiritual" 
                    size="sm" 
                    className="flex-1"
                    disabled={!product.inStock}
                  >
                    View Details
                  </Button>
                  <Button 
                    variant="saffron" 
                    size="sm" 
                    className="flex-1"
                    disabled={!product.inStock}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-10">
          <Button variant="spiritual" size="lg">
            Load More Products
          </Button>
        </div>

        {/* Bottom Info */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 rounded-xl bg-muted/50">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
              <span className="text-green-600 text-xl">✓</span>
            </div>
            <h3 className="font-semibold mb-2">Certified Products</h3>
            <p className="text-sm text-muted-foreground">All gemstones come with lab certification</p>
          </div>
          <div className="text-center p-6 rounded-xl bg-muted/50">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
              <span className="text-blue-600 text-xl">🚚</span>
            </div>
            <h3 className="font-semibold mb-2">Free Shipping</h3>
            <p className="text-sm text-muted-foreground">Free delivery on orders above ₹5,000</p>
          </div>
          <div className="text-center p-6 rounded-xl bg-muted/50">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-3">
              <span className="text-purple-600 text-xl">🔮</span>
            </div>
            <h3 className="font-semibold mb-2">Energized Items</h3>
            <p className="text-sm text-muted-foreground">All products are energized with mantras</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;