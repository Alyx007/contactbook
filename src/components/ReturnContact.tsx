import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

type Contact = {
  id: string;
  nombre: string;
  apellido: string;
  telefono: string;
  correo_electronico: string;
  calle: string;
  ciudad: string;
  estado: string;
  empresa: string;
  cargo: string;
  notas: string;
  fecha_de_cumpleanos: string;
};

const ReturnContact: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const { register, handleSubmit, reset, setValue } = useForm<Contact>();

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/contacts');
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts', error);
    }
  };

  const handleEdit = (contact: Contact) => {
    setSelectedContact(contact);
    for (const [key, value] of Object.entries(contact)) {
      setValue(key as keyof Contact, value);
    }
    setShowEditModal(true);
  };

  const handleDelete = (contact: Contact) => {
    setSelectedContact(contact);
    setShowDeleteModal(true);
  };

  const handleEditSave: SubmitHandler<Contact> = async (data) => {
    if (!selectedContact) return;

    try {
      await axios.patch(`http://localhost:5000/api/contacts/${selectedContact.id}`, data);
      fetchContacts();
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating contact', error);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedContact) return;

    try {
      await axios.delete(`http://localhost:5000/api/contacts/${selectedContact.id}`);
      fetchContacts();
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting contact', error);
    }
  };

  return (
    <div>
      <h2>Contact List</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Teléfono</th>
            <th>Correo Electrónico</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.nombre}</td>
              <td>{contact.apellido}</td>
              <td>{contact.telefono}</td>
              <td>{contact.correo_electronico}</td>
              <td>
                <Button onClick={() => handleEdit(contact)}>Editar</Button>
                <Button onClick={() => handleDelete(contact)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Contacto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedContact && (
            <Form onSubmit={handleSubmit(handleEditSave)}>
              <Form.Group controlId="formNombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" {...register('nombre')} required />
              </Form.Group>
              <Form.Group controlId="formApellido">
                <Form.Label>Apellido</Form.Label>
                <Form.Control type="text" {...register('apellido')} required />
              </Form.Group>
              <Form.Group controlId="formTelefono">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control type="text" {...register('telefono')} required />
              </Form.Group>
              <Form.Group controlId="formCorreo">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control type="email" {...register('correo_electronico')} required />
              </Form.Group>
              <Form.Group controlId="formCalle">
                <Form.Label>Calle</Form.Label>
                <Form.Control type="text" {...register('calle')} required />
              </Form.Group>
              <Form.Group controlId="formCiudad">
                <Form.Label>Ciudad</Form.Label>
                <Form.Control type="text" {...register('ciudad')} required />
              </Form.Group>
              <Form.Group controlId="formEstado">
                <Form.Label>Estado</Form.Label>
                <Form.Control type="text" {...register('estado')} required />
              </Form.Group>
              <Form.Group controlId="formEmpresa">
                <Form.Label>Empresa</Form.Label>
                <Form.Control type="text" {...register('empresa')} required />
              </Form.Group>
              <Form.Group controlId="formCargo">
                <Form.Label>Cargo</Form.Label>
                <Form.Control type="text" {...register('cargo')} required />
              </Form.Group>
              <Form.Group controlId="formNotas">
                <Form.Label>Notas</Form.Label>
                <Form.Control as="textarea" {...register('notas')} />
              </Form.Group>
              <Form.Group controlId="formFechaDeCumpleanos">
                <Form.Label>Fecha de Cumpleaños</Form.Label>
                <Form.Control type="date" {...register('fecha_de_cumpleanos')} required />
              </Form.Group>
              <Button variant="primary" type="submit">
                Guardar Cambios
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Está seguro que desea eliminar este contacto?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ReturnContact;
