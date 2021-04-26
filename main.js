const button = document.querySelector("#search");

button.addEventListener("click", function () {
  const address = document.querySelector("#address");
  const apiKey = document.querySelector("#api-key");
  const norad = document.querySelector("#norad");
// First API Request
  let URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address.value}.json?access_token=${apiKey.value}`;
  const encodedURL = encodeURI(URL);
  fetch(encodedURL)
    .then((rawResponse) => rawResponse.json())
    .then((dataFromAPI) => {
      let longitude = dataFromAPI.features[0].center[0];
      let latitude = dataFromAPI.features[0].center[1];
      let name = dataFromAPI.features[0].place_name;

      const spaceURL = `https://satellites.fly.dev/passes/${norad.value}?lat=${latitude}&lon=${longitude}3&limit=1&days=15&visible_only=true`;
      const encodedURL = encodeURI(spaceURL);
// Second API Request
      fetch(encodedURL)
        .then((rawResponse) => rawResponse.json())
        .then((dataFromAPI) => {
          const culmination = dataFromAPI[0].culmination.utc_datetime;
          const rise = dataFromAPI[0].rise.utc_datetime;
          const set = dataFromAPI[0].set.utc_datetime;
// Set Up Display
          const display = document.querySelector("#input");
          const body = () => {
            let html = `
                <div class="section">
                    <div id="name"><h2>Location 📍 ${name}</h2></div>
                    <br>
                    <div id="culmination"><b>Culmination:</b>  ${culmination}</div>
                    <br>
                    <div id="rise"><b>Rise:</b>  ${rise}</div>
                    <br>
                    <div id="set"><b>Set:</b>  ${set}</div>
                    <br>
                    </div>
                </div>`;
            // display.innerHTML += html;
            // Multiple Display
            display.innerHTML = html;
            // Single Display
          };
          body();
        });
    });
});

