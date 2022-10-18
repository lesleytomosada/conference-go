// import logo from './logo.svg';
import LocationForm from './LocationForm';
import './App.css';
import Nav from './nav';
import AttendeesList from './AttendeesList';
import ConferenceForm from './ConferenceForm';
import AttendeeForm from './AttendeeForm';

function App(props) {
  if (props.attendees === undefined){
    return null;
  }
  return (
    <><Nav />
    <div className="container"></div>
    {/* <LocationForm /> */}
    {/* <AttendeesList attendees = {props.attendees}/> */}
    {/* <ConferenceForm/> */}
    <AttendeeForm/>
    </>
  );
}

export default App;
