import React from 'react';
import { cn } from '../lib/utils';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  className?: string;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  className,
}) => {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      <button
        onClick={() => onSelectCategory(null)}
        className={cn(
          "px-3 py-1 rounded-full text-sm font-medium transition-colors",
          selectedCategory === null
            ? "bg-academy-teal text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        )}
      >
        All
      </button>
      
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={cn(
            "px-3 py-1 rounded-full text-sm font-medium transition-colors",
            selectedCategory === category
              ? "bg-academy-teal text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;