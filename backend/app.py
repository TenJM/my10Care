from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import (
    JWTManager, create_access_token, jwt_required, get_jwt_identity
)
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import timedelta

# Initialize app
app = Flask(__name__)
CORS(app)

# Config
app.config['SECRET_KEY'] = 'super-secret-key'  # change in production
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['JWT_SECRET_KEY'] = 'jwt-secret-key'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=1)

# Extensions
db = SQLAlchemy(app)
jwt = JWTManager(app)

# ---------------------------
# Database Model
# ---------------------------
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    pincode = db.Column(db.String(10))

# app.py (add after User model and before routes)

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text, nullable=False)
    image = db.Column(db.String(300), nullable=True)  # URL to product image
    price = db.Column(db.Float, nullable=False)
    size = db.Column(db.String(50), nullable=True)    # Example: "100ml"


# ---------------------------
# Routes
# ---------------------------

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if User.query.filter_by(username=data['username']).first():
        return jsonify({'error': 'Username already exists'}), 400
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already registered'}), 400

    hashed_password = generate_password_hash(data['password'])
    new_user = User(
        first_name=data.get('firstName'),
        last_name=data.get('lastName'),
        username=data['username'],
        email=data['email'],
        password=hashed_password,
        pincode=data['pincode']
    )
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    if user and check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity=user.username)
        return jsonify(access_token=access_token), 200
    return jsonify({'error': 'Invalid credentials'}), 401


@app.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404
    return jsonify({
        'username': user.username,
        'email': user.email,
        'firstName': user.first_name,
        'lastName': user.last_name,
        'pincode': user.pincode
    })

# Add to bottom of app.py temporarily

@app.route('/seed-products')
def seed_products():
    sample_products = [
        Product(
            title='Aloe Vera Gel',
            description='Soothing and moisturizing aloe vera gel.',
            image='https://via.placeholder.com/150',
            price=199.0,
            size='200ml'
        ),
        Product(
            title='Vitamin C Serum',
            description='Brightens skin and reduces dark spots.',
            image='https://via.placeholder.com/150',
            price=349.0,
            size='30ml'
        ),
        Product(
            title='Charcoal Face Wash',
            description='Deep cleansing face wash with charcoal.',
            image='https://via.placeholder.com/150',
            price=149.0,
            size='100ml'
        ),
    ]
    db.session.bulk_save_objects(sample_products)
    db.session.commit()
    return {'message': 'Products seeded!'}

@app.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([
        {
            'id': p.id,
            'title': p.title,
            'description': p.description,
            'image': p.image,
            'price': p.price,
            'size': p.size
        } for p in products
    ])

# ---------------------------
# Run the server
# ---------------------------
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=1901)
