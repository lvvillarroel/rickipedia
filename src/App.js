import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// ojo puede ser HashRouter o BrowserRouter verlo en el deploy

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import NavBar from './components/NavBar';
import HomeScreen from "./components/HomeScreen";
import EpisodeScreen from "./components/EpisodeScreen";
import LocationScreen from "./components/LocationScreen";
import CharacterScreen from "./components/CharacterScreen";
import SearchScreen from './components/SearchScreen';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={HomeScreen} />
            <Route exact path="/episode/:episodeIndex/" component={EpisodeScreen} />
            <Route exact path="/location/:locationIndex/" component={LocationScreen} />
            <Route exact path="/character/:characterIndex/" component={CharacterScreen} />
            <Route exact path="/search/" component={SearchScreen} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
