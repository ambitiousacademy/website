import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '@/lib/utils';

export interface Post {
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  excerpt: string;
  category: string;
  author: string;
  authorImage?: string;
  content: string;
  tags?: string[];
  featured?: boolean;
}

interface BlogCardProps {
  post: Post;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="block group hover:shadow-lg transition-shadow duration-300 bg-white rounded-lg overflow-hidden border border-gray-200"
    >
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-academy-teal/10 text-academy-teal">
            {post.category}
          </span>
          <span className="text-gray-500 text-sm">{formatDate(post.date)}</span>
        </div>
        <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-academy-teal transition-colors">
          {post.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <img
              src={
                post.authorImage ||
                'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
              }
              alt={post.author}
              className="h-8 w-8 rounded-full"
            />
          </div>
          <div className="ml-3 text-sm text-gray-700">{post.author}</div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
