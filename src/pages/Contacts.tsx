// ./src/pages/Contacts.tsx
import React, { useState } from 'react';
import UpdateContact from '../components/UpdateContact';

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const ContactosPage: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210' },
    // Add more contacts as needed
  ]);

  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleAddToFavorites = (contact: Contact) => {
    // Implement adding to favorites logic
    console.log('Adding to favorites:', contact);
  };

  const handleEditContact = (contact: Contact) => {
    setSelectedContact(contact);
    setShowEditModal(true);
  };

  const handleDeleteContact = (contact: Contact) => {
    setSelectedContact(contact);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    // Implement delete logic here, e.g., calling an API
    console.log('Deleting contact:', selectedContact);
    // After successful deletion, update contacts state and close modal
    setContacts(contacts.filter(c => c.id !== selectedContact!.id));
    setShowDeleteModal(false);
  };

  return (
    <div>
      <h1>Contactos</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(contact => (
            <tr key={contact.id}>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>
                <button onClick={() => handleAddToFavorites(contact)}>Add to Favorites</button>
                <button onClick={() => handleEditContact(contact)}>Edit</button>
                <button onClick={() => handleDeleteContact(contact)}>Delete</button>
                <button>View More</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowEditModal(false)}>&times;</span>
            <h2>Edit Contact</h2>
            <UpdateContact />
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Delete Contact</h2>
            <p>Are you sure you want to delete {selectedContact?.name}?</p>
            <button onClick={handleConfirmDelete}>Yes</button>
            <button onClick={() => setShowDeleteModal(false)}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactosPage;