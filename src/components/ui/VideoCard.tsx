import React from 'react';
import { Play } from 'lucide-react';

interface VideoCardProps {
    title: string;
    videoUrl: string;
    thumbnail?: string;
}

export const VideoCard: React.FC<VideoCardProps> = ({
                                                        title,
                                                        videoUrl,
                                                        thumbnail
                                                    }) => {
    // Extract YouTube video ID from URL
    const getYouTubeId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const videoId = getYouTubeId(videoUrl);
    const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    const thumbnailUrl = thumbnail || (videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null);

    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
            {/* Video Player Section */}
            <div className="relative aspect-video bg-gradient-to-br from-purple-100 to-indigo-100">
                {embedUrl ? (
                    <iframe
                        src={embedUrl}
                        title={title}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                ) : thumbnailUrl ? (
                    <img
                        src={thumbnailUrl}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <Play className="w-16 h-16 text-purple-400" />
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">
                    {title}
                </h3>
            </div>
        </div>
    );
};