import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from '../store/appContext'
import Fondo from "../img/fondoAddElements.jpeg";
import styles from "./AddElement.module.css"
import LearnMore from "../components/LearnMore.jsx";
import LearnMorePlanets from "../components/LearnMorePlanets.jsx";
import LearnMoreShips from "../components/LearnMoreShips.jsx";
import { toast } from 'react-toastify';


const AddElement = () => {

    const { actions } = useContext(Context)
    const navigate = useNavigate()

    const [element, setElement] = useState('null')
    const character_properties = ['name', 'gender', 'height', 'mass', 'hair_color', 'skin_color', 'eye_color', 'birth_year']
    const planet_properties = ['name', 'diameter', 'rotation_period', 'orbital_period', 'gravity', 'population', 'climate', 'terrain']
    const starship_properties = ['name', 'model', 'manufacturer', 'cost_in_credits', 'length', 'crew', 'hyperdrive_rating', 'MGLT', 'cargo_capacity']
    const defaultImage = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5298bac0-b8bf-4c80-af67-725c1272dbb0/dbz4y4u-af9109e8-a1f5-457e-ae59-963ca80ce021.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzUyOThiYWMwLWI4YmYtNGM4MC1hZjY3LTcyNWMxMjcyZGJiMFwvZGJ6NHk0dS1hZjkxMDllOC1hMWY1LTQ1N2UtYWU1OS05NjNjYTgwY2UwMjEuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.ms-WqF8knvqQCjmU4cEkteDf7sr3mzm2eEQTwnaZ7nc'
    const [cardImage, setCardImage] = useState('')
    const [imageFile, setImageFile] = useState('')

    const handleSelectedElement = (value) => {
        setElement(value)
    }

    const [character, setCharacter] = useState({
        name: '',
        gender: '',
        height: '',
        mass: '',
        hair_color: '',
        skin_color: '',
        eye_color: '',
        birth_year: '',
        description: '',
        image_url: defaultImage,
        is_added: true
    })

    const [planet, setPlanet] = useState({
        name: '',
        diameter: '',
        rotation_period: '',
        orbital_period: '',
        gravity: '',
        population: '',
        climate: '',
        terrain: '',
        description: '',
        image_url: defaultImage,
        is_added: true
    })

    const [starship, setStarShip] = useState({
        name: '',
        model: '',
        manufacturer: '',
        cost_in_credits: '',
        length: '',
        crew: '',
        hyperdrive_rating: '',
        MGLT: '',
        cargo_capaciity: '',
        description: '',
        image_url: defaultImage,
        is_added: true
    })

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const image_url = URL.createObjectURL(file)
            setImageFile(file)
            if (element === 'character') {
                setCharacter((prevCharacter) => ({
                    ...prevCharacter,
                    image_url: image_url,
                }));
            }
            if (element === 'planet') {
                setPlanet((prevPlanet) => ({
                    ...prevPlanet,
                    image_url: image_url,
                }));
            }
            if (element === 'starship') {
                setStarShip((prevStarShip) => ({
                    ...prevStarShip,
                    image_url: image_url,
                }));
            }
            setCardImage(file);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (element === 'null') {
            setElement('null')
        }
        if (element === 'character') {
            setCharacter((prevCharacter) => ({
                ...prevCharacter,
                [name]: value,
            }));
        }
        if (element === 'planet') {
            setPlanet((prevPlanet) => ({
                ...prevPlanet,
                [name]: value,
            }));
        }
        if (element === 'starship') {
            setStarShip((prevStarShip) => ({
                ...prevStarShip,
                [name]: value,
            }));
        }
    };

    const handleNoCardSelectedAlert = () => {
        toast(`You have to select a card to see the properties`, {
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
                width: '400px'
            },
            theme: "dark",
        });
    }

    const handleAddCard = async () => {
        if (element === 'character') {
            const user_id = localStorage.getItem('user_id');
            const character_data = new FormData();
            character_properties.forEach((property) => {
                character_data.append(property, character[property])
            })
            character_data.append('description', character['description'])
            character_data.append('image_file', imageFile)
            character_data.append('user_id', user_id)
            character_data.append('element', 'character')

            const response = await actions.addCard(character_data);
            if (response.message === 'COMPLETED') {
                navigate('/home');
            }
        }
        if (element === 'planet') {
            const user_id = localStorage.getItem('user_id');
            const planet_data = new FormData();
            planet_properties.forEach((property) => {
                planet_data.append(property, planet[property])
            })
            planet_data.append('description', planet['description'])
            planet_data.append('image_file', imageFile)
            planet_data.append('user_id', user_id)
            planet_data.append('element', 'planet')

            const response = await actions.addCard(planet_data);
            if (response.message === 'COMPLETED') {
                navigate('/home');
            }
        }
        if (element === 'starship') {
            const user_id = localStorage.getItem('user_id');
            const starship_data = new FormData();
            starship_properties.forEach((property) => {
                starship_data.append(property, starship[property])
            })
            starship_data.append('description', starship['description'])
            starship_data.append('image_file', imageFile)
            starship_data.append('user_id', user_id)
            starship_data.append('element', 'starship')

            const response = await actions.addCard(starship_data);
            if (response.message === 'COMPLETED') {
                navigate('/home');
            }
        }
    }

    const handleNavigateBack = () => {
        navigate('/home')
    }

    return (
        <div className={styles.generalDiv} style={{ backgroundImage: `url(${Fondo})` }}>
            <div>
                <div className={styles.centerDiv}>
                    <p className={`${styles.font} ${styles.personalizeLetters}`}>PERSoNALizE youR CARD</p>
                </div>
                <div className={styles.divMiddleDiv}>
                    <div className={styles.middleDiv}>
                        <div className={`${styles.centerDiv} ${styles.leftContent} flex-column`}>
                            <div className={`d-flex flex-column align-items-center`}>
                                <label style={{ width: '250px' }} htmlFor="element">Wich card do you want to add?</label>
                                <select className={styles.select} onChange={(e) => handleSelectedElement(e.target.value)} id="element" name="elements">
                                    <option value="null">Select</option>
                                    <option value="character">Character</option>
                                    <option value="planet">Planet</option>
                                    <option value="starship">Starship</option>
                                </select>
                            </div>
                            <div style={{ paddingTop: '2rem' }}>
                                {element === 'character' &&
                                    (
                                        <div className="d-flex flex-column justify-content-center">
                                            {
                                                character_properties.map((propertyName, index) => {
                                                    const formattedElement = propertyName
                                                        .split('_')
                                                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                                        .join(' ');
                                                    return (
                                                        <div className={`d-flex ${styles.properties}`} key={index}>
                                                            <p>{formattedElement}:</p>
                                                            <input onChange={(e) => handleInputChange(e)} value={character[propertyName]} type="text" name={propertyName} />
                                                        </div>
                                                    );
                                                })
                                            }
                                            <div className={`d-flex ${styles.properties}`}>
                                                <p>Description:</p>
                                                <textarea onChange={(e) => handleInputChange(e)} value={character['description']} type="text" name='description' maxLength='500' />
                                            </div>
                                            <div className={styles.inputFile}>
                                                <label style={{ cursor: 'pointer' }} htmlFor="card_image">Select your card image</label>
                                                <input onChange={(e) => handleImageChange(e)} type="file" id="card_image" />
                                            </div>
                                        </div>
                                    )
                                }
                                {element === 'planet' &&
                                    (
                                        <div>
                                            {
                                                planet_properties.map((propertyName, index) => {
                                                    const formattedElement = propertyName
                                                        .split('_')
                                                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                                        .join(' ');
                                                    return (
                                                        <div className={`d-flex ${styles.properties}`} key={index}>
                                                            <p>{formattedElement}:</p>
                                                            <input onChange={(e) => handleInputChange(e)} value={planet[propertyName]} type="text" name={propertyName} />
                                                        </div>
                                                    );
                                                })
                                            }
                                            <div className={`d-flex ${styles.properties}`}>
                                                <p>Description:</p>
                                                <textarea onChange={(e) => handleInputChange(e)} value={planet['description']} type="text" name='description' maxLength='500' />
                                            </div>
                                            <div className={styles.inputFile}>
                                                <label style={{ cursor: 'pointer' }} htmlFor="card_image">Select your card image</label>
                                                <input onChange={(e) => handleImageChange(e)} type="file" id="card_image" />
                                            </div>
                                        </div>
                                    )
                                }
                                {element === 'starship' &&
                                    (
                                        <div>
                                            {
                                                starship_properties.map((propertyName, index) => {
                                                    const formattedElement = propertyName
                                                        .split('_')
                                                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                                        .join(' ');
                                                    return (
                                                        <div className={`d-flex ${styles.properties}`} key={index}>
                                                            <p>{formattedElement}:</p>
                                                            <input onChange={(e) => handleInputChange(e)} value={starship[propertyName]} type="text" name={propertyName} />
                                                        </div>
                                                    );
                                                })
                                            }
                                            <div className={`d-flex ${styles.properties}`}>
                                                <p>Description:</p>
                                                <textarea onChange={(e) => handleInputChange(e)} value={starship['description']} type="text" name='description' maxLength='500' />
                                            </div>
                                            <div className={styles.inputFile}>
                                                <label style={{ cursor: 'pointer' }} htmlFor="card_image">Select your card image</label>
                                                <input onChange={(e) => handleImageChange(e)} type="file" id="card_image" />
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div className={`d-flex flex-column ${styles.centerDiv} ${styles.rightContent}`}>
                            <div className={`card ${styles.cardsStyle}`}>
                                <div className="card-body">
                                    {!cardImage ? (
                                        <img
                                            style={{
                                                objectFit: "cover",
                                                height: "240px",
                                                objectPosition: "top",
                                            }}
                                            src={defaultImage}
                                            className="card-img-top"
                                            alt="..."
                                        />
                                    ) : (
                                        <img
                                            style={{
                                                objectFit: "cover",
                                                height: "240px",
                                                objectPosition: "top",
                                            }}
                                            src={URL.createObjectURL(cardImage)}
                                            className="card-img-top"
                                            alt="..."
                                        />
                                    )}
                                    {element === 'null' &&
                                        <div>
                                            <h5 className="card-title" style={{ marginTop: "10px" }}>Name:</h5>
                                            <p className="card-text">Propertie:</p>
                                            <p className="card-text">Propertie:</p>
                                            <div className={styles.cardBtn}>
                                                <button onClick={() => handleNoCardSelectedAlert()} className={styles.learnMore}>Learn More</button>
                                                <button style={{ backgroundColor: "rgba(0, 0, 0, 0.327)" }} href="#"><i className="fa-regular fa-star" style={{ color: "#fae500" }}></i></button>
                                            </div>
                                        </div>
                                    }
                                    {element === 'character' &&
                                        <div>
                                            {!character['name'] ? (
                                                <h5 className="card-title" style={{ marginTop: "10px" }}>Name</h5>
                                            ) : (
                                                <h5 className="card-title" style={{ marginTop: "10px" }}>{character['name']}</h5>
                                            )}
                                            <p className="card-text">Gender:{character['gender']}</p>
                                            <p className="card-text">Height:{character['height']}</p>
                                            <div className={styles.cardBtn}>
                                                <button onClick={() => actions.detailsToShow(character, true)} className={styles.learnMore}>Learn More</button>
                                                <button style={{ backgroundColor: "rgba(0, 0, 0, 0.327)" }} href="#"><i className="fa-regular fa-star" style={{ color: "#fae500" }}></i></button>
                                            </div>
                                        </div>
                                    }
                                    {element === 'planet' &&
                                        <div>
                                            {!planet['name'] ? (
                                                <h5 className="card-title" style={{ marginTop: "10px" }}>Name</h5>
                                            ) : (
                                                <h5 className="card-title" style={{ marginTop: "10px" }}>{planet['name']}</h5>
                                            )}
                                            <p className="card-text">Diameter: {planet['diameter']} km</p>
                                            <p className="card-text">Climate: {planet['climate']}</p>
                                            <div className={styles.cardBtn}>
                                                <button onClick={() => actions.detailsToShowPlanets(planet, true)} className={styles.learnMore}>Learn More</button>
                                                <button style={{ backgroundColor: "rgba(0, 0, 0, 0.327)" }} href="#"><i className="fa-regular fa-star" style={{ color: "#fae500" }}></i></button>
                                            </div>
                                        </div>
                                    }
                                    {element === 'starship' &&
                                        <div>
                                            {!starship['name'] ? (
                                                <h5 className="card-title" style={{ marginTop: "10px" }}>Name</h5>
                                            ) : (
                                                <h5 className="card-title" style={{ marginTop: "10px" }}>{starship['name']}</h5>
                                            )}
                                            <p className="card-text">Model: {starship['model']}</p>
                                            <p className="card-text">Crew: {starship['crew']}</p>
                                            <div className={styles.cardBtn}>
                                                <button onClick={() => actions.detailsToShowShips(starship, true)} className={styles.learnMore}>Learn More</button>
                                                <button style={{ backgroundColor: "rgba(0, 0, 0, 0.327)" }} href="#"><i className="fa-regular fa-star" style={{ color: "#fae500" }}></i></button>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.font} ${styles.lowerContent}`}>
                    <h3 style={{ cursor: 'pointer' }} onClick={() => handleAddCard()}>ADD CARD</h3>
                    <h4 style={{ cursor: 'pointer' }} onClick={() => handleNavigateBack()}>Go BACK</h4>
                </div>
                {element === 'character' &&
                    <LearnMore />
                }
                {element === 'planet' &&
                    <LearnMorePlanets />
                }
                {element === 'starship' &&
                    <LearnMoreShips />
                }
            </div>
        </div >
    )
}

export default AddElement