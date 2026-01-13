import React from "react";
import { useGlobalContext } from "./context";
import { NavLink } from "react-router-dom";
import Loader from "./Loader";

const Movies = () => {
  const context = useGlobalContext();
 
  const { movie, isLoading, error } = context;

  if (isLoading) {
    return <Loader />;
  }

  if (error.show) {
    return (
      <div className="text-red-500 text-center py-8">Error: {error.msg}</div>
    );
  }

  if (!movie || movie.length === 0) {
    return <div className="text-center py-8">No movies found</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 px-8 py-12 bg-[#0f0f0f]">
      {movie.map((curMovie) => {
        // const { imdbID, Title, Poster, Year, Type } = curMovie;
        const { id, title, poster_path, release_date ,genre_ids} = curMovie;

        return (
          <NavLink to={`/movie/${id}`} key={id} className="group">
            <div className="relative bg-[#1a1a1a] rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(255,0,0,0.2)] border border-white/5">
              {/* Top Badge (Year) */}
              <div className="absolute top-3 left-3 z-10">
                <span className="px-2 py-1 text-[10px] font-bold tracking-widest uppercase bg-black/60 backdrop-blur-md text-white border border-white/10 rounded-md">
                  {release_date}
                </span>
              </div>

              {/* Image Container */}
              <div className="relative aspect-2/3 overflow-hidden">
                <img
                  src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                  alt={title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src =
                      'https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400&h=600&fit=crop&auto=format';
                  }}
                />

                {/* Overlay Gradient (Always there but darkens on hover) */}
                <div className="absolute inset-0 bg-linear-to-t from-[#0f0f0f] via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content Section */}
              <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-red-500 text-[10px] font-bold uppercase tracking-[2px] mb-1">
                  {genre_ids || "Movie"}
                </p>
                <h3 className="text-white font-bold text-lg leading-tight line-clamp-2 drop-shadow-lg">
                  {title.substring(0,15)+ "..." 
                  }
                </h3>

                {/* Animated Button (Visible on Hover) */}
                <div className="mt-8  flex items-center gap-2 text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  <span className="h-0.5 w-12 bg-red-600"></span>
                  CLICK FOR MORE INFO{" "}
                </div>
              </div>
            </div>
          </NavLink>
        );
      })}
    </div>
  );
};

export default Movies;
