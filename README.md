# STAR WARS BLOG

## Instalation instructions

**1.** Clone the repository on your local file:

    git clone https://github.com/Karai2mil/Star-Wars-Blog

**2. Front-End configuration** 

**2.1-** Navigate to the root directory to install dependencies:

    npm install  # Install dependencies (only the first time)

**2.2- Environment Variables Configuration** 


1) Copy the `.env.example` file and rename it to `.env`.
2) Modify the `DATABASE_URL` variable with your database information.

*** By default, the `BACKEND_URL` variable is configured for connecting the Front-End to the Back-End.

## API STRUCTURE

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




