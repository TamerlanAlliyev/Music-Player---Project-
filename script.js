"use strict";

const songs = [
  {
    name: "glimpse-of-us",
    artist: "Joji",
    title: "Glimpse of Us",
    duration: "3:53",
  },
  {
    name: "fourth-of-july",
    artist: "Sufjan Stevens",
    title: "Fourth of July",
    duration: "4:38",
  },
  {
    name: "indigo-night",
    artist: "Tamino",
    title: "Indigo Night",
    duration: "4:14",
  },
  {
    name: "remembrance",
    artist: "Balmorhea",
    title: "Remembrance",
    duration: "5:59",
  },
  {
    name: "summertime-sadness",
    artist: "Lana del Rey",
    title: "Summertime Sadness",
    duration: "3:25",
  },
  {
    name: "i-know-i-am-not-the-only-one",
    artist: "Sam Smith",
    title: "I Know I'm Not The Only One",
    duration: "3:57",
  },
  {
    name: "1am-freestyle",
    artist: "Joji",
    title: "1AM FREESTYLE",
    duration: "1:53",
  },
  {
    name: "downtown",
    artist: "The Away Days",
    title: "Downtown",
    duration: "3:50",
  },
  {
    name: "home",
    artist: "Edith Whiskers; ",
    title: "Home",
    duration: "3:15",
  },
  {
    name: "i'm-a-wolf",
    artist: "Ellie Ford",
    title: "I'm a Wolf",
    duration: "3:36",
  },
  {
    name: "in-my-head",
    artist: "Bedroom",
    title: "In My Head",
    duration: "5:54",
  },
  {
    name: "young-and-beautiful",
    artist: "Lana Del Rey",
    title: "Young And Beautiful",
    duration: "3:58",
  },
  {
    name: "words-are-in-the-wood",
    artist: "Girls In Hawaii",
    title: "Words Are In the Wood",
    duration: "2:39",
  },
  {
    name: "the-same",
    artist: "Mehro",
    title: "the-same",
    duration: "3:24",
  },
  {
    name: "stellar",
    artist: "Diedlonely",
    title: "Stellar",
    duration: "1:38",
  },
  {
    name: "pope-is-a-rockstar",
    artist: "Sales",
    title: "Pope Is a Rockstar",
    duration: "3:03",
  },
  {
    name: "monks",
    artist: "The Away",
    title: "Monks",
    duration: "4:59",
  },
];

// *************** ELEMENTS ***************

const songsCount = document.querySelector(".songs-count")
const durations = document.querySelector(".songs-time")
const playList = document.querySelector(".play-list")
const playStatus = document.querySelector(".rigth-info")
const songName = document.querySelector(".song-title")
const songImages = document.querySelectorAll(".songImage");
const artistName = document.getElementById("artist-name")
const audio = document.querySelector(".play-arrow")
const goTime = document.querySelector(".go-time")
const commonTime = document.querySelector(".common-time")
const progressContainer = document.querySelector(".progress-container")
const progressBar = document.querySelector(".progress-bar")
const PlayAndPause = document.querySelector(".play-btn");
const PlayAndPauseImg = document.querySelector(".play-btn img");
const nextBtn = document.querySelector(".right-btn");
const previousBtn = document.querySelector(".left-btn");
const shuffleBtn = document.querySelector(".shuffle");
const volumeBar = document.querySelector(".arrow");
const volume = document.querySelector(".in-arrow");
const volumeIcon = document.querySelector("#volumeIcon");

// *************** CODES ***************

let index = 0;
let isPlaying = false;
let isDragging = false;
let isShuffleActive = false;
let isVolumeDragging = false;
let isMuted = false;


const displayHeaderInfo = () => {
  songsCount.textContent = `${songs.length} song`

  const allDuractions = songs.map((song) => {
    const [minute, second] = song.duration.split(":");
    const secondsTime = minute * 60 + +second
    return secondsTime;
  }).reduce((min, sec) => min + sec)

  const minute = Math.floor(allDuractions / 60);
  const second = allDuractions % 60;

  durations.textContent = `${minute}m ${second}s`
}

songs.forEach((song, index) => {
  const capitalInitial = song.name.split("-")
    .map((firstLetter) => firstLetter.charAt(0).toLocaleUpperCase() +
      firstLetter.slice(1)).join(" ");

  const listItemHTML = `<li class="sg-list" data-index="${index}">
    <div class="list-name">
        <span class="song-sort">${index + 1}</span>
        <h3 class="song-name">${capitalInitial}</h3>
    </div>
    <span class="song-time">${song.duration}</span>
  </li>`;

  playList.innerHTML += listItemHTML;
});

playList.addEventListener('click', (event) => {
  const listItem = event.target.closest('.sg-list');
  if (listItem) {
    const songNameElement = listItem.querySelector('.song-name');
    if (songNameElement) {
      const allSongNames = document.querySelectorAll('.song-name');
      allSongNames.forEach(item => {
        item.style.color = 'black';
      });

      songNameElement.style.color = 'blue';
    }

    const clickedIndex = parseInt(listItem.dataset.index);
    if (index !== clickedIndex) {
      index = clickedIndex;
      loadAndPlaySong();
      if (isPlaying) {
        audio.play();
      }
    }
  }
});

const loadAndPlaySong = () => {
  const currentSong = songs[index];


  songImages.forEach(image => {
    image.src = `./assets/images/${currentSong.name}.jpeg`
  });

  const formattedName = currentSong.name
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  songName.textContent = formattedName;

  artistName.textContent = currentSong.artist

  audio.src = `./assets/songs/${currentSong.name}.mp3`

  commonTime.textContent = currentSong.duration


}

const playning = PlayAndPause.addEventListener('click', () => {
  if (isPlaying) {
    playStatus.textContent = "Paused";
    isPlaying = false;
    audio.pause()
    PlayAndPauseImg.src = `./assets/icons/play.svg`
  } else {
    isPlaying = true;
    audio.play();
    playStatus.textContent = "Now Playing";
    PlayAndPauseImg.src = `./assets/icons/pause.svg`
  }
})

const songElements = document.querySelectorAll('.sg-list');

function removeBlueColor() {
  songElements.forEach(item => {
    item.querySelector('.song-name').style.color = 'black';
  });
}

songElements.forEach((songElement, songIndex) => {
  songElement.addEventListener('click', () => {
    removeBlueColor();
    songElement.querySelector('.song-name').style.color = 'blue';

    index = songIndex;
    loadAndPlaySong();
    if (isPlaying) {
      audio.play();
    }
  });
});

audio.addEventListener('play', () => {
  removeBlueColor();
  songElements[index].querySelector('.song-name').style.color = 'blue';
});

function setCurrentSongAsBlue() {
  removeBlueColor();
  songElements[index].querySelector('.song-name').style.color = 'blue';
}

nextBtn.addEventListener("click", () => {
  if (index < songs.length - 1) {
    index++;
  } else {
    index = 0;
  }
  shuffleIfNeeded();
});

previousBtn.addEventListener("click", () => {
  if (index > 0) {
    index--;
  } else {
    index = songs.length - 1;
  }
  shuffleIfNeeded();
});

shuffleBtn.addEventListener("click", () => {
  isShuffleActive = !isShuffleActive;
  shuffleIfNeeded();
});

const shuffleIfNeeded = () => {
  if (isShuffleActive) {
    const randomIndex = Math.floor(Math.random() * songs.length);
    index = randomIndex;
    shuffleBtn.classList.add("active");
  } else {
    shuffleBtn.classList.remove("active");
  }

  loadAndPlaySong();
  setCurrentSongAsBlue();
  if (isPlaying) {
    audio.play();
  }
};

audio.addEventListener("timeupdate", () => {
  const time = audio.currentTime;
  const duration = audio.duration;
  const minute = Math.floor(time / 60);
  const second = Math.floor(time % 60);
  goTime.textContent = `${minute}:${String(second).padStart(2, '0')}`;
  progressBar.style.width = `${(time / duration) * 100}%`;

  if (time >= duration) {
    if (index < songs.length - 1) {
      index++;
      loadAndPlaySong();
      if (isPlaying) {
        audio.play();
      }
    } else {
      isPlaying = false;
      audio.pause();
      PlayAndPauseImg.src = `./assets/icons/play.svg`;
      playStatus.textContent = "Paused";
    }
  }
});

progressContainer.addEventListener("mousedown", (event) => {
  isDragging = true;
  updateProgress(event);
});

document.addEventListener("mousemove", (event) => {
  if (isDragging) {
    updateProgress(event);
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});

function updateProgress(event) {
  if (isDragging) {
    const clickedWidth = event.offsetX;
    const totalWidth = progressContainer.clientWidth;
    audio.currentTime = (clickedWidth / totalWidth) * audio.duration;
    progressBar.style.width = `${(clickedWidth / totalWidth) * 100}%`;
  }
}

const updateVolume = () => {
  const currentVolume = isMuted ? 0 : audio.volume;
  const newHeight = `${currentVolume * 100}%`;
  volume.style.height = newHeight;

  if (isMuted) {
    volumeIcon.src = "./assets/icons/volume-mute.svg";
  } else {
    volumeIcon.src = "./assets/icons/volume-up.svg";
  }
};

volumeBar.addEventListener("mousedown", (event) => {
  isVolumeDragging = true;
  adjustVolume(event);
});

document.addEventListener("mouseup", () => {
  isVolumeDragging = false;
});

document.addEventListener("mousemove", (event) => {
  if (isVolumeDragging) {
    adjustVolume(event);
  }
});

const adjustVolume = (event) => {
  const clicked = volumeBar.clientHeight - (event.clientY - volumeBar.getBoundingClientRect().top);
  const totalHeight = volumeBar.clientHeight;
  audio.volume = clicked / totalHeight;
  isMuted = false;
  updateVolume();
};

volumeIcon.addEventListener("click", () => {
  if (!isMuted) {
    audio.volume = 0;
    isMuted = true;
  } else {
    audio.volume = 1;
    isMuted = false;
  }
  updateVolume();
});


displayHeaderInfo();
loadAndPlaySong();
