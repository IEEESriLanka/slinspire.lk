import React from 'react'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'

export const CareerCompassBookPage = () => {
  return (

    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 flex flex-col">
      <Header isMainPage={false} />
      <main className="flex-1 max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Career Compass <span className="text-purple-600">Book</span>
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
            Explore your career options with our comprehensive guide, designed to empower Sri Lankan students and professionals. [Sample Texts]
          </p>
          <a
            href="career-compass-book-2020.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 text-lg"
          >
            View the Book (PDF)
          </a>
        </div>
        <div className="bg-white rounded-2xl shadow-xl border border-purple-100 p-8 md:p-12 mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-purple-700">What is Career Compass?</h2>
          <p className="text-lg text-gray-700 mb-8">
            Career Compass is a detailed guide designed to help you navigate your career path. It includes insights
            on various industries, job roles, and the skills required to succeed in today's job market.[Sample Texts]
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-purple-700">Why Download the Book?</h2>
          <ul className="list-disc list-inside text-lg text-gray-700 mb-8 space-y-2">
            <li>Gain insights into different career paths</li>
            <li>Understand the skills needed for various roles</li>
            <li>Get tips on job searching and career development</li>
            <li>Access resources for further learning</li>[Sample Texts]
          </ul>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-purple-700">Who is it for?</h2>
          <p className="text-lg text-gray-700 mb-8">
            Whether you are a student exploring career options, a professional looking to switch fields, or someone
            seeking to enhance your skills, Career Compass is designed for you. It provides valuable information for
            anyone at any stage of their career journey.[Sample Texts]
          </p>
        </div>
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-purple-700 text-center">Read the Book Online</h2>
          <div className="w-full h-[700px] rounded-2xl overflow-hidden shadow-2xl border-2 border-purple-100 bg-gradient-to-br from-purple-50 to-indigo-50">
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
