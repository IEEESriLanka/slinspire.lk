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
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full border border-purple-100">
            {/* Image Section */}
            <div className="relative h-48 bg-gradient-to-br from-purple-200 to-indigo-200 flex items-center justify-center overflow-hidden">
                {image ? (
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <Play className="w-16 h-16 text-purple-500 opacity-50" />
                    </div>
                )}
                <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300"></div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-1">
                {/* Icon and Title */}
                <div className="flex items-start gap-4 mb-4">
                    <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl p-3 flex-shrink-0 shadow-md">
                        <Play className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 leading-snug">{name}</h3>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-3 leading-relaxed flex-1 min-h-[100px] max-h-[100px] overflow-hidden text-ellipsis line-clamp-3">
                    {description}
                </p>

                {/* Button pinned to bottom */}
                <div className="mt-auto pt-2">
                    <a
                        href={`#/playlist/${id}`}
                        className="inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:from-purple-700 hover:to-indigo-700 transition-all duration-300"
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
        </div>
    );
};
