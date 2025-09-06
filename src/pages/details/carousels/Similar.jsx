import Carousel from "../../../components/carousel/Carousel";
import { useSimilar } from "../../../hooks/useMovieApi";

const Similar = ({ mediaType, id }) => {
  const { data, isLoading: loading } = useSimilar(mediaType, id);

  const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";

  return (
    <Carousel
      title={title}
      data={data?.results}
      loading={loading}
      endpoint={mediaType}
    />
  );
};

export default Similar;
