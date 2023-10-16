------------------- API STRUCTURE ------------------- 

ORDER: 
---USER---
NEW USER
UPDATE USERNAME
GET USER
GET TOKEN
---CHARACTERS---
POST CHARACTER
GET ALL CHARACTERS
GET CHARACTER BY ID
---PLANETS---
POST PLANET
GET ALL PLANETS
GET PLANET BY ID
---STARSHIPS---
POST STARSHIP
GET ALL STARSHIPS
GET STARSHIP BY ID
---FAVORITES---
GET ALL FAVORITES
POST FAVORITE CHARACTER
POST FAVORITE PLANET
POST FAVORITE STARSHIP
DELETE FAVORITE CHARACTER
DELETE FAVORITE PLANET
DELETE FAVORITE STARSHIP

-----NEW USER-----

route('/users'), method('POST')

{
    'username': username
    'mail': mail
    'passowrd': password
}

------ UPDATE USERNAME ------

route('/users/<int:user_id>'), method('PUT')

{
    'username': new_username
}

------ GET USER ------

route('/users/<int:user_id>'), method('GET')

return: 'User data:',
{
    'id': user_id
    'username': user_username
    'mail': user_mail
}

------ GET TOKEN ------

route('/token'), method('POST')

body: {
    'mail': mail
    'password': password
}

return: 'access_token'

------ POST CHARACTER ------

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

----- GET ALL CHARACTERS ------

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

----- GET CHARACTER BY ID ------

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

------ POST PLANET ------

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

----- GET ALL PLANETS ------

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

----- GET PLANET BY ID ------

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

------ POST STARSHIP ------

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

----- GET ALL STARSHIPS ------

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

----- GET STARSHIP BY ID ------

route('/starship/<int:starship_id>'), method('GET')

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


----- GET USER FAVORITES ------

route('/favorites/<int:user_id>'), method('GET')

return: {
    'characters': [character_id's]
    'planets': [planet_id's]
    'starships': [starship_id's]
}

----- POST FAVORITE (CHARACTER, PLANET, STARSHIP) ------

route('/favorites/(character, planet, starship)'), method('POST')

body: {
    'user_id': user_id
    '(character, planet, starship)_id': (character, planet, starship)_id
}

----- DELETE FAVORITE (CHARACTER, PLANET, STARSHIP) ------

route('/favorites/(character, planet, starship)'), method('DELETE')

body: {
    'user_id': user_id
    '(character, planet, starship)_id': (character, planet, starship)_id
}




