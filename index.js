function getData(){
    let city = document.getElementById("query").value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1432a99332d0586375a99b7ca6aa83c1`;

    async function x(){
        try{
            let res = await fetch(url);
            let data = await res.json();
            console.log(data)
            append(data);
        }catch(err){
            console.log(err);
        }
    }
    x()
}

function append(data){
    let url = `https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`
    let container = document.getElementById("container");
    let div = document.createElement("div");
    container.innerHTML="";

    let h2 = document.createElement("h2");
    h2.innerText= data.name;

    let temp= document.createElement("p");
    temp.innerText = `Temperature:- ${data.main.temp} Kelvin`;

    let min_temp = document.createElement("p");
    min_temp.innerText=`Min Temperature:- ${data.main.temp_min} Kelvin`;

    let max_temp = document.createElement("p");
    max_temp.innerText=`Max Temperature:- ${data.main.temp_max} Kelvin`;

    let wind = document.createElement("p");
    wind.innerText=`Wind:- ${data.wind.speed}`;

    let sunrise = document.createElement("p");
    sunrise.innerText=`Sunrise:- ${data.sys.sunrise}`;

    let sunset = document.createElement("p");
    sunset.innerText=`Sunrise:- ${data.sys.sunrise}`;

    div.append(h2,temp,min_temp,max_temp,wind,sunrise,sunset);
    container.append(div);

    let iframe = document.getElementById("gmap_canvas");
    iframe.src= url;
}

function getLocation(){
    navigator.geolocation.getCurrentPosition(success);

    function success(pos){
        const crd = pos.coords;

        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
        getWeatherOnLocation(crd.latitude,crd.longitude)
    }
}



function getWeatherOnLocation(lat,lon){

    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=0a64f157ba747c13dfa39f2cf39f62a8`

    // fetch(url)
    // .then(function(res){
    //     return res.json();
    // })
    // .then(function(res){
    //     console.log(res)
    // })

    async function prom(){
        try{
            let res = await fetch(url);
            // console.log(res);
            let data = await res.json();
            append(data)
            console.log(data)
        }catch(err){
            console.log(err);
        }
    }
    prom();
}

