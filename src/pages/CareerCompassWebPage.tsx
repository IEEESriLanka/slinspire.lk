import React from 'react'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import GoogleSheetTable from '../components/sections/DegreeSearchTable'
import { DegreeTableFilters } from '../components/sections/DegreeTableFilters'

export const CareerCompassWeb = () => {
    const [filters, setFilters] = React.useState({
        university: '',
        course: '',
        majorField: '',
        type: '',
    });
    const [filterOptions, setFilterOptions] = React.useState({
        universities: [] as string[],
        majorFields: [] as string[],
        types: [] as string[],
    });
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
            <Header isMainPage={false} />
            <main className='max-w-7xl mx-auto px-4 py-24'>
                <DegreeTableFilters
                    filters={filters}
                    onChange={setFilters}
                    universityOptions={filterOptions.universities}
                    majorFieldOptions={filterOptions.majorFields}
                    typeOptions={filterOptions.types}
                />
                <GoogleSheetTable
                    filters={filters}
                    onFiltersChange={setFilters}
                    onFilterOptions={setFilterOptions}
                />
            </main>
            <Footer />
        </div>
    );
}
