import React from 'react'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { TeamDetailsSection } from '../components/sections/TeamDetailsSection';

export const TeamPage = () => {
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
            <Header isMainPage={false} />
            <main className='max-w-7xl mx-auto px-4 py-24'>
                <TeamDetailsSection />
            </main>
            <Footer />
        </div>
    );
}
