import React, { useState } from 'react';

import './Weather.css';

const myApiKey = import.meta.env.VITE_API_KEY;
const apiCountryFlagURL = "https://flagsapi.com/";

function Weather(){

    const [city, setCity] = useState("");

    // Variáveis de seleção de elemento
    const cityElement = document.querySelector("#city");
    const tempElement = document.querySelector("#temperature span");
    const descElement = document.querySelector("#description");
    const weatherIconElement = document.querySelector("#weather-icon");
    const countryElement = document.querySelector("#country");
    const humidityElement = document.querySelector("#humidity span");
    const windElement = document.querySelector("#wind span");

    const weatherContainer = document.querySelector("#weather-data");
    const cityNotFound = document.querySelector("#city-not-found");

    const getWeatherData = async (city) => {
        const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${myApiKey}&lang=pt_br`;
    
        const res = await fetch(apiWeatherUrl);
    
        if(res.statusText === "Not Found"){
            weatherContainer.classList.add("hide");
            cityNotFound.innerHTML = "<p>Não foi possível encontrar uma condição climática para esta cidade.</p>";
            return;
        } 
        
        const data = res.json();    
        return data;
    }
    
    const showWeatherData = async (city) => {
        const data = await getWeatherData(city);
    
        cityElement.innerText = data.name;
        tempElement.innerText = parseInt(data.main.temp);
        descElement.innerText = data.weather[0].description;
        weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
        countryElement.setAttribute("src", apiCountryFlagURL + `${data.sys.country}` + "/flat/64.png");
        humidityElement.innerText = `${data.main.humidity}%`;
        windElement.innerText = `${data.wind.speed} Km/h`;
    
        weatherContainer.classList.remove("hide");
        cityNotFound.innerHTML = "";
    }
    
    // Eventos
    const handleClick = (e) => {
        e.preventDefault();
    
        const cityInput = city;
        showWeatherData(cityInput);
    }

    const handleKeyUp = (e) => {
        if(e.code ===  "Enter"){
            const city = e.target.value;
            showWeatherData(city);
            cityNotFound.innerHTML = "";
        }
    }

    return(
        <>
            <div className="container">
                <div className="form">
                    <h3>Confira o clima de uma cidade:</h3>
                    <div className="form-input-container">
                        <input type="text" placeholder="Informe a cidade" 
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            onKeyUp={(e) => handleKeyUp(e)} />
                        
                        <button id="search" onClick={(e) => handleClick(e)}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>
                </div>

                <div id="weather-data" className="hide">
                    <h2>
                        <i className="fa-solid fa-location-dot"></i>
                        <span id="city"></span>
                        <img src="" alt="Bandeira do país" id="country"/>
                    </h2>
                    <p id="temperature"><span></span>&deg;C</p>
                
                    <div id="description-container">
                        <p id="description"></p>
                        <img src="" alt="Condições do tempo" id="weather-icon" />
                    </div>

                    <div id="details-container">
                        <p id="humidity">
                            <i className="fa-solid fa-droplet"></i>
                            <span></span>
                        </p>
                        <p id="wind">
                            <i className="fa-solid fa-wind"></i>
                            <span></span>
                        </p>
                    </div>
                </div>

                <div id="city-not-found"></div>
            </div>
        </>
    )
}

export default Weather;