# Brånnson Studio - Luxury Logistics Website

A sophisticated, single-page website for Brånnson Studio's luxury logistics and white-glove storage services. Designed specifically for interior designers and architects in the Big Sky and greater Bozeman area.

## Design Features

- **Luxury Aesthetic**: Clean, minimalist design with sophisticated typography
- **Sticky Navigation**: Elegant navigation bar that follows scroll
- **Smooth Animations**: Scroll-triggered animations and smooth transitions
- **Responsive Design**: Optimized for all devices and screen sizes
- **Professional Color Palette**: Neutral tones with warm brown accents
- **High-Quality Typography**: Playfair Display (serif) for headings, Inter (sans-serif) for body text

## File Structure

```
brannson-studio/
├── index.html              # Main website file
├── styles.css              # All styling and responsive design
├── script.js               # JavaScript functionality and animations
├── form-integration.js     # Form submission options (Google Forms, Airtable, etc.)
├── logo-variations.html    # Logo design options and recommendations
└── README.md              # This file
```

## Quick Start

1. **Upload Files**: Upload all files to your web server or hosting provider
2. **Configure Form**: Choose and configure your preferred form integration method
3. **Customize Content**: Update any text, contact information, or styling as needed
4. **Test**: Test the website on different devices and browsers

## Form Integration Options

The website includes multiple form integration options. Choose the one that best fits your needs:

### Option 1: Google Forms (Recommended for simplicity)
1. Create a Google Form with fields matching your contact form
2. Get the form URL and entry IDs
3. Update the configuration in `form-integration.js`
4. Replace the form submission function in `script.js`

### Option 2: Airtable (Recommended for data management)
1. Create an Airtable base with a contact submissions table
2. Get your Base ID, Table Name, and API Key
3. Update the configuration in `form-integration.js`
4. Replace the form submission function in `script.js`

### Option 3: EmailJS (Recommended for email notifications)
1. Sign up for EmailJS (free tier available)
2. Create an email service and template
3. Get your Service ID, Template ID, and Public Key
4. Update the configuration in `form-integration.js`

### Option 4: Netlify Forms (If hosting on Netlify)
1. Add `form-name="contact"` to your form element
2. Add a hidden input with `name="form-name"` and `value="contact"`
3. Netlify will automatically handle form submissions

## Logo Variations

The website includes several logo variations:

- **Original Black & White**: Classic, professional
- **Burnt Orange Flame**: Recommended - adds warmth and luxury
- **Full Burnt Orange**: Bold and distinctive
- **White on Dark**: Perfect for dark backgrounds

View `logo-variations.html` to see all options and recommendations.

## Responsive Design

The website is fully responsive and optimized for:
- Desktop computers (1200px+)
- Tablets (768px - 1199px)
- Mobile phones (320px - 767px)

## Customization

### Colors
The main color scheme can be customized by updating CSS variables:
- Primary: `#d4a574` (burnt orange)
- Secondary: `#b8946a` (darker orange)
- Text: `#2c2c2c` (dark gray)
- Background: `#fafafa` (light gray)

### Typography
- Headings: Playfair Display (serif)
- Body text: Inter (sans-serif)
- Font sizes are responsive and scale appropriately

### Content
Update the following sections in `index.html`:
- Hero section text and call-to-action
- About section description
- Services/projects information
- Contact information and form fields

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Features

- Optimized images and assets
- Debounced scroll events for better performance
- Intersection Observer for efficient animations
- Minimal JavaScript for fast loading
- CSS animations instead of JavaScript where possible

## Security Considerations

- Form validation on both client and server side
- Sanitized form inputs
- HTTPS recommended for production
- API keys should be kept secure (use environment variables)

## Support

For questions about implementation or customization:
1. Check the form integration documentation in `form-integration.js`
2. Review the logo variations in `logo-variations.html`
3. Test responsive design on different devices
4. Validate HTML and CSS for any issues

## Target Audience

This website is specifically designed for:
- Interior designers
- Architects
- High-end design firms
- Luxury home builders
- Design professionals in Big Sky and Bozeman area

## SEO Considerations

- Semantic HTML structure
- Meta descriptions and titles
- Alt text for images (add as needed)
- Fast loading times
- Mobile-friendly design
- Clean URL structure

## Updates and Maintenance

Regular maintenance tasks:
- Update contact information as needed
- Refresh project images and content
- Monitor form submissions and responses
- Check for broken links
- Update browser compatibility as needed

---


*Brånnson Studio - Luxury logistics and white-glove storage for interior designers and architects.*
