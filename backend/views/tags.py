from flask import jsonify, request, Blueprint
from models import db, User, Tags
from flask_jwt_extended import jwt_required, get_jwt_identity

tags_bp = Blueprint("tags_bp", __name__)

# ------> ADD A TAG
@tags_bp.route("/tags", methods=["POST"])
@jwt_required()
def add_tag():
    data = request.get_json()
    name = data['name']
    current_user_id = get_jwt_identity()

    # check if tag exists for this user
    check_tag = Tags.query.filter_by(name=name, user_id=current_user_id).first()

    if check_tag:
        return jsonify({"error": "Tag already exists"}), 406

    new_tag = Tags(name=name, user_id=current_user_id)
    db.session.add(new_tag)
    db.session.commit()

    # return a FULL object to frontend
    return jsonify({
        "id": new_tag.id,
        "name": new_tag.name
    }), 201


# ------> FETCH ALL TAGS
@tags_bp.route("/tags", methods=["GET"])
@jwt_required()
def get_all_tags():
    current_user_id = get_jwt_identity()
    tags = Tags.query.filter_by(user_id=current_user_id).all()

    tags_list = [{
        "id": tag.id,
        "name": tag.name
    } for tag in tags]

    return jsonify(tags_list), 200


# ------> UPDATE TAG
@tags_bp.route("/tags/<int:tag_id>", methods=["PATCH"])
@jwt_required()
def update_tags(tag_id):
    current_user_id = get_jwt_identity()
    tag = Tags.query.filter_by(id=tag_id, user_id=current_user_id).first()

    if not tag:
        return jsonify({"error": "Tag not found"}), 404

    data = request.get_json()
    name = data.get("name")

    if not name:
        return jsonify({"error": "Name is required"}), 400

    # check duplicates
    check_tag = Tags.query.filter(
        Tags.name == name,
        Tags.user_id == current_user_id,
        Tags.id != tag_id
    ).first()

    if check_tag:
        return jsonify({"error": "Tag name already exists"}), 406

    tag.name = name
    db.session.commit()

    return jsonify({"success": "Updated successfully"}), 200


# ------> DELETE TAG
@tags_bp.route("/tags/<int:tag_id>", methods=["DELETE"])
@jwt_required()
def delete_tags(tag_id):
    current_user_id = get_jwt_identity()

    tag = Tags.query.filter_by(id=tag_id, user_id=current_user_id).first()

    if not tag:
        return jsonify({"error": "Tag not found"}), 404

    db.session.delete(tag)
    db.session.commit()

    return jsonify({"success": "Deleted successfully"}), 200
