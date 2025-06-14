export function dedupeMovies(moviesArray) {
    const seen = new Set();
    return moviesArray.filter((m) => {
      if (seen.has(m.tmdbId)) return false;
      seen.add(m.tmdbId);
      return true;
    });
}