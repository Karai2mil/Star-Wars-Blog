# STAR WARS BLOG

Star Wars Blog is an interactive and 100% responsive application web with information about characters, planets and starships from the Star Wars saga. As a user you can investigate this information and add new cards to personalize your page.

## Index
**1.** [Instalation instructions](#instalation-instructions)

**2.** [Charging initial data](#charging-initial-data)

**3.** [API structure](#api-structure)

**4.** [Contact](#contact)

## Instalation instructions

**1.** Clone the repository to your local machine:

    git clone https://github.com/Karai2mil/Star-Wars-Blog

**2. Front-End configuration** 

**2.1-** Navigate to the root directory to install dependencies:

    npm install  # Install dependencies (only the first time)

**2.2- Environment Variables Configuration** 


1) Copy the `.env.example` file and rename it to `.env`.
2) Modify the `DATABASE_URL` variable with your database information.

*** By default, the `BACKEND_URL` variable is configured for connecting the Front-End to the Back-End.

**3. Activate Back-End**

**3.1-** From the root directory, enter the backend directory, and if you don't have a virtual environment created, set one up:

    cd src/api
    python3 -m venv myenv  # Create a virtual environment

**3.2-** Activate the virtual environment:

    source myenv/bin/activate  # Linux/Mac
    myenv\Scripts\activate     # Windows

**3.3-** Return to the root directory and install the backend dependencies:

    pip install -r requirements.txt

**3.4-** In the root directory, run the Back-End server:

    python3 src/app.py

**4. Access the Application**

Once both servers are active, access the application in your browser by entering the following URL:

    http://localhost:3000

## Charging initial data
The page is equipped with a file containing all the characters, planets, and starships to enrich your information page. To get started, follow the steps below, or refer to the [API Structure](#api-structure) to create your custom data:

**1.** You need to have finished all the instalation instructions. If you have problems with this section, please use [Contact](#contact).

**2.** Open POSTMAN or any other similar software and send the following Back-End request:
    
    route('/get_exported_data'), method('GET')

## API structure

[**1. User**](#user)
* New User
* Update username
* Get user
* Get token

[**2. Characters**](#characters)
* Post character
* Get all characters
* Get character by id

[**3. Planets**](#planets)
* Post planet
* Get all planets
* Get planet by id

[**4. StarShips**](#starships)
* Post starship
* Get all starships
* Get starship by id

[**5. Favorites**](#favorites)
* Get all favorites
* Post favorite character
* Post favorite planet
* Post favorite starship
* Delete favorite character
* Delete favorite planet
* Delete favorite starship

[**6. Create my card**](#create-my-card)

* Post card


### User

**New user**

    route('/users'), method('POST')

    body: {
        'username': username
        'mail': mail
        'passowrd': password
    }

**Update username**

    route('/users/<int:user_id>'), method('PUT')
    body: {
        'username': new_username
    }

**Get user**

    route('/users/<int:user_id>'), method('GET')

    return: 'User data:',
    {
        'id': user_id
        'username': user_username
        'mail': user_mail
    }

**Get token**

    route('/token'), method('POST')

    body: {
        'mail': mail
        'password': password
    }

    return: 'access_token'

### Characters

**Post character**

    route('/character'), method('POST')

    body: {
        "name": character_name,
        "birth_year": character_birth_year,
        "eye_color": character_eye_color,
        "hair_color": character_hair_color,
        "skin_color": character_skin_color,
        "gender": character_gender,
        "height": character_height,
        "mass": character_mass,
    }

**Get all characters**

    route('/character'), method('GET')

    return: [ ... ,
        {
            "name": character_name_,
            "birth_year": character_birth_year,
            "eye_color": character_eye_color,
            "hair_color": character_hair_color,
            "skin_color": character_skin_color,
            "gender": character_gender,
            "height": character_height,
            "mass": character_mass,
        }
    , ... ]

**Get character by id**

    route('/character/<int:character_id>'), method('GET')

    return: {
        "name": character_name_,
        "birth_year": character_birth_year,
        "eye_color": character_eye_color,
        "hair_color": character_hair_color,
        "skin_color": character_skin_color,
        "gender": character_gender,
        "height": character_height,
        "mass": character_mass,
    }

### Planets

**Post planet**

    route('/planet'), method('POST')

    body: {
        "name": planet_name,
        "climate": planet_climate,
        "diameter": planet_diameter,
        "gravity": planet_gravity,
        "orbital_period": planet_orbital_period,
        "population": planet_population,
        "rotation_period": planet_rotation_period,
        "surface_water": planet_surface_water,
        "terrain": planet_terrain
    }

**Get all planets**

    route('/planet'), method('GET')

    return: [ ... ,
        {
            "name": planet_name,
            "climate": planet_climate,
            "diameter": planet_diameter,
            "gravity": planet_gravity,
            "orbital_period": planet_orbital_period,
            "population": planet_population,
            "rotation_period": planet_rotation_period,
            "surface_water": planet_surface_water,
            "terrain": planet_terrain
        }
    , ...]

**Get planet by id**

    route('/planet/<int:planet_id>'), method('GET')

    return: {
        "name": planet_name,
        "climate": planet_climate,
        "diameter": planet_diameter,
        "gravity": planet_gravity,
        "orbital_period": planet_orbital_period,
        "population": planet_population,
        "rotation_period": planet_rotation_period,
        "surface_water": planet_surface_water,
        "terrain": planet_terrain
    }

### StarShips

**Post starship**

    route('/starship'), method('POST')

    body: {
        "name": starship_name,
        "model": starship_model,
        "MGLT": starship_MGLT,
        "cargo_capacity": starship_cargo_capacity,
        "consumable": starship_consumable,
        "cost_in_credits": starship_cost_in_credits,
        "crew": starship_crew,
        "hyperdrive_rating": starship_hyperdrive_rating,
        "length": starship_length,
        "manufacturer": starship_manufacturer,
        "passangers": starship_passangers,
        "starship_class": starship_class
    }

**Get all starships**

    route('/starship'), method('GET')

    return: [ ... , 
        {
            "name": starship_name,
            "model": starship_model,
            "MGLT": starship_MGLT,
            "cargo_capacity": starship_cargo_capacity,
            "consumable": starship_consumable,
            "cost_in_credits": starship_cost_in_credits,
            "crew": starship_crew,
            "hyperdrive_rating": starship_hyperdrive_rating,
            "length": starship_length,
            "manufacturer": starship_manufacturer,
            "passangers": starship_passangers,
            "starship_class": starship_class
        }
    , ...]

**Get starship by id**

    route('/starship/<int:starship_id>'), method('Get')

    return: {
        "name": starship_name,
        "model": starship_model,
        "MGLT": starship_MGLT,
        "cargo_capacity": starship_cargo_capacity,
        "consumable": starship_consumable,
        "cost_in_credits": starship_cost_in_credits,
        "crew": starship_crew,
        "hyperdrive_rating": starship_hyperdrive_rating,
        "length": starship_length,
        "manufacturer": starship_manufacturer,
        "passangers": starship_passangers,
        "starship_class": starship_class
    }

### Favorites

**Get user favorites**

    route('/favorites/<int:user_id>'), method('GET')

    return: {
        'characters': [character_id's]
        'planets': [planet_id's]
        'starships': [starship_id's]
    }

**Post favorite (character, planet, starship)**

    route('/favorites/(character or planet or starship)'), method('POST')

    body: {
        'user_id': user_id
        '(character, planet, starship)_id': (character, planet, starship)_id
    }

**Delete favorite (character or planet or starship)**

    route('/favorites/(character, planet, starship)'), method('DELETE')

    body: {
        'user_id': user_id
        '(character, planet, starship)_id': (character, planet, starship)_id
    }

### Create my card

**Post card**

    route('/addCard'), method('POST')
    
    To add a Character:
    
    body: formData(
        "name": character_name,
        "birth_year": character_birth_year,
        "eye_color": character_eye_color,
        "hair_color": character_hair_color,
        "skin_color": character_skin_color,
        "gender": character_gender,
        "height": character_height,
        "mass": character_mass,
        "description": character_description,
        "image_file": image_file,
        "user_id": user_id,
        "element": "character" # This is a fixed string
    )

    To add a Planet:
    
    body: formData(
        "name": planet_name,
        "climate": planet_climate,
        "diameter": planet_diameter,
        "gravity": planet_gravity,
        "orbital_period": planet_orbital_period,
        "population": planet_population,
        "rotation_period": planet_rotation_period,
        "surface_water": planet_surface_water,
        "terrain": planet_terrain
        "description": planet_description,
        "image_file": image_file,
        "user_id": user_id,
        "element": "planet" # This is a fixed string
    )

    To add a StarShip:
    
    body: formData(
        "name": starship_name,
        "model": starship_model,
        "MGLT": starship_MGLT,
        "cargo_capacity": starship_cargo_capacity,
        "consumable": starship_consumable,
        "cost_in_credits": starship_cost_in_credits,
        "crew": starship_crew,
        "hyperdrive_rating": starship_hyperdrive_rating,
        "length": starship_length,
        "manufacturer": starship_manufacturer,
        "passangers": starship_passangers,
        "starship_class": starship_class
        "description": starship_description,
        "image_file": image_file,
        "user_id": user_id,
        "element": "starship" # This is a fixed string
    )



## Contact

If you have questions or encounter issues using this README, feel free to contact me directly at my email: [cabrerakarai@gmail.com](mailto:cabrerakarai@gmail.com).


