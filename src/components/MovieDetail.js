import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './MovieDetail.css';

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [species, setSpecies] = useState([]);
  const [locations, setLocations] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Función para obtener detalles de la película
    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await axios.get(`https://ghibliapi.vercel.app/films/${id}`);
        setMovie(movieResponse.data);

        // Obtener detalles adicionales usando las URLs proporcionadas en la API
        const characterPromises = movieResponse.data.people.map(url => axios.get(url).catch(() => null));
        const speciesPromises = movieResponse.data.species.map(url => axios.get(url).catch(() => null));
        const locationPromises = movieResponse.data.locations.map(url => axios.get(url).catch(() => null));
        const vehiclePromises = movieResponse.data.vehicles.map(url => axios.get(url).catch(() => null));

        const characterResponses = await Promise.all(characterPromises);
        const speciesResponses = await Promise.all(speciesPromises);
        const locationResponses = await Promise.all(locationPromises);
        const vehicleResponses = await Promise.all(vehiclePromises);

        setCharacters(characterResponses.filter(res => res !== null).map(res => res.data));
        setSpecies(speciesResponses.filter(res => res !== null).map(res => res.data));
        setLocations(locationResponses.filter(res => res !== null).map(res => res.data));
        setVehicles(vehicleResponses.filter(res => res !== null).map(res => res.data));

        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!movie) return <div>No se encontró la película.</div>;

  return (
    <div className="movie-detail">
      <h2>{movie.title}</h2>
      <p><strong>Director:</strong> {movie.director}</p>
      <p><strong>Descripción:</strong> {movie.description}</p>

      <div className="cards-container">
        <h3>Personajes</h3>
        <div className="cards">
          {characters.length > 0 ? characters.map((character) => (
            <div className="card" key={character.id}>
              <h4>{character.name}</h4>
              <p><strong>Género:</strong> {character.gender}</p>
              <p><strong>Edad:</strong> {character.age}</p>
            </div>
          )) : <p>No hay personajes disponibles.</p>}
        </div>

        <h3>Especies</h3>
        <div className="cards">
          {species.length > 0 ? species.map((specie) => (
            <div className="card" key={specie.id}>
              <h4>{specie.name}</h4>
              <p><strong>Clasificación:</strong> {specie.classification}</p>
            </div>
          )) : <p>No hay especies disponibles.</p>}
        </div>

        <h3>Localizaciones</h3>
        <div className="cards">
          {locations.length > 0 ? locations.map((location) => (
            <div className="card" key={location.id}>
              <h4>{location.name}</h4>
            </div>
          )) : <p>No hay localizaciones disponibles.</p>}
        </div>

        <h3>Vehículos</h3>
        <div className="cards">
          {vehicles.length > 0 ? vehicles.map((vehicle) => (
            <div className="card" key={vehicle.id}>
              <h4>{vehicle.name}</h4>
              <p><strong>Descripción:</strong> {vehicle.description}</p>
              <p><strong>Clase:</strong> {vehicle.vehicle_class}</p>
            </div>
          )) : <p>No hay vehículos disponibles.</p>}
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;