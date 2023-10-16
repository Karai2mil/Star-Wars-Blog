import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Favorites from "./Favorites.jsx"
import styles from "../components/Styles.module.css";


const Navbar = () => {

    const navigate = useNavigate()
    const [collapseType, setCollapseType] = useState('')

    const handlerLogOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user_id")
        navigate('/')
    }

    const navigateNewCard = () => {
        navigate('/add')
    }

    useEffect(() => {
        const screenWidth = window.innerWidth;
        if (screenWidth >= 501) {
            setCollapseType('collapse collapse-horizontal')
        } else {
            setCollapseType('collapse')
        }
    }, [])

    return (
        <div>
            <nav className="navbar navbar-expand bg-body-tertiary">
                <div className="container-fluid">
                    <div className={`collapse navbar-collapse ${styles.navbarDiv}`} id="navbarNavDropdown">
                        <div className={styles.divForComputer}>
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link to="/home" className="nav-link active" aria-current="page">
                                        <img
                                            className={`navbar-brand mb-0 h1 ${styles.navbarImg}`}
                                            alt=""
                                            src="data:image/png;base64,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" />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="d-flex">
                            <div className={styles.divForComputer}>
                                <button className={`btn ${styles.buttonOutline}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                    <i className={`fa-solid fa-caret-left ${styles.caret}`}></i>
                                </button>
                            </div>
                            <div className={collapseType} id="collapseExample">
                                <div className={`card card-body ${styles.collapse}`}>
                                    <ul className="navbar-nav ms-auto d-flex align-items-center">
                                        <li style={{ padding: 0 }}>
                                            <p
                                                className={`${styles.font} ${styles.navbarLetter}`}
                                                onClick={() => handlerLogOut()}>
                                                LoG ouT
                                            </p>
                                        </li>
                                        <li style={{ padding: 0 }}>
                                            <p
                                                className={`${styles.font} ${styles.navbarLetter}`}
                                                onClick={() => navigateNewCard()}>
                                                create My card
                                            </p>
                                        </li>
                                        <li className="nav-item dropdown" style={{ padding: 0 }}>
                                            <Link
                                                className="nav-link dropdown-toggle d-flex align-items-center p-0"
                                                to="#"
                                                id="navbarDropdown"
                                                role="button"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                                style={{ color: "yellow" }}
                                            >
                                                <p
                                                    className={`${styles.font} ${styles.navbarLetter}`}
                                                    style={{ margin: 0 }}>
                                                    favorites
                                                </p>
                                            </Link>
                                            <ul
                                                className={`dropdown-menu dropdown-menu-end ${styles.dropdown}`}
                                                aria-labelledby="navbarDropdown"
                                            >
                                                <Favorites />
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className={styles.divForSmartphone}>
                            <button className="btn" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                <i className={`fa-solid fa-caret-down ${styles.caret}`}></i>
                            </button>
                        </div>
                        <div className={styles.divForSmartphone} style={{ width: '40%' }}>
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link to="/home" className="nav-link active" aria-current="page">
                                        <img
                                            className={`navbar-brand mb-0 ${styles.navbarImg}`}
                                            alt=""
                                            src="data:image/png;base64,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" />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;

