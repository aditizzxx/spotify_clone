import { useCallback, useEffect, useRef, useState } from "react";
import {
  RiHeart2Fill,
  RiHeart2Line,
  RiPauseCircleFill,
  RiPlayCircleFill,
  RiRepeatOneLine,
  RiShuffleLine,
  RiSkipBackMiniFill,
  RiSkipForwardMiniFill,
  RiVolumeDownLine,
  RiVolumeMuteLine,
  RiVolumeUpLine,
} from "react-icons/ri";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { shuffleArray } from "src/utils/shuffleArray";
import { useSwipeable } from "react-swipeable";
import { IoIosArrowDown } from "react-icons/io";
import { PiDotsThreeVerticalBold } from "react-icons/pi";

const Player = ({
  currentIndex,
  queue,
  LikeSongData,
  fetchDislikeSongWatcher,
  fetchLikeSongWatcher,
  fetchUserDetailsWatcher,
  UserData,
  setNextSongWatcher,
  setPreviousSongWatcher,
  fetchSongDetailsWatcher,
  PlayPauseData,
  fetchPlayerDetailsWatcher,
}) => {
  // const session = useSession();
  const [volume, setVolume] = useState(100);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [repeatSong, setRepeatSong] = useState(false);
  const [changedFavStatus , setChangedFavStatus] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [shuffledSongs, setShuffledSongs] = useState([]);
  const [lastPlayedSong, setLastPlayedSong] = useState(null);
  const [checkScreen, setScreen] = useState(0);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [songDetails , setSongDetails] = useState(null);


  // const userId = session?.data?.user?.id;
  const song = (isShuffling ? shuffledSongs[currentIndex] : queue.songs?.[currentIndex]) || lastPlayedSong;
  const id = song?._id;

  const isPlaying = PlayPauseData;

  const audioRef = useRef();
  const progressRef = useRef();
  const playAnimationRef = useRef();
  const volumeRef = useRef();

  const repeat = useCallback(() => {
    if (audioRef.current && progressRef.current) {
      const time = audioRef.current.currentTime;
      setCurrentTime(time);
  
      progressRef.current.value = time;
      progressRef.current.style.setProperty(
        "--range-progress",
        `${(progressRef.current.value / duration) * 100}%`
      );
  
      playAnimationRef.current = requestAnimationFrame(repeat);
    }
  }, [audioRef, duration, progressRef, setCurrentTime]);
  

  useEffect(() => {
    // Prevent useEffect triggered before audio is loaded
    if (audioRef?.current === undefined) return;

    if (isPlaying) {
      audioRef?.current?.play();
    } else {
      audioRef?.current?.pause();
    }

    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [isPlaying, audioRef, repeat]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume, audioRef]);

  //   // Increases plays count of the song
  useEffect(() => {
    const increaseCount = async () => {
      if (song) {
        fetchSongDetailsWatcher(id);
        // Save the song to local storage as the last played song
        localStorage.setItem('lastPlayedSong', JSON.stringify(song));
      }
    };
    increaseCount();
  }, [song]);

  useEffect(() => {
    const savedSong = localStorage.getItem('lastPlayedSong');
    if (savedSong) {
      setLastPlayedSong(JSON.parse(savedSong));
    }
  }, []);

  const likeSongHandler = () => {
    setChangedFavStatus(true);
    fetchLikeSongWatcher({ songId: id });
    fetchUserDetailsWatcher();
  };

  const dislikeSongHandler = () => {
    setChangedFavStatus(false);
    fetchDislikeSongWatcher({ songId: id });
    fetchUserDetailsWatcher();
  };

  //   // Music player
  const togglePlayPauseHandler = () => {
    fetchPlayerDetailsWatcher();
  };

  const progressChangeHandler = () => {
    audioRef.current.currentTime = progressRef.current.value;
  };

  const volumeChangeHandler = (e) => {
    setVolume(e.target.value);
    e.target.style.setProperty("--range-progress", `${e.target.value}%`);
  };

  const onLoadedMetadataHandler = () => {
    if (audioRef.current && progressRef.current) {
      const seconds = audioRef.current.duration;
      setDuration(seconds);
      progressRef.current.max = seconds;
    }
  };

  const handleNext = () => {
    if (isShuffling) {
      setNextSongWatcher(shuffledSongs[currentIndex]._id);
    } else {
      setNextSongWatcher(id);
    }
  };

  // console.log(lastPlayedSong);
  const handlePrev = (id) => {
    if (isShuffling) {
      setPreviousSongWatcher(shuffledSongs[currentIndex]._id);
    } else {
      setPreviousSongWatcher(id);
    }
  };

  const onEndedHandler = () => {
    handleNext();
  };

  //   // Helper functions
  const formatTime = (time) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return "00:00";
  };

  const userLikedSong = () => {
    let likedSong = UserData?.data.some((userData) =>
      userData.likedSongs?.includes(song?._id)
    );
    return !!likedSong;
  };


  // shuffle
  const shuffleSongHandler = () => {
    if (isShuffling) {
      setShuffledSongs(queue.songs);
      setIsShuffling(false);
    } else {
      const shuffled = shuffleArray(queue.songs);
      setShuffledSongs(shuffled);
      setIsShuffling(true);
    }
  };

  // useEffect

  const repeatSongHandler = () => {
    setRepeatSong((state) => !state);
    audioRef.current.loop = !repeatSong;
  };

  const playLastPlayedSongHandler = () => {
    // if (lastPlayedSong) {
      const id = lastPlayedSong._id;
      fetchSongDetailsWatcher(id);
      fetchPlayerDetailsWatcher();
    // }
  };


  useEffect(() => {
    const handleResize = () => {
        setScreen(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const swipeHandler = (screen , song) => {
    // console.log(isValid , song);
    if(screen === true){
      setIsPopupVisible(true);
    }
  }
  const swipeUphandlers = useSwipeable({
    onSwipedUp: () => {
      setIsPopupVisible(true);
      // Add your logic here for what happens on swipe up
    },
    preventDefaultTouchmoveEvent: true,
    trackTouch: true,
  });

  const swipeDownhandlers = useSwipeable({
    onSwipedDown: () => {
      setIsPopupVisible(false);
      // Add your logic here for what happens on swipe down
    },
    preventDefaultTouchmoveEvent: true,
    trackTouch: true,
  })

  useEffect(()=>{
    const songDetails = window.localStorage.getItem('lastPlayedSong');
    setSongDetails(JSON.parse(songDetails))
  },[isPopupVisible])

  return (
    <>
      <div className="player md:px-10 md:grid-cols-3 xs:grid-cols-2 xs:gap-0 xs:px-4 max-[767px]:relative max-[767px]:bottom-[-1px] max-[767px]:bg-[#121212]" >
        {song ? (
          <>
            <div className="player__song flex items-center gap-4" onClick={() => swipeHandler(checkScreen <= 768 , song)} {...swipeUphandlers}>
              <img src={song.img} alt="" className="max-[767px]:h-[5.2rem]"/>
              <div className="player__song-context md:flex md:flex-col xs:flex xs:flex-wrap">
              <div className="marquee-container">
                <span className="player__song-name text-white text-3xl">{song.name}</span>
              </div>
                <Link href={`/artist/${song.artist._id}`} className="player__song-artist">
                  {song.artist.name}
                </Link>
              </div>
              {(userLikedSong() === true || changedFavStatus) ? (
                <RiHeart2Fill className="player__song__like player__song__like--active block md:text-4xl xs:text-5xl max-[767px]:hidden" onClick={dislikeSongHandler} />
              ) : (
                <RiHeart2Line className="player__song__like md:text-5xl xs:text-5xl max-[767px]:hidden" onClick={likeSongHandler} />
              )}
            </div>
              <div>
                <audio ref={audioRef} src={song.song} onLoadedMetadata={onLoadedMetadataHandler} onEnded={onEndedHandler} autoPlay={true}/>
                <div className="player__icons flex items-center justify-center pt-2 pb-0 gap-3 ">
                  <RiShuffleLine onClick={shuffleSongHandler} className={isShuffling ? 'player__shuffle md:text-4xl' : 'md:text-4xl md:flex xs:hidden' }/>
                  <RiSkipBackMiniFill onClick={handlePrev} className="md:text-4xl md:flex xs:hidden"/>
                  <div className="xs:flex my-4">
                    <div className="px-5 md:hidden">
                      {(userLikedSong() === true || changedFavStatus) ? (
                        <RiHeart2Fill className="player__song__like player__song__like--active block md:text-4xl xs:text-5xl " onClick={dislikeSongHandler} />
                      ) : (
                        <RiHeart2Line className="player__song__like md:text-5xl xs:text-5xl" onClick={likeSongHandler} />
                      )}
                    </div>
                    <button className="player__icon-btn" onClick={togglePlayPauseHandler}>
                      {isPlaying === true ? (
                        <RiPauseCircleFill className="spinner md:text-4xl" />
                      ) : (
                        <RiPlayCircleFill className="md:text-4xl" />
                      )}
                    </button>
                  </div>
                  <RiSkipForwardMiniFill onClick={handleNext} className="md:text-4xl md:flex xs:hidden"/>
                  {repeatSong ? (
                    <RiRepeatOneLine className={"player__repeat md:flex xs:hidden"} onClick={repeatSongHandler} />
                  ) : (
                    <RiRepeatOneLine onClick={repeatSongHandler} className="md:text-4xl md:flex xs:hidden"/>
                  )}
                </div>
                <div className="player__range flex items-center gap-4 md:flex xs:hidden">
                  <span className="player__range-time">
                    {formatTime(currentTime)}
                  </span>
                  <input ref={progressRef} type="range" defaultValue={0} onChange={progressChangeHandler}/>
                  <span className="player__range-time">{formatTime(duration)}</span>
                </div>
              </div>
              <div className="player__volume md:flex xs:hidden">
                {Number(volume) === 0 ? (
                  <RiVolumeMuteLine />
                ) : Number(volume) < 50 ? (
                  <RiVolumeDownLine />
                ) : (
                  <RiVolumeUpLine />
                )}
                <input
                  ref={volumeRef}
                  type="range"
                  min={0}
                  max={100}
                  value={volume}
                  defaultValue={100}
                  onChange={(e) => volumeChangeHandler(e)}
                  className="w-1/2 cursor-pointer relative p-0"
                />
              </div>
          </>
        ) : (
          <Link href="/search" className="player__note flex text-3xl cursor-pointer items-center justify-center">Please select a song 🎶 . . .</Link>
        )}
      </div>

      {isPopupVisible && (
        <div className=" fixed inset-0 bg-black bg-opacity-75 flex justify-center items-end z-50" >
          <div className="w-screen h-[calc(100vh-50px)] bg-gradient-to-b from-[rgba(104,104,140,0.5)] to-[#121212] rounded-lg p-8  mx-auto">
            <div className="flex justify-between mb-8 text-4xl">
              <button className="text-white" onClick={() => { setIsPopupVisible(false) }} {...swipeDownhandlers}><IoIosArrowDown/></button>
              <button className="text-white" onClick={() => { setIsPopupVisible(false) }}><PiDotsThreeVerticalBold /></button>
            </div>
            <div className="text-white">
            {/* {console.log(songDetails)} */}
              { song && 
                <>
                  <div>
                    <img src={song?.img} className="mb-20"/>
                  </div>  
                  <div className="my-0"> 
                    <span className="text-4xl ">{song?.name}</span>
                  </div>
                  <div className="mb-12">
                    <span className="text-2xl text-gray-300">{song?.artist?.name}</span>
                  </div>
                  <div className="player__icons flex items-center justify-center py-3 gap-16 ">
                    <RiShuffleLine onClick={shuffleSongHandler} className={isShuffling ? 'player__shuffle xs:text-5xl' : 'xs:text-5xl xs:flex' }/>
                    <RiSkipBackMiniFill onClick={handlePrev} className="xs:text-5xl"/>
                    {/* <div className="xs:flex my-4">
                      <div className="px-5 xs:hidden">
                        {(userLikedSong() === true || changedFavStatus) ? (
                          <RiHeart2Fill className="player__song__like player__song__like--active block xs:text-5xl xs:text-5xl " onClick={dislikeSongHandler} />
                        ) : (
                          <RiHeart2Line className="player__song__like xs:text-5xl xs:text-5xl" onClick={likeSongHandler} />
                        )}
                      </div> */}
                    <button className="player__icon-btn" onClick={togglePlayPauseHandler}>
                      {isPlaying === true ? (
                        <RiPauseCircleFill className="spinner xs:text-5xl"/>
                      ) : (
                        <RiPlayCircleFill className="xs:text-5xl"/>
                      )}
                    </button>
                    {/* </div> */}
                    <RiSkipForwardMiniFill onClick={handleNext} className="xs:text-5xl"/>
                    {repeatSong ? (
                      <RiRepeatOneLine className={"player__repeat xs:text-5xl"} onClick={repeatSongHandler}/>
                    ) : (
                      <RiRepeatOneLine onClick={repeatSongHandler} className="xs:text-5xl"/>
                    )}
                  </div>
                  <div className="player__range flex items-center gap-4 mb-8">
                    <span className="player__range-time">
                      {formatTime(currentTime)}
                    </span>
                    <input ref={progressRef} type="range" defaultValue={0} onChange={progressChangeHandler}/>
                    <span className="player__range-time">{formatTime(duration)}</span>
                  </div>
                </>
              }
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Player;
