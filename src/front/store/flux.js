const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			url: 'http://127.0.0.1:3001/',
			user_id: '',
			tokenObtained: false,
			characters: [],
			planets: [],
			starships: [],
			favoriteCharactersIds: [],
			favoritePlanetsIds: [],
			favoriteShipsIds: [],
			currentDetailObject: {},
			currentDetailObjectPlanets: {},
			currentDetailObjectShips: {},
			isFromAddElements: false,
			isModalOpen: false,
			isModalOpenPlanets: false,
			isModalOpenShips: false
		},
		actions: {
			createUser: async (user_data) => {
				try {
					const store = getStore()
					const response = await fetch(store.url + 'users', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(user_data)
					})
					if (!response.ok) {
						let errorType = '';
						if (response.status === 400) {
							errorType = 'ValidationError';
						} else if (response.status === 409) {
							errorType = 'ConflictError';
						} else if (response.status === 500) {
							errorType = 'ServerError';
						}
						throw { errorType };
					}
					const data = await response.json();
					return data;
				} catch (error) {
					console.log({ 'Creating user error': error });
					throw error;
				}
			},

			getToken: async (user_data) => {
				try {
					const store = getStore()
					const response = await fetch(store.url + 'token', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(user_data)
					})
					if (!response.ok) {
						let errorType = '';
						if (response.status === 400) {
							errorType = 'ValidationError';
						} else if (response.status === 409) {
							errorType = 'ConflictError';
						} else if (response.status === 500) {
							errorType = 'ServerError';
						}
						throw { errorType };
					}
					const data = await response.json()
					return data
				} catch (error) {
					console.log({'Getting token error': error})
					throw error
				}
			},

			setTokenObtained: () => {
				const store = getStore()
				setStore({ ...store, tokenObtained: false })
			},

			getValidation: async () => {
				try {
					const store = getStore()
					const token = localStorage.getItem('token')
					const response = await fetch(store.url + 'protected', {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': 'Bearer ' + token
						}
					})
					if (!response.ok) {
						throw new Error("First validation error")
					}
					const data = await response.json()
					console.log('Validation:', data)
					return data

				} catch (error) {
					console.log('Validation error', error)
				}
			},

			getCharacters: async () => {
				try {
					const store = getStore()
					const user_id = localStorage.getItem('user_id')
					const result = await fetch(store.url + `character/${user_id}`)
					if (!result.ok) {
						throw new Error("Getting characters error")
					}
					const data = await result.json()
					console.log("Characters charged succesfully:", data)
					setStore({ ...store, characters: data });
				} catch (error) {
					console.log("Charging people error", error)
				}
			},

			getPlanets: async () => {
				try {
					const store = getStore()
					const user_id = localStorage.getItem('user_id')
					const result = await fetch(store.url + `planet/${user_id}`)
					if (!result.ok) {
						throw new Error("Getting planets error")
					}
					const data = await result.json()
					console.log("Planets charged seccesfully:", data)
					setStore({ ...store, planets: data });
				} catch (error) {
					console.log("Charging people error", error)
				}
			},

			getStarShips: async () => {
				try {
					const store = getStore()
					const user_id = localStorage.getItem('user_id')
					const result = await fetch(store.url + `starship/${user_id}`)
					if (!result.ok) {
						throw new Error("Getting starships error")
					}
					const data = await result.json()
					console.log("Starships charged succesfully:", data)
					setStore({ ...store, starships: data });
				} catch (error) {
					console.log("Charging starship error", error)
				}
			},

			getFavorites: async () => {
				try {
					const user_id = localStorage.getItem('user_id')
					const store = getStore()
					const result = await fetch(store.url + 'favorites/' + user_id)
					if (!result.ok) {
						throw new Error('Getting favorites error')
					}
					const data = await result.json()
					setStore({ ...store, favoriteCharactersIds: data.characters })
					setStore({ ...store, favoritePlanetsIds: data.planets })
					setStore({ ...store, favoriteShipsIds: data.starships })
				} catch (error) {
					console.log('Getting favorites error', error)
				}
			},

			addFavoriteCharacter: async (character) => {
				try {
					const store = getStore()
					const user_id = localStorage.getItem('user_id')
					// setStore({ ...store, favoriteCharactersIds: [...store.favoriteCharactersIds, character.id] });
					console.log(store.favoriteCharactersIds)
					const favorite_data = { 'character_id': character.id, 'user_id': user_id }
					const response = await fetch(store.url + 'favorites/character', {
						method: ['POST'],
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(favorite_data)
					})
					if (!response.ok) {
						throw new Error('Charging favorite character error')
					}
					const data = await response.json()
					console.log('Result:', data)
					const { getFavorites } = getActions()
					getFavorites()
				} catch (error) {
					console.log('Error charging favorite character:', error)
				}
			},

			addFavoritePlanet: async (planet) => {
				try {
					const store = getStore()
					const user_id = localStorage.getItem('user_id')
					// setStore({ ...store, favoritePlanetsIds: [...store.favoritePlanetsIds, planet.id] });
					const favorite_data = { 'planet_id': planet.id, 'user_id': user_id }
					const response = await fetch(store.url + 'favorites/planet', {
						method: ['POST'],
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(favorite_data)
					})
					if (!response.ok) {
						throw new Error('Charging favorite planet error')
					}
					const data = await response.json()
					console.log('Result:', data)
					const { getFavorites } = getActions()
					getFavorites()
				} catch (error) {
					console.log('Error charging favorite planet:', error)
				}
			},

			addFavoriteShip: async (starship) => {
				try {
					const store = getStore()
					const user_id = localStorage.getItem('user_id')
					// setStore({ ...store, favoriteShipsIds: [...store.favoriteShipsIds, starship.id] });
					const favorite_data = { 'starship_id': starship.id, 'user_id': user_id }
					const response = await fetch(store.url + 'favorites/starship', {
						method: ['POST'],
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(favorite_data)
					})
					if (!response.ok) {
						throw new Error('Charging favorite starship error')
					}
					const data = await response.json()
					console.log('Result:', data)
					const { getFavorites } = getActions()
					getFavorites()
				} catch (error) {
					console.log('Error charging favorite starship:', error)
				}
			},

			deleteFavoriteCharacter: async (character) => {
				try {
					const store = getStore()
					const user_id = localStorage.getItem('user_id')
					// const filteredList = store.favoriteCharactersIds.filter((element) => element !== character.id)
					// setStore({ ...store, favoriteCharactersIds: filteredList })
					const favorite_data = { 'character_id': character.id, 'user_id': user_id }
					const response = await fetch(store.url + 'favorites/character', {
						method: ['DELETE'],
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(favorite_data)
					})
					if (!response.ok) {
						throw new Error('Deleting favorite character error')
					}
					const data = await response.json()
					console.log('Result:', data)
					const { getFavorites } = getActions()
					getFavorites()
				} catch (error) {
					console.log('Error deleting favorite character:', error)
				}
			},

			deleteFavoritePlanet: async (planet) => {
				try {
					const store = getStore()
					const user_id = localStorage.getItem('user_id')
					// const filteredList = store.favoritePlanetsIds.filter((element) => element !== planet.id)
					// setStore({ ...store, favoritePlanetsIds: filteredList })
					const favorite_data = { 'planet_id': planet.id, 'user_id': user_id }
					const response = await fetch(store.url + 'favorites/planet', {
						method: ['DELETE'],
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(favorite_data)
					})
					if (!response.ok) {
						throw new Error('Deleting favorite planet error')
					}
					const data = await response.json()
					console.log('Result:', data)
					const { getFavorites } = getActions()
					getFavorites()
				} catch (error) {
					console.log('Error deleting favorite planet:', error)
				}
			},

			deleteFavoriteShip: async (starship) => {
				try {
					const store = getStore()
					const user_id = localStorage.getItem('user_id')
					// const filteredList = store.favoriteShipsIds.filter((element) => element !== starship.id)
					// setStore({ ...store, favoriteShipsIds: filteredList })
					const favorite_data = { 'starship_id': starship.id, 'user_id': user_id }
					const response = await fetch(store.url + 'favorites/starship', {
						method: ['DELETE'],
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(favorite_data)
					})
					if (!response.ok) {
						throw new Error('Deleting favorite starship error')
					}
					const data = await response.json()
					console.log('Result:', data)
					const { getFavorites } = getActions()
					getFavorites()
				} catch (error) {
					console.log('Error deleting favorite starship:', error)
				}
			},

			detailsToShow: async (element, isFromAddElements) => {
				console.log("entre a detail character", element, isFromAddElements)
				const store = getStore()
				if (isFromAddElements) {
					await setStore({ ...store, isFromAddElements: isFromAddElements })
				}
				await setStore({ ...store, currentDetailObject: element })
				await setStore({ ...store, isModalOpen: true })
				console.log('Este es el segundo', store.isFromAddElements)
			},

			detailsToShowPlanets: async (element, isFromAddElements) => {
				console.log("entre a detail", element)
				const store = getStore()
				if (isFromAddElements) {
					await setStore({ ...store, isFromAddElements: isFromAddElements })
				}
				await setStore({ ...store, currentDetailObjectPlanets: element })
				await setStore({ ...store, isModalOpenPlanets: true })
			},

			detailsToShowShips: async (element, isFromAddElements) => {
				console.log("entre a detail", element)
				const store = getStore()
				if (isFromAddElements) {
					await setStore({ ...store, isFromAddElements: isFromAddElements })
				}
				await setStore({ ...store, currentDetailObjectShips: element })
				await setStore({ ...store, isModalOpenShips: true })
			},

			closeModal: () => {
				const store = getStore()
				setStore({ ...store, isModalOpen: false })
				setStore({ ...store, isModalOpenPlanets: false })
				setStore({ ...store, isModalOpenShips: false })
				setStore({ ...store, isFromAddElements: false })
			},

			addCard: async (element_data) => {
				try {
					const store = getStore()
					const response = await fetch((store.url + '/addCard'), {
						method: ['POST'],
						body: element_data
					})
					if (!response.ok) {
						throw new Error('Error on adding card fetch')
					}
					const data = await response.json()
					return data
				} catch (error) {
					console.log('Error adding card')
				}
			},

			deleteAddedCard: async (element_uid, element) => {
				try {
					const store = getStore()
					const response = await fetch((store.url + element + '/' + element_uid), {
						method: ['DELETE'],
						headers: {
							'Content-Type': 'application/json'
						}
					})
					if (!response.ok) {
						throw new Error('Error on fetch deleting', element, 'card')
					}
					const data = await response.json()
					return data
				} catch (error) {
					console.log('Error deleting', element, 'card')
				}
			}
		}
	};
};

export default getState;
