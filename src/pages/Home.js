import React, { useState, useEffect } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import "./Home.css";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";



export default function Home() {
  const [teams, setTeams] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }
  
      try {
        const teams = await loadTeams();
        setTeams(teams);
      } catch (e) {
        onError(e);
      }
  
      setIsLoading(false);
    }
  
    onLoad();
  }, [isAuthenticated]);
  
  function loadTeams() {
    return API.get("pokemonTeamApi", "/teams");
  }
  

  function renderTeamsList(pokemonList) {
    return [{}].concat(pokemonList).map((pokemonElement, i) =>
      i !== 0 ? (
          <ListGroupItem header={pokemonElement.teamId}>
            {"Created: " + new Date(pokemonElement.createdAt).toLocaleString()}
            <img src={pokemonElement.pokemon1Picture}></img>
            <img src={pokemonElement.pokemon2Picture}></img>
            <img src={pokemonElement.pokemon3Picture}></img>
            <img src={pokemonElement.pokemon4Picture}></img>
            <img src={pokemonElement.pokemon5Picture}></img>
            <img src={pokemonElement.pokemon6Picture}></img>
          </ListGroupItem>
      ) : (
        <LinkContainer key="new" to="/teams/new">
          <ListGroupItem>
            <h4>
              <b>{"\uFF0B"}</b> Create a new Team!
            </h4>
          </ListGroupItem>
        </LinkContainer>
      )
    );
  }  

  function renderLander() {
    return (
      <div className="lander">
        <h1>Pokemon Team Builder</h1>
        <p>A pokemon team generator app</p>
      </div>
    );
  }

  function renderTeams() {
    return (
      <div className="teams">
        <PageHeader>Your Teams</PageHeader>
        <ListGroup>
          {!isLoading && renderTeamsList(teams)}
        </ListGroup>
      </div>
    );
  }

  return (
    <div className="Home">
      {isAuthenticated ? renderTeams() : renderLander()}
    </div>
  );
}
