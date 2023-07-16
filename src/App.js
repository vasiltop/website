import Navbar from './components/Navbar/Navbar';
import Info from './components/Info/Info';
import './App.css';
import { Helmet } from 'react-helmet';

function App() {
  return (
    <body>

      <Helmet> 
        <title>Vasil Topalovic</title>
      </Helmet>
      
      <Navbar />
      <Info />
    </body>
  );
}

export default App;
