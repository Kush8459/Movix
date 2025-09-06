import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchDataFromApi } from "../../../utils/api";

import "./style.scss";
import useStore from "../../../store/useStore";
import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { url } = useStore();

  const { data, isLoading: loading } = useQuery({
    queryKey: ['upcoming', 'movie'],
    queryFn: () => fetchDataFromApi('/movie/upcoming'),
  });

  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data, url.backdrop]);

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  const searchQueryHandlerBtn = (event) => {
    event.preventDefault();
    if (query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className="heroBanner">
      {!loading && (
        <div className="backdrop-img">
          <Img key={background} src={background} />
        </div>
      )}
      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome.</span>
          <span className="subTitle">
            Millions of movies, TV shoes and people to discover. Explore now.
          </span>
          <form className="searchInput" onSubmit={searchQueryHandlerBtn}>
            <input
              type="text"
              placeholder="Search for a movie or tv show...."
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
            />
            <button type="submit">Search</button>
          </form>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
