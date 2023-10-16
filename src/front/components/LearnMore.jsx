import React, { useEffect, useState } from "react";
import { useContext } from 'react'
import { Context } from '../store/appContext'
import styles from "./Styles.module.css"

const LearnMore = () => {

    const { store, actions } = useContext(Context)
    const [withCollapse, setWithCollapse] = useState('')
    const [screenWidth, setScreenWidth] = useState()
    const [isPropertiesCollapseOpen, setIsPropertiesCollapseOpen] = useState(false)
    const [isDescriptionCollapseOpen, setIsDescriptionCollapseOpen] = useState(false)

    useEffect(() => {
        const screenWidth = window.innerWidth;
        setScreenWidth(screenWidth)
        if (screenWidth >= 501) {
            setWithCollapse('')
        } else {
            setWithCollapse('collapse')
        }
    }, [])

    if (!store.isModalOpen) {
        return (
            <div>

            </div>
        )
    }
    const handlerCloseModal = () => {
        actions.closeModal()
        setIsDescriptionCollapseOpen(false)
        setIsPropertiesCollapseOpen(false)
    }

    return (
        <div>
            <div
                className={`modal ${store.isModalOpen ? 'show' : ''}`}
                tabIndex="-1"
                style={{ display: store.isModalOpen ? 'block' : 'none' }}
            >
                <div className="modal-dialog modal-dialog-centered d-flex justify-content-center align-items-center">
                    <div className={`modal-content ${styles.modal}`}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Specific Information</h1>
                            <button style={{ opacity: '1' }} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => actions.closeModal()}><i class="fa-solid fa-xmark" style={{ color: '#ffffff', }}></i></button>
                        </div>
                        <div className="modal-body">
                            <div className={`d-flex p-0 ${styles.modalForPhones}`}>
                                <div className={styles.modalImageDiv}>
                                    {screenWidth < 500 &&
                                        <h3>{store.currentDetailObject.name}</h3>
                                    }
                                    <img
                                        style={{
                                            objectFit: "cover",
                                            height: '100%',
                                        }}
                                        src={store.currentDetailObject.image_url}
                                        className="card-img-top"
                                        alt="..."
                                    />
                                </div>
                                {screenWidth < 500 &&
                                    <div className="d-flex justify-content-center align-items-center" style={{ margin: '10px 0px 0px 0px' }}>
                                        <i style={{fontSize: '1.3rem'}} className={`fa-solid fa-caret-${isPropertiesCollapseOpen ? ('down') : ('right')}`}></i>
                                        <p style={{ margin: '0px 1rem', cursor: 'pointer' }} data-bs-toggle="collapse" data-bs-target="#propertiesCollapse" aria-expanded="false" aria-controls="propertiesCollapse" onClick={() => setIsPropertiesCollapseOpen(!isPropertiesCollapseOpen)}>
                                            <strong>Properties</strong>
                                        </p>
                                        <i style={{fontSize: '1.3rem'}} className={`fa-solid fa-caret-${isPropertiesCollapseOpen ? ('down') : ('left')}`}></i>
                                    </div>
                                }
                                <div className={`${withCollapse} ${styles.modalPropertiesDiv}`} id="propertiesCollapse">
                                    {screenWidth > 500 &&
                                        <h3>{store.currentDetailObject.name}</h3>
                                    }
                                    <div className="d-flex flex-column justify-content-center">
                                        <div className={styles.modalProperties}>
                                            <p>Gender:</p>
                                            <p>{store.currentDetailObject.gender}</p>
                                        </div>
                                        <div className={styles.modalProperties}>
                                            <p>Height:</p>
                                            <p>{store.currentDetailObject.height}</p>
                                        </div>
                                        <div className={styles.modalProperties}>
                                            <p>Mass:</p>
                                            <p>{store.currentDetailObject.mass}</p>
                                        </div>
                                        <div className={styles.modalProperties}>
                                            <p>Hair Color:</p>
                                            <p>{store.currentDetailObject.hair_color}</p>
                                        </div>
                                        <div className={styles.modalProperties}>
                                            <p>Skin Color:</p>
                                            <p>{store.currentDetailObject.skin_color}</p>
                                        </div>
                                        <div className={styles.modalProperties}>
                                            <p>Eye Color:</p>
                                            <p>{store.currentDetailObject.eye_color}</p>
                                        </div>
                                        <div className={styles.modalProperties} style={{ border: 'none' }}>
                                            <p>Birth Year:</p>
                                            <p>{store.currentDetailObject.birth_year}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {screenWidth < 500 &&
                                    <div className="d-flex justify-content-center align-items-center" style={{ margin: '10px 0px 0px 0px' }}>
                                    <i style={{fontSize: '1.3rem'}} className={`fa-solid fa-caret-${isDescriptionCollapseOpen ? ('down') : ('right')}`}></i>
                                    <p style={{ margin: '0px 1rem', cursor: 'pointer' }} data-bs-toggle="collapse" data-bs-target="#descriptionCollapse" aria-expanded="false" aria-controls="descriptionCollapse" onClick={() => setIsDescriptionCollapseOpen(!isDescriptionCollapseOpen)}>
                                        <strong>Description</strong>
                                    </p>
                                    <i style={{fontSize: '1.3rem'}} className={`fa-solid fa-caret-${isDescriptionCollapseOpen ? ('down') : ('left')}`}></i>
                                </div>
                            }
                            <div className={withCollapse} id="descriptionCollapse">
                                <div className={`d-flex align-items-center flex-column justifiy-content-center`}>
                                    {store.currentDetailObject.is_added ? (
                                        <p className={styles.modalDescription}>{store.currentDetailObject.description}</p>
                                    ) : (
                                        <p className={styles.modalDescription}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                                    )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-dark" data-bs-dismiss="modal" onClick={() => handlerCloseModal()}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LearnMore