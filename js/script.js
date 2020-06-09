class Hero {
  constructor(name, intelligence, strength, speed, durability, power, combat, image) {
    this.name = name;
    this.intelligence = intelligence === "null" ? 0 : intelligence;
    this.strength = strength === "null" ? 0 : strength;
    this.speed = speed === "null" ? 0 : speed;
    this.durability = durability === "null" ? 0 : durability;
    this.power = power === "null" ? 0 : power;
    this.combat = combat === "null" ? 0 : combat;
    this.image = image;
    this.total = parseInt(intelligence) + parseInt(strength) + parseInt(speed) + parseInt(durability) + parseInt(power) + parseInt(combat);
  }
}

let BASE_URL = 'https://www.superheroapi.com/api.php/';
let API_KEY = '2694631317310263';

function getJSON(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'json';
  xhr.onload = function () {
    let status = xhr.status;
    if (status === 200){
      callback(status, xhr.response);
    }else{
      console.log('ERRO:' + status);
    }
  }
  xhr.send();
}

function getHero(id, currentHero) {
  let url = BASE_URL + API_KEY + "/" + id;
  getJSON(url,function (status, data){
    var hero = new Hero(
      data.name,
      data.powerstats.intelligence,
      data.powerstats.strength,
      data.powerstats.speed,
      data.powerstats.durability,
      data.powerstats.power,
      data.powerstats.combat,
      data.image.url);
      document.getElementById("heroes").innerHTML +=
      "<article>" +
        "<img src='" + hero.image + "'/>" +
        "<h1>" + hero.name + "</h1><button onclick='getAnotherHero("+JSON.stringify(hero)+")'>Choose this one</button>" +
        "<p>Intelligence</p><div style='width: " + hero.intelligence + "%; background-color: #426ff5' ></div>" +
        "<p>Strength</p><div style='width: " + hero.strength + "%; background-color: #f2f542' ></div>" +
        "<p>Speed</p><div style='width: " + hero.speed + "%; background-color: #8b3df2' ></div>" +
        "<p>Durability</p><div style='width: " + hero.durability + "%; background-color: #b4ccd4' ></div>" +
        "<p>Power</p><div style='width: " + hero.power + "%; background-color: #d1250a' ></div>" +
        "<p>Combat</p><div style='width: " + hero.combat + "%; background-color: #33cc08' ></div>" +
      "</article>";

      if (currentHero.total > hero.total){
        alert(`${currentHero.name} won this turn!`);
      }else if (currentHero.total < hero.total){
        alert(`${hero.name} won this turn!`);
      }else{
        alert("Draw! Play again");
      }
  });

}

window.onload = function(){
  getHero(getRandom(1, 731));
  getHero(getRandom(1, 731));
  getHero(getRandom(1, 731));
}

function getAnotherHero(currentHero) {
  getHero(getRandom(1, 731), currentHero);
}

function getRandom(min, max) {
  return Math.floor(Math.random() * Math.floor(max));
}

