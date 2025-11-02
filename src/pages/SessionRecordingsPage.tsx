import React from 'react'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { VideoCategoryCard } from '../components/sections/VideoCategoryCard.tsx';
import { videoCategories } from '../data/videoCategories';

export const SessionRecordingsPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
            <Header isMainPage={false} />
            <main className='max-w-7xl mx-auto px-4 py-24'>
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Session Recordings</h1>
                    <p className="text-lg text-gray-600">Browse through our collection of recorded sessions</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videoCategories.map((category) => (
                        <VideoCategoryCard
                            key={category.id}
                            id={category.id}
                            name={category.name}
                            description={category.description}
                            image={category.image}
                        />
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
}