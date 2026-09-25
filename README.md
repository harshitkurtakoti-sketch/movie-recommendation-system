# AETHERIA — AI Movie Intelligence Engine

http://127.0.0.1:5173

> **Discover movies by understanding what you like — not just what you search for.**

AETHERIA is a production-style **AI-powered movie recommendation platform** that uses **content-based Machine Learning, vectorization, and cosine similarity** to understand movie characteristics and generate personalized recommendations.

Instead of relying on simple popularity or genre matching, AETHERIA transforms movie metadata into high-dimensional numerical representations and identifies movies with the strongest semantic similarity to the user's selected movie.

<div align="center">

**🎬 Search → 🧠 Understand → 🔮 Recommend → 🍿 Discover**

</div>

---

## ✨ Why AETHERIA?

Most movie platforms answer:

> **"What movies are popular?"**

AETHERIA focuses on:

> **"What movies are similar to the movie you already love?"**

The system analyzes movie metadata such as:

* 🎭 Genres
* 📝 Story / Overview
* 🎬 Director
* 👥 Cast
* 🏷️ Keywords
* ⭐ Ratings and metadata

This information is converted into a machine-readable representation using **Scikit-learn's CountVectorizer**, followed by **Cosine Similarity** to calculate relationships between movies.

The result is a recommendation engine capable of discovering movies that share similar characteristics even when their titles, release years, or popularity are completely different.

---

# 🎥 Product Experience

AETHERIA is designed as a cinematic AI experience rather than a traditional CRUD application.

### 🔎 Intelligent Movie Search

Search through the movie dataset using a futuristic glassmorphic interface with live suggestions.

### 🧠 AI Recommendation Engine

Select a movie and AETHERIA retrieves the most semantically similar movies from the trained recommendation matrix.

### 🎬 Cinematic Movie Cards

Interactive 3D movie cards provide:

* Dynamic poster artwork
* Genre information
* Ratings
* Hover interactions
* 3D tilt effects
* Ambient lighting

### 🪄 Movie Intelligence Modal

Explore a movie through a detailed cinematic interface containing:

* Storyline
* Genres
* Director
* Cast
* Rating
* Release information
* Recommendation context

### 🌌 Interactive 3D Environment

The frontend uses animated visual elements to create a futuristic AI-inspired environment, including:

* Particle constellations
* Ambient gradients
* Glassmorphism
* Floating elements
* 3D interactions
* Animated neural-style backgrounds

---

# 🧠 Machine Learning Pipeline

AETHERIA uses a **content-based recommendation architecture**.

```text
                    TMDB Dataset
                         │
                         ▼
              ┌─────────────────────┐
              │   Data Processing    │
              │                     │
              │ Genres              │
              │ Overview            │
              │ Cast                │
              │ Director            │
              │ Keywords            │
              └──────────┬──────────┘
                         │
                         ▼
              ┌─────────────────────┐
              │  Feature Engineering│
              └──────────┬──────────┘
                         │
                         ▼
              ┌─────────────────────┐
              │ CountVectorizer     │
              │                     │
              │ 5,000 features      │
              └──────────┬──────────┘
                         │
                         ▼
              ┌─────────────────────┐
              │ Movie Vectors       │
              │                     │
              │ 4,806 movies        │
              └──────────┬──────────┘
                         │
                         ▼
              ┌─────────────────────┐
              │ Cosine Similarity   │
              │                     │
              │ 4,806 × 4,806       │
              └──────────┬──────────┘
                         │
                         ▼
              ┌─────────────────────┐
              │ Recommendation      │
              │ Engine              │
              └──────────┬──────────┘
                         │
                         ▼
                   Top Similar Movies
```

---

# 🔬 How Recommendation Works

When a user selects a movie, AETHERIA performs the following process:

### 1. Movie Selection

The user searches for and selects a movie.

### 2. Feature Representation

The system retrieves the movie's processed feature representation.

### 3. Vector Comparison

The selected movie vector is compared against the vectors of all other movies.

### 4. Similarity Calculation

Cosine similarity measures how closely the movie vectors are related.

Conceptually:

```text
                    A · B
Cosine Similarity = ───────
                    ||A|| ||B||
```

### 5. Ranking

Movies are ranked according to similarity score.

### 6. Recommendation

The highest-ranked relevant movies are returned to the frontend.

---

# 📊 Current ML Assets

| Asset                        | Description                          |
| ---------------------------- | ------------------------------------ |
| `movies.pkl`                 | Processed movie DataFrame            |
| `similarity.pkl`             | Precomputed cosine similarity matrix |
| `vectorizer.pkl`             | Trained Scikit-learn CountVectorizer |
| `tmdb_5000_movies.csv`       | Movie metadata                       |
| `tmdb_5000_credits.csv`      | Cast and crew metadata               |
| `Movie_recommendation.ipynb` | Original ML training notebook        |

### Dataset Scale

```text
Movies              → 4,806
Vector Features     → 5,000
Similarity Matrix   → 4,806 × 4,806
Recommendation Type → Content-Based
Vectorizer          → CountVectorizer
Similarity          → Cosine Similarity
```

---

# 🏗️ System Architecture

```text
┌─────────────────────────────────────────────┐
│                 AETHERIA UI                 │
│                                             │
│ React 19 + TypeScript + Vite                │
│ Three.js + Custom CSS                       │
└──────────────────────┬──────────────────────┘
                       │
                       │ REST API
                       ▼
┌─────────────────────────────────────────────┐
│               Flask API                     │
│                                             │
│ Search / Recommendation / Movie Details     │
└──────────────────────┬──────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────┐
│          ML Recommendation Engine           │
│                                             │
│ CountVectorizer + Cosine Similarity         │
└──────────────────────┬──────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────┐
│             Precomputed Models              │
│                                             │
│ movies.pkl                                  │
│ similarity.pkl                              │
│ vectorizer.pkl                              │
└─────────────────────────────────────────────┘
```

---

# 🛠️ Technology Stack

## Frontend

* **React 19**
* **TypeScript**
* **Vite**
* **Three.js**
* **CSS3**
* Glassmorphism UI
* Responsive design

## Backend

* **Python**
* **Flask**
* **Flask-CORS**
* REST API architecture

## Machine Learning

* **Scikit-learn**
* **NumPy**
* **Pandas**
* CountVectorizer
* Cosine Similarity

## Dataset

* **TMDB 5000 Movies Dataset**
* **TMDB 5000 Credits Dataset**

---

# 📁 Project Structure

```text
movie-recommendation-system/
│
├── movies.pkl
├── similarity.pkl
├── vectorizer.pkl
│
├── tmdb_5000_movies.csv
├── tmdb_5000_credits.csv
│
├── Movie_recommendation.ipynb
│
├── server.py
├── start.ps1
│
└── frontend/
    │
    ├── src/
    │   │
    │   ├── components/
    │   │   ├── ParticleBackground.tsx
    │   │   ├── Navbar.tsx
    │   │   ├── Hero.tsx
    │   │   ├── SearchBar.tsx
    │   │   ├── MovieCard.tsx
    │   │   ├── MoviePoster.tsx
    │   │   ├── RecommendationSection.tsx
    │   │   ├── MovieModal.tsx
    │   │   ├── ExploreSection.tsx
    │   │   ├── ModelArchitecture.tsx
    │   │   ├── TechStackSection.tsx
    │   │   ├── AIAssistantWidget.tsx
    │   │   ├── LoadingScreen.tsx
    │   │   └── Footer.tsx
    │   │
    │   ├── styles/
    │   │   └── index.css
    │   │
    │   ├── types/
    │   │   └── movie.ts
    │   │
    │   ├── App.tsx
    │   └── main.tsx
    │
    ├── package.json
    └── vite.config.ts
```

---

# 🚀 Getting Started

## Prerequisites

Make sure the following are installed:

* Python 3.10+
* Node.js 18+
* npm
* Git

---

## 1. Clone the Repository

```bash
git clone https://github.com/harshitkurtakoti-sketch/movie-recommendation-system.git

cd movie-recommendation-system
```

---

## 2. Start the Backend

The Flask API runs on:

```text
http://127.0.0.1:5000
```

Run:

```bash
uv run --with flask --with flask-cors --with pandas --with scikit-learn --with numpy python server.py
```

---

## 3. Start the Frontend

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev -- --host 127.0.0.1 --port 5173
```

Open:

```text
http://127.0.0.1:5173
```

---

## ⚡ One-Command Startup

AETHERIA also includes a PowerShell startup script.

From the project root:

```powershell
.\start.ps1
```

This starts the required backend and frontend services.

---

# 🔌 API Architecture

The frontend communicates with the Python backend through REST endpoints.

The Vite development server proxies API requests to the Flask server.

```text
React Application
       │
       │ /api/*
       ▼
Vite Proxy
       │
       ▼
Flask Server :5000
       │
       ▼
Recommendation Engine
```

This separation keeps the machine-learning engine independent from the frontend presentation layer.

---

# 🎨 Design Philosophy

AETHERIA was designed around the idea:

> **AI should feel intelligent before it even speaks.**

The interface combines:

* Dark cinematic visuals
* Glassmorphism
* Atmospheric gradients
* 3D motion
* Particle systems
* Interactive cards
* Ambient lighting
* Neural-inspired UI elements

The goal is to make the recommendation process feel like entering a **cinematic intelligence system**, rather than using a conventional movie database.

---

# 🧩 Key Components

| Component               | Purpose                                  |
| ----------------------- | ---------------------------------------- |
| `ParticleBackground`    | Interactive 3D particle environment      |
| `Navbar`                | Navigation and branding                  |
| `Hero`                  | Main cinematic landing experience        |
| `SearchBar`             | Movie search and autocomplete            |
| `MovieCard`             | Interactive recommendation cards         |
| `MoviePoster`           | Poster rendering and fallback artwork    |
| `RecommendationSection` | AI-generated recommendations             |
| `MovieModal`            | Detailed movie information               |
| `ExploreSection`        | Additional movie discovery               |
| `ModelArchitecture`     | Visual explanation of ML pipeline        |
| `TechStackSection`      | Technology and ML information            |
| `AIAssistantWidget`     | AI inference status interface            |
| `LoadingScreen`         | Cinematic application loading experience |

---

# 🧠 Why Content-Based Recommendation?

AETHERIA currently uses a content-based approach because it allows recommendations to be generated from the **characteristics of the movies themselves**.

This means the system can recommend movies based on attributes such as:

```text
Movie A
│
├── Genre
├── Story
├── Director
├── Cast
└── Keywords
        │
        ▼
   Movie Vector
        │
        ▼
Similarity Comparison
        │
        ▼
Movie B
Movie C
Movie D
...
```

Unlike a purely popularity-based system, the recommendation engine focuses on **movie-to-movie similarity**.

---

# 📈 Future Roadmap

AETHERIA is designed to evolve beyond a basic content-based recommendation engine.

### Phase 01 — Current

* [x] Content-based recommendations
* [x] CountVectorizer
* [x] Cosine similarity
* [x] Flask REST API
* [x] React frontend
* [x] Movie search
* [x] Interactive movie cards
* [x] Cinematic UI
* [x] 3D visual environment

### Phase 02 — Personalization

* [ ] User accounts
* [ ] Watch history
* [ ] Likes / dislikes
* [ ] Personalized recommendation profiles
* [ ] Recommendation feedback loop

### Phase 03 — Advanced AI

* [ ] Transformer-based embeddings
* [ ] Semantic search
* [ ] Natural-language movie discovery
* [ ] Hybrid recommendation system
* [ ] AI movie assistant
* [ ] Mood-based recommendations

### Phase 04 — Intelligence Layer

* [ ] User preference embeddings
* [ ] Collaborative filtering
* [ ] Real-time recommendation ranking
* [ ] Explainable recommendations
* [ ] Multi-modal movie understanding

---

# 🔮 Vision

AETHERIA aims to evolve from:

```text
Movie Recommendation System
```

into:

```text
Personalized Cinematic Intelligence
```

Imagine searching:

> "I want something dark, psychological, intelligent and slow-paced."

Instead of searching through hundreds of titles, AETHERIA could understand the intent and construct a recommendation space around it.

---

# 📸 Screenshots

> Add screenshots or GIFs of the application here.

Recommended showcase:

```text
01 — Landing Page
02 — Movie Search
03 — Recommendation Results
04 — Movie Intelligence Modal
05 — ML Architecture
06 — 3D Interactive Experience
```

Example:

```markdown
![AETHERIA Dashboard](./screenshots/dashboard.png)
```

---

# 🎬 Demo Flow

A typical AETHERIA session:

```text
OPEN AETHERIA
      ↓
Explore cinematic interface
      ↓
Search for a movie
      ↓
Select movie
      ↓
ML engine analyzes movie vector
      ↓
Cosine similarity comparison
      ↓
Rank similar movies
      ↓
Display recommendations
      ↓
Explore another cinematic universe
```

---

# ⚙️ Performance-Oriented Architecture

The similarity matrix is precomputed during the ML stage rather than calculating every movie relationship during each request.

This allows the API to retrieve recommendation candidates without rebuilding the entire similarity space for every user interaction.

```text
Training Time
     │
     ├── Feature Processing
     ├── Vectorization
     └── Similarity Matrix
              │
              ▼
         Saved Models
              │
              ▼
       Runtime Recommendation
```

This architecture keeps the inference layer lightweight while allowing the frontend to remain highly interactive.

---

# 🤝 Contributing

Contributions, ideas, and improvements are welcome.

```bash
# Fork the repository

# Create a feature branch
git checkout -b feature/your-feature

# Commit your changes
git commit -m "Add your feature"

# Push your branch
git push origin feature/your-feature

# Open a Pull Request
```

---

# 👨‍💻 Author

### Harshit Kirtakoti

**BCA Student | Developer | AI/ML Enthusiast**

Interested in:

* Artificial Intelligence
* Machine Learning
* Full-Stack Development
* Product Design
* AI-powered applications
* Hackathons & Innovation

GitHub:

**https://github.com/harshitkurtakoti-sketch**

---

# 📜 License

This project is intended for educational, experimental, and portfolio purposes.

Dataset usage and attribution should follow the respective dataset's terms.

---

<div align="center">

# 🎬 AETHERIA

### *Where movies become vectors, and vectors become discoveries.*

**Built with Python • React • Machine Learning • Curiosity**

⭐ If you found the project interesting, consider giving it a star.

</div>
