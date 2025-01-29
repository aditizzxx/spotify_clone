import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import SquareList from "src/components/SquareList";
import List from "src/components/UI/List";
import { useSession } from "next-auth/react";
import Loading from "src/components/UI/Loading";

const Search = ({
  fetchViewSongsWatcher,
  fetchViewPlaylistsDetailsWatcher,
  SongData,
  ViewPlaylistData,
  SongDetails,
  ArtistData,
  fetchViewArtistDetailsWatcher,
}) => {
  const session = useSession();
  const id = session?.data?.user?.id;
  const [query, setQuery] = useState("");
  const [queryType, setQueryType] = useState("song");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetchViewSongsWatcher({ sort: "", limit: 0 });
  }, [SongDetails]);

  
  // useEffect(() => {
  //   if (LikeSongData?.status === 200 || DislikeSongData?.status === 200) {
  //     fetchUserDetailsWatcher({ userId: id });
  //     setRefresh(false);
  //   }
  // }, [LikeSongData?.status, DislikeSongData?.status]);

  const changeTagHandler = (tag) => {
    setQueryType(tag);
    switch (tag) {
      case "song":
        fetchViewSongsWatcher({ sort: "", limit: 0 });
        break;
      case "artist":
        fetchViewArtistDetailsWatcher({ sort: "", limit: 0 });
        break;
      case "playlist":
        fetchViewPlaylistsDetailsWatcher();
        break;
      default:
        break;
    }
  };

  return (
    <div className="search xs:px-1 md:px-4">
      {/* Search bar and tags */}
      <div className="search__nav flex p-0 mb-6 xl:px-64 md:px-0 sm:px-0 xs:p-0">
        <form onSubmit={(e) => e.preventDefault()} className="w-full relative">
          <input
            type="text"
            placeholder="What do you want to listen to?"
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-3xl text-white bg-[#242424] border-0 rounded-full"
          />
          <IoSearch className="search__icon" />
        </form>
      </div>
      <ul className="search__tags xl:px-64 md:px-0 xs:p-0">
      <li className={"search__tag " + (queryType === "song" && "search__tag--active")} onClick={() => changeTagHandler("song")}>
          Song
        </li>
        <li className={"search__tag " + (queryType === "artist" && "search__tag--active")} onClick={() => changeTagHandler("artist")}>
          Artist
        </li>
        <li className={"search__tag " + (queryType === "playlist" && "search__tag--active")} onClick={() => changeTagHandler("playlist")}>
          Playlist
        </li>
      </ul>

      {/* Display search results */}
      {queryType === "song" && (
        <List
          // list={query.trim() === "" ? SongData : SearchSongData}
          list={SongData}
          search={query}
        />
      )}

      {queryType === "artist" && (
        <SquareList
          // list={query.trim() === "" ? ArtistData : SearchArtistData}
          list={ArtistData}
          type="artist"
          search={query}
        />
      )}

      {queryType === "playlist" && (
        <SquareList list={ViewPlaylistData} search={query} type="playlist" />
      )}
    </div>
  );
};

export default Search;
