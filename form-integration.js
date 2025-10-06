// Form Integration Options for Brånnson Studio
// Choose one of the following integration methods

// ========================================
// OPTION 1: Google Forms Integration
// ========================================

// Replace with your actual Google Form URL
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse';

// Google Forms field mapping (update these to match your form fields)
const GOOGLE_FORM_FIELDS = {
    name: 'entry.1234567890',        // Replace with actual entry ID
    email: 'entry.0987654321',       // Replace with actual entry ID
    company: 'entry.1122334455',     // Replace with actual entry ID
    phone: 'entry.5566778899',       // Replace with actual entry ID
    projectType: 'entry.9988776655', // Replace with actual entry ID
    timeline: 'entry.4433221100',    // Replace with actual entry ID
    message: 'entry.7788990011'      // Replace with actual entry ID
};

async function submitToGoogleForms(formData) {
    const url = new URL(GOOGLE_FORM_URL);
    
    // Map form data to Google Forms fields
    const googleFormData = new FormData();
    googleFormData.append(GOOGLE_FORM_FIELDS.name, formData.name);
    googleFormData.append(GOOGLE_FORM_FIELDS.email, formData.email);
    googleFormData.append(GOOGLE_FORM_FIELDS.company, formData.company || '');
    googleFormData.append(GOOGLE_FORM_FIELDS.phone, formData.phone || '');
    googleFormData.append(GOOGLE_FORM_FIELDS.projectType, formData['project-type'] || '');
    googleFormData.append(GOOGLE_FORM_FIELDS.timeline, formData.timeline || '');
    googleFormData.append(GOOGLE_FORM_FIELDS.message, formData.message);
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            mode: 'no-cors', // Required for Google Forms
            body: googleFormData
        });
        
        return { success: true, data: formData };
    } catch (error) {
        console.error('Google Forms submission error:', error);
        throw new Error('Failed to submit form');
    }
}

// ========================================
// OPTION 2: Airtable Integration
// ========================================

// Replace with your actual Airtable details
const AIRTABLE_BASE_ID = 'YOUR_BASE_ID';
const AIRTABLE_TABLE_NAME = 'Contact Submissions';
const AIRTABLE_API_KEY = 'YOUR_API_KEY'; // Keep this secure!

const AIRTABLE_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`;

async function submitToAirtable(formData) {
    const airtableData = {
        fields: {
            'Name': formData.name,
            'Email': formData.email,
            'Company': formData.company || '',
            'Phone': formData.phone || '',
            'Project Type': formData['project-type'] || '',
            'Timeline': formData.timeline || '',
            'Message': formData.message,
            'Submitted At': new Date().toISOString()
        }
    };
    
    try {
        const response = await fetch(AIRTABLE_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(airtableData)
        });
        
        if (!response.ok) {
            throw new Error(`Airtable API error: ${response.status}`);
        }
        
        const result = await response.json();
        return { success: true, data: result };
    } catch (error) {
        console.error('Airtable submission error:', error);
        throw new Error('Failed to submit form');
    }
}

// ========================================
// OPTION 3: EmailJS Integration
// ========================================

// EmailJS configuration (free tier available)
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

async function submitViaEmailJS(formData) {
    // Load EmailJS library if not already loaded
    if (typeof emailjs === 'undefined') {
        await loadScript('https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js');
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }
    
    const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        company: formData.company || 'Not provided',
        phone: formData.phone || 'Not provided',
        project_type: formData['project-type'] || 'Not specified',
        timeline: formData.timeline || 'Not specified',
        message: formData.message
    };
    
    try {
        const response = await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            templateParams
        );
        
        return { success: true, data: response };
    } catch (error) {
        console.error('EmailJS submission error:', error);
        throw new Error('Failed to send email');
    }
}

// Helper function to load external scripts
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// ========================================
// OPTION 4: Netlify Forms (if hosting on Netlify)
// ========================================

async function submitToNetlifyForms(formData) {
    const netlifyData = new FormData();
    netlifyData.append('form-name', 'contact');
    netlifyData.append('name', formData.name);
    netlifyData.append('email', formData.email);
    netlifyData.append('company', formData.company || '');
    netlifyData.append('phone', formData.phone || '');
    netlifyData.append('project-type', formData['project-type'] || '');
    netlifyData.append('timeline', formData.timeline || '');
    netlifyData.append('message', formData.message);
    
    try {
        const response = await fetch('/', {
            method: 'POST',
            body: netlifyData
        });
        
        if (!response.ok) {
            throw new Error(`Netlify form submission failed: ${response.status}`);
        }
        
        return { success: true, data: formData };
    } catch (error) {
        console.error('Netlify form submission error:', error);
        throw new Error('Failed to submit form');
    }
}

// ========================================
// Main Form Submission Function
// ========================================

// Choose your preferred integration method
const FORM_INTEGRATION_METHOD = 'google'; // Options: 'google', 'airtable', 'emailjs', 'netlify'

async function submitContactForm(formData) {
    switch (FORM_INTEGRATION_METHOD) {
        case 'google':
            return await submitToGoogleForms(formData);
        case 'airtable':
            return await submitToAirtable(formData);
        case 'emailjs':
            return await submitViaEmailJS(formData);
        case 'netlify':
            return await submitToNetlifyForms(formData);
        default:
            throw new Error('Invalid form integration method');
    }
}

// ========================================
// Setup Instructions
// ========================================

/*
GOOGLE FORMS SETUP:
1. Create a new Google Form
2. Add fields matching your form (Name, Email, Company, etc.)
3. Get the form URL and extract the form ID
4. Use browser dev tools to find the entry IDs for each field
5. Update GOOGLE_FORM_URL and GOOGLE_FORM_FIELDS above

AIRTABLE SETUP:
1. Create an Airtable base with a table for contact submissions
2. Add fields: Name, Email, Company, Phone, Project Type, Timeline, Message
3. Get your Base ID from the Airtable API documentation
4. Generate an API key from your Airtable account
5. Update AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME, and AIRTABLE_API_KEY above

EMAILJS SETUP:
1. Sign up for EmailJS (free tier available)
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template
4. Get your Service ID, Template ID, and Public Key
5. Update the EmailJS configuration above

NETLIFY FORMS SETUP:
1. Host your site on Netlify
2. Add form-name="contact" to your form element
3. Add a hidden input with name="form-name" and value="contact"
4. Netlify will automatically handle form submissions
*/

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { submitContactForm };
}
