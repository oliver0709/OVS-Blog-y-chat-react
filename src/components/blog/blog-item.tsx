import React from "react";
import { Link } from "react-router-dom";
import striptags from "striptags";
import TruncateMarkup from "react-truncate-markup";

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
  const { id, title, content } = blogItem;

  return (
    <div className="mb-6 p-4 border-b border-gray-200">
      <Link to={`/b/${id}`} className="text-xl font-semibold text-blue-500 hover:underline">
        <h1>{title}</h1>
      </Link>
      <div className="text-gray-600">
        <TruncateMarkup lines={5}>
          <div>
            {striptags(content)}
            <span className="text-blue-400">
              ...<Link to={`/b/${id}`} className="hover:underline">Read more</Link>
            </span>
          </div>
        </TruncateMarkup>
      </div>
    </div>
  );
};

export default BlogItem;
