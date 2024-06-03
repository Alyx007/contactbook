import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

// Function to fetch all contacts from Flask backend
const fetchContacts = async () => {
    try {
        const response = await axios.get('/api/contacts');
        console.log(response.data); // Handle the response data accordingly
    } catch (error) {
        console.error('Error fetching contacts:', error);
    }
};

// Function to create a new contact in Flask backend
const createContact = async (newContactData: any) => {
    try {
        const response = await axios.post('/api/contacts', newContactData);
        console.log(response.data); // Handle the response data accordingly
    } catch (error) {
        console.error('Error creating contact:', error);
    }
};

// Function to update an existing contact in Flask backend
const updateContact = async (contactId: number, updatedContactData: any) => {
    try {
        const response = await axios.patch(`/api/contacts/${contactId}`, updatedContactData);
        console.log(response.data); // Handle the response data accordingly
    } catch (error) {
        console.error('Error updating contact:', error);
    }
};

// Function to delete a contact from Flask backend
const deleteContact = async (contactId: number) => {
    try {
        const response = await axios.delete(`/api/contacts/${contactId}`);
        console.log(response.data); // Handle the response data accordingly
    } catch (error) {
        console.error('Error deleting contact:', error);
    }
};


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
