function createCard(name, description, pictureUrl, starts, ends, location) {
    return `
    <div class="card shadow p-2 mb-3 bg-body rounded">
        <img src="${pictureUrl}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${location}</h6>
          <p class="card-text">${description}</p>
        </div>
        <p class="card-footer text-muted">${starts} - ${ends}</p>
      </div>
    `;
  }

function alertComponent() {
    return `<div class="alert alert-warning" role="alert">
    Uh oh, an error occurred!
  </div>
  `
}

window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conferences/';
  
    try {
      const response = await fetch(url);
    
      if (!response.ok) {
        throw new Error("response not ok");
      } else {
        const data = await response.json();
        let index = 0;
        for (let conference of data.conferences) {
          const detailUrl = `http://localhost:8000${conference.href}`;
          const detailResponse = await fetch(detailUrl);
          if (detailResponse.ok) {
            const details = await detailResponse.json();
            const title = details.conference.name;
            const description = details.conference.description;
            const location = details.conference.location.name;
            const starts = new Date(details.conference.starts).toLocaleDateString()
            const ends = new Date(details.conference.starts).toLocaleDateString()
            const pictureUrl = details.conference.location.picture_url;
            const html = createCard(title, description, pictureUrl, starts, ends, location);
            const column = document.querySelector(`#col-${index % 3}`);
            column.innerHTML += html;
            index +=1;
          }
        }
  
      
      }
    } catch (error) {
      console.log("error occurred");

      const newHTML = alertComponent()
      const errorOccurred = document.querySelector(".error-occurred")
      errorOccurred.innerHTML = newHTML;
    }
  
  });



//   window.addEventListener('DOMContentLoaded', async () => {

//     const url = 'http://localhost:8000/api/conferences/';
  
//     try {
//       const response = await fetch(url);
  
//       if (!response.ok) {
//         // Figure out what to do when the response is bad
//       } else {
//         const data = await response.json();
//       }
//     } catch (e) {
//       // Figure out what to do if an error is raised
//     }
  
//   });