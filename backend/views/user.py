from flask import jsonify, request, Blueprint
from models import db, User
from werkzeug.security import generate_password_hash

user_bp = Blueprint("user_bp", __name__)

# ---> Fetching all the users and their entries and tags
@user_bp.route("/users")
def fetch_users():
    users = User.query.all()

    user_list = []
    for user in users:
        user_list.append({
            'id':user.id,
            'email':user.email,
            'name':user.name,
            'is_verified': user.is_verified,
            "entries":[
                {
                    "id": entry.id,
                    "title": entry.title,
                    "content": entry.content,
                    "date_created": entry.date_created,
                    "data_updated": entry.date_updated,
                    "tag": {
                        "id": entry.tag.id,
                        "name": entry.tag.name
                    }
                } for entry in user.entries
            ]
            })

    return jsonify(user_list)

@user_bp.route("/users", methods=["POST"])
def add_users():
    try:
        data = request.get_json()
        
        # Validate required fields
        if not data or 'name' not in data or 'email' not in data or 'password' not in data:
            return jsonify({"error": "Missing required fields: name, email, password"}), 400
        
        name = data['name']
        email = data['email']
        password = generate_password_hash(data['password'])

        print(f"Attempting to create user: {name}, {email}")  # Debug print

        # Check if user already exists
        check_name = User.query.filter_by(name=name).first()
        check_email = User.query.filter_by(email=email).first()

        print(f"Existing name: {check_name}")
        print(f"Existing email: {check_email}")

        if check_name or check_email:
            return jsonify({"error": "Username/email exists"}), 406

        # Create new user
        new_user = User(
            name=name, 
            email=email, 
            password=password,
            is_verified=False  # Explicitly set this
        )
        
        db.session.add(new_user)
        db.session.commit()
        
        print("User created successfully")  # Debug print
        return jsonify({"success": "Added successfully"}), 201

    except Exception as e:
        db.session.rollback()  # Important: rollback on error
        print(f"Registration error: {str(e)}")  # This will show in terminal
        return jsonify({"error": f"Registration failed: {str(e)}"}), 500

# ---> Updating a user by using their id
@user_bp.route("/users/<int:user_id>", methods=["PATCH"])
def update_users(user_id):
    #---> Fetch the user by their id so that we can update the specific user
    user = User.query.get(user_id)

    if user:
        data = request.get_json()
        name = data.get('name', user.name)
        email = data.get('email', user.email)
        password = data.get('password')

        # ---> Check if the new name or email already exists, but exclude the current user
        check_name = User.query.filter(User.name == name, User.id != user_id).first()
        check_email = User.query.filter(User.email == email, User.id != user_id).first()

        if check_name or check_email:
            return jsonify({"error": "Username/email exists"}), 406
        else:
            user.name = name
            user.email = email
            
            # ---> Option to update the password
            if password:
                user.password = generate_password_hash(password)  
            db.session.commit()
            return jsonify({"success": "Updated successfully"}), 201
    else:
        return jsonify({"error": "User doesn't exist!"}), 406


# ---> Delete a user
@user_bp.route("/users/<int:user_id>", methods=["DELETE"])
def delete_users(user_id):
    user = User.query.get(user_id)

    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify({"success":"Deleted successfully"}), 200

    else:
        return jsonify({"error":"User your are trying to delete doesn't exist!"}),406