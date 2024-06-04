from flask import Flask, request, jsonify, redirect
from flask_cors import CORS
import uuid
from datetime import datetime

app = Flask(__name__)
CORS(app)

# In-memory storage
contacts = []

# function to validate contact data
def validate_contact(data):
    required_fields = ['nombre', 'apellido', 'telefono', 'correo_electronico', 
                       'calle', 'ciudad', 'estado', 'empresa', 'cargo', 'notas', 'fecha_de_cumpleanos']
    for field in required_fields:
        if field not in data:
            return False, f"'{field}' is required."
    
    # Validate email format
    if "@" not in data['correo_electronico']:
        return False, "Invalid email format."
    
    # # Validate phone number for digits
    # if not data['telefono'].isdigit():
    #     return False, "Invalid phone number format. Only digits are allowed."
    
    # Validate date format
    try:
        datetime.strptime(data['fecha_de_cumpleanos'], '%Y-%m-%d')
    except ValueError:
        return False, "Invalid date format. Use 'YYYY-MM-DD'."
    
    return True, ""

@app.route('/api/contacts', methods=['GET'])
def get_contacts():
    return jsonify(contacts) # get all contacts

@app.route('/api/contacts', methods=['POST'])
def create_contact():
    new_contact = request.json 

    is_valid, message = validate_contact(new_contact)
    if not is_valid:
        return jsonify({'error': message}), 400 # Validate the new contact

    new_contact['id'] = str(uuid.uuid4()) # auto assign id
    contacts.append(new_contact) #create a new contact
    return jsonify(new_contact), 201 # returning server message

# get a specific contact by ID
@app.route('/api/contacts/<string:contact_id>', methods=['GET'])
def get_contact(contact_id):
    contact = next((c for c in contacts if c['id'] == contact_id), None)
    if contact is not None:
        return jsonify(contact)
    else:
        return jsonify({'error': 'Contact not found'}), 404

# update a specific contact by ID
@app.route('/api/contacts/<string:contact_id>', methods=['PATCH'])
def update_contact(contact_id):
    contact = next((c for c in contacts if c['id'] == contact_id), None)
    if contact is not None:
        data = request.json
        # Validate the updte
        for key, value in data.items():
            if key in contact:
                if key == 'correo_electronico' and "@" not in value:
                    return jsonify({'error': 'Invalid email format.'}), 400
                if key == 'telefono' and not value.isdigit():
                    return jsonify({'error': 'Invalid phone number format. Only digits are allowed.'}), 400
                if key == 'fecha_de_cumpleanos':
                    try:
                        datetime.strptime(value, '%Y-%m-%d')
                    except ValueError:
                        return jsonify({'error': "Invalid date format. Use 'YYYY-MM-DD'."}), 400
                contact[key] = value
        return jsonify(contact)
    else:
        return jsonify({'error': 'Contact not found'}), 404 # if not found the specific id

# delete a specific contact by ID
@app.route('/api/contacts/<string:contact_id>', methods=['DELETE'])
def delete_contact(contact_id):
    global contacts
    contact = next((c for c in contacts if c['id'] == contact_id), None)
    if contact is not None:
        contacts = [c for c in contacts if c['id'] != contact_id]
        return jsonify({'message': 'Contact deleted'}), 200
    else:
        return jsonify({'error': 'Contact not found'}), 404
    
# Default route to redirect to /api/contacts
@app.route('/')
def index():
    return redirect('http://localhost:5173')

if __name__ == '__main__':
    app.run(debug=True)
