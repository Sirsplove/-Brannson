# Image Integration Guide for Brånnson Studio

## 🖼️ Adding Your Images

Based on the images you provided, here's how to integrate them into the website:

### 1. **Hero Section Background**
Replace the current gradient background with your luxury logistics image:

**File to edit:** `index.html`
**Location:** Hero section background

```html
<!-- Replace this section in the hero -->
<div class="hero-background">
    <div class="hero-overlay"></div>
</div>
```

**With:**
```html
<div class="hero-background" style="background-image: url('images/hero-luxury-logistics.jpg'); background-size: cover; background-position: center;">
    <div class="hero-overlay"></div>
</div>
```

### 2. **Project Images**
Replace the placeholder project images with your actual photos:

**File to edit:** `index.html`
**Location:** Services section

```html
<!-- Replace each project-item -->
<div class="project-item">
    <div class="project-image">
        <div class="project-placeholder">
            <span>Receiving & Inspection</span>
        </div>
    </div>
    <!-- ... -->
</div>
```

**With:**
```html
<div class="project-item">
    <div class="project-image" style="background-image: url('images/receiving-inspection.jpg'); background-size: cover; background-position: center;">
        <div class="project-overlay">
            <span>Receiving & Inspection</span>
        </div>
    </div>
    <!-- ... -->
</div>
```

### 3. **Logo Integration**
Add your actual logo files:

**File to edit:** `index.html`
**Location:** Navigation and footer

```html
<!-- Replace the SVG logo with your actual logo -->
<div class="logo-icon">
    <img src="images/brannson-logo.png" alt="Brånnson Studio" style="width: 100%; height: 100%; object-fit: contain;">
</div>
```

## 📁 Recommended Image Structure

Create an `images` folder in your project directory:

```
brannson-studio/
├── images/
│   ├── hero-luxury-logistics.jpg
│   ├── receiving-inspection.jpg
│   ├── move-in-ready.jpg
│   ├── secure-storage.jpg
│   ├── brannson-logo.png
│   └── brannson-logo-white.png
├── index.html
├── styles.css
└── script.js
```

## 🎨 Image Specifications

### Hero Background Image
- **Size:** 1920x1080px minimum
- **Format:** JPG or PNG
- **Content:** Luxury item being handled with white gloves
- **Style:** High contrast, professional lighting

### Project Images
- **Size:** 800x600px minimum
- **Format:** JPG
- **Content:** 
  - Receiving & Inspection: Items being unpacked/inspected
  - Move-in Ready: Beautifully furnished room
  - Secure Storage: Organized warehouse with boxes

### Logo Files
- **Size:** 200x200px minimum
- **Format:** PNG with transparent background
- **Variations:** 
  - Standard logo (dark text)
  - White logo (for dark backgrounds)

## 🔧 CSS Updates for Images

Add this CSS to `styles.css` for better image handling:

```css
/* Enhanced project image styling */
.project-image {
    position: relative;
    overflow: hidden;
}

.project-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.2rem;
    font-weight: 500;
    text-align: center;
    z-index: 2;
}

.project-image:hover .project-overlay {
    background: rgba(0, 0, 0, 0.6);
}
```

## 🚀 Quick Implementation Steps

1. **Create images folder** in your project directory
2. **Add your images** with the recommended names
3. **Update the HTML** with the image paths
4. **Add the CSS** for enhanced styling
5. **Test the website** to ensure images load properly

## 💡 Pro Tips

- **Optimize images** for web (compress without losing quality)
- **Use WebP format** for better performance (with JPG fallback)
- **Add alt text** for accessibility
- **Consider lazy loading** for better performance
- **Test on different devices** to ensure images look good on all screens

## 🎯 Expected Result

After adding your images, the website will have:
- ✅ Professional hero background showcasing your services
- ✅ Real project photos instead of placeholders
- ✅ Your actual logo throughout the site
- ✅ More authentic and luxurious feel
- ✅ Better visual storytelling of your services
