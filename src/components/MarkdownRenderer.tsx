import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import { cn } from '../lib/utils';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className }) => {
  return (
    <div className={cn("prose prose-slate max-w-none", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        components={{
          h1: ({ node, ...props }) => (
            <h1 
              {...props} 
              className="text-3xl font-bold mt-8 mb-4 text-gray-900"
            />
          ),
          h2: ({ node, ...props }) => (
            <h2 
              {...props} 
              className="text-2xl font-bold mt-6 mb-3 text-gray-900"
            />
          ),
          h3: ({ node, ...props }) => (
            <h3 
              {...props} 
              className="text-xl font-bold mt-5 mb-2 text-gray-900"
            />
          ),
          p: ({ node, ...props }) => (
            <p 
              {...props} 
              className="my-4 text-gray-700 leading-relaxed"
            />
          ),
          ul: ({ node, ...props }) => (
            <ul 
              {...props} 
              className="list-disc pl-6 my-4 text-gray-700"
            />
          ),
          ol: ({ node, ...props }) => (
            <ol 
              {...props} 
              className="list-decimal pl-6 my-4 text-gray-700"
            />
          ),
          li: ({ node, ...props }) => (
            <li 
              {...props} 
              className="mb-1 text-gray-700"
            />
          ),
          a: ({ node, ...props }) => (
            <a 
              {...props} 
              className="text-academy-teal hover:underline"
              target={props.href?.startsWith('http') ? '_blank' : undefined}
              rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote 
              {...props} 
              className="border-l-4 border-academy-teal pl-4 italic my-4 text-gray-600"
            />
          ),
          code: ({ node, inline, ...props }) => (
            inline ? 
              <code 
                {...props} 
                className="bg-gray-100 text-academy-red px-1 py-0.5 rounded text-sm"
              /> : 
              <code 
                {...props} 
                className="block overflow-x-auto"
              />
          ),
          pre: ({ node, ...props }) => (
            <pre 
              {...props} 
              className="bg-gray-900 text-white p-4 rounded-md my-6 overflow-x-auto"
            />
          ),
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-6">
              <table 
                {...props} 
                className="min-w-full divide-y divide-gray-200"
              />
            </div>
          ),
          thead: ({ node, ...props }) => (
            <thead 
              {...props} 
              className="bg-gray-50"
            />
          ),
          th: ({ node, ...props }) => (
            <th 
              {...props} 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            />
          ),
          td: ({ node, ...props }) => (
            <td 
              {...props} 
              className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
            />
          ),
          img: ({ node, ...props }) => (
            <img 
              {...props} 
              className="max-w-full h-auto rounded-md my-6"
              loading="lazy"
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;