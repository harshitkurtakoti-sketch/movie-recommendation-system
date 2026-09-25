import pickle
import sys

print("Loading movies.pkl...")
with open("movies.pkl", "rb") as f:
    movies = pickle.load(f)

print("movies type:", type(movies))
if hasattr(movies, "columns"):
    print("movies columns:", movies.columns.tolist())
    print("movies shape:", movies.shape)
    print("First 3 rows:\n", movies.head(3))
elif isinstance(movies, dict):
    print("movies dict keys:", list(movies.keys())[:10])

print("\nLoading similarity.pkl...")
with open("similarity.pkl", "rb") as f:
    similarity = pickle.load(f)

print("similarity type:", type(similarity))
if hasattr(similarity, "shape"):
    print("similarity shape:", similarity.shape)
    print("similarity[0][:10]:", similarity[0][:10])

print("\nLoading vectorizer.pkl...")
try:
    with open("vectorizer.pkl", "rb") as f:
        vectorizer = pickle.load(f)
    print("vectorizer type:", type(vectorizer))
except Exception as e:
    print("vectorizer error:", e)
