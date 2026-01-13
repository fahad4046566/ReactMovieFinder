import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "./Loader";
const SingleMovie = () => {
  const { id } = useParams();
  const [singleMovie, setSingleMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${
        import.meta.env.VITE_REACT_APP_API_KEY
      }`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setSingleMovie(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-red-500 text-center py-8">Error: {error}</div>;
  }

  if (!singleMovie) {
    return <div className="text-center py-8">Movie not found</div>;
  }

  return (
    <div className="movie-details-page">
      {/* Hero Section */}
      <div className="movie-hero">
        {/* Backdrop Image */}

        <img
          src={
            singleMovie.backdrop_path
              ? `https://image.tmdb.org/t/p/original${singleMovie.backdrop_path}`
              : `https://source.unsplash.com/random/1920x1080/?movie&${singleMovie.id}`
          }
          alt={singleMovie.title}
          className="movie-backdrop"
          onError={(e) => {
            e.target.src = `https://picsum.photos/seed/${singleMovie.title}/1920/1080`;
          }}
        />

        {/* Gradient Overlay */}
        <div className="movie-gradient" />

        {/* Content Container */}
        <div className="movie-content">
          <div className="movie-container">
            <div className="movie-layout">
              {/* Poster */}
              <div className="movie-poster">
                <img
                  src={`https://image.tmdb.org/t/p/w500${singleMovie.poster_path}`}
                  alt={singleMovie.title}
                  className="movie-poster-img"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400&h=600&fit=crop&auto=format";
                  }}
                />
              </div>

              {/* Movie Info */}
              <div className="movie-info">
                {/* Tagline */}
                {singleMovie.tagline && (
                  <p className="movie-tagline">"{singleMovie.tagline}"</p>
                )}

                {/* Title */}
                <h1 className="movie-title">{singleMovie.title}</h1>

                {/* Meta Info */}
                <div className="movie-meta">
                  {/* Rating */}
                  <div className="movie-rating">
                    <span className="movie-rating-icon">⭐</span>
                    <span>{singleMovie.vote_average?.toFixed(1)}</span>
                  </div>

                  {/* Year */}
                  <span className="movie-year">
                    {singleMovie.release_date?.split("-")[0]}
                  </span>

                  {/* Runtime */}
                  {singleMovie.runtime && (
                    <span className="movie-runtime">
                      {Math.floor(singleMovie.runtime / 60)}h{" "}
                      {singleMovie.runtime % 60}m
                    </span>
                  )}

                  {/* Genres */}
                  <div className="movie-genres">
                    {singleMovie.genres?.slice(0, 3).map((genre) => (
                      <span key={genre.id} className="movie-genre">
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="movie-main">
        <div className="movie-grid">
          {/* Left Column - Overview & Details */}
          <div className="flex flex-col gap-5 ">
            {/* Overview */}
            <section className="movie-section">
              <h2 className="movie-section-title">Overview</h2>
              <p className="movie-overview">{singleMovie.overview}</p>
            </section>

            {/* Production Info */}
            <section className="movie-section">
              <h2 className="movie-section-title">Production Details</h2>

              <div className="movie-production-grid">
                {/* Companies */}
                <div>
                  <h3 className="movie-subtitle">Production Companies</h3>
                  <div className="movie-companies">
                    {singleMovie.production_companies?.map((company) => (
                      <div key={company.id} className="movie-company">
                        {company.logo_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                            alt={company.name}
                            className="movie-logo"
                          />
                        ) : (
                          <div className="movie-logo-fallback">
                            <span className="movie-logo-fallback-text">
                              {company.name.charAt(0)}
                            </span>
                          </div>
                        )}
                        <span className="movie-company-name">
                          {company.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Countries */}
                <div>
                  <h3 className="movie-subtitle">Production Countries</h3>
                  <div>
                    {singleMovie.production_countries?.map((country) => (
                      <div key={country.iso_3166_1} className="movie-company">
                        <span className="movie-company-name">
                          {country.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column - Stats */}
          <div className="flex flex-col gap-5">
            {/* Stats Card */}
            <div className="movie-stats-card">
              <h2 className="movie-stats-title">Movie Statistics</h2>

              <div>
                {/* Budget */}
                <div className="movie-stats-item">
                  <span className="movie-stats-label">Budget</span>
                  <span className="movie-stats-value">
                    {singleMovie.budget
                      ? `$${(singleMovie.budget / 1000000).toFixed(1)}M`
                      : "N/A"}
                  </span>
                </div>

                {/* Revenue */}
                <div className="movie-stats-item">
                  <span className="movie-stats-label">Revenue</span>
                  <span className="movie-stats-value movie-stats-value-green">
                    {singleMovie.revenue
                      ? `$${(singleMovie.revenue / 1000000).toFixed(1)}M`
                      : "N/A"}
                  </span>
                </div>

                {/* Popularity */}
                <div className="movie-stats-item">
                  <span className="movie-stats-label">Popularity</span>
                  <span className="movie-stats-value">
                    {singleMovie.popularity?.toFixed(0)}
                  </span>
                </div>

                {/* Votes */}
                <div className="movie-stats-item">
                  <span className="movie-stats-label">Vote Count</span>
                  <span className="movie-stats-value">
                    {singleMovie.vote_count?.toLocaleString()}
                  </span>
                </div>

                {/* Status */}
                <div className="movie-stats-item">
                  <span className="movie-stats-label">Status</span>
                  <span
                    className={`movie-status-badge ${
                      singleMovie.status === "Released"
                        ? "movie-status-released"
                        : singleMovie.status === "In Production"
                        ? "movie-status-production"
                        : "movie-status-default"
                    }`}
                  >
                    {singleMovie.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Language */}
            {singleMovie.spoken_languages &&
              singleMovie.spoken_languages.length > 0 && (
                <div className="movie-languages-card">
                  <h3 className="movie-languages-title">Languages</h3>
                  <div className="movie-languages-list">
                    {singleMovie.spoken_languages.map((lang) => (
                      <span key={lang.iso_639_1} className="movie-language-tag">
                        {lang.english_name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default SingleMovie;
