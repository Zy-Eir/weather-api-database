const searchBarForm = document.querySelector(".search-bar-form");
const searchBar = document.querySelector(".search-bar");
const searchBarToggle = document.querySelector(".searchbar-toggle-hidden");
const displayArea = document.querySelector(".display-area");
const card = document.querySelector(".card");
const forecastArea = document.querySelector(".forecast-area");
const todaysDetailsArea = document.querySelector(".todays-details-area");


const testSearchBarForm = document.querySelector(".test-searchbar-form");
const testSearchBar = document.querySelector(".test-searchbar");


const cityList = document.querySelector(".cityList");






/*  autocomplete practice
searchBar.addEventListener("keyup", async (event) => {
  event.preventDefault(); // prevents refresh

 
  // const query = searchBar.value.toLowerCase();
  
  const cityQuery = searchBar.value;

  if(cityQuery){
      try {
        const listData = await weatherDataAutoComplete(cityQuery); //fetch(url);

        autocompleteList(listData);
      
      } 
       catch (error) {
        console.error(error);
        errorDisplay(error)
      }
  }
    else{
          errorDisplay("Please enter a city")
    }


    // 
  
 //

  
   //searchBar.value = "";
  // console.log(searchBar.value.toLowerCase());
 
  
  


 
  
});

*/





/* 
async function weatherDataAutoComplete(cityQuery){

  
  const autocompleteSearch = `https://api.weatherapi.com/v1/search.json?key=5d88cfd5846743c1b27184227240306&q=${cityQuery}` //
     response = await fetch(autocompleteSearch);
    searchBar.value =  `${cityQuery.toLowerCase()}`;

    console.log(response);

    if (!response.ok) {
      throw new Error("No results found");
    }

    // filter autocomplete
    

   return await response.json();

  
    
}  
*/

/* // autocomplete practice
function autocompleteList(listData){
  
  console.log(listData);
  cityList.textContent= "";
  
  listData.forEach((details) => { 
    const listItem = document.createElement("li");
    listItem.classList.add("listitem");
    const listCity = document.createElement("h2");
    listCity.textContent= `${details.name}`;
    const listRegion = document.createElement("h2");
    listRegion.textContent= `${details.region}`;
    const listCountry = document.createElement("h2");
    listCountry.textContent= `${details.country}`;

    listItem.append(listCity, listRegion, listCountry);
    
    cityList.append(listItem);

    
   
   
  });
 
        
    

           
            .map((cityQuery) => {
              
            
              

                return `
                            <li class="locationitem"    >
                              <h2>${cityQuery.name}, ${cityQuery.region}, ${cityQuery.country} </h2>
                            
                            </li>
                        `
              
            })
            .join('');
            cityList.innerHTML = htmlString;
          
    
}

*/


async function getWeatherData(cityQuery){

  
  const url = `https://api.weatherapi.com/v1/forecast.json?q=${cityQuery}&key=5d88cfd5846743c1b27184227240306&alerts=yes&aqi=yes&days=3` //
     response = await fetch(url);
    
    searchBar.value = `${cityQuery}`;
    
    

    console.log(response);

    if (!response.ok) {
      throw new Error("could not fetch weather data");
    }

    // filter autocomplete
    

   return await response.json();

  
    
}  




function hideSearchBar(){
  searchBar.classList.add("searchbar-hidden")
  searchBarToggle.classList.remove("searchbar-toggle-hidden") 
  searchBarToggle.classList.add("searchbar-toggle-active")
  searchBarForm.classList.add("search-bar-form-hidden")
  
} searchBarForm.addEventListener('submit', hideSearchBar)

function toggleSearchBar(){
  searchBar.classList.remove("searchbar-hidden")
  searchBarToggle.classList.remove("searchbar-toggle-active")
  searchBarToggle.classList.add("searchbar-toggle-hidden")
  searchBarForm.classList.remove("search-bar-form-hidden")
} searchBarToggle.addEventListener('click', toggleSearchBar)


searchBarForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // prevents refresh

 
   
 
  // const query = searchBar.value.toLowerCase();
  
   cityQuery = searchBar.value;

  if(cityQuery){
      try {
        const weatherData = await getWeatherData(cityQuery); //fetch(url);

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


    // 
  
 //

  
   searchBar.value = "";
  // displayArea.innerHTML = ''; // clears old search results.
  
  


 
  
});




function displayWeatherData(data){
  
    console.log(data);

 
  let {   current:  {feelslike_f,  condition: {code, icon, text}, wind_mph, humidity, uv},
            location: {name, region, localtime},
            forecast: {forecastday: [{day: {avgtemp_f,  maxtemp_f, mintemp_f, daily_chance_of_rain}, hour: {temp_f}}]}
    } = data;  
  
    forecastArea.innerHTML=''; // clears previous search results

    


    let forecastDate = document.createElement("p");
    forecastDate.classList.add("forecast-date");
 

  // Forecast-cards start
    data.forecast.forecastday.forEach((forecastdays) => { 
      
 
   

    let forecastCards = document.createElement("div");
    forecastCards.classList.add("forecast-cards");

   // date formatting start



   options = {
   
  
    weekday: 'long',
   



   // dateStyle: 'long' // note: dateStyle is a catch-all for weekday, month, day, etc. It will overide other individual styles.
    

  };
  
  let forecastFormatting = new Date(forecastdays.date);  // gets the data from date



  let forecastDate = document.createElement("p");
  forecastDate.classList.add("forecast-date");
  forecastDate.textContent = new Intl.DateTimeFormat("en-US", options).format(forecastFormatting); // 

 // console.log(forecastFormatting);


   // date formatting end

 




       


     

    
     
     
     const minmaxTemp =  document.createElement("p");
     minmaxTemp.classList.add("forecast-minmax");
     minmaxTemp.textContent =  forecastdays.day.mintemp_f.toFixed(0) + "°" +  " / " + forecastdays.day.maxtemp_f.toFixed(0) + "°";
 
     const forecastDailyRain = document.createElement("p");
     forecastDailyRain.classList.add("minmax");
     forecastDailyRain.textContent = "☔" + forecastdays.day.daily_chance_of_rain + "%";

     forecastDayIcon = document.createElement("p");
     forecastDayIcon.classList.add("forecast-icon");
     forecastDayIcon.textContent = getWeatherEmoji(code);

     rainAndIcon = document.createElement("div");
     rainAndIcon.classList.add("rain-and-weather-icon");
     forecastDailyRain.classList.add("group");

     rainAndIcon.append(forecastDailyRain, forecastDayIcon)
    
    forecastCards.append(forecastDate, rainAndIcon, minmaxTemp);

     

    forecastArea.append(forecastCards);
      
    
   
     
    });
  // Forecast-cards end




        
 

  card.style.display = "grid";

  card.textContent= "";
  

  options = {
   
  
    weekday: 'short',
    month: 'short',
    day: 'numeric'



   // dateStyle: 'long' // note: dateStyle is a catch-all for weekday, month, day, etc. It will overide other individual styles.
    

  };
  
  let currentforecastFormatting = new Date(localtime);  // gets the data from date



  let currentForecastDate = document.createElement("p");
  currentForecastDate.classList.add("current-forecast-date");
  currentForecastDate.textContent = new Intl.DateTimeFormat("en-US", options).format(currentforecastFormatting); // 

  console.log(currentforecastFormatting);
  

  
  const cityName =  document.createElement("p");
  cityName.classList.add("city-name");
  cityName.textContent = `${name}` + ", " + `${region}` ;


  const dateLocationWrapper =  document.createElement("div");
  dateLocationWrapper.classList.add("date-location-wrapper");


  dateLocationWrapper.append(cityName, currentForecastDate);


  const currentTempIconWrap = document.createElement("div");
  currentTempIconWrap.classList.add("current-temp-emoji-wrap");
 




  const cityCurrentTemp =  document.createElement("h1");
  cityCurrentTemp.classList.add("current-temp");
  cityCurrentTemp.textContent = `${avgtemp_f.toFixed(0)}°`;

  const weatherIcon =  document.createElement("p");
  weatherIcon.classList.add("weather-emoji");
  weatherIcon.textContent = getWeatherEmoji(code);
  weatherIcon.alt = "Weather Icon";

 



  currentTempIconWrap.append(cityCurrentTemp, weatherIcon);


  const minmaxTemp =  document.createElement("p");
  minmaxTemp.classList.add("minmax");
  minmaxTemp.textContent = `${mintemp_f.toFixed(0)}°` + " / " + `${maxtemp_f.toFixed(0)}°`;


  const feelsLike =  document.createElement("p");
  feelsLike.classList.add("feels-like");
  feelsLike.textContent = "Feels like " + `${feelslike_f.toFixed(0)}°`;

  
  const rainPercentage =  document.createElement("p");
  rainPercentage.classList.add("rain-percentage");
  rainPercentage.textContent = "Rain chance: " + `${daily_chance_of_rain}%`;



  const weatherDesc =  document.createElement("p");
  weatherDesc.classList.add("weather-desc");
  weatherDesc.textContent = `${text}`;

  const currentWeatherDescWrapper =  document.createElement("div");
  currentWeatherDescWrapper.classList.add("weather-lo-high");


  currentWeatherDescWrapper.append(weatherDesc, minmaxTemp, feelsLike, rainPercentage);
  

 // currentTempEmojiWrap.append(cityCurrentTemp);

 // cityExtraInfoWrap.append(cityDesc, highLow, cityFeels);

  
  card.append(dateLocationWrapper, currentTempIconWrap, currentWeatherDescWrapper);

 

  displayArea.append(card);

  todaysDetailsArea.textContent = "";

  const uspaIndex = document.createElement("p");
  uspaIndex.classList.add("uspaindex");
  uspaIndex.textContent =  "AQI: " + data.current.air_quality["us-epa-index"]; // to access data that has a hyphen in it, use dot notation.


  const windmph = document.createElement("p");
  windmph.classList.add("wind-mph");
  windmph.textContent = "Wind-Speed: " + `${wind_mph}`  + "mph";


  const uvIndex = document.createElement("p");
  uvIndex.classList.add("uv");
  uvIndex.textContent = "UV index: " + `${uv}`;



 



  const Humidity = document.createElement("p");
  Humidity.classList.add("humidity");
  Humidity.textContent = "Humidity: " + `${humidity}` + "%";



  todaysDetailsArea.append(uspaIndex, windmph, uvIndex, Humidity);

 // console.log(data.current.air_quality["us-epa-index"]); 
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



/* text example of date formatting 


const dayArr = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday']; // array we create that has the weekday names

const monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November',  'December']; // array we create that has the weekday names
     
const date = new Date("2024-4-15"); // input date 

let day = dayArr[date.getDay()]; // 
let month = monthArr[date.getMonth()]; // 
let dayNumber = date.getDate(); // 

const fullDate =  document.createElement("p");
fullDate.classList.add("huhuh");
fullDate.textContent = `${day}` + `${month}` + `${dayNumber}`;

displayArea.append(fullDate);


console.log(day + month + dayNumber);


 note: the above example is old and ineffecient, use Intl.DateTimeFormat().format()
 */

