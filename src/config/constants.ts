/**
 * Application Constants & Configuration
 * IEEE Sri Lanka Inspire
 */

export const APP_CONFIG = {
  NAME: "Sri Lanka Inspire",
  ORGANIZATION: "IEEE Young Professionals Sri Lanka",
  DESCRIPTION:
    "Empowering Sri Lankan students with the guidance, resources, and tools to make informed decisions about education, careers, and vocational pathways.",
  DOMAIN: "https://slinspire.lk",
  ENDPOINTS: {
    // Google Apps Script Webhook for Step Up Event Registrations
    STEP_UP_GOOGLE_SCRIPT:
      "https://script.google.com/macros/s/AKfycbxylGlC8OofZg_DpFeymtV13ddD5LFo1Tn3qvSYYZ1ZaadquDDpXwRduGS7Pw6bV-DZ/exec",
    // Career Compass Degree Database Google Sheets TSV Export
    DEGREE_COMPASS_TSV:
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vTPGaOQkkwdKsJVu1IhzALoLnFs8bAzNFqrbrvvv323Nvdxu1UDiCUNIIh5yvy2HWr6JI8IrlOmzSF4/pub?gid=1377529768&single=true&output=tsv",
  },
  SOCIALS: {
    FACEBOOK: "https://www.facebook.com/share/1F5JkhFjdZ/",
    INSTAGRAM: "https://www.instagram.com/ieee_slinspire",
    YOUTUBE: "https://youtube.com/@slinspire9085?si=ysbCYBoduJUc4Fv1",
    LINKEDIN: "https://www.linkedin.com/company/slinspire/",
    WHATSAPP: "https://whatsapp.com/channel/0029VaXotgDHVvTh8UzRml32",
  },
  ASSETS: {
    CAREER_BOOK_PDF: "book/career-compass-book-2026.pdf",
  },
} as const;
