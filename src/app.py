from flask import Flask, request, jsonify

app = Flask(__name__)

# Lista de contactos (almacenada en memoria)
contacts = []

# Rutas de la API
@app.route('/api/contacts', methods=['GET', 'POST'])
def handle_contacts():
    if request.method == 'GET':
        return jsonify(contacts)
    elif request.method == 'POST':
        new_contact = request.json
        new_contact['id'] = len(contacts) + 1  # Genera un ID incremental
        contacts.append(new_contact)
        return jsonify(new_contact), 201

@app.route('/api/contacts/<int:contact_id>', methods=['GET', 'PATCH', 'DELETE'])
def handle_contact(contact_id):
    # Busca el contacto por su ID
    contact = next((c for c in contacts if c['id'] == contact_id), None)
    if not contact:
        return jsonify({'error': 'Contact not found'}), 404

    if request.method == 'GET':
        return jsonify(contact)
    elif request.method == 'PATCH':
        data = request.json
        contact.update(data)
        return jsonify(contact)
    elif request.method == 'DELETE':
        contacts.remove(contact)
        return jsonify({'message': 'Contact deleted'}), 200

if __name__ == '__main__':
    app.run(debug=True)
