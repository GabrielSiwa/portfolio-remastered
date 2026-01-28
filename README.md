# 🌌 Portfolio Remastered

> Interactive developer portfolio featuring 3D graphics, real-time analytics, and custom animations built with Next.js, Three.js, and Framer Motion.

**Live Site:** [gabriel-siwa.vercel.app](https://gabriel-siwa.vercel.app)

---

## ✨ Features

### 🎨 Visual Experience

- **3D Skill Visualization** - Interactive skill globe built with Three.js and React Three Fiber
  - Billboard text rendering (always faces camera)
  - Hover effects with color transitions
  - Orbit controls for 360° exploration
  - Floating animation using `@react-three/drei`

- **Custom Starfield Animation** - 372-line parallax background system
  - 75+ animated stars across 3 depth layers
  - Shooting star effects with randomized trajectories
  - Mouse-following nebula with smooth interpolation
  - Scroll-based parallax movement
  - Performance-optimized with reduced particle counts

### 📊 Real-Time Analytics

- **Live Visitor Counter** - Serverless tracking powered by Upstash Redis
  - REST API integration with Redis Edge database
  - Live visitor count updates via HTTP polling
  - Easter egg animation for special visitor numbers
  - Graceful fallback for local development and offline states

### ⚡ Performance Optimizations

- **Image Optimization**
  - AVIF and WebP format support
  - Responsive image sizing (640px - 1920px breakpoints)
  - 30-day cache TTL for static assets
- **Code Splitting**
  - Package import optimization for lucide-react, react-icons, framer-motion
  - Tree-shaking for reduced bundle size
  - Webpack bundle analyzer integration

- **Security Headers**
  - X-Content-Type-Options: nosniff
  - X-Frame-Options: DENY
  - X-XSS-Protection enabled
  - Font caching with immutable headers

### 🎭 Animations

- **Framer Motion Integration**
  - Page transitions
  - Scroll-triggered reveals with `react-awesome-reveal`
  - Interactive hover states
  - Smooth component mounting/unmounting

---

## 🛠️ Tech Stack

### Frontend

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling
- **Framer Motion 12** - Animation library

### 3D Graphics

- **Three.js** - WebGL 3D rendering
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers (Float, Text, OrbitControls)

### Database & Analytics

- **Upstash Redis** - Serverless Redis for visitor counting and analytics
- **Vercel Analytics** - Production performance monitoring
- **Webpack Bundle Analyzer** - Bundle size optimization

### Form Handling

- **Formik** - Form state management
- **Yup** - Schema validation

---

## 📁 Project Structure

```
portfolio-remastered/
├── src/
│   └── app/
│       ├── components/          # React components
│       │   ├── three/           # Three.js 3D components
│       │   │   └── SkillGlobe.tsx       (161 lines - 3D skill visualization)
│       │   ├── InteractiveStarfield.tsx (372 lines - parallax animation)
│       │   ├── VisitCounter.tsx         (Real-time analytics)
│       │   ├── Hero.tsx
│       │   ├── AboutSection.tsx
│       │   ├── ProjectsSection.tsx
│       │   └── ContactSection.tsx
│       ├── hooks/
│       │   └── useAnalytics.ts  # Upstash Redis integration
│       ├── lib/                 # Utility functions
│       ├── api/                 # API routes
│       └── projects/            # Project pages
├── public/                      # Static assets
└── next.config.ts               # Performance & security config
```

---

## 🚀 Performance Metrics

### Optimization Strategies

1. **Image Optimization**
   - Modern formats (AVIF/WebP) with fallbacks
   - Responsive sizing with 7 breakpoints
   - Long-term caching (30 days)

2. **Code Splitting**
   - Dynamic imports for heavy components
   - Package-level tree-shaking
   - Bundle analysis with size limits

3. **Rendering Optimization**
   - Static generation where possible
   - Client-side hydration for interactive components
   - Lazy loading for below-fold content

4. **Animation Performance**
   - Reduced particle counts (75 stars vs 120 original)
   - RequestAnimationFrame for smooth 60fps
   - GPU-accelerated transforms

---

## 🎯 Key Technical Implementations

### 1. Three.js Skill Globe

**File:** `src/app/components/three/SkillGlobe.tsx` (161 lines)

```typescript
// Billboard effect - text always faces camera
useFrame((state) => {
  if (ref.current) {
    ref.current.quaternion.copy(state.camera.quaternion);
  }
});
```

**Features:**

- Spherical distribution of skill tags in 3D space
- Camera-facing text (billboard rendering)
- Hover state with color transitions
- Floating animation using `@react-three/drei`

### 2. Interactive Starfield

**File:** `src/app/components/InteractiveStarfield.tsx` (372 lines)

```typescript
const STARFIELD_CONFIG = {
  STAR_COUNT: {
    LAYER_1: 30, // Front layer
    LAYER_2: 25, // Middle layer
    LAYER_3: 20, // Back layer
  },
  SHOOTING_STAR: {
    FREQUENCY: 10000, // ms between spawns
    DURATION: 2000, // Animation duration
    COUNT: 2, // Concurrent shooting stars
  },
};
```

**Features:**

- 3-layer parallax depth effect
- Mouse-following nebula with smooth interpolation
- Randomized shooting star trajectories
- Scroll-based animation
- Optimized for 60fps performance

### 3. Real-Time Analytics

**File:** `src/app/hooks/useAnalytics.ts`

```typescript
const updateCount = async () => {
  const response = await fetch("/api/visit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  setVisitorCount(data.count);
};

// Polling for live updates (every 10 seconds)
const interval = setInterval(() => {
  fetch("/api/visit", { method: "GET" })
    .then(res => res.json())
    .then(data => setVisitorCount(data.count));
}, 10000);
```

**Features:**

- RESTful API interaction with Upstash Redis Edge
- Automatic session-based unique visit tracking
- Live visitor count updates via throttled polling
- Easter egg triggers on special numbers (e.g., "67")

---

## 📊 Bundle Analysis

Run bundle analyzer to inspect package sizes:

```bash
pnpm analyze
```

**Current optimizations:**

- Framer Motion: Tree-shaken to only used components
- Lucide Icons: Import only needed icons
- Three.js: Bundled with only required modules
- React Three Fiber: Code-split for 3D pages only

---

## 🎨 Design System

### Color Palette (Cosmic Theme)

```css
--galaxy-cosmic: #0a0e1a /* Deep space background */ --galaxy-nebula: #1a1f35
  /* Nebula overlay */ --galaxy-accent: #a78bfa /* Purple accent */
  --galaxy-plasma: #ec4899 /* Pink highlights */ --galaxy-aurora: #06b6d4
  /* Cyan glow */;
```

### Typography

- **Headings:** System font stack with fallbacks
- **Body:** Inter variable font
- **Code:** JetBrains Mono

### Responsive Breakpoints

- Mobile: 640px
- Tablet: 768px
- Desktop: 1024px
- Wide: 1280px
- Ultra-wide: 1536px

---

## 🔐 Security

**Implemented Headers:**

```typescript
{
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block"
}
```

**Font Caching:**

```typescript
{
  "Cache-Control": "public, max-age=31536000, immutable"
}
```

---

## 📈 Monitoring

### Production Monitoring

- **Vercel Analytics** - Page views, visitor demographics, performance metrics
- **Webpack Bundle Analyzer** - Bundle size tracking
- **Real-time Analytics** - Live visitor counts via Upstash Redis

### Performance Targets

- **Lighthouse Score:** 90+ across all categories
- **First Contentful Paint:** <1.5s
- **Time to Interactive:** <3.5s
- **Cumulative Layout Shift:** <0.1

---

## 🚧 Roadmap

### Planned Features

- [ ] Dark/light theme toggle
- [ ] Blog section with MDX support
- [ ] Project case studies with interactive demos
- [ ] Contact form with email notifications
- [ ] RSS feed for blog posts
- [ ] Advanced 3D shader effects

### Performance Improvements

- [ ] Implement service worker for offline support
- [ ] Add progressive image loading with blur-up
- [ ] Optimize Three.js rendering with LOD
- [ ] Implement virtual scrolling for project list

---

## 📝 License

MIT License - feel free to use this code for your own portfolio!

---

## 🤝 Connect

- **Portfolio:** [gabriel-siwa.vercel.app](https://gabriel-siwa.vercel.app)
- **GitHub:** [@GabrielSiwa](https://github.com/GabrielSiwa)
- **LinkedIn:** [/in/gabrielsiwa](https://linkedin.com/in/gabrielsiwa)
- **Email:** siwagabrielira8@gmail.com

---

## 🙏 Acknowledgments

**Libraries & Tools:**

- [Next.js](https://nextjs.org) - React framework
- [Three.js](https://threejs.org) - 3D graphics library
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS
- [Vercel](https://vercel.com) - Deployment platform

**Inspiration:**

- Cosmic UI design from [Awwwards](https://www.awwwards.com)
- Three.js examples from [pmndrs](https://github.com/pmndrs)

---

**Built with ❤️ by Gabriel Siwa**  
_Crafting digital experiences one pixel at a time_
