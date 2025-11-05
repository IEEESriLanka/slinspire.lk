import React, { useState, useMemo } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { VideoCard } from '../components/ui/VideoCard';
import { videos } from '../data/Videos.ts';
import { videoCategories } from '../data/videoCategories';
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

export const VideoPlaylistPage = () => {
    const { categoryId } = useParams();
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
    const [currentPage, setCurrentPage] = useState(1);
    const videosPerPage = 5; // Number of videos per page

    // Get category details
    const category = videoCategories.find(c => c.id === Number(categoryId));

    // Filter videos by category
    const categoryVideos = videos.filter(v => v.categoryId === Number(categoryId));

    // Search and sort videos
    const filteredAndSortedVideos = useMemo(() => {
        let filtered = categoryVideos.filter(video =>
            video.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        return filtered.sort((a, b) => {
            return sortOrder === 'newest' ? b.id - a.id : a.id - b.id;
        });
    }, [categoryVideos, searchQuery, sortOrder]);

    // Pagination logic
    const totalPages = Math.ceil(filteredAndSortedVideos.length / videosPerPage);
    const startIndex = (currentPage - 1) * videosPerPage;
    const endIndex = startIndex + videosPerPage;
    const currentVideos = filteredAndSortedVideos.slice(startIndex, endIndex);

    // Reset to page 1 when search or sort changes
    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, sortOrder]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
            <Header isMainPage={false} />
            <main className="max-w-5xl mx-auto px-4 py-24">
                {/* Page Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-12 mt-7 text-center"
                >
                    <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
                        {category?.name || 'Video Playlist'} <span className="text-purple-600">{""}</span>
                    </h2>
                    <p className="max-w-3xl mx-auto text-xl leading-relaxed text-gray-600">
                        {category?.description || 'Browse through our video collection'}
                    </p>
                    <div className="mt-4 text-sm text-gray-500">
                        {filteredAndSortedVideos.length} video{filteredAndSortedVideos.length !== 1 ? 's' : ''} available
                    </div>
                </motion.div>

                {/* Search and Sort Controls */}
                <div className="bg-white rounded-xl shadow-md p-4 mb-8 flex flex-col md:flex-row gap-4">
                    {/* Search Bar */}
                    <div className="flex-grow relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search videos by name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>

                    {/* Sort Dropdown */}
                    <div className="relative md:w-64">
                        <SlidersHorizontal className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white cursor-pointer"
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                        </select>
                    </div>
                </div>

                {/* Video List - One per row */}
                {currentVideos.length > 0 ? (
                    <>
                        <div className="space-y-6 mb-8">
                            {currentVideos.map((video) => (
                                <VideoCard
                                    key={video.id}
                                    title={video.title}
                                    videoUrl={video.videoUrl}
                                    thumbnail={video.thumbnail}
                                />
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-2">
                                {/* Previous Button */}
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-all ${currentPage === 1
                                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        : 'bg-white text-purple-600 hover:bg-purple-50 shadow-md'
                                        }`}
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                    Previous
                                </button>

                                {/* Page Numbers */}
                                <div className="flex gap-2">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                        <button
                                            key={page}
                                            onClick={() => handlePageChange(page)}
                                            className={`w-10 h-10 rounded-lg font-medium transition-all ${currentPage === page
                                                ? 'bg-purple-600 text-white shadow-md'
                                                : 'bg-white text-gray-700 hover:bg-purple-50 shadow-md'
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                </div>

                                {/* Next Button */}
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-all ${currentPage === totalPages
                                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        : 'bg-white text-purple-600 hover:bg-purple-50 shadow-md'
                                        }`}
                                >
                                    Next
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-16">
                        <div className="text-gray-400 mb-4">
                            <Search className="w-16 h-16 mx-auto" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No videos found</h3>
                        <p className="text-gray-500">Try adjusting your search query</p>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};