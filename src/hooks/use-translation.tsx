
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'pa';
type TranslationKey = string;
type TranslationMap = Record<TranslationKey, string>;
type TranslationsType = Record<Language, TranslationMap>;

// English and Punjabi translations
const translations: TranslationsType = {
  en: {
    // General
    "Contact Us": "Contact Us",
    "Home": "Home",
    "About": "About",
    "Services": "Services",
    "Testimonials": "Testimonials",
    "Contact": "Contact",
    "Have questions or ready to schedule a service? Get in touch with our team for exceptional pressure washing solutions.": "Have questions or ready to schedule a service? Get in touch with our team for exceptional pressure washing solutions.",
    "Get In Touch": "Get In Touch",
    "Send Us a Message": "Send Us a Message",
    "Location": "Location",
    "Langley, BC, Canada": "Langley, BC, Canada",
    "Serving the Fraser Valley and surrounding areas": "Serving the Fraser Valley and surrounding areas",
    "Phone": "Phone",
    "Monday-Friday: 8AM - 6PM": "Monday-Friday: 8AM - 6PM",
    "Saturday: 9AM - 5PM": "Saturday: 9AM - 5PM",
    "Email": "Email",
    "We typically respond within 24 hours": "We typically respond within 24 hours",
    "Service Areas": "Service Areas",
    "We proudly serve residential and commercial clients throughout:": "We proudly serve residential and commercial clients throughout:",
    "Langley": "Langley",
    "Surrey": "Surrey",
    "Abbotsford": "Abbotsford",
    "White Rock": "White Rock",
    "Maple Ridge": "Maple Ridge",
    "Burnaby": "Burnaby",
    "And surrounding communities": "And surrounding communities",
    "We Proudly Serve the following cities": "We Proudly Serve the following cities",
    
    // Home Page
    "Professional Pressure Washing Services": "Professional Pressure Washing Services",
    "Residential & Commercial": "Residential & Commercial",
    "Revitalize Your Property": "Revitalize Your Property",
    "Transform your home's exterior with our expert pressure washing services. We remove dirt, grime, and mold to reveal the beautiful property underneath.": "Transform your home's exterior with our expert pressure washing services. We remove dirt, grime, and mold to reveal the beautiful property underneath.",
    "Get a Free Quote": "Get a Free Quote",
    "Learn More": "Learn More",
    "Our Services": "Our Services",
    "Comprehensive Cleaning Solutions": "Comprehensive Cleaning Solutions",
    "We offer a complete range of exterior cleaning services for residential and commercial properties throughout the Fraser Valley and Lower Mainland.": "We offer a complete range of exterior cleaning services for residential and commercial properties throughout the Fraser Valley and Lower Mainland.",
    "View All Services": "View All Services",
    "What Our Clients Say": "What Our Clients Say",
    "Don't just take our word for it. Hear what our satisfied customers have to say about our services.": "Don't just take our word for it. Hear what our satisfied customers have to say about our services.",
    "View More Testimonials": "View More Testimonials",
    
    // Form Fields
    "Your Name": "Your Name",
    "John Doe": "John Doe",
    "Email Address": "Email Address",
    "your.email@example.com": "your.email@example.com",
    "Phone Number": "Phone Number",
    "(123) 456-7890": "(123) 456-7890",
    "Your Message": "Your Message",
    "Tell us about your needs...": "Tell us about your needs...",
    "Services you're interested in:": "Services you're interested in:",
    "Sending...": "Sending...",
    "Send Message": "Send Message",
    "Message Sent!": "Message Sent!",
    "Thank you for reaching out. We'll get back to you shortly.": "Thank you for reaching out. We'll get back to you shortly.",
    
    // Services
    "Pressure Washing": "Pressure Washing",
    "Professional pressure washing for your home's exterior surfaces.": "Professional pressure washing for your home's exterior surfaces.",
    "Streak-free window cleaning for residential and commercial properties.": "Streak-free window cleaning for residential and commercial properties.",
    "Complete gutter cleaning and maintenance services.": "Complete gutter cleaning and maintenance services.",
    "Roof Cleaning": "Roof Cleaning",
    "Effective roof cleaning to remove moss, algae, and debris.": "Effective roof cleaning to remove moss, algae, and debris.",
    "House Washing": "House Washing",
    "Soft washing techniques to clean siding without damage.": "Soft washing techniques to clean siding without damage.",
    "Commercial Services": "Commercial Services",
    "Specialized cleaning solutions for commercial properties.": "Specialized cleaning solutions for commercial properties.",
    
    // FAQ
    "Frequently Asked Questions": "Frequently Asked Questions",
    "Do you offer free quotes?": "Do you offer free quotes?",
    "Yes, we provide free, no-obligation quotes for all our services. Contact us to schedule an assessment.": "Yes, we provide free, no-obligation quotes for all our services. Contact us to schedule an assessment.",
    "What areas do you serve?": "What areas do you serve?",
    "We serve Langley, Surrey, Abbotsford, White Rock, Maple Ridge, Burnaby, and surrounding areas in BC.": "We serve Langley, Surrey, Abbotsford, White Rock, Maple Ridge, Burnaby, and surrounding areas in BC.",
    "How often should I have my gutters cleaned?": "How often should I have my gutters cleaned?",
    "We recommend cleaning gutters at least twice a year, typically in spring and fall, to prevent clogs and water damage.": "We recommend cleaning gutters at least twice a year, typically in spring and fall, to prevent clogs and water damage.",
    "Are your cleaning products eco-friendly?": "Are your cleaning products eco-friendly?",
    "Yes, we use environmentally-friendly cleaning solutions that effectively remove dirt and grime without harming plants or wildlife.": "Yes, we use environmentally-friendly cleaning solutions that effectively remove dirt and grime without harming plants or wildlife.",
    "How long does a typical service take?": "How long does a typical service take?",
    "Service times vary depending on the size of your property and the specific service. Most residential jobs are completed within a few hours.": "Service times vary depending on the size of your property and the specific service. Most residential jobs are completed within a few hours.",
    "Do you offer any guarantees?": "Do you offer any guarantees?",
    "Yes, we stand behind our work with a satisfaction guarantee. If you're not satisfied, we'll return to address any issues.": "Yes, we stand behind our work with a satisfaction guarantee. If you're not satisfied, we'll return to address any issues.",
    
    // Chat Assistant
    "BC Pressure Washing Assistant": "BC Pressure Washing Assistant",
    "Hi there! Ask me any questions about our pressure washing services.": "Hi there! Ask me any questions about our pressure washing services.",
    "BC Assistant": "BC Assistant",
    "Suggested questions:": "Suggested questions:",
    "Schedule a callback": "Schedule a callback",
    "Call us now: 778 808 7620": "Call us now: 778 808 7620",
    "Type your question...": "Type your question...",
    "Clear chat": "Clear chat",
    "I'd like to schedule a callback.": "I'd like to schedule a callback.",
    "Great! To schedule a callback, I'll need some information. What's your name?": "Great! To schedule a callback, I'll need some information. What's your name?",
    
    // Language Selector
    "English": "English",
    "Punjabi": "Punjabi",
    "Select Language": "Select Language",
    
    // Process Section
    "Our Process": "Our Process",
    "How We Deliver Excellence": "How We Deliver Excellence",
    "Our systematic approach ensures that every cleaning project is completed with precision and care.": "Our systematic approach ensures that every cleaning project is completed with precision and care.",
    "Free Assessment": "Free Assessment",
    "We start with a thorough assessment of your property to understand your specific cleaning needs.": "We start with a thorough assessment of your property to understand your specific cleaning needs.",
    "Custom Quote": "Custom Quote",
    "Based on the assessment, we provide a detailed quote with transparent pricing and no hidden fees.": "Based on the assessment, we provide a detailed quote with transparent pricing and no hidden fees.",
    "Professional Cleaning": "Professional Cleaning",
    "Our trained technicians use advanced equipment and eco-friendly solutions to clean your property.": "Our trained technicians use advanced equipment and eco-friendly solutions to clean your property.",
    "Final Inspection": "Final Inspection",
    "We conduct a final walkthrough to ensure everything meets our high standards of cleanliness.": "We conduct a final walkthrough to ensure everything meets our high standards of cleanliness.",
    
    // Package Section
    "Yearly Maintenance": "Yearly Maintenance",
    "Choose the Right Package for Your Home": "Choose the Right Package for Your Home",
    "Our subscription packages are designed to keep your property looking its best year-round with regular maintenance.": "Our subscription packages are designed to keep your property looking its best year-round with regular maintenance.",
    "Starter Package": "Starter Package",
    "Upgraded Package": "Upgraded Package",
    "Premium Package": "Premium Package",
    "Based on a 1800 SQFT. House": "Based on a 1800 SQFT. House",
    "Based on a 1900 SQFT. House": "Based on a 1900 SQFT. House",
    "Based on a 1900 SQFT+ House": "Based on a 1900 SQFT+ House",
    "Get Started": "Get Started",
    
    // Featured Project
    "Featured Project": "Featured Project",
    "See the transformation we achieved for this beautiful residential property in British Columbia": "See the transformation we achieved for this beautiful residential property in British Columbia",
    "Complete House Washing Service": "Complete House Washing Service",
    "Full exterior siding cleaning": "Full exterior siding cleaning",
    "Safe low-pressure washing techniques": "Safe low-pressure washing techniques",
    "Eco-friendly cleaning solutions": "Eco-friendly cleaning solutions",
    "Removal of dirt, mold, and algae": "Removal of dirt, mold, and algae",
    "Protection of landscaping and surroundings": "Protection of landscaping and surroundings",
    "This North Vancouver home received our premium house washing service, resulting in a spotless exterior that enhances curb appeal and protects the property value.": "This North Vancouver home received our premium house washing service, resulting in a spotless exterior that enhances curb appeal and protects the property value.",
    "Learn About House Washing": "Learn About House Washing",
    
    // Calculator
    "Service Price Calculator": "Service Price Calculator",
    "Get an instant estimate for your service needs. Our calculator provides a customized quote based on your specific requirements.": "Get an instant estimate for your service needs. Our calculator provides a customized quote based on your specific requirements.",
    "We serve residential and commercial properties in White Rock and surrounding areas.": "We serve residential and commercial properties in White Rock and surrounding areas.",
    "Select a Service": "Select a Service",
    "Choose the service that best fits your needs": "Choose the service that best fits your needs",
    "Professional window cleaning with streak-free results": "Professional window cleaning with streak-free results",
    "Thorough gutter cleaning to prevent damage": "Thorough gutter cleaning to prevent damage",
    "High-pressure cleaning for stubborn dirt and grime": "High-pressure cleaning for stubborn dirt and grime",
    "Gentle roof cleaning to remove moss and algae": "Gentle roof cleaning to remove moss and algae",
    "Starting at $200": "Starting at $200",
    "Starting at $250": "Starting at $250",
    "Starting at $350": "Starting at $350",
    "Continue": "Continue",
    "Property Type": "Property Type",
    "Select the type of property for the service": "Select the type of property for the service",
    "Residential": "Residential",
    "Home, apartment, or residential property": "Home, apartment, or residential property",
    "Commercial": "Commercial",
    "Office, storefront, or business property": "Office, storefront, or business property",
    "Back": "Back",
    "Select Property Size": "Select Property Size",
    "Choose the size of your property": "Choose the size of your property",
    "Small": "Small",
    "Medium": "Medium",
    "Large": "Large",
    "Extra Large": "Extra Large",
    "Up to 1,500 sq. ft.": "Up to 1,500 sq. ft.",
    "1,500 - 2,500 sq. ft.": "1,500 - 2,500 sq. ft.",
    "2,500 - 3,500 sq. ft.": "2,500 - 3,500 sq. ft.",
    "3,500+ sq. ft.": "3,500+ sq. ft.",
    "+$0": "+$0",
    "+$50": "+$50",
    "+$100": "+$100",
    "+$150": "+$150",
    "Select Add-ons": "Select Add-ons",
    "Choose any additional services you'd like": "Choose any additional services you'd like",
    "Moss Treatment": "Moss Treatment",
    "Apply moss prevention treatment": "Apply moss prevention treatment",
    "Gutter Guards": "Gutter Guards",
    "Install gutter guards to prevent debris": "Install gutter guards to prevent debris",
    "Window Seals": "Window Seals",
    "Apply sealant to window edges": "Apply sealant to window edges",
    "Exterior Wax": "Exterior Wax",
    "Apply protective wax coating": "Apply protective wax coating",
    "+$75": "+$75",
    "+$125": "+$125",
    "Contact Information": "Contact Information",
    "Provide your details so we can contact you": "Provide your details so we can contact you",
    "Full Name": "Full Name",
    "Email": "Email",
    "your@email.com": "your@email.com",
    "Preferred Service Date": "Preferred Service Date",
    "Select a date": "Select a date",
    "Service Address": "Service Address",
    "123 Marine Dr, White Rock, BC": "123 Marine Dr, White Rock, BC",
    "Additional Notes": "Additional Notes",
    "Any special instructions or requirements...": "Any special instructions or requirements...",
    "Review Order": "Review Order",
    "Review Your Quote": "Review Your Quote",
    "Please review your information before submitting": "Please review your information before submitting",
    "Selected Service": "Selected Service",
    "Property Type": "Property Type",
    "Property Size": "Property Size",
    "Add-ons": "Add-ons",
    "Contact Information": "Contact Information", 
    "Name:": "Name:",
    "Email:": "Email:",
    "Phone:": "Phone:",
    "Service Date:": "Service Date:",
    "Address:": "Address:",
    "Notes:": "Notes:",
    "Price Breakdown": "Price Breakdown",
    "Base Price": "Base Price",
    "Size": "Size",
    "Subtotal": "Subtotal",
    "Commercial Property (1.5x)": "Commercial Property (1.5x)",
    "Total Estimated Price": "Total Estimated Price",
    "Submit Request": "Submit Request",
    "Not selected": "Not selected",
    "Not specified": "Not specified",
    
    // Recent Projects
    "Recent Roof Cleaning Projects": "Recent Roof Cleaning Projects",
    "See our professional roof cleaning results and what our happy customers have to say about our service.": "See our professional roof cleaning results and what our happy customers have to say about our service.",
    "Read Full Testimonial": "Read Full Testimonial",
    "View All Testimonials": "View All Testimonials",
    
    // CTA 
    "Ready to Transform Your Property?": "Ready to Transform Your Property?",
    "Get in touch today for a free, no-obligation quote and see how we can help you maintain your property's pristine appearance.": "Get in touch today for a free, no-obligation quote and see how we can help you maintain your property's pristine appearance.",
    "Call Us: 778 808 7620": "Call Us: 778 808 7620",
    
    // Hero Section
    "The Ultimate Cleaning": "The Ultimate Cleaning",
    "Solution": "Solution",
    "for Your Property": "for Your Property",
    "We deliver exceptional cleaning results for residential and commercial properties with our state-of-the-art equipment and professional techniques.": "We deliver exceptional cleaning results for residential and commercial properties with our state-of-the-art equipment and professional techniques.",
    "Explore Our Services": "Explore Our Services",
  },
  pa: {
    // General
    "Contact Us": "ਸਾਡੇ ਨਾਲ ਸੰਪਰਕ ਕਰੋ",
    "Home": "ਘਰ",
    "About": "ਬਾਰੇ",
    "Services": "ਸੇਵਾਵਾਂ",
    "Testimonials": "ਗਾਹਕਾਂ ਦੀ ਰਾਏ",
    "Contact": "ਸੰਪਰਕ",
    "Have questions or ready to schedule a service? Get in touch with our team for exceptional pressure washing solutions.": "ਸਵਾਲ ਹਨ ਜਾਂ ਸੇਵਾ ਦਾ ਸਮਾਂ ਨਿਰਧਾਰਤ ਕਰਨ ਲਈ ਤਿਆਰ ਹੋ? ਵਧੀਆ ਪ੍ਰੈਸ਼ਰ ਵਾਸ਼ਿੰਗ ਸਮਾਧਾਨਾਂ ਲਈ ਸਾਡੀ ਟੀਮ ਨਾਲ ਸੰਪਰਕ ਕਰੋ।",
    "Get In Touch": "ਸੰਪਰਕ ਵਿੱਚ ਰਹੋ",
    "Send Us a Message": "ਸਾਨੂੰ ਇੱਕ ਸੁਨੇਹਾ ਭੇਜੋ",
    "Location": "ਸਥਾਨ",
    "Langley, BC, Canada": "ਲੈਂਗਲੇ, ਬੀ.ਸੀ., ਕੈਨੇਡਾ",
    "Serving the Fraser Valley and surrounding areas": "ਫਰੇਜ਼ਰ ਵੈਲੀ ਅਤੇ ਆਸ-ਪਾਸ ਦੇ ਖੇਤਰਾਂ ਦੀ ਸੇਵਾ ਕਰ ਰਹੇ ਹਾਂ",
    "Phone": "ਫੋਨ",
    "Monday-Friday: 8AM - 6PM": "ਸੋਮਵਾਰ-ਸ਼ੁੱਕਰਵਾਰ: ਸਵੇਰੇ 8 - ਸ਼ਾਮ 6",
    "Saturday: 9AM - 5PM": "ਸ਼ਨੀਵਾਰ: ਸਵੇਰੇ 9 - ਸ਼ਾਮ 5",
    "Email": "ਈਮੇਲ",
    "We typically respond within 24 hours": "ਅਸੀਂ ਆਮ ਤੌਰ 'ਤੇ 24 ਘੰਟਿਆਂ ਦੇ ਅੰਦਰ ਜਵਾਬ ਦਿੰਦੇ ਹਾਂ",
    "Service Areas": "ਸੇਵਾ ਖੇਤਰ",
    "We proudly serve residential and commercial clients throughout:": "ਅਸੀਂ ਇਨ੍ਹਾਂ ਸਾਰੇ ਖੇਤਰਾਂ ਵਿੱਚ ਰਿਹਾਇਸ਼ੀ ਅਤੇ ਵਪਾਰਕ ਗਾਹਕਾਂ ਦੀ ਸੇਵਾ ਕਰਦੇ ਹਾਂ:",
    "Langley": "ਲੈਂਗਲੇ",
    "Surrey": "ਸਰੀ",
    "Abbotsford": "ਐਬਟਸਫੋਰਡ",
    "White Rock": "ਵ੍ਹਾਈਟ ਰੌਕ",
    "Maple Ridge": "ਮੇਪਲ ਰਿੱਜ",
    "Burnaby": "ਬਰਨਬੀ",
    "And surrounding communities": "ਅਤੇ ਆਸ-ਪਾਸ ਦੇ ਭਾਈਚਾਰੇ",
    "We Proudly Serve the following cities": "ਅਸੀਂ ਮਾਣ ਨਾਲ ਹੇਠ ਲਿਖੇ ਸ਼ਹਿਰਾਂ ਦੀ ਸੇਵਾ ਕਰਦੇ ਹਾਂ",
    
    // Home Page
    "Professional Pressure Washing Services": "ਪੇਸ਼ੇਵਰ ਪ੍ਰੈਸ਼ਰ ਵਾਸ਼ਿੰਗ ਸੇਵਾਵਾਂ",
    "Residential & Commercial": "ਰਿਹਾਇਸ਼ੀ ਅਤੇ ਵਪਾਰਕ",
    "Revitalize Your Property": "ਆਪਣੀ ਜਾਇਦਾਦ ਨੂੰ ਮੁੜ ਸੁਰਜੀਤ ਕਰੋ",
    "Transform your home's exterior with our expert pressure washing services. We remove dirt, grime, and mold to reveal the beautiful property underneath.": "ਸਾਡੀਆਂ ਮਾਹਿਰ ਪ੍ਰੈਸ਼ਰ ਵਾਸ਼ਿੰਗ ਸੇਵਾਵਾਂ ਨਾਲ ਆਪਣੇ ਘਰ ਦੇ ਬਾਹਰੀ ਹਿੱਸੇ ਨੂੰ ਬਦਲੋ। ਅਸੀਂ ਹੇਠਾਂ ਮੌਜੂਦ ਸੁੰਦਰ ਜਾਇਦਾਦ ਨੂੰ ਪ੍ਰਗਟ ਕਰਨ ਲਈ ਗੰਦਗੀ, ਮੈਲ, ਅਤੇ ਫਫੂੰਦੀ ਨੂੰ ਹਟਾਉਂਦੇ ਹਾਂ।",
    "Get a Free Quote": "ਮੁਫਤ ਭਾਅ ਪ੍ਰਾਪਤ ਕਰੋ",
    "Learn More": "ਹੋਰ ਜਾਣੋ",
    "Our Services": "ਸਾਡੀਆਂ ਸੇਵਾਵਾਂ",
    "Comprehensive Cleaning Solutions": "ਵਿਆਪਕ ਸਫਾਈ ਹੱਲ",
    "We offer a complete range of exterior cleaning services for residential and commercial properties throughout the Fraser Valley and Lower Mainland.": "ਅਸੀਂ ਫ੍ਰੇਜ਼ਰ ਵੈਲੀ ਅਤੇ ਲੋਅਰ ਮੇਨਲੈਂਡ ਵਿੱਚ ਰਿਹਾਇਸ਼ੀ ਅਤੇ ਵਪਾਰਕ ਜਾਇਦਾਦਾਂ ਲਈ ਬਾਹਰੀ ਸਫਾਈ ਸੇਵਾਵਾਂ ਦੀ ਪੂਰੀ ਰੇਂਜ ਪੇਸ਼ ਕਰਦੇ ਹਾਂ।",
    "View All Services": "ਸਾਰੀਆਂ ਸੇਵਾਵਾਂ ਦੇਖੋ",
    "What Our Clients Say": "ਸਾਡੇ ਗਾਹਕ ਕੀ ਕਹਿੰਦੇ ਹਨ",
    "Don't just take our word for it. Hear what our satisfied customers have to say about our services.": "ਸਿਰਫ ਸਾਡੀ ਗੱਲ 'ਤੇ ਭਰੋਸਾ ਨਾ ਕਰੋ। ਸੁਣੋ ਕਿ ਸਾਡੇ ਸੰਤੁਸ਼ਟ ਗਾਹਕਾਂ ਦਾ ਸਾਡੀਆਂ ਸੇਵਾਵਾਂ ਬਾਰੇ ਕੀ ਕਹਿਣਾ ਹੈ।",
    "View More Testimonials": "ਹੋਰ ਗਵਾਹੀਆਂ ਦੇਖੋ",
    
    // Form Fields
    "Your Name": "ਤੁਹਾਡਾ ਨਾਮ",
    "John Doe": "ਜੌਨ ਡੋ",
    "Email Address": "ਈਮੇਲ ਪਤਾ",
    "your.email@example.com": "ਤੁਹਾਡਾ.ਈਮੇਲ@example.com",
    "Phone Number": "ਫੋਨ ਨੰਬਰ",
    "(123) 456-7890": "(123) 456-7890",
    "Your Message": "ਤੁਹਾਡਾ ਸੁਨੇਹਾ",
    "Tell us about your needs...": "ਸਾਨੂੰ ਆਪਣੀਆਂ ਜ਼ਰੂਰਤਾਂ ਬਾਰੇ ਦੱਸੋ...",
    "Services you're interested in:": "ਸੇਵਾਵਾਂ ਜਿਨ੍ਹਾਂ ਵਿੱਚ ਤੁਸੀਂ ਦਿਲਚਸਪੀ ਰੱਖਦੇ ਹੋ:",
    "Window Cleaning": "ਵਿੰਡੋ ਕਲੀਨਿੰਗ",
    "Gutter Cleaning": "ਗਟਰ ਕਲੀਨਿੰਗ",
    "Roof Cleaning": "ਛੱਤ ਕਲੀਨਿੰਗ",
    "House Washing": "ਘਰ ਦੀ ਧੁਲਾਈ",
    "Commercial Services": "ਵਪਾਰਕ ਸੇਵਾਵਾਂ",
    "Sending...": "ਭੇਜ ਰਿਹਾ ਹੈ...",
    "Send Message": "ਸੁਨੇਹਾ ਭੇਜੋ",
    "Message Sent!": "ਸੁਨੇਹਾ ਭੇਜਿਆ ਗਿਆ!",
    "Thank you for reaching out. We'll get back to you shortly.": "ਸੰਪਰਕ ਕਰਨ ਲਈ ਧੰਨਵਾਦ। ਅਸੀਂ ਜਲਦੀ ਹੀ ਤੁਹਾਡੇ ਨਾਲ ਸੰਪਰਕ ਕਰਾਂਗੇ।",
    
    // Services 
    "Pressure Washing": "ਪ੍ਰੈਸ਼ਰ ਵਾਸ਼ਿੰਗ",
    "Professional pressure washing for your home's exterior surfaces.": "ਤੁਹਾਡੇ ਘਰ ਦੇ ਬਾਹਰੀ ਸਤਹਾਂ ਲਈ ਪੇਸ਼ੇਵਰ ਪ੍ਰੈਸ਼ਰ ਵਾਸ਼ਿੰਗ।",
    "Streak-free window cleaning for residential and commercial properties.": "ਰਿਹਾਇਸ਼ੀ ਅਤੇ ਵਪਾਰਕ ਜਾਇਦਾਦਾਂ ਲਈ ਧੱਬਾ-ਮੁਕਤ ਵਿੰਡੋ ਕਲੀਨਿੰਗ।",
    "Complete gutter cleaning and maintenance services.": "ਪੂਰੀ ਗਟਰ ਸਫਾਈ ਅਤੇ ਰੱਖ-ਰਖਾਵ ਸੇਵਾਵਾਂ।",
    "Effective roof cleaning to remove moss, algae, and debris.": "ਕਾਈ, ਕਾਈ, ਅਤੇ ਮਲਬੇ ਨੂੰ ਹਟਾਉਣ ਲਈ ਪ੍ਰਭਾਵਸ਼ਾਲੀ ਛੱਤ ਦੀ ਸਫਾਈ।",
    "Soft washing techniques to clean siding without damage.": "ਬਿਨਾਂ ਨੁਕਸਾਨ ਦੇ ਸਾਈਡਿੰਗ ਨੂੰ ਸਾਫ਼ ਕਰਨ ਲਈ ਨਰਮ ਧੋਣ ਦੀਆਂ ਤਕਨੀਕਾਂ।",
    "Specialized cleaning solutions for commercial properties.": "ਵਪਾਰਕ ਜਾਇਦਾਦਾਂ ਲਈ ਵਿਸ਼ੇਸ਼ ਸਫਾਈ ਦੇ ਹੱਲ।",
    
    // FAQ
    "Frequently Asked Questions": "ਅਕਸਰ ਪੁੱਛੇ ਜਾਣ ਵਾਲੇ ਸਵਾਲ",
    "Do you offer free quotes?": "ਕੀ ਤੁਸੀਂ ਮੁਫਤ ਕੋਟੇਸ਼ਨ ਦਿੰਦੇ ਹੋ?",
    "Yes, we provide free, no-obligation quotes for all our services. Contact us to schedule an assessment.": "ਹਾਂ, ਅਸੀਂ ਆਪਣੀਆਂ ਸਾਰੀਆਂ ਸੇਵਾਵਾਂ ਲਈ ਮੁਫਤ, ਬਿਨਾਂ ਕਿਸੇ ਜ਼ਿੰਮੇਵਾਰੀ ਦੇ ਕੋਟੇਸ਼ਨ ਪ੍ਰਦਾਨ ਕਰਦੇ ਹਾਂ। ਮੁਲਾਂਕਣ ਦਾ ਸਮਾਂ ਨਿਰਧਾਰਤ ਕਰਨ ਲਈ ਸਾਡੇ ਨਾਲ ਸੰਪਰਕ ਕਰੋ।",
    "What areas do you serve?": "ਤੁਸੀਂ ਕਿਹੜੇ ਖੇਤਰਾਂ ਦੀ ਸੇਵਾ ਕਰਦੇ ਹੋ?",
    "We serve Langley, Surrey, Abbotsford, White Rock, Maple Ridge, Burnaby, and surrounding areas in BC.": "ਅਸੀਂ BC ਵਿੱਚ ਲੈਂਗਲੇ, ਸਰੀ, ਐਬਟਸਫੋਰਡ, ਵ੍ਹਾਈਟ ਰਾਕ, ਮੇਪਲ ਰਿੱਜ, ਬਰਨਬੀ, ਅਤੇ ਆਸ-ਪਾਸ ਦੇ ਖੇਤਰਾਂ ਦੀ ਸੇਵਾ ਕਰਦੇ ਹਾਂ।",
    "How often should I have my gutters cleaned?": "ਮੈਨੂੰ ਆਪਣੇ ਗਟਰਾਂ ਨੂੰ ਕਿੰਨੀ ਵਾਰ ਸਾਫ ਕਰਵਾਉਣਾ ਚਾਹੀਦਾ ਹੈ?",
    "We recommend cleaning gutters at least twice a year, typically in spring and fall, to prevent clogs and water damage.": "ਅਸੀਂ ਰੁਕਾਵਟਾਂ ਅਤੇ ਪਾਣੀ ਦੇ ਨੁਕਸਾਨ ਨੂੰ ਰੋਕਣ ਲਈ, ਗਟਰਾਂ ਨੂੰ ਸਾਲ ਵਿੱਚ ਘੱਟੋ-ਘੱਟ ਦੋ ਵਾਰ, ਆਮ ਤੌਰ 'ਤੇ ਬਸੰਤ ਅਤੇ ਪਤਝੜ ਵਿੱਚ, ਸਾਫ਼ ਕਰਨ ਦੀ ਸਿਫਾਰਸ਼ ਕਰਦੇ ਹਾਂ।",
    "Are your cleaning products eco-friendly?": "ਕੀ ਤੁਹਾਡੇ ਸਫਾਈ ਉਤਪਾਦ ਵਾਤਾਵਰਣ-ਅਨੁਕੂਲ ਹਨ?",
    "Yes, we use environmentally-friendly cleaning solutions that effectively remove dirt and grime without harming plants or wildlife.": "ਹਾਂ, ਅਸੀਂ ਵਾਤਾਵਰਣ-ਅਨੁਕੂਲ ਸਫਾਈ ਦੇ ਹੱਲ ਵਰਤਦੇ ਹਾਂ ਜੋ ਪੌਦਿਆਂ ਜਾਂ ਜੰਗਲੀ ਜੀਵਨ ਨੂੰ ਨੁਕਸਾਨ ਪਹੁੰਚਾਏ ਬਿਨਾਂ ਪ੍ਰਭਾਵਸ਼ਾਲੀ ਢੰਗ ਨਾਲ ਗੰਦਗੀ ਅਤੇ ਮੈਲ ਨੂੰ ਹਟਾਉਂਦੇ ਹਨ।",
    "How long does a typical service take?": "ਇੱਕ ਆਮ ਸੇਵਾ ਵਿੱਚ ਕਿੰਨਾ ਸਮਾਂ ਲੱਗਦਾ ਹੈ?",
    "Service times vary depending on the size of your property and the specific service. Most residential jobs are completed within a few hours.": "ਸੇਵਾ ਦਾ ਸਮਾਂ ਤੁਹਾਡੀ ਜਾਇਦਾਦ ਦੇ ਆਕਾਰ ਅਤੇ ਵਿਸ਼ੇਸ਼ ਸੇਵਾ ਦੇ ਆਧਾਰ 'ਤੇ ਵੱਖ-ਵੱਖ ਹੁੰਦਾ ਹੈ। ਜ਼ਿਆਦਾਤਰ ਰਿਹਾਇਸ਼ੀ ਕੰਮ ਕੁਝ ਘੰਟਿਆਂ ਦੇ ਅੰਦਰ ਪੂਰੇ ਹੋ ਜਾਂਦੇ ਹਨ।",
    "Do you offer any guarantees?": "ਕੀ ਤੁਸੀਂ ਕੋਈ ਗਾਰੰਟੀ ਦਿੰਦੇ ਹੋ?",
    "Yes, we stand behind our work with a satisfaction guarantee. If you're not satisfied, we'll return to address any issues.": "ਹਾਂ, ਅਸੀਂ ਸੰਤੁਸ਼ਟੀ ਦੀ ਗਾਰੰਟੀ ਨਾਲ ਆਪਣੇ ਕੰਮ ਦਾ ਸਮਰਥਨ ਕਰਦੇ ਹਾਂ। ਜੇ ਤੁਸੀਂ ਸੰਤੁਸ਼ਟ ਨਹੀਂ ਹੋ, ਤਾਂ ਅਸੀਂ ਕਿਸੇ ਵੀ ਸਮੱਸਿਆ ਨੂੰ ਹੱਲ ਕਰਨ ਲਈ ਵਾਪਸ ਆਵਾਂਗੇ।",
    
    // Chat Assistant
    "BC Pressure Washing Assistant": "ਬੀਸੀ ਪ੍ਰੈਸ਼ਰ ਵਾਸ਼ਿੰਗ ਅਸਿਸਟੈਂਟ",
    "Hi there! Ask me any questions about our pressure washing services.": "ਹੈਲੋ! ਸਾਡੀਆਂ ਪ੍ਰੈਸ਼ਰ ਵਾਸ਼ਿੰਗ ਸੇਵਾਵਾਂ ਬਾਰੇ ਮੈਨੂੰ ਕੋਈ ਵੀ ਸਵਾਲ ਪੁੱਛੋ।",
    "BC Assistant": "ਬੀਸੀ ਅਸਿਸਟੈਂਟ",
    "Suggested questions:": "ਸੁਝਾਏ ਗਏ ਸਵਾਲ:",
    "Schedule a callback": "ਕਾਲਬੈਕ ਦਾ ਸਮਾਂ ਨਿਰਧਾਰਤ ਕਰੋ",
    "Call us now: 778 808 7620": "ਹੁਣੇ ਕਾਲ ਕਰੋ: 778 808 7620",
    "Type your question...": "ਆਪਣਾ ਸਵਾਲ ਟਾਈਪ ਕਰੋ...",
    "Clear chat": "ਚੈਟ ਸਾਫ਼ ਕਰੋ",
    "I'd like to schedule a callback.": "ਮੈਂ ਕਾਲਬੈਕ ਦਾ ਸਮਾਂ ਨਿਰਧਾਰਤ ਕਰਨਾ ਚਾਹਾਂਗਾ/ਚਾਹਾਂਗੀ।",
    "Great! To schedule a callback, I'll need some information. What's your name?": "ਵਧੀਆ! ਕਾਲਬੈਕ ਦਾ ਸਮਾਂ ਨਿਰਧਾਰਤ ਕਰਨ ਲਈ, ਮੈਨੂੰ ਕੁਝ ਜਾਣਕਾਰੀ ਦੀ ਲੋੜ ਹੋਵੇਗੀ। ਤੁਹਾਡਾ ਨਾਮ ਕੀ ਹੈ?",
    
    // Language Selector
    "English": "ਅੰਗਰੇਜ਼ੀ",
    "Punjabi": "ਪੰਜਾਬੀ",
    "Select Language": "ਭਾਸ਼ਾ ਚੁਣੋ",
    
    // Process Section
    "Our Process": "ਸਾਡੀ ਪ੍ਰਕਿਰਿਆ",
    "How We Deliver Excellence": "ਅਸੀਂ ਕਿਵੇਂ ਉੱਤਮਤਾ ਪ੍ਰਦਾਨ ਕਰਦੇ ਹਾਂ",
    "Our systematic approach ensures that every cleaning project is completed with precision and care.": "ਸਾਡਾ ਪ੍ਰਣਾਲੀਗਤ ਪਹੁੰਚ ਯਕੀਨੀ ਬਣਾਉਂਦੀ ਹੈ ਕਿ ਹਰ ਸਫਾਈ ਪ੍ਰੋਜੈਕਟ ਸ਼ੁੱਧਤਾ ਅਤੇ ਦੇਖਭਾਲ ਨਾਲ ਪੂਰਾ ਕੀਤਾ ਜਾਂਦਾ ਹੈ।",
    "Free Assessment": "ਮੁਫਤ ਮੁਲਾਂਕਣ",
    "We start with a thorough assessment of your property to understand your specific cleaning needs.": "ਅਸੀਂ ਤੁਹਾਡੀਆਂ ਵਿਸ਼ੇਸ਼ ਸਫਾਈ ਦੀਆਂ ਜ਼ਰੂਰਤਾਂ ਨੂੰ ਸਮਝਣ ਲਈ ਤੁਹਾਡੀ ਜਾਇਦਾਦ ਦੇ ਇੱਕ ਵਿਆਪਕ ਮੁਲਾਂਕਣ ਨਾਲ ਸ਼ੁਰੂ ਕਰਦੇ ਹਾਂ।",
    "Custom Quote": "ਕਸਟਮ ਕੁਟੇਸ਼ਨ",
    "Based on the assessment, we provide a detailed quote with transparent pricing and no hidden fees.": "ਮੁਲਾਂਕਣ ਦੇ ਆਧਾਰ 'ਤੇ, ਅਸੀਂ ਪਾਰਦਰਸ਼ੀ ਕੀਮਤਾਂ ਅਤੇ ਕੋਈ ਛੁਪੀਆਂ ਫੀਸਾਂ ਦੇ ਨਾਲ ਇੱਕ ਵਿਸਤਰਿਤ ਕੁਟੇਸ਼ਨ ਪ੍ਰਦਾਨ ਕਰਦੇ ਹਾਂ।",
    "Professional Cleaning": "ਪੇਸ਼ੇਵਰ ਸਫਾਈ",
    "Our trained technicians use advanced equipment and eco-friendly solutions to clean your property.": "ਸਾਡੇ ਸਿਖਲਾਈ ਪ੍ਰਾਪਤ ਤਕਨੀਸ਼ੀਅਨ ਤੁਹਾਡੀ ਜਾਇਦਾਦ ਨੂੰ ਸਾਫ਼ ਕਰਨ ਲਈ ਉੱਨਤ ਉਪਕਰਣਾਂ ਅਤੇ ਵਾਤਾਵਰਣ-ਅਨੁਕੂਲ ਹੱਲਾਂ ਦੀ ਵਰਤੋਂ ਕਰਦੇ ਹਨ।",
    "Final Inspection": "ਅੰਤਿਮ ਨਿਰੀਖਣ",
    "We conduct a final walkthrough to ensure everything meets our high standards of cleanliness.": "ਅਸੀਂ ਇਹ ਯਕੀਨੀ ਬਣਾਉਣ ਲਈ ਇੱਕ ਅੰਤਿਮ ਵਾਕਥਰੂ ਕਰਦੇ ਹਾਂ ਕਿ ਸਭ ਕੁਝ ਸਾਡੇ ਸਫਾਈ ਦੇ ਉੱਚ ਮਾਪਦੰਡਾਂ ਨੂੰ ਪੂਰਾ ਕਰਦਾ ਹੈ।",
    
    // Package Section
    "Yearly Maintenance": "ਸਾਲਾਨਾ ਰੱਖ-ਰਖਾਅ",
    "Choose the Right Package for Your Home": "ਆਪਣੇ ਘਰ ਲਈ ਸਹੀ ਪੈਕੇਜ ਚੁਣੋ",
    "Our subscription packages are designed to keep your property looking its best year-round with regular maintenance.": "ਸਾਡੇ ਸਬਸਕ੍ਰਿਪਸ਼ਨ ਪੈਕੇਜ ਨਿਯਮਿਤ ਰੱਖ-ਰਖਾਵ ਨਾਲ ਤੁਹਾਡੀ ਜਾਇਦਾਦ ਨੂੰ ਸਾਲ ਭਰ ਸਭ ਤੋਂ ਵਧੀਆ ਦਿਖਾਉਣ ਲਈ ਡਿਜ਼ਾਈਨ ਕੀਤੇ ਗਏ ਹਨ।",
    "Starter Package": "ਸਟਾਰਟਰ ਪੈਕੇਜ",
    "Upgraded Package": "ਅੱਪਗ੍ਰੇਡ ਕੀਤਾ ਪੈਕੇਜ",
    "Premium Package": "ਪ੍ਰੀਮੀਅਮ ਪੈਕੇਜ",
    "Based on a 1800 SQFT. House": "1800 ਵਰਗ ਫੁੱਟ ਵਾਲੇ ਘਰ ਦੇ ਆਧਾਰ 'ਤੇ",
    "Based on a 1900 SQFT. House": "1900 ਵਰਗ ਫੁੱਟ ਵਾਲੇ ਘਰ ਦੇ ਆਧਾਰ 'ਤੇ",
    "Based on a 1900 SQFT+ House": "1900+ ਵਰਗ ਫੁੱਟ ਵਾਲੇ ਘਰ ਦੇ ਆਧਾਰ 'ਤੇ",
    "Get Started": "ਸ਼ੁਰੂ ਕਰੋ",
    
    // Featured Project
    "Featured Project": "ਖਾਸ ਪ੍ਰੋਜੈਕਟ",
    "See the transformation we achieved for this beautiful residential property in British Columbia": "ਵੇਖੋ ਕਿ ਅਸੀਂ ਬ੍ਰਿਟਿਸ਼ ਕੋਲੰਬੀਆ ਵਿੱਚ ਇਸ ਸੁੰਦਰ ਰਿਹਾਇਸ਼ੀ ਜਾਇਦਾਦ ਲਈ ਕੀ ਬਦਲਾਅ ਕੀਤਾ",
    "Complete House Washing Service": "ਮੁਕੰਮਲ ਘਰ ਧੋਣ ਦੀ ਸੇਵਾ",
    "Full exterior siding cleaning": "ਪੂਰਾ ਬਾਹਰੀ ਸਾਈਡਿੰਗ ਦੀ ਸਫਾਈ",
    "Safe low-pressure washing techniques": "ਸੁਰੱਖਿਅਤ ਘੱਟ-ਦਬਾਅ ਵਾਲੀਆਂ ਧੋਣ ਤਕਨੀਕਾਂ",
    "Eco-friendly cleaning solutions": "ਵਾਤਾਵਰਣ-ਅਨੁਕੂਲ ਸਫਾਈ ਦੇ ਹੱਲ",
    "Removal of dirt, mold, and algae": "ਗੰਦਗੀ, ਫਫੂੰਦੀ, ਅਤੇ ਕਾਈ ਦੀ ਨਿਕਾਸੀ",
    "Protection of landscaping and surroundings": "ਲੈਂਡਸਕੇਪਿੰਗ ਅਤੇ ਆਸ-ਪਾਸ ਦੀ ਸੁਰੱਖਿਆ",
    "This North Vancouver home received our premium house washing service, resulting in a spotless exterior that enhances curb appeal and protects the property value.": "ਇਸ ਨੌਰਥ ਵੈਨਕੂਵਰ ਦੇ ਘਰ ਨੂੰ ਸਾਡੀ ਪ੍ਰੀਮੀਅਮ ਘਰ ਧੋਣ ਦੀ ਸੇਵਾ ਮਿਲੀ, ਜਿਸ ਦੇ ਨਤੀਜੇ ਵਜੋਂ ਇੱਕ ਦਾਗ ਰਹਿਤ ਬਾਹਰੀ ਹਿੱਸਾ ਬਣਿਆ ਜੋ ਆਕਰਸ਼ਣ ਨੂੰ ਵਧਾਉਂਦਾ ਹੈ ਅਤੇ ਜਾਇਦਾਦ ਦੀ ਕੀਮਤ ਦੀ ਰੱਖਿਆ ਕਰਦਾ ਹੈ।",
    "Learn About House Washing": "ਘਰ ਧੋਣ ਬਾਰੇ ਜਾਣੋ",
    
    // Calculator
    "Service Price Calculator": "ਸੇਵਾ ਮੁੱਲ ਕੈਲਕੁਲੇਟਰ",
    "Get an instant estimate for your service needs. Our calculator provides a customized quote based on your specific requirements.": "ਆਪਣੀਆਂ ਸੇਵਾ ਲੋੜਾਂ ਲਈ ਤੁਰੰਤ ਅਨੁਮਾਨ ਪ੍ਰਾਪਤ ਕਰੋ। ਸਾਡਾ ਕੈਲਕੁਲੇਟਰ ਤੁਹਾਡੀਆਂ ਵਿਸ਼ੇਸ਼ ਜ਼ਰੂਰਤਾਂ ਦੇ ਆਧਾਰ 'ਤੇ ਇੱਕ ਅਨੁਕੂਲਿਤ ਕੋਟੇਸ਼ਨ ਪ੍ਰਦਾਨ ਕਰਦਾ ਹੈ।",
    "We serve residential and commercial properties in White Rock and surrounding areas.": "ਅਸੀਂ ਵ੍ਹਾਈਟ ਰੌਕ ਅਤੇ ਆਸ-ਪਾਸ ਦੇ ਖੇਤਰਾਂ ਵਿੱਚ ਰਿਹਾਇਸ਼ੀ ਅਤੇ ਵਪਾਰਕ ਜਾਇਦਾਦਾਂ ਦੀ ਸੇਵਾ ਕਰਦੇ ਹਾਂ।",
    "Select a Service": "ਇੱਕ ਸੇਵਾ ਚੁਣੋ",
    "Choose the service that best fits your needs": "ਉਹ ਸੇਵਾ ਚੁਣੋ ਜੋ ਤੁਹਾਡੀਆਂ ਜ਼ਰੂਰਤਾਂ ਦੇ ਅਨੁਸਾਰ ਹੋਵੇ",
    "Professional window cleaning with streak-free results": "ਧੱਬਾ-ਰਹਿਤ ਨਤੀਜਿਆਂ ਵਾਲੀ ਪੇਸ਼ੇਵਰ ਵਿੰਡੋ ਕਲੀਨਿੰਗ",
    "Thorough gutter cleaning to prevent damage": "ਨੁਕਸਾਨ ਨੂੰ ਰੋਕਣ ਲਈ ਵਿਆਪਕ ਗਟਰ ਸਫਾਈ",
    "High-pressure cleaning for stubborn dirt and grime": "ਜ਼ਿੱਦੀ ਗੰਦਗੀ ਅਤੇ ਮੈਲ ਲਈ ਉੱਚ-ਦਬਾਅ ਵਾਲੀ ਸਫਾਈ",
    "Gentle roof cleaning to remove moss and algae": "ਕਾਈ ਅਤੇ ਕਾਈ ਨੂੰ ਹਟਾਉਣ ਲਈ ਕੋਮਲ ਛੱਤ ਦੀ ਸਫਾਈ",
    "Starting at $200": "$200 ਤੋਂ ਸ਼ੁਰੂ",
    "Starting at $250": "$250 ਤੋਂ ਸ਼ੁਰੂ",
    "Starting at $350": "$350 ਤੋਂ ਸ਼ੁਰੂ",
    "Continue": "ਜਾਰੀ ਰੱਖੋ",
    "Property Type": "ਜਾਇਦਾਦ ਦੀ ਕਿਸਮ",
    "Select the type of property for the service": "ਸੇਵਾ ਲਈ ਜਾਇਦਾਦ ਦੀ ਕਿਸਮ ਚੁਣੋ",
    "Residential": "ਰਿਹਾਇਸ਼ੀ",
    "Home, apartment, or residential property": "ਘਰ, ਅਪਾਰਟਮੈਂਟ, ਜਾਂ ਰਿਹਾਇਸ਼ੀ ਜਾਇਦਾਦ",
    "Commercial": "ਵਪਾਰਕ",
    "Office, storefront, or business property": "ਦਫਤਰ, ਦੁਕਾਨ, ਜਾਂ ਵਪਾਰਕ ਜਾਇਦਾਦ",
    "Back": "ਪਿੱਛੇ",
    "Select Property Size": "ਜਾਇਦਾਦ ਦਾ ਆਕਾਰ ਚੁਣੋ",
    "Choose the size of your property": "ਆਪਣੀ ਜਾਇਦਾਦ ਦਾ ਆਕਾਰ ਚੁਣੋ",
    "Small": "ਛੋਟਾ",
    "Medium": "ਮੱਧਮ",
    "Large": "ਵੱਡਾ",
    "Extra Large": "ਬਹੁਤ ਵੱਡਾ",
    "Up to 1,500 sq. ft.": "1,500 ਵਰਗ ਫੁੱਟ ਤੱਕ",
    "1,500 - 2,500 sq. ft.": "1,500 - 2,500 ਵਰਗ ਫੁੱਟ",
    "2,500 - 3,500 sq. ft.": "2,500 - 3,500 ਵਰਗ ਫੁੱਟ",
    "3,500+ sq. ft.": "3,500+ ਵਰਗ ਫੁੱਟ",
    "+$0": "+$0",
    "+$50": "+$50",
    "+$100": "+$100",
    "+$150": "+$150",
    "Select Add-ons": "ਐਡ-ਆਨ ਚੁਣੋ",
    "Choose any additional services you'd like": "ਕੋਈ ਵੀ ਵਾਧੂ ਸੇਵਾਵਾਂ ਚੁਣੋ ਜੋ ਤੁਸੀਂ ਚਾਹੁੰਦੇ ਹੋ",
    "Moss Treatment": "ਕਾਈ ਦਾ ਇਲਾਜ",
    "Apply moss prevention treatment": "ਕਾਈ ਰੋਕਥਾਮ ਦਾ ਇਲਾਜ ਲਾਗੂ ਕਰੋ",
    "Gutter Guards": "ਗਟਰ ਗਾਰਡਸ",
    "Install gutter guards to prevent debris": "ਮਲਬੇ ਨੂੰ ਰੋਕਣ ਲਈ ਗਟਰ ਗਾਰਡਜ਼ ਲਗਾਓ",
    "Window Seals": "ਵਿੰਡੋ ਸੀਲਜ਼",
    "Apply sealant to window edges": "ਵਿੰਡੋ ਦੇ ਕਿਨਾਰਿਆਂ 'ਤੇ ਸੀਲੈਂਟ ਲਗਾਓ",
    "Exterior Wax": "ਬਾਹਰੀ ਮੋਮ",
    "Apply protective wax coating": "ਸੁਰੱਖਿਆਤਮਕ ਮੋਮ ਦੀ ਪਰਤ ਲਗਾਓ",
    "+$75": "+$75",
    "+$125": "+$125",
    "Contact Information": "ਸੰਪਰਕ ਜਾਣਕਾਰੀ",
    "Provide your details so we can contact you": "ਆਪਣੇ ਵੇਰਵੇ ਪ੍ਰਦਾਨ ਕਰੋ ਤਾਂ ਜੋ ਅਸੀਂ ਤੁਹਾਡੇ ਨਾਲ ਸੰਪਰਕ ਕਰ ਸਕੀਏ",
    "Full Name": "ਪੂਰਾ ਨਾਮ",
    "Email": "ਈਮੇਲ",
    "your@email.com": "ਤੁਹਾਡਾ@ਈਮੇਲ.ਕਾਮ",
    "Preferred Service Date": "ਪਸੰਦੀਦਾ ਸੇਵਾ ਦੀ ਤਾਰੀਖ",
    "Select a date": "ਇੱਕ ਤਾਰੀਖ ਚੁਣੋ",
    "Service Address": "ਸੇਵਾ ਪਤਾ",
    "123 Marine Dr, White Rock, BC": "123 ਮਰੀਨ ਡਰ, ਵ੍ਹਾਈਟ ਰੌਕ, ਬੀਸੀ",
    "Additional Notes": "ਵਾਧੂ ਨੋਟਸ",
    "Any special instructions or requirements...": "ਕੋਈ ਵਿਸ਼ੇਸ਼ ਨਿਰਦੇਸ਼ ਜਾਂ ਜ਼ਰੂਰਤਾਂ...",
    "Review Order": "ਆਰਡਰ ਦੀ ਸਮੀਖਿਆ ਕਰੋ",
    "Review Your Quote": "ਆਪਣੀ ਕੁਟੇਸ਼ਨ ਦੀ ਸਮੀਖਿਆ ਕਰੋ",
    "Please review your information before submitting": "ਜਮ੍ਹਾਂ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੀ ਜਾਣਕਾਰੀ ਦੀ ਸਮੀਖਿਆ ਕਰੋ",
    "Selected Service": "ਚੁਣੀ ਹੋਈ ਸੇਵਾ",
    "Property Size": "ਜਾਇਦਾਦ ਦਾ ਆਕਾਰ",
    "Add-ons": "ਐਡ-ਆਨ",
    "Name:": "ਨਾਮ:",
    "Email:": "ਈਮੇਲ:",
    "Phone:": "ਫੋਨ:",
    "Service Date:": "ਸੇਵਾ ਦੀ ਤਾਰੀਖ:",
    "Address:": "ਪਤਾ:",
    "Notes:": "ਨੋਟਸ:",
    "Price Breakdown": "ਕੀਮਤ ਦਾ ਵੇਰਵਾ",
    "Base Price": "ਬੇਸ ਕੀਮਤ",
    "Size": "ਆਕਾਰ",
    "Subtotal": "ਸਬਟੋਟਲ",
    "Commercial Property (1.5x)": "ਵਪਾਰਕ ਜਾਇਦਾਦ (1.5x)",
    "Total Estimated Price": "ਕੁੱਲ ਅਨੁਮਾਨਿਤ ਕੀਮਤ",
    "Submit Request": "ਬੇਨਤੀ ਜਮ੍ਹਾਂ ਕਰੋ",
    "Not selected": "ਨਹੀਂ ਚੁਣਿਆ ਗਿਆ",
    "Not specified": "ਨਿਰਧਾਰਿਤ ਨਹੀਂ",
    
    // Recent Projects
    "Recent Roof Cleaning Projects": "ਹਾਲੀਆ ਛੱਤ ਸਫਾਈ ਪ੍ਰੋਜੈਕਟ",
    "See our professional roof cleaning results and what our happy customers have to say about our service.": "ਸਾਡੇ ਪੇਸ਼ੇਵਰ ਛੱਤ ਸਫਾਈ ਦੇ ਨਤੀਜੇ ਅਤੇ ਸਾਡੇ ਖੁਸ਼ ਗਾਹਕਾਂ ਦੀ ਸਾਡੀ ਸੇਵਾ ਬਾਰੇ ਕੀ ਕਹਿਣਾ ਹੈ, ਦੇਖੋ।",
    "Read Full Testimonial": "ਪੂਰੀ ਗਵਾਹੀ ਪੜ੍ਹੋ",
    "View All Testimonials": "ਸਾਰੀਆਂ ਗਵਾਹੀਆਂ ਦੇਖੋ",
    
    // CTA 
    "Ready to Transform Your Property?": "ਆਪਣੀ ਜਾਇਦਾਦ ਨੂੰ ਬਦਲਣ ਲਈ ਤਿਆਰ ਹੋ?",
    "Get in touch today for a free, no-obligation quote and see how we can help you maintain your property's pristine appearance.": "ਅੱਜ ਹੀ ਇੱਕ ਮੁਫਤ, ਬਿਨਾਂ ਕਿਸੇ ਜ਼ਿੰਮੇਵਾਰੀ ਦੀ ਕੁਟੇਸ਼ਨ ਲਈ ਸੰਪਰਕ ਕਰੋ ਅਤੇ ਦੇਖੋ ਕਿ ਅਸੀਂ ਤੁਹਾਡੀ ਜਾਇਦਾਦ ਦੀ ਸਾਫ਼-ਸੁਥਰੀ ਦਿੱਖ ਨੂੰ ਬਣਾਈ ਰੱਖਣ ਵਿੱਚ ਤੁਹਾਡੀ ਮਦਦ ਕਿਵੇਂ ਕਰ ਸਕਦੇ ਹਾਂ।",
    "Call Us: 778 808 7620": "ਸਾਨੂੰ ਕਾਲ ਕਰੋ: 778 808 7620",
    
    // Hero Section
    "The Ultimate Cleaning": "ਸਰਵਉੱਤਮ ਸਫਾਈ",
    "Solution": "ਹੱਲ",
    "for Your Property": "ਤੁਹਾਡੀ ਜਾਇਦਾਦ ਲਈ",
    "We deliver exceptional cleaning results for residential and commercial properties with our state-of-the-art equipment and professional techniques.": "ਅਸੀਂ ਆਪਣੇ ਅਤਿ-ਆਧੁਨਿਕ ਉਪਕਰਣਾਂ ਅਤੇ ਪੇਸ਼ੇਵਰ ਤਕਨੀਕਾਂ ਨਾਲ ਰਿਹਾਇਸ਼ੀ ਅਤੇ ਵਪਾਰਕ ਜਾਇਦਾਦਾਂ ਲਈ ਅਸਧਾਰਨ ਸਫਾਈ ਦੇ ਨਤੀਜੇ ਪ੍ਰਦਾਨ ਕਰਦੇ ਹਾਂ।",
    "Explore Our Services": "ਸਾਡੀਆਂ ਸੇਵਾਵਾਂ ਦੀ ਪੜਚੋਲ ਕਰੋ",
  }
};

type TranslationContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const defaultContext: TranslationContextType = {
  language: 'en',
  setLanguage: () => {},
  t: (key) => key,
};

const TranslationContext = createContext<TranslationContextType>(defaultContext);

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Load language preference from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage === 'pa') {
      setLanguage('pa');
    }
  }, []);

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Auto-switch language every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setLanguage(prevLang => prevLang === 'en' ? 'pa' : 'en');
    }, 5000);
    
    return () => clearInterval(intervalId);
  }, []);

  const t = (key: string): string => {
    // Return the translation for the key or the key itself if not found
    return translations[language][key] || key;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext);
