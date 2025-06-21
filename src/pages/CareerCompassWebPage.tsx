import React from 'react'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { ServicesSection } from '../components/sections/ServicesSection'
import GoogleSheetTable from '../components/sections/DegreeSearchTable'

export const CareerCompassWeb = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
            <Header isMainPage={false}/>
            <main className='max-w-7xl mx-auto px-4 py-24'>
                <GoogleSheetTable />
            </main>
            <Footer />
        </div>
    );
}
