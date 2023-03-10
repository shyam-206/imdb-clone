import React ,{useEffect,useState } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import './Card.css'
import { Link } from 'react-router-dom'

export default function Card({movie}) {
    
    /* loading for the first the render then they 
    don't show direct cards instead of they show loading 
    effect and the after one second they show the all popular 
    picture in form of cards */ // using the skeleton loading theme used

    const [isLoading,setIsLoading] = useState(true)
    
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        },1500)    
    },[])

    return (
        <>
            {
                isLoading ? 
                // first one second this will show 
                <div className="cards">
                    <SkeletonTheme baseColor='#202020' highlightColor='#444'>
                        <Skeleton height={300} duration={2} />
                    </SkeletonTheme>
                </div>
                :
                // after that this Link components render
                <Link to={`/movie/${movie.id}`} style={{textDecoration:"none" ,color:"white"}}>
                    <div className="cards">
                        <img className="cards_img" src={`https://image.tmdb.org/t/p/original/${ movie ? movie.poster_path:"" }`} alt="" />
                        <div className="cards_overlay">
                            <div className="card_title">{ movie ? movie.original_title:""}</div>
                            <div className="card_runtime">
                                { movie ? movie.release_date:"" }
                                <span className='card_rating'> 
                                    {movie ? movie.vote_average:""} 
                                    <i className="fas fa-star" />{""}
                                </span>
                            </div>
                            <div className="card_description">
                                {movie ? movie.overview.slice(0,118)+"..." :""}
                            </div>
                        </div>
                    </div>

                </Link>
            }
        </>
    )
}
