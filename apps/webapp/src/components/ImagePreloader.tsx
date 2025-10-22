import React, { useEffect } from 'react';

const ImagePreloader: React.FC<{ imageUrls: string[] }> = ({ imageUrls }) => {
  useEffect(() => {
    const preloadImages = async () => {
      const promises = imageUrls.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = reject;
        });
      });
      await Promise.all(promises);
    };

    preloadImages();
  }, [imageUrls]);

  return null;
};

export default ImagePreloader;
