import React, { useState, useEffect } from "react";
import LearnMoreShips from "./LearnMoreShips.jsx"
import { useContext } from 'react'
import { Context } from '../store/appContext'
import styles from "./Styles.module.css"
import { toast } from 'react-toastify';
import ConfirmationNotification from './ConfirmationNotification';


const PlanetsCard = ({ starship }) => {

    const { store, actions } = useContext(Context)

    const [isOnFavorite, setIsOnFavorite] = useState(false)

    useEffect(() => {
        const favoriteShipsIds = store.favoriteShipsIds
        if (favoriteShipsIds.includes(starship.id)) {
            setIsOnFavorite(true)
        } else {
            setIsOnFavorite(false)
        }
    }, [store.favoriteShipsIds])

    const handleAddFavorite = () => {
        setIsOnFavorite(true)
        actions.addFavoriteShip(starship)
        toast(`${starship.name} added to favorites!`, {
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
        const deleteFetch = await actions.deleteAddedCard(starship.uid, 'starship')
        if (deleteFetch.message == 'COMPLETED') {
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
                <div className={`card ${styles.cardsStyleShips}`}>
                    <div className="card-body" style={{ height: "auto" }}>
                        <img
                            src={starship.image_url}
                            style={{height: '140px'}}                           
                            className={`card-img-top ${styles.cardImg}`} 
                            alt="..."
                        />
                        <h5 className="card-title" style={{ marginTop: "10px", height: "40px" }}>{starship.name}</h5>
                        <p className="card-text" style={{ height: "35px" }}>Model: {starship.model}</p>
                        <p className="card-text">Crew: {starship.crew}</p>
                        <div className={styles.cardBtn}>
                            <button onClick={() => actions.detailsToShowShips(starship)} className={styles.learnMore}>Learn More</button>
                            {isOnFavorite ? (
                                <button style={{ backgroundColor: "rgba(0, 0, 0, 0.327)" }} href="#"><i className="fa-solid fa-star" style={{ color: "#fae500" }}></i></button>
                            ) : (
                                <button onClick={() => handleAddFavorite()} style={{ backgroundColor: "rgba(0, 0, 0, 0.327)" }} href="#"><i className="fa-regular fa-star" style={{ color: "#fae500" }}></i></button>
                            )
                            }
                            {starship.is_added &&
                                <button onClick={() => handleConfirmDelete()} className={styles.learnMore}><i className="fa-regular fa-trash-can"></i></button>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <LearnMoreShips />
        </div>
    )
}

export default PlanetsCard