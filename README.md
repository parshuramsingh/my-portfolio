
# 🚀 Parshuram Singh's Portfolio: A Production-Ready Showcase

Welcome to my personal portfolio, a dynamic and high-performance showcase of my skills and projects. This site isn't just a collection of my work; it's a production-ready project built with meticulous attention to detail, performance, and engineering best practices.

---

## ✨ Features

- **Interactive Landing Page**  
  A visually engaging entry point with a Lottie animation, dynamically cycling quotes, and subtle CSS background animations.

- **Dynamic Sections**  
  Separate, well-organized sections for Home/About, Skills, Projects, Blog Posts, and Testimonials.

- **Premium & Responsive Design**  
  Clean, modern aesthetic with a fully responsive layout and seamless dark mode support.

- **Interactive Skills Showcase**  
  Swipeable carousel with custom icons showcasing my tech stack.

- **Projects Gallery**  
  "Read More" modals, image previews, and links to live projects.

- **Real-time Blog Integration**  
  Blogs auto-fetched from Dev.to via GitHub Actions and served as static JSON.

- **Modern Contact Form**  
  Accessible, backend-less contact form powered by Formspree.

- **High Performance & SEO**  
  Lighthouse score: **100/100** in Accessibility, SEO, Best Practices, and Performance.

---

## 🧰 Tech Stack

- **Frontend**: React.js, Vite  
- **Styling**: Tailwind CSS, Framer Motion, Keen Slider, Lottie React  
- **Forms**: Formspree  
- **Routing**: React Router DOM  
- **Other Tools**: GitHub Actions, Dev.to API, Vercel  
- **Languages**: JavaScript (ES6+), HTML5, CSS3  

---

## 📦 Getting Started

### Prerequisites
- Node.js and npm installed

### Installation

```bash
git clone https://github.com/parshuramsingh/my-portfolio.git
cd my-portfolio
npm install
```

### Tailwind Config

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
}
```

### Dev Server

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

---

## 🔄 Blog Automation via GitHub Actions

### How It Works

1. `fetch-devto-blogs.js` fetches latest blogs from Dev.to  
2. Writes them into `public/blogs.json`  
3. GitHub Actions runs this on a schedule or manual trigger  
4. Pushes updated `blogs.json` to repo  
5. Vercel auto-rebuilds with latest blog data  

### Workflow Snippet

```yaml
name: Fetch Dev.to Blogs

on:
  schedule:
    - cron: '0 3 * * *'
  workflow_dispatch:

jobs:
  update-blogs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm install
      - run: node fetch-devto-blogs.js
      - run: |
          git config user.name "github-actions[bot]"
          git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
          git add public/blogs.json
          git commit -m "🔄 Update blogs.json from Dev.to" || echo "No changes"
          git push
```

---

## 🐛 Key Challenges Solved

| Issue                 | Solution                                      |
|----------------------|-----------------------------------------------|
| CORS & SEO           | Moved from runtime fetch to static `blogs.json` |
| Dev.to API cache     | Removed `per_page=100` to get full article list |
| Real-time fetch bugs | Added fallback and error handling             |
| Performance issues   | Lazy loading, code splitting, optimized assets |
| Form feedback        | Integrated Formspree with success/error messages |
| Image failures       | Fallback handler on broken blog thumbnails    |

---

## 🧠 Lessons Learned

- APIs aren’t always consistent — test in incognito
- Automate static data pipelines with GitHub Actions
- Debugging API caching can waste hours — check headers and remove `per_page`
- Optimize *before* you scale — Lighthouse and accessibility matter
- Always have fallbacks — for both content and UI failures

---

## 🌐 Live Demo

👉 [View the Live Portfolio](https://my-portfolio-eta-nine-d8gvqtsq67.vercel.app)

---

## 📫 Contact

- **Email**: parshuram7714@gmail.com  
- **GitHub**: [@parshuramsingh](https://github.com/parshuramsingh)  
- **LinkedIn**: [Connect on LinkedIn](https://www.linkedin.com/in/parshuram-singh)

---

