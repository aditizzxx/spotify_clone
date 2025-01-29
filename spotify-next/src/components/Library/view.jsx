import { RiAddFill, RiBook3Line } from "react-icons/ri";
import likedSongsImg from "../../img/likedSongs.jpeg";
import LibraryLink from "./LibraryLink/libraryLink";
import { useEffect } from "react";

export default function Library({
  fetchCreatePlaylistWatcher,
  fetchViewPlaylistsDetailsWatcher,
  ViewPlaylistData,
  CreatePlaylistData,
  collapsed,
  DeletePlaylistData,
  PlaylistDataIsLoading,
  toggleCollapse,
  UpdatePlaylistData,
  resetfetchDeletePlaylistDetailsWatcher,
  resetfetchCreatePlaylistDetailsWatcher
}) {
  // console.log(DeletePlaylistData);
  
  const isLoading = PlaylistDataIsLoading;
  
  useEffect(() => {
    fetchViewPlaylistsDetailsWatcher();
  }, []);

  useEffect(()=>{
    if(CreatePlaylistData?.status === 'success' || UpdatePlaylistData?.status === 200 || DeletePlaylistData?.status === 200){
      fetchViewPlaylistsDetailsWatcher();
      resetfetchCreatePlaylistDetailsWatcher();
      resetfetchDeletePlaylistDetailsWatcher();
    }
  },[CreatePlaylistData?.status,UpdatePlaylistData?.status, DeletePlaylistData?.status])

  const handleCreatePlaylist = (e) => {
    e.preventDefault(); 
    const nextPlaylistNumber = ViewPlaylistData ? ViewPlaylistData.length + 1 : 1;
    const name = `My Playlist #${nextPlaylistNumber}`;
    fetchCreatePlaylistWatcher({ name });
  };

  return (
    <>
      <div className={`library ${collapsed ? "collapsed" : ""}`}>
        <div className="library__header h-16 py-1.5 px-6 mb-3 flex items-center gap-6 text-3xl font-bold">
          <RiBook3Line className="text-4xl cursor-pointer xs:text-4xl" onClick={toggleCollapse} />
            {!collapsed && (
              <>
                <span onClick={toggleCollapse} className="cursor-pointer">Library</span>
                <RiAddFill className="text-5xl xs:text-4xl cursor-pointer ml-auto" onClick={handleCreatePlaylist} />
              </>
            )}
        </div>
        <div className={`saved ${collapsed ? "collapsed" : ""}`} style={{ overflowY: collapsed ? "auto" : "scroll" }}>
          <LibraryLink
            isArtist={false}
            to="/likedSongs"
            img={likedSongsImg}
            pinned={true}
            collapsed={collapsed}
            isLoading = {isLoading}
          >
            {!collapsed && "Liked Songs"}
          </LibraryLink>
            {ViewPlaylistData?.slice().reverse().map((data, index) => (
              <LibraryLink
                key={index}
                to={`/playlist/${data?._id}`}
                img={data.img}
                collapsed={collapsed}
                isLoading = {isLoading}
                isArtist={false}
              >
                {!collapsed && data.name}
              </LibraryLink>
            ))}
        </div>
      </div>
    </>
  );
}
