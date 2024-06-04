// ./src/components/UpdateContact.tsx
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './updateContact.css';

type ContactFormData = {
  id: string; // Assuming your ID can be a string (either UUID or incremental)
  nombre: string;
  apellido: string;
  telefono: string;
  correo: string;
  calle: string;
  ciudad: string;
  estado: string;
  empresa: string;
  cargo: string;
  notas: string;
  fechaCumpleanos: string;
};

const UpdateContact: React.FC = () => {
  const { register, handleSubmit, setValue } = useForm<ContactFormData>();

  // Function to handle form submission
  const onSubmit: SubmitHandler<ContactFormData> = data => {
    // Handle updating contact here (e.g., call an API to update the contact)
    console.log('Updated contact:', data);
  };

  // Function to populate form fields with existing contact data
  const populateForm = () => {
    // Mock data (replace with actual data retrieval logic)
    const existingContact: ContactFormData = {
      id: '1', // ID of the contact to be updated
      nombre: 'John',
      apellido: 'Doe',
      telefono: '1234567890',
      correo: 'john@example.com',
      calle: '123 Main St',
      ciudad: 'City',
      estado: 'State',
      empresa: 'ABC Company',
      cargo: 'Manager',
      notas: 'Lorem ipsum dolor sit amet.',
      fechaCumpleanos: '1990-01-01',
    };

    // Populate form fields with existing contact data
    Object.keys(existingContact).forEach(key => {
      setValue(key as keyof ContactFormData, existingContact[key as keyof ContactFormData]);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Input fields for updating contact */}
      <div>
        <label htmlFor="nombre">Nombre:</label>
        <input {...register('nombre')} id="nombre" />
      </div>
      <div>
        <label htmlFor="apellido">Apellido:</label>
        <input {...register('apellido')} id="apellido"/>
      </div>
      <div>
        <label htmlFor="telefono">Teléfono:</label>
        <input {...register('telefono')} id="telefono" />
      </div>
      <div>
        <label htmlFor="correo">Correo Electrónico:</label>
        <input {...register('correo')} id="correo" type="email"/>
      </div>
      <div>
        <label htmlFor="calle">Calle:</label>
        <input {...register('calle')} id="calle" />
      </div>
      <div>
        <label htmlFor="ciudad">Ciudad:</label>
        <input {...register('ciudad')} id="ciudad" />
      </div>
      <div>
        <label htmlFor="estado">Estado:</label>
        <input {...register('estado')} id="estado"  />
      </div>
      <div>
        <label htmlFor="empresa">Empresa:</label>
        <input {...register('empresa')} id="empresa"/>
      </div>
      <div>
        <label htmlFor="cargo">Cargo:</label>
        <input {...register('cargo')} id="cargo"/>
      </div>
      <div>
        <label htmlFor="notas">Notas:</label>
        <textarea {...register('notas')} id="notas" />
      </div>
      <div>
        <label htmlFor="fechaCumpleanos">Fecha de Cumpleaños:</label>
        <input {...register('fechaCumpleanos')} id="fechaCumpleanos" type="date"/>
      </div>
      <button type="submit">Actualizar Contacto</button>
    </form>
  );
};

export default UpdateContact;
