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
      image: "/whatsapp-image-2025-03-29-at-13-06-26-f7c019eb-3-3.png",
      caption: "Career guidance session at University of Colombo - Amazing turnout! 🎓",
      likes: 245,
      comments: 18,
      date: "2 days ago"
    },
    {
      id: 2,
      image: "/whatsapp-image-2025-03-29-at-13-06-25-dd8939ba-3-3.png",
      caption: "Workshop on A/L subject selection - Helping students make informed decisions 📚",
      likes: 189,
      comments: 12,
      date: "4 days ago"
    },
    {
      id: 3,
      image: "/event-photo-3.png",
      caption: "Interactive session with industry professionals from tech sector 💻",
      likes: 312,
      comments: 25,
      date: "1 week ago"
    },
    {
      id: 4,
      image: "/workshop-photo-3.png",
      caption: "O/L students learning about career pathways - Future leaders! 🌟",
      likes: 156,
      comments: 8,
      date: "1 week ago"
    },
    {
      id: 5,
      image: "/seminar-photo-1.png",
      caption: "Panel discussion with university professors and alumni 🎯",
      likes: 278,
      comments: 21,
      date: "2 weeks ago"
    },
    {
      id: 6,
      image: "/students-photo-1.png",
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
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Event <span className="text-purple-600">Gallery</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Moments captured from our seminars, workshops, and career guidance sessions across Sri Lanka.
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="break-inside-avoid"
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
                {/* Image */}
                <div 
                  className="relative overflow-hidden cursor-pointer"
                  onClick={() => setSelectedImage(item.id)}
                >
                  <img
                    src={item.image}
                    alt={`Gallery item ${item.id}`}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <ExternalLink className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <p className="text-gray-800 mb-3 leading-relaxed">
                    {item.caption}
                  </p>
                  
                  <div className="flex items-center justify-between text-gray-500 text-sm">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                        <Heart className="h-4 w-4" />
                        <span>{item.likes}</span>
                      </button>
                      <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                        <MessageCircle className="h-4 w-4" />
                        <span>{item.comments}</span>
                      </button>
                      <button className="flex items-center gap-1 hover:text-green-500 transition-colors">
                        <Share2 className="h-4 w-4" />
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
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            size="lg"
            className="px-8 py-3 border-purple-300 text-purple-600 hover:bg-purple-50"
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
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="relative max-w-4xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryItems.find(item => item.id === selectedImage)?.image}
              alt="Gallery item"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};