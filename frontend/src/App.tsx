import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Welcome from './components/Welcome';
import AllEntertainers from './components/AllEntertainers';
import EntertainerDetails from './components/EntertainerDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/AllEntertainers" element={<AllEntertainers />} />
        <Route path="/Details/:id" element={<EntertainerDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
