import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "react-query";

export interface GenreProps {
  id: number;
  name: string;
}
export interface DetailProps {
  genres: [GenreProps];
  title: string;
  poster_path: string;
  overview: string;
  vote_average: number;
}

export const Detail: React.FC = () => {
  const { id } = useParams();
  const getDetail = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=8a34e9ed74095c8677249958ec8262f7&language=en-US`
    );
    console.log(res.data);
    return res.data;
  };

  const { data: detailData, isLoading: detailLoading } = useQuery<DetailProps>(
    "detail",
    getDetail
  );
  useEffect(() => {
    getDetail();
  }, []);
  return (
    <>
      {detailLoading && <h1>Loading...</h1>}
      <h1>{detailData?.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${detailData?.poster_path}`}
        alt="um"
      ></img>
      {detailData?.genres.map(({ id, name }) => (
        <ul>
          <li>{name}</li>
        </ul>
      ))}
      <span>{detailData?.overview}</span>
    </>
  );
};
