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

function playSong (songIndex) {
    audio.src = playlist[songIndex].source;
    currentSong.innerText = playlist[songIndex].title;
    currentArtist.innerText = playlist[songIndex].artist;
    songPlayingIndex = songIndex;
    playPause();
}

function playNext () {
    if (songPlayingIndex === playlist.length - 1) {
        songPlayingIndex = 0;
    } else {
        songPlayingIndex++;
    }
    playSong(songPlayingIndex);
}

function playPrev () {
    if (songPlayingIndex === 0) {
        songPlayingIndex = playlist.length - 1;
    } else {
        songPlayingIndex--;
    }
    playSong(songPlayingIndex);
}

function playWhich (e) {
    e.target.id === "play-next" ? playNext() : playPrev();
}
    }
}

function playPause () {
    audio.paused ? audio.play() : audio.pause();
    audio.paused ? playBtn.classList.toggle("change", false) : playBtn.classList.toggle("change", true);
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