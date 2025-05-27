import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import BlogCard, { Post } from '../components/BlogCard';
import CategoryFilter from '../components/CategoryFilter';
import { ArrowUp } from 'lucide-react';
import { getAllPosts, getCategories } from '@/service/blogService';
import SearchBar from '@/components/Searchbar';

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [allPosts, allCategories] = await Promise.all([
          getAllPosts(),
          getCategories(),
        ]);
        
        setPosts(allPosts);
        setFilteredPosts(allPosts);
        setCategories(allCategories);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let result = posts;

    // Filter by category if selected
    if (selectedCategory) {
      result = result.filter(post => post.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.author.toLowerCase().includes(query) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }

    // Sort by date (newest first)
    result = [...result].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    setFilteredPosts(result);
  }, [posts, selectedCategory, searchQuery]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Legal Insights Blog</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Expert analysis and practical guidance on current legal trends and developments
          </p>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              className="order-2 md:order-1"
            />
            <SearchBar
              onSearch={handleSearch} 
              className="order-1 md:order-2 md:w-72 lg:w-96"
            />
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-academy-teal"></div>
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-2">No posts found</h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria
              </p>
              <button 
                onClick={() => {
                  setSelectedCategory(null);
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 bg-academy-teal text-white rounded-md hover:bg-academy-teal/90 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-academy-teal text-white p-3 rounded-full shadow-lg hover:bg-academy-teal/90 transition-colors"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </Layout>
  );
};

export default BlogPage;