
// CSS
import './index.css';

// Components
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-grow"></div>
      <Footer />
    </div>
  );
}

export default App;
