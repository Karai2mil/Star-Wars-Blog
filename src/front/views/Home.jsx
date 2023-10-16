import React, { useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Context } from "../store/appContext.js";
import CharacterCard from "../components/CharacterCard.jsx";
import PlanetCard from "../components/PlanetsCard.jsx";
import StarShipCard from "../components/StarShipCard.jsx";
import styles from "../components/Styles.module.css"
import NavBar from "../components/Navbar.jsx";
import Fondo from "../img/fondoHome.png";

const Home = () => {

	const navigate = useNavigate()
	const { store, actions } = useContext(Context);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			actions.getCharacters()
            actions.getPlanets()
            actions.getStarShips()
            actions.getFavorites()
		} else {
			navigate('/Login');
		}
	}, [])



	return (
        <div style={{
			backgroundImage: `url(${Fondo})`,
			backgroundRepeat: 'no-repeat',
			backgroundSize: 'cover',
            backgroundPosition: 'center center',
            minHeight: '100vh',
		}}>
			<NavBar />
			<div>
				<div className={styles.titles}>
					<h1 className={styles.font}>CHARACTERS</h1>
				</div>
				<div className={`${styles.cardsOverflow} ${styles.overflowHeightCharacter}`}>
					{ store.characters.length > 0 &&
						store.characters.map((characters, index) => (
							<CharacterCard
								key={index}
								character={characters}
							/>
						))
					}
				</div>
			</div>

			<div className={styles.titles}>
				<h1 className={styles.font}>PLANETS</h1>
			</div>
			<div className={`${styles.cardsOverflow} ${styles.overflowHeightPlanet}`}>
				{ store.planets.length > 0 &&
					store.planets.map((planets, index) => (
						<PlanetCard
							key={index}
							planets={planets}
						/>
					))
				}
			</div>
			<div className={styles.titles}>
				<h1 className={styles.font}>STARSHIPS</h1>
			</div>
			<div className={`${styles.cardsOverflow} ${styles.overflowHeightStarship}`}>
				{store.starships.length > 0 &&
					store.starships.map((ships, index) => (
						<StarShipCard
							key={index}
							starship={ships}
						/>
					))
				}
			</div>
		</div>
		// 		)}
		// 	</div>
	)
};

export default Home