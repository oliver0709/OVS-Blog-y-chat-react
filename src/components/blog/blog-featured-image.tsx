import React, { FC } from 'react';

interface BlogFeaturedImageProps {
  image: string | null;
}

const BlogFeaturedImage: FC<BlogFeaturedImageProps> = ({ image }) => {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error('Error loading image:', e);
  };

  // Aseguramos que la imagen tenga una URL válida
  const imageUrl = image ? image : '';

  return (
    <div className="w-full h-auto p-4 bg-gray-100 rounded-md">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Blog featured"
          onError={handleError}
          className="w-full h-auto object-cover rounded-md"
        />
      ) : (
        <p className="text-center text-gray-500">No featured image available</p>
      )}
    </div>
  );
};

export default BlogFeaturedImage;
