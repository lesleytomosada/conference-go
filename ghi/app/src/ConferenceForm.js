import React from 'react'

class ConferenceForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            name:'',
            starts:'',
            ends: '',
            description:'',
            maximumPresentations:'',
            maximumAttendees: '',
            locations: []};
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleStartsChange = this.handleStartsChange.bind(this);
        this.handleEndsChange = this.handleEndsChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleMaximumPresentationsChange = this.handleMaximumPresentationsChange.bind(this);
        this.handleMaximumAttendeesChange = this.handleMaximumAttendeesChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event){
        event.preventDefault();
        const data = {...this.state};
        data.max_presentations=data.maximumPresentations;
        data.max_attendees=data.maximumAttendees;
        delete data.maximumPresentations;
        delete data.maximumAttendees;
        delete data.locations;
        console.log(data);

        const conferenceUrl = 'http://localhost:8000/api/conferences/';
        const fetchConfig = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(conferenceUrl, fetchConfig);
      if (response.ok) {
        const newConference = await response.json();
        console.log(newConference);

        const cleared = {
            name: '',
            starts: '',
            ends: '',
            description:'',
            maximumPresentations:'',
            maximumAttendees: '',
            location:'',
        };

        this.setState(cleared);
       
      }
    }
    
    handleNameChange(event){
        const value = event.target.value;
        this.setState({name:value})
    }

    handleStartsChange(event){
        const value = event.target.value;
        this.setState({starts:value})
    }
    
    handleEndsChange(event){
        const value = event.target.value;
        this.setState({ends:value})
    }

    handleDescriptionChange(event){
        const value = event.target.value;
        this.setState({description:value})
    }

    handleMaximumPresentationsChange(event){
        const value = event.target.value;
        this.setState({maximumPresentations:value})
    }

    handleMaximumAttendeesChange(event){
        const value = event.target.value;
        this.setState({maximumAttendees:value})
    }

    handleLocationChange(event){
        const value = event.target.value;
        this.setState({location:value})
    }

    async componentDidMount() {
        const url = "http://localhost:8000/api/locations/";
        const response = await fetch(url);

        if (response.ok) {
        const data = await response.json();
        this.setState({locations: data.locations})


    }
    }
    
    render () {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new conference</h1>
            <form onSubmit={this.handleSubmit} id="create-conference-form">
              <div className="form-floating mb-3">
                <input onChange = {this.handleNameChange} placeholder="Name" required type="text" name="name" id="name" className="form-control" value={this.state.name}/>
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange = {this.handleStartsChange} placeholder="Starts" required type="datetime-local" name="starts" id="starts" className="form-control" value={this.state.starts}/>
                <label htmlFor="starts">Starts</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange = {this.handleEndsChange} placeholder="Ends" required type="datetime-local" name="ends" id="ends" className="form-control" value={this.state.ends}/>
                <label htmlFor="ends">Ends</label>
              </div>
              <div className="mb-3">
                <label htmlFor="description">  Description</label>
                <textarea onChange = {this.handleDescriptionChange} className="form-control" id="description" rows="3" value = {this.state.description}></textarea>
              </div>
              <div className="form-floating mb-3">
                <input onChange = {this.handleMaximumPresentationsChange} placeholder="Max Presentations" required type="number" name="max_presentations" id="max_presentations" className="form-control" value={this.state.maximumPresentations}/>
                <label htmlFor="max_presentations">Maximum Presentations</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange = {this.handleMaximumAttendeesChange} placeholder="Max Attendees" required type="number" name="max_attendees" id="max_attendees" className="form-control" value = {this.state.maximumAttendees}/>
                <label htmlFor="max_attendees">Maximum Attendees</label>
              </div>
              <div className="mb-3">
                <select onChange = {this.handleLocationChange} required id="location" name="location" className="form-select" value = {this.state.location}>
                  <option value="">Choose a location</option>
                  {this.state.locations.map(location => {
                    return(
                        <option key = {location.id} value={location.id}>
                            {location.name}
                        </option>
                    )
                  })}
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    )
}
}

export default ConferenceForm;