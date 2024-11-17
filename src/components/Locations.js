import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Locations() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    axios.get('https://ghibliapi.vercel.app/locations')
      .then(response => setLocations(response.data))
      .catch(error => console.error('Error fetching locations:', error));
  }, []);

  return (
    <div className='locacion'>
      <h2>Locaciones</h2>
      <ul>
        {locations.map(location => (
          <li key={location.id}>{location.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Locations;