function createCard(name, description, pictureUrl) {
    return `
      <div class="card">
        <img src="{pictureUrl}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">{name}</h5>
          <p class="card-text">{description}</p>
        </div>
      </div>
    `;
  }

window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conferences/';
  
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error("response not ok");
      } else {
        const data = await response.json();
  
        for (let conference of data.conferences) {
          const detailUrl = `http://localhost:8000${conference.href}`;
          const detailResponse = await fetch(detailUrl);
          if (detailResponse.ok) {
            const details = await detailResponse.json();
            const title = details.conference.title;
            const description = details.conference.description;
            const pictureUrl = details.conference.location.picture_url;
            const html = createCard(title, description, pictureUrl);
            console.log(html);
          }
        }
  
      }


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