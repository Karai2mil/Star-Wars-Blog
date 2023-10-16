import re
from flask import jsonify, url_for
import requests
import cloudinary
import cloudinary.uploader
import cloudinary.api

class APIException(Exception):
    status_code = 400

    def __init__(self, message, status_code=None, payload=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        return rv

def has_no_empty_params(rule):
    defaults = rule.defaults if rule.defaults is not None else ()
    arguments = rule.arguments if rule.arguments is not None else ()
    return len(defaults) >= len(arguments)

def generate_sitemap(app):
    links = ['/admin/']
    for rule in app.url_map.iter_rules():
        # Filter out rules we can't navigate to in a browser
        # and rules that require parameters
        if "GET" in rule.methods and has_no_empty_params(rule):
            url = url_for(rule.endpoint, **(rule.defaults or {}))
            if "/admin/" not in url:
                links.append(url)

    links_html = "".join(["<li><a href='" + y + "'>" + y + "</a></li>" for y in links])
    return """
        <div style="text-align: center;">
        <img style="max-height: 80px" src='https://storage.googleapis.com/breathecode/boilerplates/rigo-baby.jpeg' />
        <h1>Rigo welcomes you to your API!!</h1>
        <p>API HOST: <script>document.write('<input style="padding: 5px; width: 300px" type="text" value="'+window.location.href+'" />');</script></p>
        <p>Start working on your proyect by following the <a href="https://start.4geeksacademy.com/starters/flask" target="_blank">Quick Start</a></p>
        <p>Remember to specify a real endpoint path like: </p>
        <ul style="text-align: left;">"""+links_html+"</ul></div>"


def save_to_cloudinary(image_url, custom_public_id, type):
    cloudinary.config(
        cloud_name='star-wars',
        api_key='598723449155296',
        api_secret='TcGe5iwqFxD2H0etVPUubTumtd4',
        keep_original=True
    )

    folder_path = 'StarWars/'

    if (type == 'character'):
        folder_path += 'characters/'
    elif (type == 'planet'):
        folder_path += 'planets/'
    elif (type == 'starship'):
        folder_path += 'starships/'

    try:
        response = requests.get(image_url)
        image_content = response.content

        upload_result = cloudinary.uploader.upload(
            image_content,
            folder=folder_path,
            public_id=custom_public_id)

        return upload_result["secure_url"]
    except cloudinary.exceptions.Error as e:
        # Handle Cloudinary API errors
        print("Cloudinary API Error:", e)
        return jsonify({'message': "error al subir imagen"}), 500
    except cloudinary.uploader.Error as e:
        # Handle Cloudinary uploader errors
        print("Cloudinary Uploader Error:", e)
        return jsonify({'message': "error al subir imagen"}), 500
    
def save_to_cloudinary_file(image_file, custom_public_id, user_id, type):
    cloudinary.config(
        cloud_name='star-wars',
        api_key='598723449155296',
        api_secret='TcGe5iwqFxD2H0etVPUubTumtd4',
        keep_original=True
    )

    folder_path = 'StarWars/'

    if (type == 'character'):
        folder_path += 'characters/'
    elif (type == 'planet'):
        folder_path += 'planets/'
    elif (type == 'starship'):
        folder_path += 'starships/'


    try:
        upload_result = cloudinary.uploader.upload(
            image_file,
            folder=folder_path,
            public_id=f"a{user_id}{custom_public_id}")

        return upload_result["secure_url"]
    except cloudinary.exceptions.Error as e:
        # Handle Cloudinary API errors
        print("Cloudinary API Error:", e)
        return jsonify({'message': "error al subir imagen"}), 500
    except cloudinary.uploader.Error as e:
        # Handle Cloudinary uploader errors
        print("Cloudinary Uploader Error:", e)
        return jsonify({'message': "error al subir imagen"}), 500