import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './components/header/Header';
import Home from './pages/home/Home';
import MovieList from './components/movielist/MovieList';
import MovieDetail from './pages/movieDetail/MovieDetail';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
            <Route index element={<Home />} />
            <Route path='movie/:id' element={<MovieDetail/>} />
            <Route path='movies/:type' element={<MovieList/> } />
            <Route path='/*' element={<h1> Error Page</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
