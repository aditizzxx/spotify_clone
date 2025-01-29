import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import React from "react";
import SquareList from "src/components/SquareList/index";

export default function HomePage({
  fetchCreatePlaylistWatcher,
  UserData,
  SongData,
  fetchViewSongsWatcher,
  SongDetailsIsLoading,
}) {
  // const { id, followedArtists, likedPlaylists } = useSelector(
  //   (state) => state.user.data
  // );
  // const [topSongs, setTopSongs] = useState([]);
  // const [newReleases, setNewReleases] = useState([]);

  const followedArtists = UserData?.data.map((data) => data.followedArtists[0]);
  const likedPlaylists = UserData?.data.map((data) => data.likedPlaylists);
  // console.log('UserData',followedArtists[0] === undefined);
  // console.log('likedPlaylists',likedPlaylists);

  const topSongs = SongData;
  const newReleases = SongData;

  // FIXME: Refactor and fix data lost on re-render
  // useEffect(() => {
  //   const fetcher = async () => {
  //     const res = await axios.get(`/songs?sort=-plays&limit=5`);
  //     const res2 = await axios.get(`/songs?sort=-createdAt&limit=5`);

  //     setTopSongs(res.data.data.songs);
  //     setNewReleases(res2.data.data.songs);
  //   };

  //   fetcher();
  // }, []);

  useEffect(() => {
    if(topSongs !== 'undefined'){
      fetchViewSongsWatcher({ sort: "-plays", limit: 5 });
    }
  }, []);

  useEffect(() => {
    fetchViewSongsWatcher({ sort: "-createdAt", limit: 5 });
  }, []);

  const isLoading = SongDetailsIsLoading;

  return (
    <>
      <div className="home__img" />
      <div className="home md:p-10 xs:p-6">
      <h1 className="pb-6 2xl:text-6xl md:text-4xl xs:text-4xl font-bold text-white" onClick={() => toast.success("Wow crazy")}>
          Good evening, wanna listen some music !?
      </h1>
        <h2 className="mt-8 pb-6 text-4xl leading-none text-white">Top Songs</h2>
        <SquareList list={topSongs} type={"song"} isLoading={isLoading}/>
       

      <h2 className="mt-8 pb-6 text-4xl leading-none text-white">New Releases</h2>
      <SquareList list={newReleases} type={"song"} isLoading={isLoading}/>
        

        {(followedArtists?.length > 0 && followedArtists[0] !== undefined) && (
          <>
           <h2 className="mt-8 pb-6 text-4xl leading-none text-white">Your favourite artists</h2>
           <SquareList list={followedArtists.slice(0, 5)} type="artist" isLoading={isLoading}/>
          </>
        )}

        {/* {likedPlaylists?.length > 0 && (
          <>
            <h2 className="mt-8 pb-6 text-4xl leading-none text-white">Your favourite playlists</h2>
            <SquareList list={likedPlaylists.slice(0, 5)} type="playlist" />
          </>
         )} */}
      </div>
    </>
  );
}
