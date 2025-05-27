
// This function would typically fetch from an API, but for now 
// we're using hard-coded data that resembles what we'd get from

import { Post } from "@/components/BlogCard";

// parsing our markdown files
export async function getAllPosts(): Promise<Post[]> {
  return [
    {
      slug: 'introduction-to-legal-tech',
      title: 'Introduction to Legal Technology: Transforming Practice in the Digital Age',
      date: '2023-05-15',
      coverImage: 'https://images.unsplash.com/photo-1633613286991-611fe299c4be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      excerpt: 'An overview of how technology is reshaping the legal profession, from AI-powered research to blockchain contracts.',
      category: 'Legal Technology',
      author: 'Michael Johnson, J.D.',
      authorImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      content: '',
      tags: ['legal tech', 'artificial intelligence', 'blockchain', 'automation', 'future of law'],
      featured: true
    },
    {
      slug: 'contract-drafting-best-practices',
      title: 'Contract Drafting Best Practices: A Comprehensive Guide',
      date: '2023-06-22',
      coverImage: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      excerpt: 'Learn essential techniques for drafting clear, effective, and enforceable contracts that protect your clients\' interests.',
      category: 'Contract Law',
      author: 'Sarah Williams, Esq.',
      authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      content: '',
      tags: ['contracts', 'drafting', 'legal writing', 'risk management'],
      featured: true
    },
    {
      slug: 'environmental-law-developments',
      title: 'Recent Developments in Environmental Law: Climate Litigation and Corporate Compliance',
      date: '2023-07-18',
      coverImage: 'https://images.unsplash.com/photo-1470723710355-95304d8aece4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      excerpt: 'An analysis of recent climate litigation cases and their implications for corporate environmental compliance strategies.',
      category: 'Environmental Law',
      author: 'David Chen, J.D.',
      authorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      content: '',
      tags: ['environmental law', 'climate litigation', 'ESG', 'corporate compliance', 'regulatory'],
      featured: false
    }
  ];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getAllPosts();
  const post = posts.find(p => p.slug === slug);
  
  if (!post) {
    return null;
  }
  
  // In a real implementation, we would fetch the markdown content here
  // and parse it into HTML
  if (slug === 'introduction-to-legal-tech') {
    post.content = await fetch('/blog/introduction-to-legal-tech.md').then(res => res.text());
  } else if (slug === 'contract-drafting-best-practices') {
    post.content = await fetch('/blog/contract-drafting-best-practices.md').then(res => res.text());
  } else if (slug === 'environmental-law-developments') {
    post.content = await fetch('/blog/environmental-law-developments.md').then(res => res.text());
  } else {
    post.content = '# This is a placeholder content\n\nThe actual content would be loaded from a markdown file.';
  }
  
  return post;
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter(post => post.category === category);
}

export async function getCategories(): Promise<string[]> {
  const posts = await getAllPosts();
  const categories = new Set(posts.map(post => post.category));
  return Array.from(categories);
}

export async function getFeaturedPosts(): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter(post => post.featured);
}