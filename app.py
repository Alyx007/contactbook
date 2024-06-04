from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# In-memory storage for contacts (for demonstration purposes)
contacts = []
next_id = 1  # ID counter for new contacts

# Route to get all contacts
@app.route('/api/contacts', methods=['GET'])
def get_contacts():
    return jsonify(contacts)

# Route to create a new contact
@app.route('/api/contacts', methods=['POST'])
def create_contact():
    global next_id
    new_contact = request.json
    new_contact['id'] = next_id
    next_id += 1
    contacts.append(new_contact)
    return jsonify(new_contact), 201

# Route to get a specific contact by ID
@app.route('/api/contacts/<int:contact_id>', methods=['GET'])
def get_contact(contact_id):
    contact = next((c for c in contacts if c['id'] == contact_id), None)
    if contact is not None:
        return jsonify(contact)
    else:
        return jsonify({'error': 'Contact not found'}), 404

# Route to update a specific contact by ID
@app.route('/api/contacts/<int:contact_id>', methods=['PATCH'])
def update_contact(contact_id):
    contact = next((c for c in contacts if c['id'] == contact_id), None)
    if contact is not None:
        data = request.json
        for key, value in data.items():
            contact[key] = value
        return jsonify(contact)
    else:
        return jsonify({'error': 'Contact not found'}), 404

# Route to delete a specific contact by ID
@app.route('/api/contacts/<int:contact_id>', methods=['DELETE'])
def delete_contact(contact_id):
    global contacts
    contact = next((c for c in contacts if c['id'] == contact_id), None)
    if contact is not None:
        contacts = [c for c in contacts if c['id'] != contact_id]
        return jsonify({'message': 'Contact deleted'}), 200
    else:
        return jsonify({'error': 'Contact not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)
