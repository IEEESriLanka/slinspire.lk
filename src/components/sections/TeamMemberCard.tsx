import React from 'react';
import {
    Phone as PhoneIcon,
    Email as EmailIcon,
    LinkedIn as LinkedInIcon,
    WhatsApp as WhatsAppIcon,
} from '@mui/icons-material';

interface TeamMemberProps {
    position: string;
    name: string;
    image: string;
    contact?: string;
    whatsapp?: string;
    email?: string;
    linkedIn?: string;
}

export const TeamMemberCard: React.FC<TeamMemberProps> = ({
                                                              position,
                                                              name,
                                                              image,
                                                              contact,
                                                              whatsapp,
                                                              email,
                                                              linkedIn,
                                                          }) => {
    return (
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group w-full md:w-[250px]">
            {/* Image */}
            <div className="h-[280px] overflow-hidden">
                <img
                    src={`${import.meta.env.BASE_URL}${image}`}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col items-center">
                <p className="text-sm  font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full mb-0 text-center">{position}</p>
                <h2 className="text-lg font-bold text-gray-800 text-center">{name}</h2>

                {/* Icons */}
                <div className="flex justify-center gap-5 mt-4 text-gray-500">
                    {contact && (
                        <a href={contact} title="Phone" target="_blank" rel="noopener noreferrer">
                            <PhoneIcon fontSize="small" className="hover:text-purple-600 transition-colors duration-200" />
                        </a>
                    )}
                    {whatsapp && (
                        <a href={whatsapp} title="WhatsApp" target="_blank" rel="noopener noreferrer">
                            <WhatsAppIcon fontSize="small" className="hover:text-green-600 transition-colors duration-200" />
                        </a>
                    )}
                    {email && (
                        <a href={`mailto:${email}`} title="Email" target="_blank" rel="noopener noreferrer">
                            <EmailIcon fontSize="small" className="hover:text-blue-500 transition-colors duration-200" />
                        </a>
                    )}
                    {linkedIn && (
                        <a href={linkedIn} title="LinkedIn" target="_blank" rel="noopener noreferrer">
                            <LinkedInIcon fontSize="small" className="hover:text-blue-700 transition-colors duration-200" />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};
