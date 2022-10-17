window.addEventListener('DOMContentLoaded', async () => {
    const url = "http://localhost:8000/api/states/";

    const response = await fetch(url);

    if (!response.ok){
        throw new Error ("response not ok");
        
    } else {
        const data = await response.json()
        
        const selectTag = document.getElementById("state");
        for (let state of data.states) {
            let option = document.createElement("option");

            option.value = state.abbreviation;
            option.innerHTML = state.name;

            selectTag.appendChild(option);
            console.log(state);
    }
}
    const formTag = document.getElementById('create-location-form');
    formTag.addEventListener('submit', async event => {
      event.preventDefault();
      const formData = new FormData(formTag);
      const json = JSON.stringify(Object.fromEntries(formData));
  
    const locationUrl = 'http://localhost:8000/api/locations/';
    const fetchConfig = {
      method: "post",
      body: json.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response1 = await fetch(locationUrl, fetchConfig);
    if (response1.ok) {
      formTag.reset();
      const newLocation = await response1.json();
      console.log(newLocation);
    }
    });

    

}
)

