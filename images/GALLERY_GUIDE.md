# Gallery Images Guide

This guide will help you add and manage images for your photo gallery.

## Image Requirements

### Size and Format
- **Recommended formats**: JPG, PNG, WebP, AVIF
- **Optimal size**: 800-1200px width for best quality and performance
- **File size**: Keep under 500KB per image for fast loading
- **Aspect ratios**: Mixed ratios work best (portrait, landscape, square)

### Image Categories
The gallery supports the following categories:

1. **destinations** - Photos of travel destinations
2. **packages** - Images related to travel packages
3. **customers** - Happy customer photos
4. **landscapes** - Scenic landscape photography

## Adding New Images

### Step 1: Add Images to Folders
Create new folders in the `images/` directory or use existing ones:

```
images/
├── gallery/
│   ├── destinations/
│   ├── packages/
│   ├── customers/
│   └── landscapes/
```

### Step 2: Update Gallery HTML
Add new gallery items to both `index.html` and `pages/gallery.html`:

```html
<div class="gallery-item" data-category="destinations landscapes" data-caption="Your Image Caption">
    <img src="images/gallery/destinations/your-image.jpg" alt="Descriptive alt text" loading="lazy">
    <div class="gallery-caption">Your Image Caption</div>
</div>
```

### Step 3: Category Assignment
Use the `data-category` attribute to assign categories:
- Single category: `data-category="destinations"`
- Multiple categories: `data-category="destinations landscapes"`

## Image Optimization Tips

### Before Adding Images:
1. **Resize** images to appropriate dimensions
2. **Compress** images using tools like TinyPNG or ImageOptim
3. **Convert** to modern formats (WebP, AVIF) for better performance
4. **Add descriptive names** (e.g., `goa-sunset-beach.jpg`)

### Tools for Optimization:
- **Online**: TinyPNG, Squoosh.app, Kraken.io
- **Desktop**: ImageOptim (Mac), TinyPNG Desktop
- **Command line**: ImageMagick, Sharp

## Best Practices

### Image Naming
- Use descriptive, SEO-friendly names
- Use hyphens instead of spaces
- Include location or subject: `udaipur-palace-sunset.jpg`

### Alt Text
- Write descriptive alt text for accessibility
- Include location and main subject
- Keep it concise but informative

### Captions
- Write engaging, descriptive captions
- Include location and context
- Keep them short and impactful

## Gallery Layout

The gallery uses a **masonry/Pinterest-style layout** that:
- Automatically adjusts to different image sizes
- Maintains aspect ratios
- Creates an engaging, dynamic layout
- Works responsively on all devices

## Lightbox Features

When users click on images, they open in a lightbox with:
- Full-size image display
- Navigation arrows (previous/next)
- Image captions
- Keyboard navigation (arrow keys, escape)
- Click outside to close

## Performance Considerations

### Lazy Loading
- Images load only when needed
- Improves initial page load time
- Better user experience on mobile

### Progressive Loading
- Load low-quality placeholders first
- Enhance with full-quality images
- Smooth transition effects

## Mobile Optimization

The gallery is fully responsive:
- **Desktop**: 3-4 columns
- **Tablet**: 2-3 columns  
- **Mobile**: 1-2 columns
- Touch-friendly navigation
- Optimized for small screens

## Adding Images via Code Editor

### Method 1: Direct HTML Edit
1. Open `pages/gallery.html`
2. Find the `.masonry-grid` section
3. Add new `gallery-item` divs
4. Update image paths and captions

### Method 2: JavaScript Dynamic Loading
Use the `loadMorePhotos()` function in `js/gallery.js` to dynamically add images.

## Image Sources

### Your Own Photos
- Travel destination photos
- Customer testimonial photos
- Package experience photos
- Team and office photos

### Stock Photos (if needed)
- Unsplash.com (free, high-quality)
- Pexels.com (free stock photos)
- Pixabay.com (free images)
- **Note**: Always check licenses and attribution requirements

## Troubleshooting

### Images Not Loading
- Check file paths are correct
- Verify image files exist in specified folders
- Ensure proper file extensions

### Gallery Layout Issues
- Run `adjustMasonryLayout()` function
- Check CSS grid properties
- Verify image dimensions

### Performance Issues
- Compress large images
- Enable lazy loading
- Consider using WebP format

## Future Enhancements

### Planned Features
- Admin panel for easy image management
- Automatic image compression
- Social media integration
- Image search and tagging
- Bulk upload functionality

---

**Need Help?** 
Check the gallery JavaScript files (`js/script.js` and `js/gallery.js`) for implementation details, or refer to the CSS files for styling customization.
