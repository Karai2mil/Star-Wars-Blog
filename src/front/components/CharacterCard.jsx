import React, { useEffect, useState } from "react";
import LearnMore from "./LearnMore.jsx"
import { useContext } from 'react'
import { Context } from '../store/appContext'
import styles from "./Styles.module.css"
import { toast } from 'react-toastify';
import ConfirmationNotification from './ConfirmationNotification';


const CharacterCard = ({ character }) => {

    const { store, actions } = useContext(Context)
    const [isOnFavorite, setIsOnFavorite] = useState(false)

    useEffect(() => {
        const favoriteCharactersIds = store.favoriteCharactersIds
        if (favoriteCharactersIds.includes(character.id)) {
            setIsOnFavorite(true)
        } else {
            setIsOnFavorite(false)
        }
    }, [store.favoriteCharactersIds])

    const handleAddFavorite = () => {
        setIsOnFavorite(true)
        actions.addFavoriteCharacter(character)
        toast(`${character.name} added to favorites!`, {
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
                backdropFilter: 'blur(2px)',
            },
            theme: "dark",
        });
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

    const handleDeleteCard = async () => {
        const deleteFetch = await actions.deleteAddedCard(character.uid, 'character')
        if (deleteFetch.message == 'COMPLETED') {
            window.location.reload()
        }
    } 


    return (
        <div>
            <div>
                <div className={`card ${styles.cardsStyle}`}>
                    <div className="card-body">
                        <img
                            src={character.image_url}
                            style={{height: '285px'}}                           
                            className={`card-img-top ${styles.cardImg}`}
                            alt="..."
                        />
                        <h5 className="card-title" style={{ marginTop: "10px" }}>{character.name}</h5>
                        <p className="card-text">Gender: {character.gender}</p>
                        <p className="card-text">Height: {character.height}</p>
                        <div className={styles.cardBtn}>
                            <button onClick={() => actions.detailsToShow(character)} className={styles.learnMore}>Learn More</button>
                            {isOnFavorite ? (
                                <button style={{ backgroundColor: "rgba(0, 0, 0, 0.327)" }} href="#"><i className="fa-solid fa-star" style={{ color: "#fae500" }}></i></button>
                            ) : (
                                <button onClick={() => handleAddFavorite()} style={{ backgroundColor: "rgba(0, 0, 0, 0.327)" }} href="#"><i className="fa-regular fa-star" style={{ color: "#fae500" }}></i></button>
                            )
                            }
                            {character.is_added &&
                                <button onClick={() => handleConfirmDelete()} className={styles.learnMore}><i className="fa-regular fa-trash-can"></i></button>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <LearnMore />
        </div>
    )
}

export default CharacterCard