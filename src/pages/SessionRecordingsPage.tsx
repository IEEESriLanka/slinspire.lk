import { motion } from "framer-motion";
import { PageLayout } from "@/components/layout/PageLayout";
import { VideoCategoryCard } from "@/features/videos/components/VideoCategoryCard";
import { videoCategories } from "@/data/videoCategories";

export const SessionRecordingsPage = () => {
  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-12 mt-7 text-center"
      >
        <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
          Session <span className="text-purple-600">Recordings</span>
        </h2>
        <p className="max-w-3xl mx-auto text-xl leading-relaxed text-gray-600">
          Browse through our collection of recorded sessions
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videoCategories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <VideoCategoryCard
              id={category.id}
              name={category.name}
              description={category.description}
              image={category.image}
            />
          </motion.div>
        ))}
      </div>
    </PageLayout>
  );
};
