import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext({
  isLoading: true,
  movie: [],
  error: { show: false, msg: "" },
  getMovies: () => console.log("getMovies called"),
});


const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const [error, setError] = useState({ show: false, msg: "" });
  const [query, setQuery] = useState("superman");
 

  const getMovies = async (url) => {
    try {
      setIsLoading(true);
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      if (data.results && data.results.length > 0) {
        setMovie(data.results);

        setError({ show: false, msg: "" });
      } else {
        setError({ show: true, msg: data.Error || "No movies found" });
      }
    } catch (error) {
      setError({ show: true, msg: error.message });
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        getMovies(
          `https://api.themoviedb.org/3/search/movie?api_key=${
            import.meta.env.VITE_REACT_APP_API_KEY
          }&query=${query}`
        );
      }
    }, 800);
    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  return (
    <AppContext.Provider
      value={{ isLoading, movie, error, getMovies, query, setQuery }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
export default AppContext;
