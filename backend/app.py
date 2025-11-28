from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from models import db, TokenBlocklist
from flask_jwt_extended import JWTManager
from datetime import timedelta
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://cooquiejournaldb_user:WI7A5DGicu5osRrH4pgao13XOlxRQaGl@dpg-d4kn7fk9c44c73f2ki20-a.oregon-postgres.render.com/cooquiejournaldb'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
migrate = Migrate(app, db)

# ---> JWT 
app.config["JWT_SECRET_KEY"] = "adiaryandjournal"
# ---> This is to create a token for authentication to be used while login in.
app.config["JWT_ACCESS_TOKEN_EXPIRE"] = timedelta(hours=1)
jwt = JWTManager(app)

# ---> Initializing
jwt.init_app(app)

from views.auth import auth_bp
from views.entry import entry_bp
from views.tags import tags_bp
from views.user import user_bp

app.register_blueprint(auth_bp)
app.register_blueprint(entry_bp)
app.register_blueprint(tags_bp)
app.register_blueprint(user_bp)

# ---> JWT Blocklist callback function
@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload: dict) -> bool:
    jti = jwt_payload["jti"]
    token = db.session.query(TokenBlocklist.id).filter_by(jti=jti).scalar()

    return token is not None

if __name__ == '__main__':
    app.run("localhost", debug=True)
