import badgeImg from "../../../img/verify.png";
import { useDispatch, useSelector } from "react-redux";
// import { getArtist } from "../../../store/thunks/artist";
// import { replaceQueue } from "../../../store/reducers/queue";
// import { followArtist, unfollowArtist } from "../../../store/thunks/user";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { RiPlayCircleFill } from "react-icons/ri";
import Loading from "src/components/UI/Loading";
import List from "src/components/UI/List";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const Artist = ({
  ArtistData,
  fetchArtistDetailsWatcher,
  replaceQueueDetailsWatcher,
  fetchCurrentSongDetailsWatcher,
  fetchSongDetailsWatcher,
  fetchPlayerDetailsWatcher,
  PlayPauseData,
  fetchViewPlaylistsDetailsWatcher,
  currentIndex,
  queue,
  fetchFollowArtistDetailsWatcher,
  FollowArtistData,
  fetchUnfollowArtistDetailsWatcher,
  UnfollowArtistData,
}) => {
  const session = useSession();
  const user = session?.data?.user?.id;
  const followedArtists = FollowArtistData;
  const router = useRouter();
  const { id } = router?.query;

  const artist = ArtistData;
  // console.log("artist", artist);
  useEffect(() => {
    if (id) {
      fetchArtistDetailsWatcher({ id });
    }
  }, [id]);

  const userFollowedArtist = (id,artist) => {
    // if(artist && id){
      let res = followedArtists?.some((obj) => obj._id === id);
      // console.log('res',res);
      return !!res;
    // }
    // return false;
  };

  const followArtistHandler = () => {
    fetchFollowArtistDetailsWatcher({ id: artist?._id, user });
  };

  const unfollowArtistHandler = () => {
    fetchUnfollowArtistDetailsWatcher({ id: artist?._id, user });
  };

  const replaceQueueHandler = (songs) => {
    let i = 0;
    const id = songs?.map((data) => data._id);
    if (songs.length > 0) {
      replaceQueueDetailsWatcher({ songs, i, id });
      fetchCurrentSongDetailsWatcher({ i, id });
      fetchSongDetailsWatcher(id);
      fetchPlayerDetailsWatcher();
    }
  };

  return (
    <>
      {artist ? (
        <div className="artist">
          <div className="artist__header">
            <span className="artist__badge flex items-center gap-3 mb-2">
              <Image src={badgeImg} alt="Verified badge" /> Verified Artist
            </span>
            <h1 className="artist__name mb-9 font-bold text-9xl max-[767px]:text-7xl">{artist?.name}</h1>
            <p>
              {artist?.Songs.reduce((acc, song) => acc + song.plays, 0)}{" "}
              listeners
            </p>
          </div>

          <div className="artist__nav">
            <RiPlayCircleFill
              onClick={() => replaceQueueHandler(artist?.Songs)}
            />
            {artist && !userFollowedArtist(artist?._id) ? (
              <button onClick={followArtistHandler}>Follow</button>
            ) : (
              <button onClick={unfollowArtistHandler}>Following</button>
            )}
          </div>

          <div className="artist__songs">
            <div>
              <h2 className="mt-8 pb-6 text-4xl leading-none text-white">Popular</h2>
              <List
                list={artist?.Songs}
                // replaceQueueDetailsWatcher={replaceQueueDetailsWatcher}
                // fetchCurrentSongDetailsWatcher={fetchCurrentSongDetailsWatcher}
                // fetchSongDetailsWatcher={fetchSongDetailsWatcher}
                // fetchPlayerDetailsWatcher={fetchPlayerDetailsWatcher}
                // PlayPauseData={PlayPauseData}
                // fetchViewPlaylistsDetailsWatcher={fetchViewPlaylistsDetailsWatcher}
                // currentIndex={currentIndex}
                // queue={queue}
              />
            </div>
            <div>
              <h2 className="mt-8 pb-6 text-4xl leading-none text-white">Liked Songs</h2>
            </div>
          </div>
        </div>
      ) : (
        <Loading fullHeight={true} />
      )}
    </>
  );
};

export default Artist;
