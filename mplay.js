var play = document.querySelector(".play")
var track = document.getElementById("audio")
var volume = document.getElementsByClassName("slider");
var currentSong = document.getElementById("cSong");
var currentArtist = document.getElementById("cArtist");
var passedTime = document.getElementById("passedTime");
var progressBox = document.getElementById("progress");
var prev = document.getElementById("frw");
var next = document.getElementById("bck");
var songList = document.querySelectorAll("li");

//---Adding event listeners---//
play.addEventListener("click", playPause);
songList.forEach(el => {
    el.addEventListener("click", playthis);
});

function playthis(e){
   var target = e.target.firstChild.data;
   currentArtist.innerHTML = "Kevin McLeod";
console.log(e.target.firstChild.data)
   if(target == "Aquarium"){
        currentSong.innerHTML = target;
        track.src = "https://raw.githubusercontent.com/Max1mmus/Music-player-app/master/media/aquarium.mp3";
        playPause();
   }
   if(target == "Funkorama"){
        currentSong.innerHTML = target;
        track.src = "https://raw.githubusercontent.com/Max1mmus/Music-player-app/master/media/Funkorama.mp3";
        playPause();    
   }
   if(target == "Cheery Monday"){
        currentSong.innerHTML = target;
        track.src = "https://raw.githubusercontent.com/Max1mmus/Music-player-app/master/media/cheery.mp3";
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
    console.log(totalTime)

    if(track.currentTime < track.duration){
        progressBox.style.width = Math.round((track.currentTime / track.duration)*100) +"%"
    }
}
