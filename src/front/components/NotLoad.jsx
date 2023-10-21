import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext.js'
import BeCarefulMan from '../img/beCarefulMan.png'
import letrasConIconos from '../img/letrasStarWarsConIconos.png'
import styles from "./Styles.module.css"
import { toast } from 'react-toastify';

const NotLoad = () => {

    const navigate = useNavigate();

    const { actions } = useContext(Context)

    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [showLoadingCircle, setShowLoadingCircle] = useState(false)

    const createAccountClick = () => {
        navigate('/CreateAccount');
    };

    const handlerGetToken = async () => {
        try {
            setShowLoadingCircle(true)
            const user_data = {
                mail: mail,
                password: password
            }
            const getTokenData = await actions.getToken(user_data)
            if (getTokenData.status === 'COMPLETED') {
                actions.getCharacters()
                actions.getPlanets()
                actions.getStarShips()
                actions.getFavorites()
                localStorage.setItem("token", getTokenData.token);
                localStorage.setItem("user_id", getTokenData.user_id);
                navigate('/home');
            }
        } catch (error) {
            console.log('Este es el error del componente', error.errorType)
            if (error.errorType === 'ValidationError') {
                handleAlert('Mail and password are requeried')
                setTimeout(() => {
                    setShowLoadingCircle(false)
                }, 3000)
            } else if (error.errorType === 'ConflictError') {
                handleAlert('Wrong mail or password')
                setTimeout(() => {
                    setShowLoadingCircle(false)
                }, 3000)
            } else if (error.errorType === 'ServerError') {
                handleAlert('Server error, please try later')
                setTimeout(() => {
                    setShowLoadingCircle(false)
                }, 3000)
            } else {
                handleAlert('Unexpected error ocurred, please try later')
                setTimeout(() => {
                    setShowLoadingCircle(false)
                }, 3000)
            }
        }
    }

    const handleAlert = (message) => {
        toast(message, {
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
                width: '340px'
            },
            theme: "dark",
        });
    }


    return (
        <div className={styles.notLoadMainDiv}>
            <div className={` ${styles.overlay}`}>
                <div className={` flex-column ${styles.centerDiv}`}>
                    <h3 className={styles.font} style={{ margin: '0' }}>LoG iN</h3>
                    <div style={{ paddingTop: '1.2rem' }}>
                        <input onChange={(e) => setMail(e.target.value)} type="text" placeholder='mail' className={styles.loginInputs} />
                    </div>
                    <div>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder='password' className={styles.loginInputs} />
                    </div>
                    <button onClick={() => handlerGetToken()} style={{
                        height: '1.5rem',
                        fontSize: '15px',
                        background: '#f8da2d',
                        marginTop: '10px',
                        padding: '0px 5px 0px 5px'
                    }} type="button" className="btn btn-outline-dark">
                        <p className={styles.font} style={{ color: 'black' }}>S u B M i T</p>
                    </button>
                    <p onClick={() => createAccountClick()} className={`${styles.font} ${styles.createAccountText} ${styles.activeColor}`}>oR CREATE AN ACouNT</p>
                </div>
                <div className={styles.centerDiv}>
                    <img className={styles.starWarsLetters} src={letrasConIconos} alt="" />
                </div>
            </div>
            <div className={` ${styles.beCarefulManDiv}`}>
                <div>
                    <img style={{ width: '100%' }} src={BeCarefulMan} alt="" />
                    {showLoadingCircle &&
                        <div className={styles.loadingCircleDiv}>
                            <div className={styles.loadingCircle}></div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default NotLoad