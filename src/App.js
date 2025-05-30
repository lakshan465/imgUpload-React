import { Route, Routes } from "react-router-dom";
import './App.css';
import Form from './component/Form';
import View from './component/View';
import Slide from './component/SlideShow'
import Slide2 from './component/HeroSection'
import Notifi from './component/TouristDashboard'
function App() {
  return (
    <Routes>
    <Route path='/' element={<View/>}/>
    <Route path='/form' element={<Form/>}/>
    <Route path='/slide' element={<Slide/>}/>
    <Route path='/slide2' element={<Slide2/>}/>
    <Route path='/notifi' element={<Notifi/>}/>



    </Routes>
    
    
    
  );
}

export default App;
