import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext'
import Fondo from '../img/fondoEstrellas.png'
import BeCarefulMan from '../img/beCarefulMan.png'
import letrasConIconos from '../img/letrasStarWarsConIconos.png'
import styles from "./Styles.module.css"
import { toast } from 'react-toastify';

const CreateAccount = () => {

    const navigate = useNavigate();

    const { store, actions } = useContext(Context)

    const [username, setUsername] = useState('')
    const [mail, setMail] = useState('')
    const [mailValidated, setMailValidated] = useState(null)
    const [password, setPassword] = useState('')
    const [passwordValidated, setPasswordValidated] = useState(null)
    const [showLoadingCircle, setShowLoadingCircle] = useState(false)

    const isEmailValid = (email) => {
        const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        return emailRegex.test(email);
    };

    const isPasswordValid = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
        return passwordRegex.test(password);
    };

    const handlerCreateUser = async () => {

        if (!isEmailValid(mail)) {
            return handleAlert('Invalid mail format')
        }
        if (!isPasswordValid(password)) {
            return handleAlert('Password must contain at least one lowercase and uppercase letter, and one number')
        }
        setShowLoadingCircle(true)
        const user_data = {
            username: username,
            mail: mail,
            password: password
        }
        try {
            const createUserResult = await actions.createUser(user_data)
            if (createUserResult.status == 'COMPLETED') {
                handleAlert('User created succesfully! Please log in')
                setTimeout(() => {
                    navigate('/');
                }, 3000)
            }
        } catch (error) {
            if (error.errorType === 'ValidationError') {
                handleAlert('Mail and password are requeried')
                setTimeout(() => {
                    setShowLoadingCircle(false)
                }, 3000)
            } else if (error.errorType === 'ConflictError') {
                handleAlert('Username or mail already exist')
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

    const handlerSetMail = (value) => {
        setMail(value);
        const isValid = isEmailValid(value);
        setMailValidated(isValid);
    }
    const handlerSetPassword = (value) => {
        setPassword(value);
        const isValid = isPasswordValid(value);
        setPasswordValidated(isValid);
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

    const handlerNavigateLogIn = () => {
        navigate('/')
    }
    return (
        <div style={{
            backgroundImage: `url(${Fondo})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            minHeight: '100vh',
        }}>
            <div className={styles.overlayCreate}>
                <div>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder='username' className={styles.loginInputs} />
                </div>
                <div className='d-flex align-items-center'>
                    <input
                        value={mail}
                        onChange={(e) => handlerSetMail(e.target.value)}
                        type="text"
                        placeholder='mail'
                        className={styles.loginInputs}
                        style={{ borderColor: mailValidated === false ? '#FF8300' : '' }}
                    />
                    {
                        mailValidated === true &&
                        <i className={`fa-solid fa-check ${styles.validationIcons}`}></i>
                    }
                </div>
                <div className='d-flex'>
                    <input
                        value={password}
                        onChange={(e) => handlerSetPassword(e.target.value)}
                        type="password"
                        placeholder='password'
                        className={styles.loginInputs}
                        style={{ borderColor: passwordValidated === false ? '#FF8300' : '' }}
                    />
                    {
                        passwordValidated === true &&
                        <i className={`fa-solid fa-check ${styles.validationIconsPassword}`}></i>
                    }
                </div>
                <div className='d-flex flex-column justify-content-center align-items-center'>
                    <p onClick={() => handlerCreateUser()} className={`${styles.font} ${styles.activeColor}`} style={{ marginTop: '1rem', cursor: 'pointer' }}>CREATE ACouNT</p>
                    <p onClick={() => handlerNavigateLogIn()} className={`${styles.font} ${styles.activeColor}`} style={{ cursor: 'pointer' }}>LoG iN</p>
                </div>
                <img className={styles.starWarsLettersCreate} src={letrasConIconos} alt="" />
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

export default CreateAccount