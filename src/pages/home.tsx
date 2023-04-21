import axios from "axios";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
// import * as S from "./styled"
import { useQuery } from "react-query";

export interface MovieProps {
  adult: boolean;
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  genre_ids: [number];
}

export interface HomeProps {
  page: number;
  results: [MovieProps];
  total_pages: number;
  total_results: number;
}

export const Home: React.FC = () => {
  const { pg } = useParams();
  const getMovies = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=8a34e9ed74095c8677249958ec8262f7&language=en-US&page=${pg}`
    );
    console.log(res.data);
    return res.data;
  };

  const { data: movieData, isLoading } = useQuery<HomeProps>(
    "movies",
    getMovies
  );

  useEffect(() => {
    getMovies();
  }, []);
  return (
    <>
      {isLoading ? <h1>Loading...</h1> : null}
      {movieData?.results.map(({ id, poster_path, title }) => (
        <>
          <img
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt="um"
          ></img>
          <Link to={`/movie/${id}`}>{title}</Link>
        </>
      ))}
    </>
  );
};
