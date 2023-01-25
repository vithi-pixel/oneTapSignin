/* global google */
import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode';
import OneTapSignIn from './components/OneTapSignIn';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <OneTapSignIn></OneTapSignIn>
      </header>
    </div>
  );
}

export default App;