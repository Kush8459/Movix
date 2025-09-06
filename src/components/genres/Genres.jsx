import "./style.scss";
import useStore from "../../store/useStore";

const Genres = ({ data }) => {
  const { genres } = useStore();

  return (
    <div className="genres">
      {data?.map((g) => {
        if (!genres[g]?.name) return;
        return (
          <div key={g} className="genre">
            {genres[g]?.name}
          </div>
        );
      })}
    </div>
  );
};

export default Genres;
