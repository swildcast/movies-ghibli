import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Vehicles() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    axios.get('https://ghibliapi.vercel.app/vehicles')
      .then(response => setVehicles(response.data))
      .catch(error => console.error('Error fetching vehicles:', error));
  }, []);

  return (
    <div className='vehicles'>
      <h2>Vehículos</h2>
      <ul>
        {vehicles.map(vehicle => (
          <li key={vehicle.id}>
            <strong>{vehicle.name}</strong>: {vehicle.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Vehicles;
