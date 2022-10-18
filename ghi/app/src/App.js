// import logo from './logo.svg';
import LocationForm from './LocationForm';
import './App.css';
import Nav from './nav';
import AttendeesList from './AttendeesList';
import ConferenceForm from './ConferenceForm';

function App(props) {
  if (props.attendees === undefined){
    return null;
  }
  return (
    <><Nav />
    <div className="container"></div>
    {/* <LocationForm /> */}
    {/* <AttendeesList attendees = {props.attendees}/> */}
    <ConferenceForm/>
    </>
  );
}

export default App;
