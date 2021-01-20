const playBtn = document.querySelector("div.play-btn"),
      audio = document.getElementById("audio"),
      volumeSlider = document.querySelector(".vol-slider"),
      currentSong = document.getElementById("current-song"),
      currentArtist = document.getElementById("current-artist"),
      passedTime = document.getElementById("passedTime"),
      progressBox = document.getElementById("progress"),
      previousNextControls = document.querySelector("div.next-prev-controls"),
      songList = document.querySelector(".playlist"),
      volIcon = document.getElementById("vol-icon"),
      playlistWrapper = document.querySelector("div.playlist-wrapper"),
      dropdown = document.getElementById("dropdown-icon");

playBtn.addEventListener("click", playPause);
previousNextControls.addEventListener("click", playWhich);
volumeSlider.addEventListener("mousemove", setVolume);
volIcon.addEventListener("click", muteVol);
dropdown.addEventListener("click", toggleDropdown);
audio.ontimeupdate = updateTime;

const playlist = [];
let songPlayingIndex = 0;
let toggle = false;

class Song {
    constructor (title, artist, source) {
        this.title = title;
        this.artist = artist;
        this.source = source;
    }
}

function addNewSong (title, artist, source) {
    const songItem = new Song(title, artist, source);

    return playlist.push(songItem);
}

addNewSong("Funkorama", "Kevin McLeod", "media/Funkorama.mp3");
addNewSong("Cheery Monday", "Kevin McLeod", "media/cheery.mp3");
addNewSong("Aquarium", "Kevin McLeod", "media/aquarium.mp3");

function createSongCards () {
    for (let i = 0; i < playlist.length; i++) {
        const card = document.createElement("li");
        const artistName = document.createElement("p");
        const songName = document.createElement("p");

        card.className = "song-card";
        artistName.className = "artist";
        songName.className = "song-name";
        songList.appendChild(card);
        card.appendChild(songName);
        card.appendChild(artistName);

        songName.innerText = playlist[i].title;
        artistName.innerText = playlist[i].artist;

        card.onclick = function () {
            playSong(i);
        };
    }
}

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

function playPause () {
    audio.paused ? audio.play() : audio.pause();
    audio.paused ? playBtn.classList.toggle("change", false) : playBtn.classList.toggle("change", true);
}

function updateTime () {
    const min = Math.floor((audio.currentTime % 3600) / 60);
    let sec = Math.floor(audio.currentTime % 60);

    if (sec < 10) sec = `0${sec}`;
    passedTime.innerText = `${min}:${sec}`;
    if (audio.currentTime < audio.duration) {
        progressBox.style.width = Math.round((audio.currentTime / audio.duration) * 100) + "%";
    }
}

function setVolume () {
    audio.volume = volumeSlider.value / 100;
}

function muteVol () {
    audio.muted = !audio.muted;
    volIcon.src = changeVolIcon(audio.muted);
}

function changeVolIcon (isMuted) {
    return isMuted ? "media/mute.png" : "media/unmute.png";
}

function toggleDropdown () {
    toggle = !toggle;
    toggle ? dropdown.style = "transform: rotate(-180deg);" : dropdown.style = "transform: rotate(0deg);";
    toggle ? playlistWrapper.classList.add("show") : playlistWrapper.classList.remove("show");
}

createSongCards();

(function loadDefaultTrack () {
    audio.src = playlist[songPlayingIndex].source;
    currentSong.innerText = playlist[songPlayingIndex].title;
    currentArtist.innerText = playlist[songPlayingIndex].artist;
}());