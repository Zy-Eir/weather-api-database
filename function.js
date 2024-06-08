const searchBarForm = document.querySelector(".search-bar-form");
const searchBar = document.querySelector(".search-bar");
const displayArea = document.querySelector(".display-area");
const card = document.querySelector(".card");






searchBarForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // prevents refresh
  
 
  // const query = searchBar.value.toLowerCase();
  
  const city = searchBar.value;

  if(city){
      try {
        const weatherData = await getWeatherData(city); //fetch(url);
        displayWeatherData(weatherData);
      } 
       catch (error) {
        console.error(error);
        errorDisplay(error)
      }
  }
    else{
          errorDisplay("Please enter a city")
    }
  
  
  searchBar.value = "";
  // displayArea.innerHTML = ''; // clears old search results.
  
  
 
  
});




 async function getWeatherData(city){
 // this for 3-day forecast const url = `http://api.weatherapi.com/v1/forecast.json?q=${city}&key=5d88cfd5846743c1b27184227240306&days=3` // make sure to add https://
  
  
  const url = `http://api.weatherapi.com/v1/forecast.json?q=${city}&key=5d88cfd5846743c1b27184227240306&days=3` //
    const response = await fetch(url);
    searchBar.value =  `${city}`;
    console.log(response);

    if (!response.ok) {
      throw new Error("could not fetch weather data");
    }

    return await response.json();
  
}  

function displayWeatherData(data){
  
  console.log(data);



  let { current:  {feelslike_f, condition: {code, icon, text}},
          location: {name, region},
          forecast: {forecastday: [{day: {avgtemp_f, maxtemp_f, mintemp_f, daily_chance_of_rain}, hour: {temp_f}}]}
        } = data; 
  
       

  /*  this is for 3 day forecast functionality

  const {location: {name},
         forecast:  {forecastday: [{day: {avgtemp_f}}]}
        } = data; 

 
 */
  
        
 

  card.style.display = "grid";

  card.textContent= "";
  
  
  const cityName =  document.createElement("h1");
  cityName.classList.add("city-name");
  cityName.textContent = `${name}` + ", " + `${region}` ;



  const currentTempIconWrap = document.createElement("div");
  currentTempIconWrap.classList.add("current-temp-emoji-wrap");
 




  const cityCurrentTemp =  document.createElement("h1");
  cityCurrentTemp.classList.add("current-temp");
  cityCurrentTemp.textContent = `${avgtemp_f.toFixed(0)}°F`;

  const weatherIcon =  document.createElement("p");
  weatherIcon.classList.add("weather-emoji");
  weatherIcon.textContent = getWeatherEmoji(code);
  weatherIcon.alt = "Weather Icon";

 



  currentTempIconWrap.append(cityCurrentTemp, weatherIcon);


  const minmaxTemp =  document.createElement("p");
  minmaxTemp.classList.add("minmax");
  minmaxTemp.textContent = `${mintemp_f.toFixed(0)}°F` + " / " + `${maxtemp_f.toFixed(0)}°F`;


  const feelsLike =  document.createElement("p");
  feelsLike.classList.add("feels-like");
  feelsLike.textContent = `${feelslike_f.toFixed(0)}°F`;

  
  const rainPercentage =  document.createElement("p");
  rainPercentage.classList.add("rain-percentage");
  rainPercentage.textContent = "Rain chance: " +`${daily_chance_of_rain}%`;


  const weatherDesc =  document.createElement("p");
  weatherDesc.classList.add("weather-desc");
  weatherDesc.textContent = `${text}`;

  const currentWeatherDescWrapper =  document.createElement("div");
  currentWeatherDescWrapper.classList.add("feels-like-wrap");
  currentWeatherDescWrapper.append(weatherDesc, minmaxTemp, feelsLike);
  

 // currentTempEmojiWrap.append(cityCurrentTemp);

 // cityExtraInfoWrap.append(cityDesc, highLow, cityFeels);

  
  card.append( cityName, currentTempIconWrap, currentWeatherDescWrapper, rainPercentage);

 

  displayArea.append(card);



  
}

function getWeatherEmoji(code){
 
  switch(true) {
    case(code === 1000):
      return "☀️" ;
    case(code >= 1003 && code < 1010):
      return "🌫️" ;
    case(code === 1030 && 1135 && 1147):
      return "🌫️  misty" ;
    case(code === 1063 && 1150 && 1153 && 1168 && 1171 && 1180 && 1183 && 1186 && 1189 && 1192 && 1195 && 1198 && 1201 && 1240 && 1243 && 1246):
      return "rain" ;
    case(code === 1066 && 1069 && 1072 && 1114 && 1117 && 1147 && 1204 && 1207 && 1210 && 1213 && 1216 && 1219 && 1222 && 1225 && 1237 && 1249 && 1252 && 1255 && 1258 && 1261 && 1264 && 1279 && 1282):
      return "❄️" ;
    case(code === 800):
      return "☀️" ;
    case(code >= 801 && code < 804):
      return "⛅" ;
    default:
      return "?";
  }
}
 

function errorDisplay(message){
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;

  card.textContent = ""; // removes any prior results, if there were before

  card.appendChild(errorDisplay);
  card.style.display = "block";

 
 
}






