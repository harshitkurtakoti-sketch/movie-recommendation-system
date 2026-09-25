# AETHERIA — AI Movie Intelligence Engine

A production-quality cinematic frontend and API platform powered by content-based Machine Learning recommendation vectors.
http://127.0.0.1:5173

---

## 📽️ Project Architecture

```
movie/
├── movies.pkl                 # Preserved ML model DataFrame (4,806 movies)
├── similarity.pkl             # Preserved Cosine Similarity Matrix (4,806 × 4,806)
├── vectorizer.pkl             # Preserved Scikit-learn CountVectorizer (5,000 features)
├── tmdb_5000_movies.csv       # TMDB dataset with genres, ratings, overviews, financial data
├── tmdb_5000_credits.csv      # TMDB credits with directors and top cast members
├── Movie_recommendation.ipynb # Original data science training notebook
├── server.py                  # High-performance Python REST API server
├── start.ps1                  # Single-command startup script
└── frontend/                  # Modern Vite + React 19 + TypeScript Application
    ├── src/
    │   ├── components/
    │   │   ├── ParticleBackground.tsx   # Three.js 3D interactive particle constellation & planes
    │   │   ├── Navbar.tsx               # Minimal cinematic glassmorphic navigation bar
    │   │   ├── Hero.tsx                 # Full-screen hero with 3D ambient glows and seed pills
    │   │   ├── SearchBar.tsx            # Futuristic glass search with live autocomplete
    │   │   ├── MovieCard.tsx            # 3D interactive tilt cards with ambient rim lighting
    │   │   ├── MoviePoster.tsx          # Dynamic poster system with genre palettes & fallback art
    │   │   ├── RecommendationSection.tsx# Results showcase with "Because you liked [Movie]"
    │   │   ├── MovieModal.tsx           # Deep dive detail modal with storyline, cast & director
    │   │   ├── ExploreSection.tsx       # "Explore More" horizontal scrollable carousels
    │   │   ├── ModelArchitecture.tsx    # 3-step explanation & semantic resonance map
    │   │   ├── TechStackSection.tsx     # ML & high-dimensional vector specifications
    │   │   ├── AIAssistantWidget.tsx    # Real-time neural inference status indicator HUD
    │   │   ├── LoadingScreen.tsx        # Central animated logo with smooth fade-in
    │   │   └── Footer.tsx               # Minimal cinematic branding footer
    │   ├── styles/
    │   │   └── index.css                # Custom CSS design system with glassmorphism tokens
    │   ├── types/
    │   │   └── movie.ts                 # Full TypeScript interfaces
    │   ├── App.tsx                      # Master application orchestrator
    │   └── main.tsx
    └── vite.config.ts                   # Vite proxy configuration for /api routes
```

---

## 🚀 Running the System

### 1. API Server (Port 5000)
```powershell
uv run --with flask --with flask-cors --with pandas --with scikit-learn --with numpy python server.py
```

### 2. Frontend Interface (Port 5173)
```powershell
cd frontend
npm run dev -- --host 127.0.0.1 --port 5173
```

Or execute both with:
```powershell
.\start.ps1
```

Access the application in your browser at: **`http://127.0.0.1:5173`**
