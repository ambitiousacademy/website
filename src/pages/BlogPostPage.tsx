import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { formatDate } from '../lib/utils';
import { ArrowLeft, Calendar, Tag, User } from 'lucide-react';
import BlogCard, { Post } from '@/components/BlogCard';
import { getAllPosts, getPostBySlug } from '@/service/blogService';

const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) {
        setError('Post not found');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const fetchedPost = await getPostBySlug(id);
        
        if (!fetchedPost) {
          setError('Post not found');
          setLoading(false);
          return;
        }

        setPost(fetchedPost);

        // Fetch related posts (same category)
        const allPosts = await getAllPosts();
        const related = allPosts
          .filter(p => p.category === fetchedPost.category && p.slug !== fetchedPost.slug)
          .slice(0, 3);
        
        setRelatedPosts(related);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
    // Scroll to top when post changes
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-academy-teal"></div>
        </div>
      </Layout>
    );
  }

  if (error || !post) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">{error || 'Post not found'}</h1>
          <p className="mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/blog" 
            className="inline-flex items-center px-4 py-2 bg-academy-teal text-white rounded-md hover:bg-academy-teal/90 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Link 
              to="/blog" 
              className="inline-flex items-center text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Blog
            </Link>
            <span className="text-gray-500">•</span>
            <Link 
              to={`/blog?category=${post.category}`} 
              className="text-gray-300 hover:text-white transition-colors"
            >
              {post.category}
            </Link>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-300">
            <div className="flex items-center">
              <User className="mr-1 h-4 w-4" />
              {post.author}
            </div>
            <div className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              {formatDate(post.date)}
            </div>
            {post.tags && post.tags.length > 0 && (
              <div className="flex items-center">
                <Tag className="mr-1 h-4 w-4" />
                {post.tags.slice(0, 3).join(', ')}
                {post.tags.length > 3 && '...'}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <div className="relative -mt-8 mb-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="aspect-[21/9] rounded-lg overflow-hidden shadow-xl">
            <img 
              src={post.coverImage} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Post Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
          <MarkdownRenderer content={post.content} />
        </div>
      
        {/* Author Info */}
        <div className="mt-10 bg-gray-50 rounded-lg p-6 flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <img 
            src={post.authorImage || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"} 
            alt={post.author} 
            className="h-16 w-16 rounded-full"
          />
          <div>
            <h3 className="text-lg font-semibold">{post.author}</h3>
            <p className="text-gray-600 mb-2">Legal Expert at Ambitious Academy</p>
            <p className="text-gray-700">
              Expert in {post.category} with years of practical experience. Writes about legal trends and practical insights for legal professionals.
            </p>
          </div>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <Link 
                  key={tag} 
                  to={`/blog?tag=${tag}`}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map(relatedPost => (
                <BlogCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default BlogPostPage;