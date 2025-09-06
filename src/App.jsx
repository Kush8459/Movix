import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useApiConfiguration, useGenres } from "./hooks/useMovieApi";
import useStore from "./store/useStore";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";

function App() {
  const { setApiConfigurations, setGenres } = useStore();
  
  const { data: configData } = useApiConfiguration();
  const { data: genresData } = useGenres();

  useEffect(() => {
    if (configData?.images) {
      const url = {
        backdrop: configData.images.secure_base_url + "original",
        poster: configData.images.secure_base_url + "original",
        profile: configData.images.secure_base_url + "original",
      };
      setApiConfigurations(url);
    }
  }, [configData, setApiConfigurations]);

  useEffect(() => {
    if (genresData) {
      setGenres(genresData);
    }
  }, [genresData, setGenres]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
