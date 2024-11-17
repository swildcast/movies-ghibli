import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Episodes() {
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    axios.get('https://ghibliapi.vercel.app/films')
      .then(response => setEpisodes(response.data))
      .catch(error => console.error('Error fetching episodes:', error));
  }, []);

  return (
    <div className='episodes'>
      <h2>Episodios</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Director</th>
            <th>Release Date</th>
          </tr>
        </thead>
        <tbody>
          {episodes.map(episode => (
            <tr key={episode.id}>
              <td>{episode.title}</td>
              <td>{episode.director}</td>
              <td>{episode.release_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Episodes;