import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Context } from '../store/appContext'
import LearnMore from "./LearnMore.jsx"
import styles from "../components/Styles.module.css";


const Favorites = () => {

    const { store, actions } = useContext(Context)
    // const [ favoriteCharactersIds, setFavoriteCharactersIds] = useState()
    // const [ favoritePlanetsIds, setFavoritePlanetsIds] = useState()
    // const [ favoriteShipsIds, setFavoriteShipsIds] = useState()

    // useEffect( () => {
    //     const receiveFavorites = async () => {
    //         const favorites = await actions.getFavorites()
    //         console.log("estos son los favoritos",favorites)
    //         setFavoriteCharactersIds(favorites.characters)
    //         setFavoritePlanetsIds(favorites.planets)
    //         setFavoriteShipsIds(favorites.starships)
    //     }
    //     receiveFavorites()
    // }, [])

    // useEffect(() => {
    //     console.log('este es el estado local', favoriteCharactersIds)
    // }, [favoriteCharactersIds])

    return (
        <div>
            <div>
                <div>
                    <h6 style={{paddingLeft: '1rem'}} className={styles.font}>cHARACTERS</h6>
                </div>
                {
                    store.favoriteCharactersIds.length > 0 & store.characters.length > 0 ? (
                        store.favoriteCharactersIds.map((element, index) => {
                            const character = store.characters.find((character) => character.id === element);
                            return (
                                <li key={index} className={styles.dropdownContent}>
                                    <p className={styles.favoritos} onClick={() => actions.detailsToShow(character)}>{character.name}</p>
                                    <i
                                        onClick={() => actions.deleteFavoriteCharacter(character)}
                                        className={`fa-solid fa-rectangle-xmark mt-1 ${styles.favoritesDeleteBtn}`}>
                                    </i>
                                </li>
                            )
                        })
                    ) : (
                        <p style={{ margin: '10px 10px 10px 10px' }}>No favorite characters yet</p>
                    )
                }
                <div>
                    <h6 style={{paddingLeft: '1.1rem'}} className={styles.font}>PLANETS</h6>
                </div>
                {
                    store.favoritePlanetsIds.length > 0 & store.planets.length > 0 ? (
                        store.favoritePlanetsIds.map((element, index) => {

                            const planet = store.planets.find((planet) => planet.id === element);

                            return (
                                <li key={index} className={styles.dropdownContent}>
                                    <p className={styles.favoritos} onClick={() => actions.detailsToShowPlanets(planet)}>{planet.name}</p>
                                    <i
                                        onClick={() => actions.deleteFavoritePlanet(planet)}
                                        className={`fa-solid fa-rectangle-xmark mt-1 ${styles.favoritesDeleteBtn}`}>
                                    </i>
                                </li>
                            )
                        })
                    ) : (
                        <p style={{ margin: '10px 10px 10px 10px' }}>No favorite planets yet</p>
                    )
                }
                <div>
                    <h6 style={{paddingLeft: '1.1rem'}} className={styles.font}>STARSHIPS</h6>
                </div>
                {
                    store.favoriteShipsIds.length > 0 & store.starships.length > 0 ? (
                        store.favoriteShipsIds.map((element, index) => {
                            const starship = store.starships.find((starship) => starship.id === element);
                            return (
                                <li key={index} className={styles.dropdownContent}>
                                    <p className={styles.favoritos} onClick={() => actions.detailsToShowShips(starship)}>{starship.name}</p>
                                    <i
                                        onClick={() => actions.deleteFavoriteShip(starship)}
                                        className={`fa-solid fa-rectangle-xmark mt-1 ${styles.favoritesDeleteBtn}`}>
                                    </i>
                                </li>
                            )
                        })
                    ) : (
                        <p style={{ margin: '10px 10px 10px 10px' }}>No favorite StarShips yet</p>
                    )
                }

            </div>
        </div>
    )
}

export default Favorites