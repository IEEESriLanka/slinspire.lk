import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Heart, MessageCircle, Share2 } from "lucide-react";
import { Button } from "../ui/button";

export const GallerySection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Mock Instagram-style data
  const galleryItems = [
    {
      id: 1,
      image: "whatsapp-image-2025-03-29-at-13-06-26-f7c019eb-3-3.png",
      caption: "Career guidance session at University of Colombo - Amazing turnout! 🎓",
      likes: 245,
      comments: 18,
      date: "2 days ago"
    },
    {
      id: 2,
      image: "whatsapp-image-2025-03-29-at-13-06-25-dd8939ba-3-3.png",
      caption: "Workshop on A/L subject selection - Helping students make informed decisions 📚",
      likes: 189,
      comments: 12,
      date: "4 days ago"
    },
    {
      id: 3,
      image: "event-photo-3.png",
      caption: "Interactive session with industry professionals from tech sector 💻",
      likes: 312,
      comments: 25,
      date: "1 week ago"
    },
    {
      id: 4,
      image: "event-photo-3.png",
      caption: "O/L students learning about career pathways - Future leaders! 🌟",
      likes: 156,
      comments: 8,
      date: "1 week ago"
    },
    {
      id: 5,
      image: "seminar-photo-1.png",
      caption: "Panel discussion with university professors and alumni 🎯",
      likes: 278,
      comments: 21,
      date: "2 weeks ago"
    },
    {
      id: 6,
      image: "students-photo-1.png",
      caption: "Networking session - Building connections for the future 🤝",
      likes: 203,
      comments: 15,
      date: "2 weeks ago"
    }
  ];

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

        {/* Masonry Grid */}
        <div className="gap-6 space-y-6 columns-1 md:columns-2 lg:columns-3">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="break-inside-avoid"
            >
              <div className="overflow-hidden transition-all duration-300 bg-white shadow-lg rounded-2xl hover:shadow-xl group">
                {/* Image */}
                <div 
                  className="relative overflow-hidden cursor-pointer"
                  onClick={() => setSelectedImage(item.id)}
                >
                  <img
                    src={item.image}
                    alt={`Gallery item ${item.id}`}
                    className="object-cover w-full h-auto transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center transition-colors duration-300 bg-black/0 group-hover:bg-black/20">
                    <ExternalLink className="w-8 h-8 text-white transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <p className="mb-3 leading-relaxed text-gray-800">
                    {item.caption}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1 transition-colors hover:text-red-500">
                        <Heart className="w-4 h-4" />
                        <span>{item.likes}</span>
                      </button>
                      <button className="flex items-center gap-1 transition-colors hover:text-blue-500">
                        <MessageCircle className="w-4 h-4" />
                        <span>{item.comments}</span>
                      </button>
                      <button className="flex items-center gap-1 transition-colors hover:text-green-500">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Button
            variant="outline"
            size="lg"
            className="px-8 py-3 text-purple-600 border-purple-300 hover:bg-purple-50"
          >
            Load More Photos
          </Button>
        </motion.div>
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
            onClick={(e: { stopPropagation: () => any; }) => e.stopPropagation()}
          >
            <img
              src={galleryItems.find(item => item.id === selectedImage)?.image}
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