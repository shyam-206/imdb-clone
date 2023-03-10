import React ,{useEffect,useState} from 'react'
import './MovieList.css'
import { useParams } from 'react-router-dom'
import Card from '../card/Card'
import Axios from 'axios'

export default function MovieList() {

    const [movieList, setMovieList] = useState([])
    const {type} = useParams()

    useEffect(() => {
        const getData = () => {
            Axios.get(`https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
            .then((response) => {
                setMovieList(response.data['results'])
            })  
        }
        getData()
    }, [type])
 

    return (
        <div className="movie__list">
            <h2 className="list__title">{(type ? type : "POPULAR").toUpperCase()}</h2>
            <div className="list__cards" >
                {
                    movieList.map(movie => (
                        <Card movie={movie} key={movie.id} />
                    ))
                }
            </div>
        </div>
    )
}
