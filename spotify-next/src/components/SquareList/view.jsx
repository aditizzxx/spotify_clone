import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { RiPlayCircleFill } from "react-icons/ri";
import Skeleton from "react-loading-skeleton";

const SquareList = ({
  list,
  type = "song",
  replaceQueueDetailsWatcher,
  fetchPlayerDetailsWatcher,
  fetchSongDetailsWatcher,
  fetchCurrentSongDetailsWatcher,
  search = "",
  isLoading
}) => {

  const router = useRouter();
  const handlePlaySong = (e, song) => {
    const id = song?.id;
    if (type !== "song") return;
    e.preventDefault();
    replaceQueueDetailsWatcher({ songs: [song], i: 0, id });
    fetchCurrentSongDetailsWatcher({ id, i: 0 });
    fetchSongDetailsWatcher(id);
    fetchPlayerDetailsWatcher();
  };
  const filteredItems = list?.filter((item) =>
    item?.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="grid xl:grid-cols-5 gap-6 md:grid-cols-3 sm:grid-cols-2 max-[767px]:justify-center">
        {isLoading ? Array(5).fill().map((_, index) => (
            <div key={index} className={`w-full p-6 text-inherit bg-[#181818] rounded-lg group relative ${type === "artist" ? "square-card--artist" : ""}`}>
              <Skeleton height={160} width={160} highlightColor="#E9E9E9" baseColor="#121212"/>
              <div className="mb-1 mt-1 font-bold text-white">
                <Skeleton width={120} height={20} highlightColor="#E9E9E9" baseColor="#121212"/>
              </div>
              <span>
                <Skeleton width={100} height={10} highlightColor="#E9E9E9" baseColor="#121212"/>
              </span>
              {type === "song" && (
                <RiPlayCircleFill className="absolute hidden group-hover:inline-block text-6xl bottom-6 right-6 text-[#1db954]" />
              )}
            </div>
          )) : filteredItems?.map((el) => (
            <Link
              key={el._id}
              href={type === "playlist" ? `/${type}/${el?._id}` : `/${type}/${el?.id}`}
              className={`w-full p-6 text-inherit bg-[#181818] rounded-lg group relative ${type === "artist" ? "square-card--artist" : ""} hover:bg-[#282828]`} 
              onClick={(e) => handlePlaySong(e, el)}
            >
              <img src={el?.img} alt={el?.name} className={`md:w-full mb-4 shadow-md xs:w-60  ${type === "artist" ? "rounded-full" : ""}`} />
              <div className="mb-1 font-bold text-white">{el?.name}</div>
              <span>{type}</span>
              {type === "song" && (
                <RiPlayCircleFill className="absolute hidden group-hover:inline-block text-8xl bottom-6 right-6 text-[#1db954]" />
              )}
            </Link>
          ))
        }
      </div>


      {/* Error message */}
      {filteredItems?.length === 0 && router.pathname !== "/" && (
        <>
          <h2 style={{ textAlign: "center" }}>
              Could not find a match.
          </h2>
        </>
      )}
    </>
  );
};

export default SquareList;
