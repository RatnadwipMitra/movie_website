import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Hearder/Header';
import Footer from './components/Footer/Footer';
import UserInterface from './components/Elements/UserInterface';
import Moviedetails from './components/Elements/Moviedetails'
import {  Route,BrowserRouter as Router, Routes } from 'react-router-dom';
import UiFrontpage from './components/Elements/UiFrontpage';
import Tvshows from './components/Elements/TVshows'
import PeopleList from './components/Elements/PeopleList';
import searchResults from './components/Elements/searchResults'
import SearchResults from './components/Elements/searchResults';

function App() {
  return (
    <div className="App">

      <Router>
      <Header/>
        <Routes>
          <Route path='/' element={<UserInterface/>}></Route>
          <Route path="/search-results" element={<SearchResults/>} />
          <Route path='/movie/:id' element={<Moviedetails/>}></Route>
          <Route path='/movies' element={<UiFrontpage/>}></Route>
          <Route path='/Tvshows' element={<Tvshows/>}></Route>
          <Route path="/Peoplelist" element={<PeopleList/>}/>
        </Routes>
        <Footer/>
      </Router>
      
      
    </div>
  );
}

export default App;
