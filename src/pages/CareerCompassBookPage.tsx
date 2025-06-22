import React from 'react'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'

export const CareerCompassBookPage = () => {
  return (

    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      <Header isMainPage={false} />
      <main className='max-w-7xl mx-auto px-4 py-24'>
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6">Career Compass Book</h1>
          <p className="text-lg mb-4">Explore your career options with our comprehensive guide.</p>
          <a href="career-compass-book-2020.pdf" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
            View the Book
          </a>
        </div>
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">What is Career Compass?</h2>
          <p className="text-lg mb-6">
            Career Compass is a detailed guide designed to help you navigate your career path. It includes insights
            on various industries, job roles, and the skills required to succeed in today's job market.
          </p>
          <h2 className="text-2xl font-semibold mb-4">Why Download the Book?</h2>
          <ul className="list-disc list-inside text-lg mb-6">
            <li>Gain insights into different career paths</li>
            <li>Understand the skills needed for various roles</li>
            <li>Get tips on job searching and career development</li>
            <li>Access resources for further learning</li>
          </ul>
          <h2 className="text-2xl font-semibold mb-4">Who is it for?</h2>
          <p className="text-lg mb-6">
            Whether you are a student exploring career options, a professional looking to switch fields, or someone
            seeking to enhance your skills, Career Compass is designed for you. It provides valuable information for
            anyone at any stage of their career journey.
          </p>
          <div className="mt-10"></div>
          <h2 className="text-2xl font-semibold mb-4">Read the Book Online</h2>
          <div className="w-full h-[700px] rounded-lg overflow-hidden shadow-lg border">
            <iframe
              src="career-compass-book-2020.pdf"
              title="Career Compass Book"
              width="100%"
              height="100%"
              className="w-full h-full"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </main>
      <Footer />
    </div>

  )
}
