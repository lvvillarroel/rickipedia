import React, { Component } from 'react';
import fetchInfo from '../apirequest';

import CharacterCard from "./CharacterCard";

export default class LocationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      residents: [],
      locationIndex: '',
    };
  }

  async componentDidMount() {
    const { locationIndex } = this.props.match.params;
    const location = await fetchInfo(`https://rickandmortyapi.com/api/location/${locationIndex}`);
    location.residents.forEach(async residentPath => {
      let r = await fetchInfo(residentPath);
      this.setState({ residents: [...this.state.residents, r] });
    });
    this.setState({ locationIndex, location });
  }


  render() {
    return (
      <div>
        {this.state.location ?
          <div>
            <h1 className="page-title text-white"> {this.state.location.name}</h1>
            <h5 className="page-subtitle text-white"> {this.state.location.type} in {this.state.location.dimension} </h5>
            <h3 className="text-white">Residents: </h3>
            <div className="row">
              {this.state.residents.map(res =>
                <CharacterCard
                  key={res.id}
                  charIndex={res.id}
                  name={res.name}
                  gender={res.gender}
                  species={res.species}
                  imageUrl={res.image}
                />
              )}
            </div>
          </div> :
          <h1 className=".page-title text-white"> Cargando ... </h1>}
      </div>
    )
  }
}
