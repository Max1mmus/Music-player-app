var play = document.querySelector(".play")
var track = document.getElementById("audio")
var volume = document.getElementsByClassName("slider");
var currentSong = document.getElementById("cSong");
var currentArtist = document.getElementById("cArtist");
var passedTime = document.getElementById("passedTime");
var progressBox = document.getElementById("progress");
var frw = document.getElementById("frw");
var bck = document.getElementById("bck");
var songList = document.querySelectorAll("li");
var playlist = [ { "title" : "Funkorama",     "artist" : "Kevin McLeod", "source" : "https://raw.githubusercontent.com/Max1mmus/Music-player-app/master/media/Funkorama.mp3"},
                 { "title" : "Cheery Monday", "artist" : "Kevin McLeod", "source" : "https://raw.githubusercontent.com/Max1mmus/Music-player-app/master/media/cheery.mp3"},
                 { "title" : "Aquarium",      "artist" : "Kevin McLeod", "source" : "https://raw.githubusercontent.com/Max1mmus/Music-player-app/master/media/aquarium.mp3"}];
var x = 0;

//---Adding event listeners---//
play.addEventListener("click", playPause);
songList.forEach(el => {
    el.addEventListener("click", playthis);
});
frw.addEventListener("click", playNext);
bck.addEventListener("click", playPrev);

//---Functions---//
function playNext(){
    if(x === playlist.length - 1){
        x = 0;
    }else{
        x++;
    }
    track.src = playlist[x].source; 
    currentSong.innerHTML = playlist[x].title;
    currentArtist.innerHTML = playlist[x].artist;
    playPause();
}

function playPrev(){
    if(x === 0 ){
        x = playlist.length - 1;
    }else{
        x--;
    }
    track.src = playlist[x].source; 
    currentSong.innerHTML = playlist[x].title;
    currentArtist.innerHTML = playlist[x].artist;
    playPause();
}

function playthis(e){
   var target = e.target.firstChild.data;
   currentArtist.innerHTML = playlist[0].artist;

   if(target == "Funkorama"){
        currentSong.innerHTML = target;
        track.src = playlist[0].source;
        playPause();    
   }
   if(target == "Cheery Monday"){
        currentSong.innerHTML = target;
        track.src = playlist[1].source;
        playPause();     
   }
   if(target == "Aquarium"){
        currentSong.innerHTML = target;
        track.src = playlist[2].source;
        playPause();
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

track.onloadedmetadata = function() {
    console.log(track.duration)
};

track.ontimeupdate = function updateTime(){
    var min = Math.floor((track.currentTime % 3600) / 60);
    var sec = Math.floor(track.currentTime % 60);
    
    if(sec<10){
        sec = "0" + sec
    }

    var totalTime = min + ":" + sec;
    passedTime.innerHTML = totalTime;
    
    if(track.currentTime < track.duration){
        progressBox.style.width = Math.round((track.currentTime / track.duration)*100) +"%"
    }
}

