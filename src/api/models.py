from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
    
class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(250), unique=True, nullable=False)
    mail = db.Column(db.String(250), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)

class User_character(db.Model):
    __tablename__='user_character'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250))
    birth_year = db.Column(db.String(250))
    eye_color = db.Column(db.String(250))
    hair_color = db.Column(db.String(250))
    skin_color = db.Column(db.String(250))
    gender = db.Column(db.String(250))
    height = db.Column(db.String(250))
    mass = db.Column(db.String(250))
    image_url = db.Column(db.String(250))
    uid = db.Column(db.Integer)
    description = db.Column(db.String(600))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

class Character(db.Model):
    __tablename__ = 'character'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250))
    birth_year = db.Column(db.String(250))
    eye_color = db.Column(db.String(250))
    hair_color = db.Column(db.String(250))
    skin_color = db.Column(db.String(250))
    gender = db.Column(db.String(250))
    height = db.Column(db.String(250))
    mass = db.Column(db.String(250))
    image_url = db.Column(db.String(250))
    uid = db.Column(db.Integer)

class User_planet(db.Model):
    __tablename__='user_planet'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250))
    climate = db.Column(db.String(250))
    diameter = db.Column(db.String(250))
    gravity = db.Column(db.String(250))
    orbital_period = db.Column(db.String(250))
    population = db.Column(db.String(250))
    rotation_period = db.Column(db.String(250))
    surface_water = db.Column(db.String(250))
    terrain = db.Column(db.String(250))
    image_url = db.Column(db.String(250))
    uid = db.Column(db.Integer)
    description = db.Column(db.String(600))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

class Planet(db.Model):
    __tablename__ = 'planet'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250))
    climate = db.Column(db.String(250))
    diameter = db.Column(db.String(250))
    gravity = db.Column(db.String(250))
    orbital_period = db.Column(db.String(250))
    population = db.Column(db.String(250))
    rotation_period = db.Column(db.String(250))
    surface_water = db.Column(db.String(250))
    terrain = db.Column(db.String(250))
    image_url = db.Column(db.String(250))
    uid = db.Column(db.Integer)
    

class User_starship(db.Model):
    __tablename__ = 'user_starship'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250))
    model = db.Column(db.String(250))
    MGLT = db.Column(db.String(250))
    cargo_capacity = db.Column(db.String(250))
    consumable = db.Column(db.String(250))
    cost_in_credits = db.Column(db.String(250))
    crew = db.Column(db.String(250))
    hyperdrive_rating = db.Column(db.String(250))
    length = db.Column(db.String(250))
    manufacturer = db.Column(db.String(250))
    passangers = db.Column(db.String(250))
    starship_class = db.Column(db.String(250))
    image_url = db.Column(db.String(250))
    uid = db.Column(db.Integer)
    description = db.Column(db.String(600))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))


class Starship(db.Model):
    __tablename__ = 'starship'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250))
    model = db.Column(db.String(250))
    MGLT = db.Column(db.String(250))
    cargo_capacity = db.Column(db.String(250))
    consumable = db.Column(db.String(250))
    cost_in_credits = db.Column(db.String(250))
    crew = db.Column(db.String(250))
    hyperdrive_rating = db.Column(db.String(250))
    length = db.Column(db.String(250))
    manufacturer = db.Column(db.String(250))
    passangers = db.Column(db.String(250))
    starship_class = db.Column(db.String(250))
    image_url = db.Column(db.String(250))
    uid = db.Column(db.Integer)

class Favorite_character(db.Model):
    __tablename__ = 'favorite_character'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    character_id = db.Column(db.Integer, db.ForeignKey('character.id'))

class Favorite_planet(db.Model):
    __tablename__ = 'favorite_planet'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    planet_id = db.Column(db.Integer, db.ForeignKey('planet.id'))

class Favorite_starship(db.Model):
    __tablename__ = 'favorite_starship'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    starship_id = db.Column(db.Integer, db.ForeignKey('starship.id'))