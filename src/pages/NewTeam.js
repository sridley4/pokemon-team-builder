import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { PageHeader, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { useFormFields } from "../libs/hooksLib";
import { onError } from "../libs/errorLib";
import config from "../config";
import "./NewTeam.css";
import { Card } from '../components/Card';
import { API } from "aws-amplify";

const Pokedex = require('pokeapi-js-wrapper');
const P = new Pokedex.Pokedex();

export default function NewTeam() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [pokemon, setPokemon] = useState([]);
  const [fields, handleFieldChange] = useFormFields({
    teamName: ""
  });

  const addMessage = (newMessage) => setPokemon(state => [...state, newMessage])

  async function handleSubmit(event) {
    event.preventDefault();


    setIsLoading(true);

    try {
      await createNote();
      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  function createNote() {
    return API.post("pokemonTeamApi", "/createteam", {
      body: {
        "teamId": fields.teamName,
        pokemon: {
          "pokemon1": pokemon[0]['name'],
          "pokemon1Picture": pokemon[0]['picture'],
          "pokemon2": pokemon[1]['name'],
          "pokemon2Picture": pokemon[1]['picture'],
          "pokemon3": pokemon[2]['name'],
          "pokemon3Picture": pokemon[2]['picture'],
          "pokemon4": pokemon[3]['name'],
          "pokemon4Picture": pokemon[3]['picture'],
          "pokemon5": pokemon[4]['name'],
          "pokemon5Picture": pokemon[4]['picture'],
          "pokemon6": pokemon[5]['name'],
          "pokemon6Picture": pokemon[5]['picture']
        }
      }
    });
  }

  async function getPokemon() {
    setPokemon([])
    for (let step = 0; step < 6; step++) {
      const num = Math.floor((Math.random() * 100) + 1).toString();
      P.resource(['/api/v2/pokemon/' + num])
        .then(function (response) {
          var singleObj = {};
          singleObj['name'] = response[0].name;
          singleObj['picture'] = response[0].sprites.front_default;
          addMessage(singleObj)
        });
    }
  }

  function renderPokemonList(pokemon) {
    return pokemon.map(pokemon => (
      <Card key={pokemon['name']} pokemon={pokemon} />
    ));
  }

  return (
    <div className="newPokemonTeam">
      <PageHeader>Pokemon Team Generator</PageHeader>
      <div className='card-list'>
        {!isLoading && renderPokemonList(pokemon)}
      </div>
      <form>
        <FormGroup controlId="teamName" bsSize="large">
          <ControlLabel>Team Name</ControlLabel>
          <FormControl
            autoFocus
            type="teamName"
            value={fields.teamName}
            onChange={handleFieldChange}
          />
        </FormGroup>
      </form>
      <Button variant="outline-primary" onClick={getPokemon}>Generate New Team</Button>
      <Button variant="outline-primary" onClick={handleSubmit}>Save Team!</Button>
    </div>
  );
}