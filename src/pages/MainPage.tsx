import React from 'react';
import { Link } from 'react-router-dom';
import ContactForm from '../components/AddContact';
import ReturnContact from '../components/ReturnContact';
import './main.css'; // Import the updated CSS

const MainPage: React.FC = () => {
  return (
    <div className="container">
      <h1>Contactbook</h1>
      <div className='content'>
        <div>
            <h2>Crear Nuevo Contacto</h2>
              <ContactForm />
        </div>
        <div>
              <ReturnContact />
        </div>
      </div>
      <div>
        <Link to="/page">
          <button> Go To Contact Page</button>
        </Link>
      </div>
    </div>
  );
};

export default MainPage;
