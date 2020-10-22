import React from 'react';

import './Card.css';

export const Card = props => (
  <div className='card-container'>
    <img
      src={props.pokemon['picture']}
    />
    <h2> {props.pokemon['name']} </h2>
  </div>
);