import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from './components/Layout';
import { Routes,Route } from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews';
import NotFound from './components/notFound/NotFound';


function App() {

  const [movies,setMovies] = useState();
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);

  const getData = async ()=>{
    const response = await axios.get("/api/v1/movies");  
    setMovies(response.data);
  }

  const getMovieData = async(movieId) => {
    const response = await axios.get(`/api/v1/movies/${movieId}`);

    const singleMovie = response.data;
    
    setMovie(singleMovie);
    console.log(singleMovie);

    setReviews(singleMovie.reviewIds);
  }

  useEffect(() => {
    getData(); 

  }, [])
  
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="/" element={<Home movies={movies} />} ></Route>
          <Route path="/Trailer/:ytTrailerId" element={<Trailer/>}></Route>
          <Route path="/Reviews/:movieId" element ={<Reviews getMovieData = {getMovieData} movie={movie} reviews ={reviews} setReviews = {setReviews} />}></Route>
          <Route path="*" element = {<NotFound/>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
