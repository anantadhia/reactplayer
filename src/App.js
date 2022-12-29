import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import "./App.css";
import { Reorder } from "framer-motion";
import LibrarySong from "./components/LibrarySong";
//analytic
import ReactGA from "react-ga";

// Import components
import Player from "./components/Player";
import Song from "./components/Song";
// import Library from "./components/Library";
import Nav from "./components/Nav";
import Credit from "./components/Credit";
// Import data
import data from "./data";

const App = () => {
  // Ref
  const audioRef = useRef(null);

  // State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });

  // Functions
  const updateTimeHandler = (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime, duration });
  };

  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    let nextSong = songs[(currentIndex + 1) % songs.length];
    await setCurrentSong(nextSong);

    const newSongs = songs.map((song) => {
      if (song.id === nextSong.id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSongs(newSongs);

    if (isPlaying) {
      audioRef.current.play();
    }
  };

  return (
    <AppContainer libraryStatus={libraryStatus}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        songs={songs}
        setSongs={setSongs}
      />
      <Library
        songs={songs}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
      />
      <Credit />
      <audio
        onLoadedMetadata={updateTimeHandler}
        onTimeUpdate={updateTimeHandler}
        onEnded={songEndHandler}
        ref={audioRef}
        src={currentSong.audio}
      />
    </AppContainer>
  );
};

//LIBRARY
const Library = ({
  songs,
  setSongs,
  currentSong,
  setCurrentSong,
  audioRef,
  isPlaying,

  libraryStatus,
}) => {
  // const [songs, setSongs] = useState(data());
  const expirationTime = 86400; // expiration time in seconds (1 days * 24 hours/day * 60 minutes/hour * 60 seconds/minute)

  useEffect(() => {
    const storedValue = localStorage.getItem("songs");
    try {
      setSongs(JSON.parse(storedValue));
    } catch (error) {
      console.error(error);
    }

    // set the sssexpiration time for the item based on the current time
    const expirationDate = new Date().getTime() + expirationTime * 1000; // current time + expiration time in milliseconds
    localStorage.setItem("songsExpiration", expirationDate);
  }, []);

  useEffect(() => {
    localStorage.setItem("songs", JSON.stringify(songs));
    // update the expiration time for the item based on the current time
    const expirationDate = new Date().getTime() + expirationTime * 1000; // current time + expiration time in milliseconds
    localStorage.setItem("songsExpiration", expirationDate);
  }, [songs]);

  // check if the item has expired every minute
  setInterval(() => {
    const currentTime = new Date().getTime();
    const storedExpiration = localStorage.getItem("songsExpiration");
    if (storedExpiration && currentTime > storedExpiration) {
      localStorage.removeItem("songs");
      localStorage.removeItem("songsExpiration");
    }
  }, 60000); // check every minute

  return (
    <LibraryContainer libraryStatus={libraryStatus}>
      <H1>Library</H1>
      <SongContainer>
        <Reorder.Group values={songs} onReorder={setSongs}>
          {songs.map((song) => (
            <Reorder.Item key={song.id} value={song}>
              <LibrarySong
                song={song}
                songs={songs}
                setCurrentSong={setCurrentSong}
                key={song.id}
                audioRef={audioRef}
                isPlaying={isPlaying}
                setSongs={setSongs}
              />
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </SongContainer>
    </LibraryContainer>
  );
};
const LibraryContainer = styled.ul`
  position: fixed;
  z-index: 9;
  top: 0;
  left: 0;
  width: 20rem;
  height: 100%;
  background-image: url(tatsuback.webp);

  user-select: none;
  overflow: scroll;
  transform: translateX(${(p) => (p.libraryStatus ? "0%" : "-100%")});
  transition: all 0.5s ease;
  opacity: ${(p) => (p.libraryStatus ? "100" : "0")};
  overflow-x: hidden;
  scrollbar-width: auto;
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
  }

  ::-webkit-scrollbar {
    width: 5px;
    background-color: #4500ff;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #4500ff;
    border-radius: 25px;

    background-image: -webkit-gradient(
      linear,
      0 0,
      0 100%,
      color-stop(0.5, rgba(255, 255, 255, 0.2)),
      color-stop(0.5, transparent),
      to(transparent)
    );
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: #ba0000;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    z-index: 9;
    padding-right: 50px;
  }
`;

const SongContainer = styled.li`
  cursor: move;
  display: flex;
  flex-direction: column;

  cursor: move;

  border: 2px solid #4500ff;
  background: rgba(69, 0, 255, 0.06);

  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
`;

const H1 = styled.h2`
  mix-blend-mode: hard-light;
  padding: 2rem;
`;

const AppContainer = styled.div`
  transition: all 0.5s ease;
  margin-left: ${(p) => (p.libraryStatus ? "20rem" : "0")};
  @media screen and (max-width: 768px) {
    margin-left: 0;
  }
`;

ReactGA.initialize("UA-223844105-2");
ReactGA.pageview(window.location.pathname + window.location.search);
export default App;
