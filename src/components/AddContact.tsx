// src/ContactForm.tsx
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './addContact.css';

type ContactFormData = {
  // id: number; 
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

// Initial ID counter - I don't need it since Python will generate it's own ids
// let contactIdCounter = 0;

const ContactForm: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<ContactFormData>();
  const [contacts, setContacts] = useState<ContactFormData[]>([]);

  const onSubmit: SubmitHandler<ContactFormData> = async data => {
    try {
      const response = await fetch('http://localhost:5000/api/contacts', {
        method: 'POST', // posting - "saving" and senfing the code to the backend
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(data), 
      });
      if (response.ok) {
        const newContact = await response.json();
        setContacts([...contacts, newContact]);
        reset();
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while creating the contact.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="nombre">Nombre:</label>
        <input {...register('nombre')} id="nombre" required />
      </div>
      <div>
        <label htmlFor="apellido">Apellido:</label>
        <input {...register('apellido')} id="apellido" required />
      </div>
      <div>
        <label htmlFor="telefono">Teléfono:</label>
        <input {...register('telefono')} id="telefono" required />
      </div>
      <div>
        <label htmlFor="correo">Correo Electrónico:</label>
        <input {...register('correo_electronico')} id="correo" type="email" required />
      </div>
      <div>
        <label htmlFor="calle">Calle:</label>
        <input {...register('calle')} id="calle" required />
      </div>
      <div>
        <label htmlFor="ciudad">Ciudad:</label>
        <input {...register('ciudad')} id="ciudad" required />
      </div>
      <div>
        <label htmlFor="estado">Estado:</label>
        <input {...register('estado')} id="estado" required />
      </div>
      <div>
        <label htmlFor="empresa">Empresa:</label>
        <input {...register('empresa')} id="empresa" required />
      </div>
      <div>
        <label htmlFor="cargo">Cargo:</label>
        <input {...register('cargo')} id="cargo" required />
      </div>
      <div>
        <label htmlFor="notas">Notas:</label>
        <textarea {...register('notas')} id="notas" />
      </div>
      <div>
        <label htmlFor="fecha_de_cumpleanos">Fecha de Cumpleaños:</label>
        <input {...register('fecha_de_cumpleanos')} id="fechaCumpleanos" type="date" required />
      </div>
      <button type="submit">Crear Contacto</button>
    </form>
  );
};

export default ContactForm;
