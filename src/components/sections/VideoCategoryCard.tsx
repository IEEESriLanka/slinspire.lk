import React from "react";
import { Play } from "lucide-react";

interface VideoCategoryCard {
    id: number;
    name: string;
    description: string;
    image?: string;
}

export const VideoCategoryCard: React.FC<VideoCategoryCard> = ({
                                                                        id,
                                                                        name,
                                                                        description,
                                                                        image,
                                                                    }) => {
    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
            {/* Image Section */}
            <div className="relative h-48 bg-gradient-to-br from-purple-200 to-indigo-200 flex items-center justify-center">
                {image ? (
                    <img src={image} alt={name} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <Play className="w-16 h-16 text-purple-500 opacity-50" />
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="p-6">
                {/* Icon and Title */}
                <div className="flex items-start gap-4 mb-4">
                    <div className="bg-purple-600 rounded-xl p-3 flex-shrink-0">
                        <Play className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{name}</h3>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>

                {/* Button */}
                <a
                    href={`#/playlist/${id}`}
                    className="inline-flex items-center justify-center gap-2 w-full bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-all duration-200"
                >
                    View Videos
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                    </svg>
                </a>
            </div>
        </div>
    );
};
