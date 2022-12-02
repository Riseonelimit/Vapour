let weather = {

    "apiKey": "be4bdbe5d39d45448b744c9ed7c0da6b",
    fetchWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid="+this.apiKey)
            .then((response) => response.json())
            .then((data) => this.displayWeather(data))
            .catch((error) => this.error(error));
    },
    displayWeather : function(data){
            const{name} = data;
            const{main,description} = data.weather[0];
            const{temp,temp_min,temp_max,humidity} = data.main;
            const{speed} = data.wind;

            document.querySelector(".city").innerHTML = name;
            document.querySelector(".wimg").src = "/Weather/" + description + ".svg";
            document.querySelector(".desc").innerHTML = description;
            document.querySelector(".temp").innerHTML = Number(temp).toFixed(0)+"°C";
            document.querySelector(".temp_min").innerHTML = Number(temp_min).toFixed(0)+ "°C";
            document.querySelector(".temp_max").innerHTML = Number(temp_max).toFixed(0)+ "°C";
            document.querySelector(".humidity").innerHTML = humidity + "%";
            document.querySelector(".speed").innerHTML = Number(speed).toFixed(1) + "km/h";
            setTimeout(() => {
                document.querySelector(".temperature").classList.remove("loading"); 
                document.querySelector(".restinfo").classList.remove("loading");   
            }, 1000);
            document.querySelector(".search-bar").classList.remove("preloading");     
            document.querySelector(".temperature").classList.remove("transition");
            document.querySelector(".restinfo").classList.remove("transition");
    },
    search: function(){
        this.fetchWeather(document.querySelector(".search-input").value);
    },
    error: function(error){
        alert("Invalid City Name");
        console.log(error);
    }
}

document.querySelector(".search-btn").addEventListener("click",function(){
    document.querySelector(".temperature").classList.add("transition");
    document.querySelector(".restinfo").classList.add("transition");
    setTimeout(() => {
        weather.search();
    }, 500);
});
document.querySelector(".search-input").addEventListener("keyup", function(event){
    if(event.key == "Enter"){
        document.querySelector(".temperature").classList.add("transition");
        document.querySelector(".restinfo").classList.add("transition");
    setTimeout(() => {
        weather.search();
    }, 500);
    }
});

// weather.fetchWeather("London");