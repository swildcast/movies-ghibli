import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function MoviesTable() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('https://ghibliapi.vercel.app/films')
      .then(response => setMovies(response.data))
      .catch(error => console.error('Error fetching movies:', error));
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Título</th>
          <th>Director</th>
          <th>Año</th>
          <th>Detalles</th>
        </tr>
      </thead>
      <tbody>
        {movies.map(movie => (
          <tr key={movie.id}>
            <td>{movie.title}</td>
            <td>{movie.director}</td>
            <td>{movie.release_date}</td>
            <td>
            <div key={movie.id} className="view-details-card">
                  <Link to={`/movie/${movie.id}`} className="button-link">View Details</Link>
             </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MoviesTable;
