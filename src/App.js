import { useEffect, useState } from 'react';

// CSS
import './index.css';

// Components
import Footer from './components/Footer';
import Header from './components/Header';
import Collection from './components/Collection';


function App() {
  const [ movies, setMovies ] = useState([])

  useEffect(() => {
    fetch("http://localhost:3000/movies")
      .then(resp => resp.json())
      .then(data => setMovies(data))
  }, [])
  
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="grow">
        <Collection movies={movies} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
