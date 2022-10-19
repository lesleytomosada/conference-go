constructor(props){
    super(props)
    this.state = {
        presenterName:'',
        presenterEmail:'',
        companyName: '',
        title:'',
        synposis:'',
        conferences: []};
    this.handlePresenterNameChange = this.handlePresenterNameChange.bind(this);
    this.handlePresenterEmailChange = this.handlePresenterEmailChange.bind(this);
    this.handleCompanyNameChange = this.handleCompanyNameChange(this);
    this.handleTitleChange= this.handleTitleChange.bind(this);
    this.handleSynposisChange = this.handleSynposisChange.bind(this);
    this.handleConferenceChange=this.handleConferenceChange.bind(this);

}

async handleSubmit(event){
    event.preventDefault();
    const data = {...this.state};
    data.presenter_name=data.presenterName;
    data.presenter_email=data.presenterEmail;
    data.company_name=data.companyName;
    delete data.presenterName;
    delete data.presenterEmail;
    delete data.companyName;
    console.log(data);
    const selectTag = document.getElementById('conference')
    const conferenceId = selectTag.options[selectTag.selectedIndex].value;
    const presentationUrl = `http://localhost:8000/api/conferences/${conferenceId}/presentations/`;
    const fetchConfig = {
    method: "post",
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const response = await fetch(presentationUrl, fetchConfig);
  if (response.ok) {
    const newPresentation = await response.json();
    console.log(newPresentation);

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

handlePresenterNameChange(event){
    const value = event.target.value;
    this.setState({presenterName:value})
}

handlePresenterEmailChange(event){
    const value = event.target.value;
    this.setState({presenterEmail:value})
}

handleCompanyNameChange(event){
    const value = event.target.value;
    this.setState({companyName:value})
}

handleTitleChange(event){
    const value = event.target.value;
    this.setState({title:value})
}

handleSynposisChange(event){
    const value = event.target.value;
    this.setState({synopsis:value})
}

handleConferenceChange(event){
    const value = event.target.value;
    this.setState({location:value})
}

async componentDidMount() {
    const selectTag = document.getElementById('conference')
    const conferenceId = selectTag.options[selectTag.selectedIndex].value;
    const url = `http://localhost:8000/api/conferences/${conferenceId}/presentations/`
    const response = await fetch(url);

    if (response.ok) {
    const data = await response.json();
    this.setState({conferences: data.conferences})


}
}

render () {
return (
    <div class="container">
    <div class="row">
      <div class="offset-3 col-6">
        <div class="shadow p-4 mt-4">
          <h1>Create a new presentation</h1>
          <form id="create-presentation-form">
            <div class="form-floating mb-3">
              <input placeholder="Presenter name" required type="text" name="presenter_name" id="presenter_name" class="form-control"/>
              <label for="presenter_name">Presenter name</label>
            </div>
            <div class="form-floating mb-3">
              <input placeholder="Presenter email" required type="email" name="presenter_email" id="presenter_email" class="form-control"/>
              <label for="presenter_email">Presenter email</label>
            </div>
            <div class="form-floating mb-3">
              <input placeholder="Company name" type="text" name="company_name" id="company_name" class="form-control"/>
              <label for="company_name">Company name</label>
            </div>
            <div class="form-floating mb-3">
              <input placeholder="Title" required type="text" name="title" id="title" class="form-control"/>
              <label for="title">Title</label>
            </div>
            <div class="mb-3">
              <label for="synopsis">Synopsis</label>
              <textarea class="form-control" id="synopsis" rows="3" name="synopsis" class="form-control"></textarea>
            </div>
            <div class="mb-3">
              <select required name="conference" id="conference" class="form-select">
                <option selected value="">Choose a conference</option>
              </select>
            </div>
            <button class="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  </div>
)
}