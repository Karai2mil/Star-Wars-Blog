import React, { useState, useEffect } from "react";
import LearnMorePlanets from "./LearnMorePlanets.jsx"
import { useContext } from 'react'
import { Context } from '../store/appContext'
import styles from "./Styles.module.css"
import { toast } from 'react-toastify';
import ConfirmationNotification from './ConfirmationNotification';


const PlanetsCard = ({ planets }) => {

    const { store, actions } = useContext(Context)

    const [isOnFavorite, setIsOnFavorite] = useState(false)

    useEffect(() => {
        const favoritePlanetsIds = store.favoritePlanetsIds
        if (favoritePlanetsIds.includes(planets.id)) {
            setIsOnFavorite(true)
        } else {
            setIsOnFavorite(false)
        }
    }, [store.favoritePlanetsIds])

    const handleAddFavorite = () => {
        setIsOnFavorite(true)
        actions.addFavoritePlanet(planets)
        toast(`${planets.name} added to favorites!`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: {
                color: "#fae500",
                background: 'rgba(0, 0, 0, 0.4)',
                fontWeight: 'bold',
                backdropFilter: 'blur(2px)'
            },
            theme: "dark",
        });
    }

    const handleDeleteCard = async () => {
        const deleteFetch = await actions.deleteAddedCard(planets.uid, 'planet')
        if (deleteFetch.message === 'COMPLETED') {
            window.location.reload()
        }
    }

    const handleConfirmDelete = () => {
        toast(<ConfirmationNotification message="Are you sure?" onConfirm={handleDeleteCard}/>, {
            position: "top-center",
            autoClose: 10000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: {
                color: "#fae500",
                background: 'rgba(0, 0, 0, 0.4)',
                fontWeight: 'bold',
                backdropFilter: 'blur(2px)',
            },
            theme: "dark",
        });
    }

    return (
        <div>
            <div>
                <div className={`card ${styles.cardsStylePlanets}`}>
                    <div className="card-body">
                        <img
                            src={planets.image_url}
                            style={{height: '210px'}}                           
                            className={`card-img-top ${styles.cardImg}`}                            
                            alt="..."
                        />
                        <h5 className="card-title" style={{ marginTop: "10px" }}>{planets.name}</h5>
                        <p className="card-text">Diameter: {planets.diameter} km</p>
                        <p style={{height: '35px'}} className="card-text">Climate: {planets.climate}</p>
                        <div className={styles.cardBtn}>
                            <button onClick={() => actions.detailsToShowPlanets(planets)} className={styles.learnMore}>Learn More</button>
                            {isOnFavorite ? (
                                <button className={styles.learnMore} style={{ backgroundColor: "rgba(0, 0, 0, 0.327)" }} href="#"><i className="fa-solid fa-star" style={{ color: "#fae500" }}></i></button>
                            ) : (
                                <button className={styles.learnMore} onClick={() => handleAddFavorite()} style={{ backgroundColor: "rgba(0, 0, 0, 0.327)" }} href="#"><i className="fa-regular fa-star" style={{ color: "#fae500" }}></i></button>
                            )
                            }
                            {planets.is_added &&
                                <button onClick={() => handleConfirmDelete()} className={styles.learnMore}><i className="fa-regular fa-trash-can"></i></button>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <LearnMorePlanets />
        </div>
    )
}

export default PlanetsCard