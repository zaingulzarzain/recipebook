# FlavorVault — Recipe Book

> Discover, save, and share amazing recipes from around the world. Your culinary journey starts here.

A modern, responsive recipe discovery platform built with **React 18**, **Redux Toolkit**, **React Router**, and **Material UI**. Browse curated recipes, like your favorites, post your own creations, track cooking steps, and leave comments with emoji support — all with persistent local storage.

![License](https://img.shields.io/badge/license-MIT-green)
![React](https://img.shields.io/badge/React-18.2-blue)
![MUI](https://img.shields.io/badge/MUI-5.15-007FFF)
![Live](https://img.shields.io/badge/Live-Demo-FF6B35)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2.2-764ABC)

---

## ✨ Features

- **Explore & Search** — Instant search by name/description + difficulty filter (Easy/Medium/Hard)
- **Like System** — Thumbs-up any recipe; likes persist across sessions via Redux + `localStorage`
- **Recipe Details** — Full page with ingredients/steps, share button (Web Share API + clipboard fallback)
- **Step Tracker** — Check off steps as you cook; progress saved per recipe
- **Comment System** — Leave comments with `emoji-picker-react`, stored locally per recipe
- **Post Recipes** — Validated form (name, time, difficulty, description, image URL, dynamic steps) → adds to global store
- **Favorites Showcase** — Featured recipes with heart favorites on the landing page
- **Responsive Design** — Mobile drawer, floating bottom navigation on recipes, polished hover animations
- **Authentication UI** — Sign up / Sign in / Forgot password (demo, local mock) with protected UX
- **Newsletter** — Email subscription with validation and persistence

---

## 🧱 Tech Stack

| Layer | Choice |
|---|---|
| **Frontend** | React 18.2, React Router 6.22, React Redux 9.1 |
| **State** | Redux Toolkit 2.2 — single `recipes` slice with localStorage sync |
| **UI** | Material UI 5.15, Emotion, Lucide React, MUI Icons |
| **Animation** | Framer Motion 11 |
| **Other** | emoji-picker-react, web-vitals, Create React App 5 |

**Why this stack:** MUI gives a consistent design system out of the box; Redux Toolkit keeps recipes/favorites/comments in one predictable place and survives page reloads; Framer Motion adds subtle delight without complexity.

---

## 📁 Project Structure

```
src/
├── App.jsx                 # Theme, Router, Provider wiring
├── index.js                # CRA entry
├── components/
│   ├── Navbar.jsx          # Sticky AppBar + mobile Drawer
│   ├── Features.jsx        # 6 benefit cards
│   ├── RecipeShowcase.jsx  # Featured 3-card grid (Redux)
│   ├── Newsletter.jsx      # Subscription CTA
│   ├── Footer.jsx          # 4-column footer
│   ├── CommentSection.jsx  # Comments + emoji picker (Redux)
│   ├── MainPage/MainPage.jsx        # Explore / Liked / Post tabs
│   └── RecipeDetail/RecipeDetail.jsx # Detail + step tracker + share
├── pages/
│   ├── LandingPage.js      # Hero + Features + Showcase + Newsletter
│   ├── About.jsx           # Mission & story
│   ├── Login.jsx / SignUp.jsx / ForgotPass.jsx
│   └── Home.jsx            # Redirect to /
├── store/
│   ├── store.js            # configureStore
│   └── slices/recipeSlice.js # recipes, favorites, likedIds, comments, steps
└── assets/images/hero-image.jpg
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js `>=16` and npm

### Installation

```bash
git clone https://github.com/zaingulzarzain/recipebook.git
cd recipebook
npm install
npm start
```

App runs at [http://localhost:3000](http://localhost:3000).

### Other scripts

```bash
npm run build   # production build → build/
npm test        # Jest (FlavorVault brand + navigation tests)
```

---

## 🗃️ State & Persistence

Redux slice `recipes` holds:

```js
{
  recipes: Recipe[],           // { _id, name, title, time, cookTime, description, image, difficulty, likes, rating, steps[] }
  favorites: string[],         // heart favorites (ids)
  likedIds: string[],          // thumbs-up likes (ids) — kept in sync with favorites
  comments: { [id]: Comment[] },
  completedSteps: { [id]: number[] }
}
```

All writes sync to `localStorage` keys:
- `flavorvault_recipes` — user-added recipes
- `flavorvault_favorites` / `flavorvault_liked` — likes
- `flavorvault_comments` — comments (+ legacy `recipe-${id}-comments`)
- `flavorvault_steps` — completed steps (+ legacy `recipe-${id}-steps`)
- `flavorvault_newsletter` — subscribed emails
- `flavorvault_user` — demo auth

On first load, 6 curated recipes ship by default (Pancakes, Avocado Toast, Aglio e Olio, Lava Cake, Margherita Pizza, Mushroom Pasta).

---

## 🎨 Design System

- **Palette:** Forest `#2D5016`, Orange `#FF6B35` / `#E55A2B`, Cream `#FFF8E7` / `#F5F0E1`
- **Typography:** Inter (Google Fonts) — h1 800, h2–h3 700, body 400–600
- **Radius:** Buttons 8px, Cards 12px, Pills 16–24px
- **Motion:** `translateY(-8px)` card lift, Framer Motion hero entrance

---

## 🔐 Demo Auth

No backend — auth is purely demonstrative:
- Any email/password works on Sign In
- Sign Up validates name/email/password length & confirmation
- Forgot Password shows a success alert
- User is stored in `localStorage` and shown in the Navbar

---

## 🧪 Testing

```bash
npm test
```

Tests check that `FlavorVault` brand and navigation render. Extend in `src/App.test.js` with React Testing Library.

---

## 📸 Screenshots

> Add your own screenshots to `docs/` and reference them here.

- Landing — Hero with 3D-tilt ingredient image + stats
- Recipes — Explore grid with search/filter + like buttons
- Detail — Step checkboxes + share + comments with emojis
- Post — Dynamic step builder

---

## 🛣️ Roadmap

- [ ] Backend API (Node/Express + MongoDB) for real persistence
- [ ] Image upload instead of URL
- [ ] User profiles & collections
- [ ] Ratings & reviews aggregation
- [ ] PWA offline support

---

## 👤 Author

**Zain Gulzar** — Built and designed by me. Available for freelance React / Full-stack work on Upwork.

- GitHub: [@zaingulzarzain](https://github.com/zaingulzarzain)
- Live Demo: _add your deployed URL here_

---

## 📄 License

MIT — feel free to fork and adapt with attribution.

---

*This project was bootstrapped with Create React App. See the CRA docs for advanced configuration.*
