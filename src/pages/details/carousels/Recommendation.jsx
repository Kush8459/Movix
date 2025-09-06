import Carousel from "../../../components/carousel/Carousel";
import { useRecommendations } from "../../../hooks/useMovieApi";

const Recommendation = ({ mediaType, id }) => {
  const { data, isLoading: loading } = useRecommendations(mediaType, id);

  return (
    <Carousel
      title="Recommendations"
      data={data?.results}
      loading={loading}
      endpoint={mediaType}
    />
  );
};

export default Recommendation;
