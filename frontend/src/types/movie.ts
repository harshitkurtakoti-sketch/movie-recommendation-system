export interface MovieItem {
  id?: number;
  movie_id?: number;
  title: string;
  year?: string;
  rating?: number;
  vote_average?: number;
  vote_count?: number;
  popularity?: number;
  genres?: string[];
  overview?: string;
  tagline?: string;
  runtime?: string;
  release_date?: string;
  budget?: number;
  revenue?: number;
  cast?: string[];
  director?: string | null;
  similarity_score?: number;
  match_percentage?: string;
  match_tier?: string;
  ml_strategy?: string;
  matched_features?: string[];
  rank?: number;
  poster_path?: string;
  poster_url?: string;
  backdrop_path?: string;
  backdrop_url?: string;
}

export interface RecommendationResponse {
  source_movie: MovieItem;
  recommendations: MovieItem[];
  total: number;
  active_strategy?: string;
  engine_metrics?: {
    model: string;
    vocabulary_size: number;
    corpus_size: number;
    inference_time_ms: number;
    strategy_applied?: string;
  };
}

export interface ExploreCategory {
  id: string;
  title: string;
  tagline: string;
  movies: MovieItem[];
}

export interface SearchResult {
  title: string;
  movie_id: number;
  year: string;
  rating: number;
  genres: string[];
  popularity: number;
}
