"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
import json
from flask import Flask, request, jsonify, url_for
from flask_bcrypt import Bcrypt
from flask_jwt_extended import  JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from dotenv import load_dotenv
from utils import APIException, generate_sitemap, save_to_cloudinary,  save_to_cloudinary_file
from admin import setup_admin
from models import (
    db,
    User,
    Character,
    Planet,
    Starship,
    Favorite_character,
    Favorite_planet,
    Favorite_starship,
    User_character,
    User_planet,
    User_starship
)

# from models import Person
app = Flask(__name__)
app.url_map.strict_slashes = False

load_dotenv()
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config["SQLALCHEMY_DATABASE_URI"] = db_url.replace(
        "postgres://", "postgresql://"
    )
else:
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:////tmp/test.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

MIGRATE = Migrate(app, db, directory='src/api/migrations')
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
db.init_app(app)
setup_admin(app)

# ENCRIPTACION JWT-------

app.config["JWT_SECRET_KEY"] = "valor-variable"  # clave secreta para firmar los tokens, cuanto mas largo mejor.
jwt = JWTManager(app)  # isntanciamos jwt de JWTManager utilizando app para tener las herramientas de encriptacion.
bcrypt = Bcrypt(app)   # para encriptar password

# Handle/serialize errors like a JSON object
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code


# generate sitemap with all your endpoints
@app.route("/")
def sitemap():
    return generate_sitemap(app)

# ------------------------------ POST USER, UPDATE USER, GET USER, OBTAIN TOKEN, TOKEN VALIDATION ------------------------------

@app.route("/users", methods=["POST"])
def create_user():
    try:

        username = request.json.get('username')
        upper_mail = request.json.get('mail')
        password = request.json.get('password')
        mail = upper_mail.lower()

        if not mail or not password:
            return jsonify({'error': 'Mail and password are required.'}), 400
        existing_username=User.query.filter_by(username=username).first()
        if existing_username:
            return jsonify({'error': 'Username already exist'}), 409
        existing_mail=User.query.filter_by(mail=mail).first()
        if existing_mail:
            return jsonify({'error': 'Mail already exist'}), 409
        db_passowrd = bcrypt.generate_password_hash(password).decode('utf-8')
        new_user = User(username = username, mail = mail, password= db_passowrd)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'status': 'COMPLETED'}), 200
    
    except Exception as e:
        return jsonify({'error': 'Error in user creation: ' + str(e)}), 500
    
@app.route("/users/<int:user_id>", methods=["PUT"])
def update_user(user_id):

    new_username = request.json.get("username")
    user = User.query.get(user_id)
    user.username = new_username
    db.session.commit()

    new_data = {"username": user.username, "mail": user.mail, "password": user.password}

    return jsonify("Updated user", new_data)

@app.route("/users/<int:user_id>", methods=["GET"])
def get_user(user_id):

    user = User.query.get(user_id)

    if not user:
        return jsonify('Not founded user')
    else:
        user_data = {
            'id': user.id,
            'username': user.username,
            'mail': user.mail
        }
        return jsonify('User data:', user_data)

@app.route('/token', methods=['POST'])
def get_token():

    try:
        upper_mail = request.json.get('mail')
        password = request.json.get('password')
        if not upper_mail or not password:
            return({'error': 'Mail and password are required.'}), 400
        mail = upper_mail.lower()
        login_user = User.query.filter_by(mail=mail).first() 
        if not login_user:
            return({'error': 'Mail do not exist.'}), 409
        
        db_password = login_user.password
        true_or_false = bcrypt.check_password_hash(db_password, password)
        if true_or_false:
            user_id = login_user.id
            access_token = create_access_token(identity=user_id)
            return jsonify({'token': access_token, 'user_id': user_id, 'status': 'COMPLETED'}), 200
        else:
            return jsonify({"error": "Wrong password"}), 409
    
    except Exception as e:
        return jsonify({'error': 'Wrong mail: ' + str(e)}), 500


@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Accede a la identidad del usuario actual con get_jwt_identity
    current_user_id = get_jwt_identity()
    user = User.filter.get(current_user_id)
    if user:
        return jsonify(True), 200
    else:
        return jsonify(False), 400


# ------------------------------ POST, GET, GET BY ID, DELETE ---> CHARACTERS ------------------------------

@app.route("/character", methods=["POST"])
def post_character():

    try: 
        name = request.json.get('name')
        birth_year = request.json.get('birth_year')
        eye_color = request.json.get('eye_color')
        hair_color = request.json.get('hair_color')
        skin_color = request.json.get('skin_color')
        gender = request.json.get('gender')
        height = request.json.get('height')
        mass = request.json.get('mass')
        image_url = request.json.get('image_url')
        uid = request.json.get('uid')

        url_cloudinary = save_to_cloudinary(image_url, uid, 'character')

        new_character = Character(
            name = name,
            birth_year = birth_year,
            eye_color = eye_color,
            hair_color = hair_color,
            skin_color = skin_color,
            gender = gender,
            height = height,
            mass= mass,
            image_url = url_cloudinary,
            uid=uid
        )
        db.session.add(new_character)
        db.session.commit()

        response_body = {
            "name": new_character.name,
            "birth_year": new_character.birth_year,
            "eye_color": new_character.eye_color,
            "hair_color": new_character.hair_color,
            "skin_color": new_character.skin_color,
            "gender": new_character.gender,
            "height": new_character.height,
            "mass": new_character.mass,
            "image_url": new_character.image_url,
            'uid': new_character.uid
        }

        return jsonify('Character added', response_body)
    
    except Exception as e:
        return jsonify({'error': 'Error adding character: ' + str(e)}), 500
    
@app.route("/character/<int:character_uid>", methods=["DELETE"])
def delete_character(character_uid):

    try: 
        character = Character.query.filter_by(uid=character_uid).first()
        if character:
            db.session.delete(character)
            db.session.commit()
        else: 
            character = User_character.query.filter_by(uid=character_uid).first()
            db.session.delete(character)
            db.session.commit()

        return jsonify({'message': 'COMPLETED'})
    
    except Exception as e:
        return jsonify({'error': 'Error deleting character: ' + str(e)}), 500

    

@app.route("/character/<int:user_id>", methods=["GET"])
def get_all_character(user_id):
    
    character_list = []

    user_characters = User_character.query.filter_by(user_id=user_id).all()
    for char in user_characters:
        character_dict = {
            "id": char.id,
            "name": char.name,
            "birth_year": char.birth_year,
            "eye_color": char.eye_color,
            "hair_color": char.hair_color,
            "skin_color": char.skin_color,
            "gender": char.gender,
            "height": char.height,
            "mass": char.mass,
            'image_url': char.image_url,
            'uid': char.uid,
            'description': char.description,
            'is_added': True
            
        }
        character_list.append(character_dict)

    characters = Character.query.all()

    for char in characters:
        character_dict = {
            "id": char.id,
            "name": char.name,
            "birth_year": char.birth_year,
            "eye_color": char.eye_color,
            "hair_color": char.hair_color,
            "skin_color": char.skin_color,
            "gender": char.gender,
            "height": char.height,
            "mass": char.mass,
            'image_url': char.image_url,
            'uid': char.uid,
            'is_added': False
            
        }
        character_list.append(character_dict)

    return jsonify(character_list)


@app.route("/character/<int:character_id>", methods=["GET"])
def get_character_by_id(character_id):
    character = Character.query.get(character_id)

    if not character:
        return jsonify({"error": "No character finded"}), 404
    
    character_list = {
            "id": character.id,
            "name": character.name,
            "birth_year": character.birth_year,
            "eye_color": character.eye_color,
            "hair_color": character.hair_color,
            "skin_color": character.skin_color,
            "gender": character.gender,
            "height": character.height,
            "mass": character.mass,
            'image_url': character.image_url,
            'uid': character.uid
        }

    return jsonify('Your character is:', character_list)

# ------------------------------ POST, GET, GET BY ID, DELETE ---> PLANETS ------------------------------

@app.route("/planet", methods=["POST"])
def post_planet():
    try:
        name = request.json.get('name')
        climate = request.json.get('climate')
        diameter = request.json.get('diameter')
        gravity = request.json.get('gravity')
        orbital_period = request.json.get('orbital_period')
        population = request.json.get('population')
        rotation_period = request.json.get('rotation_period')
        surface_water = request.json.get('surface_water')
        terrain = request.json.get('terrain')
        image_url = request.json.get('image_url')
        uid = request.json.get('uid')

        url_cloudinary = save_to_cloudinary(image_url, uid, 'planet')

        new_planet = Planet(
            name=name,
            climate=climate,
            diameter=diameter,
            gravity=gravity,
            orbital_period=orbital_period,
            population=population,
            rotation_period=rotation_period,
            surface_water=surface_water,
            terrain=terrain,
            image_url=url_cloudinary,
            uid=uid
        )
        db.session.add(new_planet)
        db.session.commit()

        response_body = {
            "name": new_planet.name,
            "climate": new_planet.climate,
            "diameter": new_planet.diameter,
            "gravity": new_planet.gravity,
            "orbital_period": new_planet.orbital_period,
            "population": new_planet.population,
            "rotation_period": new_planet.rotation_period,
            "surface_water": new_planet.surface_water,
            "terrain": new_planet.terrain,
            "image_url": new_planet.image_url,
            'uid': new_planet.uid
        }

        return jsonify('Planet added', response_body)

    except Exception as e:
        return jsonify({'error': 'Error adding planet: ' + str(e)}), 500

@app.route("/planet/<int:user_id>", methods=["GET"])
def get_all_planets(user_id):

    planet_list = []

    user_planets = User_planet.query.filter_by(user_id=user_id).all()
    for planet in user_planets:
        planet_dict = {
            'id': planet.id,
            'name': planet.name,
            'climate': planet.climate,
            'diameter': planet.diameter,
            'gravity': planet.gravity,
            'orbital_period': planet.orbital_period,
            'population': planet.population,
            'rotation_period': planet.rotation_period,
            'surface_water': planet.surface_water,
            'terrain': planet.terrain,
            'image_url': planet.image_url,
            'uid': planet.uid,
            'description': planet.description,            
            'is_added': True
        }
        planet_list.append(planet_dict)

    planets = Planet.query.all()
    for planet in planets:
        planet_dict = {
            'id': planet.id,
            'name': planet.name,
            'climate': planet.climate,
            'diameter': planet.diameter,
            'gravity': planet.gravity,
            'orbital_period': planet.orbital_period,
            'population': planet.population,
            'rotation_period': planet.rotation_period,
            'surface_water': planet.surface_water,
            'terrain': planet.terrain,
            'image_url': planet.image_url,
            'uid': planet.uid,
            'is_added': False
        }
        planet_list.append(planet_dict)

    return jsonify(planet_list)


@app.route("/planets/<int:planet_id>", methods=["GET"])
def get_planet_by_id(planet_id):

    planet = Planet.query.get(planet_id)

    if not planet:
        return jsonify({"error": "No planet finded"}), 404

    planet_list = {
            'id': planet.id,
            'name': planet.name,
            'climate': planet.climate,
            'diameter': planet.diameter,
            'gravity': planet.gravity,
            'orbital_period': planet.orbital_period,
            'population': planet.population,
            'rotation_period': planet.rotation_period,
            'surface_water': planet.surface_water,
            'terrain': planet.terrain,
            'image_url': planet.image_url,
            'uid': planet.uid
        }

    return jsonify(planet_list)

@app.route("/planet/<int:planet_uid>", methods=["DELETE"])
def delete_planet(planet_uid):

    try: 
        planet = Planet.query.filter_by(uid=planet_uid).first()
        if planet:
            db.session.delete(planet)
            db.session.commit()
        else: 
            planet = User_planet.query.filter_by(uid=planet_uid).first()
            db.session.delete(planet)
            db.session.commit()

        return jsonify({'message': 'COMPLETED'})
    
    except Exception as e:
        return jsonify({'error': 'Error deleting planet: ' + str(e)}), 500

# ------------------------------ POST, GET, GET BY ID, DELETE ---> STARSHIPS ------------------------------

@app.route("/starship", methods=["POST"])
def post_starship():
    try:
        name = request.json.get('name')
        model = request.json.get('model')
        MGLT = request.json.get('MGLT')
        cargo_capacity = request.json.get('cargo_capacity')
        consumable = request.json.get('consumable')
        cost_in_credits = request.json.get('cost_in_credits')
        crew = request.json.get('crew')
        hyperdrive_rating = request.json.get('hyperdrive_rating')
        length = request.json.get('length')
        manufacturer = request.json.get('manufacturer')
        passangers = ('passangers')
        starship_class = ('starship_class')
        image_url = request.json.get('image_url')
        uid = request.json.get('uid')

        url_cloudinary = save_to_cloudinary(image_url, uid, 'starship')

        new_starship = Starship(
            name=name,
            model=model,
            MGLT=MGLT,
            cargo_capacity=cargo_capacity,
            consumable=consumable,
            cost_in_credits=cost_in_credits,
            crew=crew,
            hyperdrive_rating=hyperdrive_rating,
            length=length,
            manufacturer=manufacturer,
            passangers = passangers,
            starship_class = starship_class,
            image_url=url_cloudinary,
            uid=uid
        )
        db.session.add(new_starship)
        db.session.commit()

        response_body = {
            "id": new_starship.id,
            "name": new_starship.name,
            "model": new_starship.model,
            "MGLT": new_starship.MGLT,
            "cargo_capacity": new_starship.cargo_capacity,
            "consumable": new_starship.consumable,
            "cost_in_credits": new_starship.cost_in_credits,
            "crew": new_starship.crew,
            "hyperdrive_rating": new_starship.hyperdrive_rating,
            "length": new_starship.length,
            "manufacturer": new_starship.manufacturer,
            "passangers": new_starship.passangers,
            "starship_class": new_starship.starship_class,
            'image_url': new_starship.image_url,
            'uid': new_starship.uid
        }

        return jsonify('Starship added', response_body)

    except Exception as e:
        return jsonify({'error': 'Error adding starship: ' + str(e)}), 500


@app.route("/starship/<int:user_id>", methods=["GET"])
def get_all_ships(user_id):

    ship_list = []

    user_ships = User_starship.query.filter_by(user_id=user_id).all()
    for ship in user_ships:
        ship_dict = {
            'id': ship.id,
            'name': ship.name,
            'model': ship.model,
            'MGLT': ship.MGLT,
            'cargo_capacity': ship.cargo_capacity,
            'consumable': ship.consumable,
            'cost_in_credits': ship.cost_in_credits,
            'crew': ship.crew,
            'hyperdrive_rating': ship.hyperdrive_rating,
            'length': ship.length,
            'manufacturer': ship.manufacturer,
            "passangers": ship.passangers,
            "starship_class": ship.starship_class,
            'image_url': ship.image_url,
            'uid': ship.uid,
            'description': ship.description,            
            'is_added': True
        }
        ship_list.append(ship_dict)
    
    ships = Starship.query.all()
    for ship in ships:
        ship_dict = {
            'id': ship.id,
            'name': ship.name,
            'model': ship.model,
            'MGLT': ship.MGLT,
            'cargo_capacity': ship.cargo_capacity,
            'consumable': ship.consumable,
            'cost_in_credits': ship.cost_in_credits,
            'crew': ship.crew,
            'hyperdrive_rating': ship.hyperdrive_rating,
            'length': ship.length,
            'manufacturer': ship.manufacturer,
            "passangers": ship.passangers,
            "starship_class": ship.starship_class,
            'image_url': ship.image_url,
            'uid': ship.uid,
            'is_added': False
        }
        ship_list.append(ship_dict)

    return jsonify(ship_list)


@app.route("/starship/<int:ship_id>", methods=["GET"])
def get_ship_by_id(ship_id):
    ship = Starship.query.get(ship_id)

    if not ship:
        return jsonify({"error": "No StarShip finded"}), 404
    
    ship_list = {
            'id': ship.id,
            'name': ship.name,
            'model': ship.model,
            'MGLT': ship.MGLT,
            'cargo_capacity': ship.cargo_capacity,
            'consumable': ship.consumable,
            'cost_in_credits': ship.cost_in_credits,
            'crew': ship.crew,
            'hyperdrive_rating': ship.hyperdrive_rating,
            'length': ship.length,
            'manufacturer': ship.manufacturer,
            "passangers": ship.passangers,
            "starship_class": ship.starship_class,
            'image_url': ship.image_url,
            'uid': ship.uid
        }

    return jsonify(ship_list)

@app.route("/starship/<int:starship_uid>", methods=["DELETE"])
def delete_starship(starship_uid):

    try: 
        starship = Starship.query.filter_by(uid=starship_uid).first()
        if starship:
            db.session.delete(starship)
            db.session.commit()
        else: 
            starship = User_starship.query.filter_by(uid=starship_uid).first()
            db.session.delete(starship)
            db.session.commit()

        return jsonify({'message': 'COMPLETED'})
    
    except Exception as e:
        return jsonify({'error': 'Error deleting starship: ' + str(e)}), 500

# ------------------------------ POST, GET, DELETE ---> FAVORITES ------------------------------


@app.route("/favorites/<int:user_id>", methods=["GET"])
def get_user_favorites(user_id):

    favorite_characters = db.session.query(Favorite_character).filter_by(user_id=user_id).all()    
    favorite_character_ids = [fav.character_id for fav in favorite_characters]    
    favorite_planets = db.session.query(Favorite_planet).filter_by(user_id=user_id).all()    
    favorite_planets_ids = [fav.planet_id for fav in favorite_planets]   
    favorite_ships = db.session.query(Favorite_starship).filter_by(user_id=user_id).all()    
    favorite_ships_ids = [fav.starship_id for fav in favorite_ships]   

    favorites = {
        "characters": favorite_character_ids,
        "planets": favorite_planets_ids,
        "starships": favorite_ships_ids,
    }

    return jsonify(favorites)

@app.route('/favorites/character', methods=['POST'])
def post_favorite_character():

    data = request.json
    favorite = Favorite_character(character_id = data['character_id'], user_id = data['user_id'])
    db.session.add(favorite)
    db.session.commit()

    return jsonify('COMPLETED')

@app.route('/favorites/planet', methods=['POST'])
def post_favorite_planet():

    data = request.json
    favorite = Favorite_planet(planet_id = data['planet_id'], user_id = data['user_id'])
    db.session.add(favorite)
    db.session.commit()

    return jsonify('COMPLETED')

@app.route('/favorites/starship', methods=['POST'])
def post_favorite_ship():

    data = request.json

    favorite = Favorite_starship(starship_id=data['starship_id'], user_id=data['user_id'])
    db.session.add(favorite)
    db.session.commit()

    return jsonify('COMPLETED')

@app.route('/favorites/character', methods=['DELETE'])
def delete_favorite_character():
    try:

        user_id = request.json.get('user_id')
        character_id = request.json.get('character_id')
        user = User.query.get(user_id)
        if user:
            favorite = Favorite_character.query.filter_by(character_id=character_id, user_id=user_id).first()
            if favorite:
                db.session.delete(favorite)
                db.session.commit()
                return jsonify('COMPLETED'), 200
            else:
                return jsonify({'error': 'Favorite character not found for this user'}), 404
        else:
            return jsonify({'error': 'User not found'}), 404

    except Exception as e:
        return jsonify({'error': 'Error deleting favorite character: ' + str(e)}), 500

@app.route('/favorites/planet', methods=['DELETE'])
def delete_favorite_planet():
    try:

        user_id = request.json.get('user_id')
        planet_id = request.json.get('planet_id')
        user = User.query.get(user_id)
        if user:
            favorite = Favorite_planet.query.filter_by(planet_id=planet_id, user_id=user_id).first()
            if favorite:
                db.session.delete(favorite)
                db.session.commit()
                return jsonify('COMPLETED'), 200
            else:
                return jsonify({'error': 'Favorite planet not found for this user'}), 404
        else:
            return jsonify({'error': 'User not found'}), 404

    except Exception as e:
        return jsonify({'error': 'Error deleting favorite planet: ' + str(e)}), 500

@app.route('/favorites/starship', methods=['DELETE'])
def delete_favorite_ship():
    try:

        user_id = request.json.get('user_id')
        starship_id = request.json.get('starship_id')
        user = User.query.get(user_id)
        if user:
            favorite = Favorite_starship.query.filter_by(starship_id=starship_id, user_id=user_id).first()
            if favorite:
                db.session.delete(favorite)
                db.session.commit()
                return jsonify('COMPLETED'), 200
            else:
                return jsonify({'error': 'Favorite starship not found for this user'}), 404
        else:
            return jsonify({'error': 'User not found'}), 404

    except Exception as e:
        return jsonify({'error': 'Error deleting favorite starship: ' + str(e)}), 500
    
# ------------------------------ ADD USER CARDS ------------------------------

@app.route('/addCard', methods=['POST'])
def addCard():
    try:
        form = request.form
        user_id = form.get('user_id')
        element = form.get('element')

        if (element == 'character'):
            #Find the max uid value
            user_characters = User_character.query.filter_by(user_id=user_id).all()
            if (user_characters):
                max_char_user_uid = max(user_characters, key=lambda x: x.uid).uid
                uid = max_char_user_uid + 1
            else:
                character_with_max_uid = Character.query.order_by(Character.uid.desc()).first()                
                max_char_uid = character_with_max_uid.uid
                uid = max_char_uid + 1
            #Save the image
            image_file = request.files.get('image_file')
            url_cloudinary = save_to_cloudinary_file(image_file, uid, user_id, 'character')
            #Create the card
            new_character = User_character(
                name = form.get('name'),
                birth_year = form.get('birth_year'),
                eye_color = form.get('eye_color'),
                hair_color = form.get('hair_color'),
                skin_color = form.get('skin_color'),
                gender = form.get('gender'),
                height = form.get('height'),
                mass= form.get('mass'),
                description = form.get('description'),                
                image_url = url_cloudinary,
                uid=uid,
                user_id = user_id
            )
            db.session.add(new_character)
            db.session.commit()
    
        if (element == 'planet'):
            print('llegue1')
            #Find the max uid value
            planet_with_max_uid = Planet.query.order_by(Planet.uid.desc()).first()
            user_planets = User_planet.query.filter_by(user_id=user_id).all()
            if (user_planets):
                max_planet_user_uid = max(user_planets, key=lambda x: x.uid).uid
                uid = max_planet_user_uid + 1
            else:
                max_char_uid = planet_with_max_uid.uid
                uid = max_char_uid + 1
            print('llegue2')
            #Save the image
            image_file = request.files.get('image_file')
            url_cloudinary = save_to_cloudinary_file(image_file, uid, user_id, 'planet')
            #Create the card
            print('llegue3')
            new_planet = User_planet(
                name=form.get('name'),
                climate=form.get('climate'),
                diameter=form.get('diameter'),
                gravity=form.get('gravity'),
                orbital_period=form.get('orbital_period'),
                population=form.get('population'),
                rotation_period=form.get('rotation_period'),
                terrain=form.get('terrain'),
                description = form.get('description'),                
                image_url=url_cloudinary,
                uid=uid,
                user_id = user_id
            )
            db.session.add(new_planet)
            db.session.commit()

        if (element == 'starship'):
            #Find the max uid value
            starship_with_max_uid = Starship.query.order_by(Starship.uid.desc()).first()
            user_starships = User_starship.query.filter_by(user_id=user_id).all()
            if (user_starships):
                max_starship_user_uid = max(user_starships, key=lambda x: x.uid).uid
                uid = max_starship_user_uid + 1
            else:
                max_char_uid = starship_with_max_uid.uid
                uid = max_char_uid + 1
            #Save the image
            image_file = request.files.get('image_file')
            url_cloudinary = save_to_cloudinary_file(image_file, uid, user_id, 'starship')            
            #Create the card
            new_starship = User_starship(
                name=form.get('name'),
                model=form.get('model'),
                MGLT=form.get('MGLT'),
                cargo_capacity=form.get('cargo_capacity'),
                cost_in_credits=form.get('cost_in_credits'),
                crew=form.get('crew'),
                hyperdrive_rating=form.get('hyperdrive_rating'),
                length=form.get('length'),
                manufacturer=form.get('manufacturer'),
                description = form.get('description'),                
                image_url=url_cloudinary,
                uid=uid,
                user_id = user_id
            )
            db.session.add(new_starship)
            db.session.commit()
        
        return jsonify({'message': 'COMPLETED'})

    except Exception as e: 
        return jsonify({'error': 'Error adding card: ' + str(e)}), 500
    

#---------------- LOAD DATA FROM exported_data.json FILE ----------------

@app.route('/get_exported_data', methods=['GET'])
def get_exported_data(): 
    with open("src/api/exported_data.json", "r") as json_file:
        export_data = json.load(json_file)

    character_data = export_data['characters']

    for char_data in character_data:
        character = Character(
            name=char_data["name"],
            birth_year=char_data["birth_year"],
            eye_color=char_data["eye_color"],
            hair_color=char_data["hair_color"],
            skin_color=char_data["skin_color"],
            gender=char_data["gender"],
            height=char_data["height"],
            mass=char_data["mass"],
            image_url=char_data["image_url"],
            uid=char_data["uid"],
        )
        db.session.add(character)

    db.session.commit()

    planet_data = export_data["planets"]

    for planet_data in planet_data:
        planet = Planet(
            name=planet_data["name"],
            climate=planet_data["climate"],
            diameter=planet_data["diameter"],
            gravity=planet_data["gravity"],
            orbital_period=planet_data["orbital_period"],
            population=planet_data["population"],
            rotation_period=planet_data["rotation_period"],
            surface_water=planet_data["surface_water"],
            terrain=planet_data["terrain"],
            image_url=planet_data["image_url"],
            uid=planet_data["uid"],
        )
        db.session.add(planet)

    db.session.commit()

    starship_data = export_data["starships"]

    for ship_data in starship_data:
        starship = Starship(
            name=ship_data["name"],
            model=ship_data["model"],
            MGLT=ship_data["MGLT"],
            cargo_capacity=ship_data["cargo_capacity"],
            consumable=ship_data["consumable"],
            cost_in_credits=ship_data["cost_in_credits"],
            crew=ship_data["crew"],
            hyperdrive_rating=ship_data["hyperdrive_rating"],
            length=ship_data["length"],
            manufacturer=ship_data["manufacturer"],
            starship_class=ship_data["starship_class"],
            image_url=ship_data["image_url"],
            uid=ship_data["uid"],
            # Agrega aquí las propiedades adicionales
        )
        db.session.add(starship)

    db.session.commit()

    return jsonify({"message": 'Exported data charged successfully'})

# this only runs if `$ python src/app.py` is executed
if __name__ == "__main__":
    PORT = int(os.environ.get("PORT", 3001))
    app.run(host="0.0.0.0", port=PORT, debug=False)
