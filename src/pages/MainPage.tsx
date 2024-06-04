// ./src/pages/MainPage.
import React from 'react';
import { Link } from 'react-router-dom';
import ContactForm from '../components/AddContact';
// import Contact from './Contacts';

const MainPage: React.FC = () => {
  return (
    <div>
      <h1>Main Page</h1>
      <div>
        <Link to="/page1">
          <h1>Crear Nuevo Contacto</h1>
            <ContactForm />
        </Link>
      </div>
      <div>
        <Link to="/page2">
          <button> Go To Contact Page</button>
        </Link>
      </div>
    </div>
  );
};

export default MainPage;
