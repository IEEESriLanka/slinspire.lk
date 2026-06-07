import { BookOpen, Boxes, Link, University } from "lucide-react";
import { DegreeRecord } from "./DegreeCardGrid";


export default function DegreeCard({ degree }: {degree: DegreeRecord}) {
    return (
        <div className='relative overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100 z-10 rounded-xl' >
            <div className="absolute h-full w-full z-20">
                <div className="absolute -left-12 -bottom-20 w-96 h-96 bg-white rounded-full opacity-70"></div>
            </div>
            <div className='relative h-full  p-4 rounded-xl border-black/10 border shadow-lg flex flex-col gap-3 hover:shadow-xl duration-100 z-30' >
                <span className='inline-flex items-baseline gap-1 text-[10px] text-gray-500 uppercase'><University size={10} color="purple" /> {degree.universityName}</span>
                <div id='card-header' className='flex gap-4 h-full'>
                    <div className='w-12 h-12 aspect-square  rounded-xl bg-purple-200 flex items-center justify-center'>
                        <University size={20} color='purple' className='m-auto' />
                    </div>
                    <div className='flex flex-col'>

                        <h3 className='text-sm font-medium'>{degree.courseName}</h3>
                        <span className='text-xs text-gray-600 inline-flex items-center gap-1 -ml-1'><BookOpen className='h-3' /> {degree.majorField}</span>
                        <div id="card-content" className='flex flex-row gap-2 items-start pt-2'>
                            <div className='text-[10px] font-medium  inline-block px-1 data-[internal=true]:text-purple-700  data-[internal=true]:bg-purple-500/30 bg-gray-100 rounded-sm' data-internal={degree.courseType === 'INTERNAL' ? 'true' : 'false'}>
                                {degree.courseType}
                            </div>
                            <div className='text-[10px] font-medium uppercase inline-block px-1 data-[internal=true]:text-blue-700  data-[internal=true]:bg-blue-500/30 data-[internal=false]:text-green-700 data-[internal=false]:bg-green-500/30 rounded-sm' data-internal={degree.isPaid ? 'false' : 'true'}>
                                {degree.isPaid ? 'Paid' : 'Free'}
                            </div>
                            <div className='text-[10px] font-medium uppercase inline-block px-1 data-[fulltime=true]:text-green-700  data-[fulltime=true]:bg-green-500/30 data-[parttime=true]:text-blue-700 data-[parttime=true]:bg-blue-500/30 rounded-sm' data-fulltime={degree.courseMode === 'Full Time' ? 'true' : 'false'} data-parttime={degree.courseMode === 'Part Time' ? 'true' : 'false'}>
                                {degree.courseMode || 'N/A'}
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}