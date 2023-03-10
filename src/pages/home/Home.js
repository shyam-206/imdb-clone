import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import './Home.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import Cards from '../../components/card/Card';
import MovieList from '../../components/movielist/MovieList';

export default function Home() {
    const [ popularMovies,setPopularMovies] = useState([]) 
    const [searchText,setSearchText] = useState("")
    const [serachMovie,setSearchMovie] = useState([])
    
    useEffect(() =>{
        Axios.get("https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US")
        .then((response) => {
            setPopularMovies(response.data['results'])
        })
    },[])

    const changeText = (e) => {
        setSearchText(e.target.value)
    }

    const getMovie = (e) => {
        e.preventDefault()
        Axios.get(`https://api.themoviedb.org/3/search/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&query=${searchText}`)
        .then((response) => {
            setSearchMovie(response.data['results'])
        })
    }
    

    return (
        <>
            <div className="poster">
                <Carousel
                    showThumbs={false}
                    autoPlay={true} 
                    transitionTime={3} //after 3 sec next 
                    infiniteLoop={true} //for end to first
                    showStatus={false} //
                >
                    {
                        popularMovies.map(movie => {
                            return (
                                <Link style={{textDecoration:"none" ,color:"white"}} to={`/movie/${movie.id}`} key={movie.id}>
                                    <div className="posterImage">
                                        <img src={`https://image.tmdb.org/t/p/original/${ movie && movie.backdrop_path}`} alt=""/>
                                    </div>
                                    <div className="posterImage__overlay">
                                        <div className="posterImage__title">{movie ? movie.original_title: ""}</div>
                                        <div className="posterImage__runtime">
                                            {movie ? movie.release_date:""}
                                            <span className="posterImage__rating">
                                                {movie ? movie.vote_average :""}
                                                <i className="fas fa-star" />{" "}
                                            </span>
                                        </div>
                                        <div className="posterImage__description">{movie ? movie.overview : ""}</div>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </Carousel>
                
                
                <div className="input-group" style={{marginBottom:'10px'}}>
                
                </div>
            

                <div className="movie__list">
                <h2 className='list__title'>Search</h2>
                    <form className="d-flex" onSubmit={getMovie}    >
                        <div className="form-outline">
                            <input type="search" className="form-control" placeholder='Search Movie' value={searchText} onChange={changeText}/>
                        </div>
                            &nbsp;&nbsp;
                        <button type="submit" className="btn btn-primary" >
                            <i className="fas fa-search" ></i>
                        </button>
                    </form>
                    <div className="list__cards" >
                    {
                        serachMovie.map((movie) => {
                        return <Cards movie={movie} key={movie.id} />
                        })
                    }
                    </div> 
                </div>
            
                <MovieList/>
            </div>
        </>
    )
}
