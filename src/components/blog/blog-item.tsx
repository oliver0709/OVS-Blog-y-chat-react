import React from "react";
import { Link } from "react-router-dom";
import striptags from "striptags";

interface BlogItemProps {
  blogItem: {
    id: number;
    blog_status: string;
    content: string;
    title: string;
    featured_image_url?: string;
  };
}

const BlogItem: React.FC<BlogItemProps> = ({ blogItem }) => {
  const { id, title, content, featured_image_url } = blogItem;

  
  const truncatedContent = striptags(content).substring(0, 200);

  return (
    <div className="mb-6 p-4 border-b border-gray-200">
      {featured_image_url && (
        <img
          src={featured_image_url}
          alt={title}
          className="w-full h-48 object-cover mb-4"
        />
      )}
      <Link to={`/b/${id}`} className="text-xl font-semibold text-blue-500 hover:text-blue-700 no-underline">
        <h1>{title}</h1>
      </Link>
      <div className="text-gray-600">
        <p>
          {truncatedContent}
          {content.length > 200 && (
            <span>
             
              ...{" "}
              <Link to={`/b/${id}`} className="text-blue-500 hover:text-blue-700 no-underline">
                Read more
              </Link>
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default BlogItem;

