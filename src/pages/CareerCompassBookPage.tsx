import { PageLayout } from "@/components/layout/PageLayout";
import { APP_CONFIG } from "@/config/constants";

export const CareerCompassBookPage = () => {
  const book = APP_CONFIG.ASSETS.CAREER_BOOK_PDF;

  return (
    <PageLayout>
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
          Career Compass <span className="text-purple-600">Book</span>
        </h1>
        <a
          href={book}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 text-lg"
        >
          View the Book (PDF)
        </a>
      </div>
      <div className="bg-white rounded-2xl shadow-xl border border-purple-100 p-8 md:p-12 mb-16">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-purple-700">
          What is Career Compass Book?
        </h2>
        <p className="text-lg text-gray-700 mb-8">
          A comprehensive, easily readable, printed version of the career
          compass database which contains details about degree programs, in a
          booklet of recognized higher education programs available in Sri
          Lanka.
        </p>
      </div>
      <div className="mb-16 w-full">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-purple-700 text-center">
          Read the Book Online
        </h2>
        <div className="w-full h-[700px] rounded-2xl overflow-hidden shadow-2xl border-2 border-purple-100 bg-gradient-to-br from-purple-50 to-indigo-50">
          <iframe
            src={book}
            title="Career Compass Book"
            width="100%"
            height="100%"
            className="w-full h-full"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </PageLayout>
  );
};
