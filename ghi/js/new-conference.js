window.addEventListener('DOMContentLoaded', async () => {
    const url = "http://localhost:8000/api/locations/";

    const response = await fetch(url);

    if (!response.ok){
        throw new Error ("response not ok");
        
    } else {
        const data = await response.json()
        
        const selectTag = document.getElementById("location");
        for (let location of data.locations) {
            let option = document.createElement("option");

            option.value = location.id;
            option.innerHTML = location.name;

            selectTag.appendChild(option);
            console.log(location);
    }
}
    const formTag = document.getElementById('create-conference-form');
    formTag.addEventListener('submit', async event => {
      event.preventDefault();
      const formData = new FormData(formTag);
      const json = JSON.stringify(Object.fromEntries(formData));
  
      const conferenceUrl = 'http://localhost:8000/api/conferences/';
      const fetchConfig = {
      method: "post",
      body: json,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response1 = await fetch(conferenceUrl, fetchConfig);
    if (response1.ok) {
      formTag.reset();
      const newLocation = await response1.json();
     
    }
    });

    

}
)