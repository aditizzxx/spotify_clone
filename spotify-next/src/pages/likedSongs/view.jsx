import { useEffect, useState } from "react";
import { IoPlayCircle } from "react-icons/io5";
import List from "src/components/UI/List";
import Loading from "src/components/UI/Loading";

const LikedSongs = ({
  replaceQueueDetailsWatcher,
  UserData,
  fetchUserDetailsWatcher,
  ViewSongData,
  fetchViewSongsWatcher,
  fetchLikeSongWatcher,
  LikeSongData,
  fetchDislikeSongWatcher,
  DislikeSongData,
  ViewPlaylistData,
  fetchAddToPlaylistWatcher,
  AddToPlaylistData,
  CurrentIdData,
  fetchCurrentSongDetailsWatcher,
  fetchPlayerDetailsWatcher,
  fetchSongDetailsWatcher,
  SongDetails,
  PlayPauseData,
  fetchViewPlaylistsDetailsWatcher,
}) => {
  // const [refresh, setRefresh] = useState(false);

  const song = ViewSongData;

  useEffect(() => {
    fetchViewSongsWatcher({ sort: "-1", limit: 0 });
  }, [SongDetails]);

  useEffect(() => {
    if (LikeSongData?.status === 200 || DislikeSongData?.status === 200) {
      fetchUserDetailsWatcher();
      // setRefresh(false);
    }
  }, [LikeSongData?.status, DislikeSongData?.status]);

  let likedSongs = [];
  if (UserData && UserData?.data && song) {
    const songIds = UserData?.data.map((user) => user.likedSongs);
    const likedSongsIds = songIds.flat();
    likedSongs = song.filter((song) => likedSongsIds.includes(song?._id));
  } else {
    // console.log("UserData or UserData.data is undefined");
  }

  const replaceQueueHandler = (songs) => {
    let i = 0;
    const id = songs?.map((data) => data._id);
    if (songs.length > 0) {
      // localStorage.setItem('lastPlayedPlaylist', JSON.stringify({notid : 'likedSongs'}));
      // localStorage.setItem('lastPlayedSong', JSON.stringify({i }));
      replaceQueueDetailsWatcher({ songs, i, id , playlist_id : 'likedSongs' });
      fetchCurrentSongDetailsWatcher({ i, id });
      fetchSongDetailsWatcher(id);
      fetchPlayerDetailsWatcher();
    }
  };

  // console.log(likedSongs);

  return (
    <>
      {likedSongs ? (
        <div className="playlist likedSongs">
          <div className="playlist__header md:h-[40rem] xs:h-[30rem]">
            <div>
              <h1 className="playlist__name mb-12 md:text-8xl xs:text-7xl font-bold">Liked Songs</h1>
              <div className="playlist__user flex items-center gap-4">
                <span> You have {likedSongs.length} songs</span>
              </div>
            </div>
          </div>

          <div className="playlist__nav md:p-10 xs:p-6 md:text-8xl xs:text-7xl text-green-600 cursor-pointer">
            <IoPlayCircle onClick={() => replaceQueueHandler(likedSongs)}/>
          </div>

          <div className="playlist__songs md:px-10 xs:px-6">
            {/* {refresh !== true ? ( */}
              <List list={likedSongs}/>
            {/* ) : (
              <Loading />
            )} */}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default LikedSongs;
