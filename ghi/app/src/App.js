// import logo from './logo.svg';
import LocationForm from './LocationForm';
import './App.css';
import Nav from './nav';
import AttendeesList from './AttendeesList';
import ConferenceForm from './ConferenceForm';
import AttendeeForm from './AttendeeForm';
import PresentationForm from './PresentationForm';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import MainPage from './MainPage';

function App(props) {
  if (props.attendees === undefined){
    return null;
  }
  return (
    <BrowserRouter> 
    <Nav />

      <Routes>
        <Route index element ={<MainPage />} />
        <Route path = "locations">
          <Route path = "new" element={<LocationForm />} />
        </Route>
        <Route path = "conferences">
          <Route path = "new" element={<ConferenceForm />} />
        </Route>
        <Route path = "attendees">
          <Route path = "" element={<AttendeesList attendees = {props.attendees}/>}/>
          <Route path = "new" element ={<AttendeeForm />} />
        </Route>
        <Route> 
          <Route path = "presentations">
            <Route path = "new" element ={<PresentationForm/>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
 

  );
}

export default App;
