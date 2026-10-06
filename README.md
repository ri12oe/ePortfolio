# Mario's ePortfolio

🌐 **Live site:** [marioespinoza.dev](https://marioespinoza.dev)

A personal ePortfolio built for Indiana University's Honors Program (HON-N200). The site showcases my academic journey, projects, honors coursework, and blog in a clean, modern, fully responsive design — built from scratch with HTML, Sass, and vanilla JavaScript.

## Overview

This portfolio serves as a living record of my academic and professional growth. It brings together my background, featured projects, honors program deliverables, and ongoing writing into a single cohesive site, deployed via GitHub Pages at a custom domain.

## Pages

| Page | File | Description |
| --- | --- | --- |
| Home | [`index.html`](./index.html) | Landing page introducing who I am and what I do |
| About | [`about.html`](./about.html) | Background, skills, and a way to get in touch |
| Projects | [`project.html`](./project.html) | Showcase of featured projects and work |
| Honors | [`honors.html`](./honors.html) | HON-N200 deliverables, including personal statement, field interview, leadership goals, future journey map, and reflections |
| Blog | [`blog.html`](./blog.html) | Ongoing posts and updates |

## Tech Stack

- **HTML5** for semantic, accessible markup
- **Sass (SCSS)** for modular, maintainable styling, compiled to [`css/styles.css`](./css/styles.css)
- **Vanilla JavaScript** for interactivity (dock menu, theme toggle, image viewer, marquee, logo reveal, blog rendering, contact form, globe animation, and more)
- **GitHub Pages** for hosting, with a custom domain configured via [`CNAME`](./CNAME)

## Project Structure

```
ePortfolio/
├── assests/      # Favicon and static assets
├── css/          # Compiled CSS output
├── images/       # Site imagery
├── js/           # Page-specific and shared JavaScript modules
├── scss/         # Sass source partials and main stylesheet
├── index.html    # Home page
├── about.html    # About / contact page
├── project.html  # Projects page
├── honors.html   # Honors program page
├── blog.html     # Blog page
├── CNAME         # Custom domain configuration for GitHub Pages
└── package.json  # Project metadata and build scripts
```

## Development Process

The site was built incrementally between September and October 2026, with each step committed to Git so the full history of the project is preserved.

1. **Foundation (Sep 7).** Initialized the repository, set up the HTML structure, and organized styles into Sass partials (`scss/_base.scss`, `_variables.scss`, `_mixins.scss`, and one partial per page). Established a shared color palette, typography (Poppins via Google Fonts), and CSS variables for borders, shadows, and theming.
2. **Navigation and theming.** Built the header navigation, added hover and glow effects, and implemented a light/dark theme toggle (`js/theme.js`).
3. **Home and About pages (Sep 7-11).** Created the landing layout with a responsive two-column structure, then the About page with goals, technology icons and tooltips, social links, an interactive globe, and an availability status card.
4. **Contact form (Sep 8-15).** Added an accessible contact modal (`js/contact.js`) that is reused across every page.
5. **Projects page (Sep 15-16).** Designed responsive project cards with status indicators and hover effects, plus a scrolling marquee, a resume section linking to a PDF, and an animated logo reveal.
6. **Branding and navigation (Sep 17).** Added a favicon and a dock-style menu (`js/dock-menu.js`) with toggle animations.
7. **Honors page (Sep 8 - Oct 5).** Built the HON-N200 deliverables: personal statement, field interview, leadership goals, future journey map, expertise, and reflection. Added reveal animations, expandable "read more" sections, and a "Currently" badge with a pulse animation.
8. **Polish and blog (Oct 6).** Added an image viewer, a building-glow animation, a blog page (`js/blog.js`, `js/posts.js`), and responsive media queries for the project and resume sections.
9. **Deployment (Oct 6).** Published through GitHub Pages and connected the custom domain `marioespinoza.dev` with a `CNAME` file.

### Workflow

- **Styling:** Sass partials are compiled into a single stylesheet with `npm run compile:sass`, which watches for changes.
- **Preview:** `npm run serve` runs [live-server](https://www.npmjs.com/package/live-server) for live reloading while editing.
- **Version control:** Work was committed in small, descriptive steps using `feat:`, `fix:`, and `refactor:` prefixes.
## Deployment

The site is deployed via GitHub Pages and served at the custom domain configured in [`CNAME`](./CNAME): **[marioespinoza.dev](https://marioespinoza.dev)**.

## Author

**Mario Espinoza**
Honors Program, Indiana University — HON-N200

## License & Copyright

Copyright © 2026 Mario Espinoza. All Rights Reserved.

This repository is provided for viewing purposes only. No part of this work may be copied, modified, or distributed without prior written permission. See the [LICENSE](./LICENSE) file for details.
