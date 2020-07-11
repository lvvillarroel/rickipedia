import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import CharacterCard from "./CharacterCard";

const LocationScreen = (props) => (
  <Query query={gql`{
      location(id: ${props.match.params.locationIndex}) {
        id,
        name,
        dimension,
        type,
        residents {
          name,
          id,
          gender,
          species,
          image
        }
      }
      }`}>
    {
      ({ loading, error, data }) => {
        if (loading) return <p>Loading ...</p>;
        if (error) return <p>Error :(</p>;
        return <div>
          <h1 className="page-title text-white"> {data.location.name}</h1>
          <h5 className="page-subtitle text-white"> {data.location.type} in {data.location.dimension} </h5>
          <h3 className="text-white">Residents: </h3>
          <div className="row">
            {data.location.residents.map(res =>
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
        </div>
      }}
  </Query>
);

export default LocationScreen;
