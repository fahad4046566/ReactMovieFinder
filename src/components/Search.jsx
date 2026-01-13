import { useGlobalContext } from "./context";

const Search = () => {
  const context = useGlobalContext();
  const { query, setQuery, getMovies } = context;

  const handlerChange = (e) => {
    setQuery(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim) {
      getMovies(query);
    }
  };

  return (
    <div className="min-h-[30vh] flex flex-col items-center justify-center p-8">
      {/* Title & Subtitle Section */}
      <div className="text-center mb-8">
        <div className="text-5xl font-bold text-white mb-2 flex items-center justify-center gap-3">
          <span>🎬</span>
          <span className="bg-linear-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
            Movie
          </span>
          <span className="text-gray-300">Finder</span>
        </div>
        <p className="text-gray-400 text-lg">
          Discover your next favorite movie
        </p>
      </div>

      <div className="w-full max-w-3xl">
        {/* Input Section */}
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            placeholder="Type movie name..."
            value={query || ""}
            onChange={handlerChange}
            className="w-full  h-14 px-8 rounded-2xl border-2 border-gray-700/30 bg-gray-900/60 backdrop-blur-md text-gray-200 focus:outline-none focus:border-red-500/50 text-lg shadow-2xl transition-all"
          />
        </form>

        {/* Suggestion Buttons - Added mt-8 for clear gap */}
        <div className="multibutton p-10 flex flex-wrap gap-3 justify-center">
          {[
            "Avengers",
            "Batman",
            "Titanic",
            "Inception",
            "Harry Potter",
            "Robot",
            "Spiderman",
          ].map((term) => (
            <button
              key={term}
              onClick={() => setQuery(term)}
              className="suggestBtn px-5 py-2  text-sm font-medium text-gray-300 bg-gray-800/40 border border-gray-700/50 rounded-full hover:bg-red-600 hover:text-white hover:border-red-500 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-red-500/20"
            >
              {term}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
