import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import MoviesTable from './components/MoviesTable';
import MovieDetail from './components/MovieDetail';
import Episodes from './components/Episodes';
import Locations from './components/Locations';
import Vehicles from './components/Vehicles'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MoviesTable />} />
          <Route path="episodes" element={<Episodes />} />
          <Route path="locations" element={<Locations />} />
          <Route path="vehicles" element={<Vehicles />} />
          <Route path="movie/:id" element={<MovieDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
