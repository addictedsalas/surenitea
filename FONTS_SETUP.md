# Custom Fonts Setup for Surenitea

## Required Fonts
According to the brand identity:
- **Recoleta Sans Bold** - For display headings (H1, H2)
- **Sofia Pro** - For body text and buttons (Light 300 & Bold 700)

## How to Add Custom Fonts

### Option 1: Using Web Font Files (Recommended)

1. **Obtain the font files** in web formats (.woff2, .woff)
   - Recoleta Sans Bold
   - Sofia Pro Light
   - Sofia Pro Bold

2. **Place font files** in: `public/fonts/`
   ```
   public/
   └── fonts/
       ├── recoleta-sans-bold.woff2
       ├── recoleta-sans-bold.woff
       ├── sofia-pro-light.woff2
       ├── sofia-pro-light.woff
       ├── sofia-pro-bold.woff2
       └── sofia-pro-bold.woff
   ```

3. **The CSS is already configured** in `app/globals.css` to use these fonts

### Option 2: Using Adobe Fonts (if you have licenses)

1. Go to [Adobe Fonts](https://fonts.adobe.com/)
2. Add Sofia Pro to your web project
3. Copy the provided `<link>` tag
4. Add it to `app/layout.tsx` in the `<head>` section

### Option 3: Using Similar Google Fonts (Free Alternative)

If you don't have the exact fonts, we can use similar alternatives:
- **Playfair Display** (instead of Recoleta Sans)
- **Inter** or **Work Sans** (instead of Sofia Pro)

Let me know which option you'd prefer, and I'll implement it accordingly.
