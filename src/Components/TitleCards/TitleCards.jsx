import React, { useEffect, useRef, useState } from 'react';
import './TitleCards.css';
import cards_data from '../../assets/cards/Cards_data';
import { Link } from 'react-router-dom';

export const TitleCards = ({title, category}) => {

  const[apiData, setApiData] = useState([]);

  const cardsRef = useRef(null);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer '
    }
  };
  
  
  const handleWheel = (event) => {
    event.preventDefault();
    if (cardsRef.current) {
      cardsRef.current.scrollLeft += event.deltaY;
    }
  };

  useEffect(() => {

    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
      .then(response => response.json())
      .then(data => {
        setApiData(data.results); // Update the state with fetched data
      })
      .catch(err => console.error(err));

  
    const currentRef = cardsRef.current;
    if (currentRef) {
      currentRef.addEventListener('wheel', handleWheel);
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  return (
    <div className='titlecards'>
      <h2>{title? title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => (
          <Link to = {`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+ card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
