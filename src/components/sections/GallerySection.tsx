import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink } from "lucide-react";
import { Button } from "../ui/button";

interface GalleryItem {
  id: string;
  title: string;
  image: string;
  caption: string;
  date: string;
}

export const GallerySection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [galleryData, setGalleryData] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  //fetch JSON data
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/GallerySectionData.json`)
      .then((res) => res.json())
      .then((data: GalleryItem[]) => {
        setGalleryData(data);
        setTimeout(() => setIsLoading(false), 1000); // Simulate loading delay
      })
      .catch((err) => {
        console.error("Error loading gallery data", err);
        setIsLoading(false);
      });
  }, []);

  // Lightbox functionality
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    if (selectedImage !== null) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="container px-4 mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            Event <span className="text-purple-600">Gallery</span>
          </h2>
          <p className="max-w-3xl mx-auto text-xl leading-relaxed text-gray-600">
            Moments captured from our career guidance sessions, seminars and workshops across the country.
          </p>
        </motion.div>

        {/* Loading Skeleton */}
        {isLoading ? (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 animate-pulse">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col overflow-hidden bg-gray-200 rounded-2xl h-80"
              >
                <div className="w-full h-64 bg-gray-300" />
                <div className="p-4">
                  <div className="w-1/2 h-4 mb-2 bg-gray-300 rounded"></div>
                  <div className="w-3/4 h-3 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {galleryData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="flex flex-col"
              >
                <div className="overflow-hidden transition-all duration-300 bg-white shadow-lg rounded-2xl hover:shadow-xl group flex flex-col h-full">
                  {/* Image */}
                  <div
                    className="relative overflow-hidden cursor-pointer"
                    onClick={() => setSelectedImage(item.id)}
                  >
                    <img
                      src={`${import.meta.env.BASE_URL}${"gallery/"}${item.image}`}
                      alt={`Gallery item ${item.id}`}
                      className="object-cover w-full h-64 transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 flex items-center justify-center transition-colors duration-300 bg-black/0 group-hover:bg-black/20">
                      <ExternalLink className="w-8 h-8 text-white transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 flex flex-col flex-1">
                    <h5 className="flex items-center text-sm text-gray-500">{item.title}</h5>
                    <p className="mb-3 leading-relaxed text-gray-800 flex-1">
                      {item.caption}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div />
                      <div>{item.date}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="relative max-w-4xl max-h-full"
            onClick={(e: { stopPropagation: () => any }) => e.stopPropagation()}
          >
            <img
              src={`${import.meta.env.BASE_URL}${"gallery/"}${galleryData.find(item => item.id === selectedImage)?.image}`}
              alt="Gallery item"
              className="object-contain max-w-full max-h-full rounded-lg"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute p-2 text-white transition-colors rounded-full top-4 right-4 bg-black/50 hover:bg-black/70"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};
