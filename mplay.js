const playBtn = document.querySelector("div.play-btn"),
      audio = document.getElementById("audio"),
      volumeSlider = document.querySelector(".slider"),
      currentSong = document.getElementById("current-song"),
      currentArtist = document.getElementById("current-artist"),
      passedTime = document.getElementById("passedTime"),
      progressBox = document.getElementById("progress"),
      previousNextControls = document.querySelector("div.next-prev-controls"),
      songList = document.querySelector(".playlist"),
      volIcon = document.getElementById("vol-icon");

const playlist = [
    {
        "title": "Funkorama",
        "artist": "Kevin McLeod",
        "source": "media/Funkorama.mp3"
    },
    {
        "title": "Cheery Monday",
        "artist": "Kevin McLeod",
        "source": "media/cheery.mp3"
    },
    {
        "title": "Aquarium",
        "artist": "Kevin McLeod",
        "source": "media/aquarium.mp3"
    }
];
let x = 0;
// ---Adding event listeners---//
play.addEventListener("click", playPause);
songList.addEventListener("click", playThis);
frw.addEventListener("click", playNext);
bck.addEventListener("click", playPrev);
volumeSlider.addEventListener("mousemove", setVolume);
volIcon.addEventListener("click", muteVol);

function currentS () {
    track.src = playlist[x].source;
    currentSong.innerText = playlist[x].title;
    currentArtist.innerText = playlist[x].artist;
    playPause();
}

function playNext () {
    if (x === playlist.length - 1) {
        x = 0;
    } else {
        x++;
    }
    currentS();
}

function playPrev () {
    if (x === 0) {
        x = playlist.length - 1;
    } else {
        x--;
    }
    currentS();
}

function playThis (e) {
    const targeted = e.target.firstChild.data;
    for (let i = 0; i < playlist.length; i++) {
        if (targeted === playlist[i].title) {
            currentSong.innerText = targeted;
            track.src = playlist[i].source;
            currentArtist.innerText = playlist[i].artist;
            playPause();
        }
    }
}

function playPause () {

    if (track.paused) {
        play.classList.toggle("change", true);
        track.play();
    } else {
        play.classList.toggle("change", false);
        track.pause();
    }
}

track.ontimeupdate = updateTime;

function updateTime () {
    const min = Math.floor((track.currentTime % 3600) / 60);
    let sec = Math.floor(track.currentTime % 60);
    if (sec < 10) sec = `0${sec}`;

    passedTime.innerText = `${min}:${sec}`;

    if (track.currentTime < track.duration) {
        progressBox.style.width = Math.round((track.currentTime / track.duration) * 100) + "%";
    }
}

function setVolume () {
    track.volume = volumeSlider.value / 100;
}

function muteVol () {
    if (track.muted) {
        track.muted = false;
        volIcon.src = "media/audio.png";
    } else {
        track.muted = true;
        volIcon.src = "media/noau.png";
    }
}