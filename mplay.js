const play = document.querySelector(".play")
const track = document.getElementById("audio")
const volumeSlider = document.querySelector(".slider");
const currentSong = document.getElementById("cSong");
const currentArtist = document.getElementById("cArtist");
const passedTime = document.getElementById("passedTime");
const progressBox = document.getElementById("progress");
const frw = document.getElementById("frw");
const bck = document.getElementById("bck");
const songList = document.querySelectorAll("li");
const volIcon = document.getElementById("au");
const playlist = [
    { "title" : "Funkorama",     "artist" : "Kevin McLeod", "source" : "media/Funkorama.mp3"},
    { "title" : "Cheery Monday", "artist" : "Kevin McLeod", "source" : "media/cheery.mp3"},
    { "title" : "Aquarium",      "artist" : "Kevin McLeod", "source" : "media/aquarium.mp3"}
];
let x = 0;

//---Adding event listeners---//
play.addEventListener("click", playPause);
songList.forEach(el => {
    el.addEventListener("click", playthis);
});
frw.addEventListener("click", playNext);
bck.addEventListener("click", playPrev);
volumeSlider.addEventListener("mousemove",setVolume);
volIcon.addEventListener("click", muteVol);

//---Functions---//
function currentS(){
    track.src = playlist[x].source; 
    currentSong.innerHTML = playlist[x].title;
    currentArtist.innerHTML = playlist[x].artist;
    playPause();
}

function playNext(){
    x === playlist.length - 1 ? x = 0 : x++;
    currentS();
}

function playPrev(){
    x === 0 ? x = playlist.length - 1 : x--;
    currentS();
}

function playthis(e){
   let target = e.target.firstChild.data;
   for (let i = 0; i < playlist.length; i++) {
       if (target === playlist[i].title){
           currentSong.innerHTML = target;
           track.src = playlist[i].source;
           currentArtist.innerHTML = playlist[i].artist;
           playPause(); 
       } 
   }
}

function playPause (){
    
    if(track.paused){
        play.classList.toggle("change", true);
        track.play();
        }else{
        play.classList.toggle("change",false); 
        track.pause();    
        }
}

track.ontimeupdate = function updateTime(){
    let min = Math.floor((track.currentTime % 3600) / 60);
    let sec = Math.floor(track.currentTime % 60);
    
    if(sec < 10){
        sec = "0" + sec;
    }

    passedTime.innerHTML = `${min}:${sec}`;
    if(track.currentTime < track.duration){
        progressBox.style.width = Math.round((track.currentTime / track.duration)*100) +"%";
    }
}

function setVolume (){
   track.volume = volumeSlider.value / 100;
}

function muteVol(){
    if(track.muted){
        track.muted = false;
        volIcon.src = "media/audio.png";
    }else{
        track.muted = true;
        volIcon.src = "media/noau.png";
    }
}