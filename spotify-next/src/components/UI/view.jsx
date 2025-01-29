import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import ModalWrapper from "./ModalWrapper";
import {
  RiDeleteBin6Line,
  RiEditCircleLine,
  RiHeart2Fill,
  RiHeart2Line,
  RiMoreLine,
} from "react-icons/ri";
import Image from "next/image";
import Link from "next/link";

const List = ({
  list,
  admin,
  handleOpenEditModal,
  fetchDislikeSongWatcher,
  LikeSongData,
  DislikeSongData,
  ViewPlaylistData,
  UserData,
  fetchLikeSongWatcher,
  fetchCurrentSongDetailsWatcher,
  replaceQueueDetailsWatcher,
  CurrentId,
  fetchSongDetailsWatcher,
  fetchPlayerDetailsWatcher,
  fetchAddToPlaylistWatcher,
  AddToPlaylistData,
  resetfetchAddToPlaylistDetailsWatcher,
  // playlists,
  onPlaylist,
  pId,
  fetchRemoveFromPlaylistWatcher,
  RemoveFromPlaylistData,
  fetchUserDetailsWatcher,
  resetfetchUserDetailsWatcher,
  search = "",
  CurrentData,
}) => {
  // console.log(RemoveFromPlaylistData);
  
  const [songId, setSongId] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const playlists = ViewPlaylistData;
  const userLiked = UserData;

  useEffect(()=>{
    if(LikeSongData?.status === 200 || DislikeSongData?.status === 200 || RemoveFromPlaylistData?.status === 200){
      fetchUserDetailsWatcher();
      resetfetchUserDetailsWatcher();
    }
  },[LikeSongData?.status, DislikeSongData?.status, RemoveFromPlaylistData?.status])

  useEffect(()=>{
    if(AddToPlaylistData?.status === 'success'){
      toast.success(AddToPlaylistData?.message);
      resetfetchAddToPlaylistDetailsWatcher();
    }
  },[AddToPlaylistData?.status])

  const playSongHandler = (i, id) => {
    const songs = list;
    replaceQueueDetailsWatcher({ songs, i, id });
    // replaceQueueDetailsWatcher({ songs, i, id , playlist_id : router.query.id });

    fetchCurrentSongDetailsWatcher({ i, id });
    fetchSongDetailsWatcher( id );
    fetchPlayerDetailsWatcher();
  };

  const userLikedSong = (id) => {
    let res = userLiked?.data.map((user) => user?.likedSongs).flat();
    let isLiked = res?.includes(id);
    return isLiked;
  };

  // // 💚 like song
  const likeSongHandler = (song) => {
    const songId = song?._id;
    fetchLikeSongWatcher({ songId });
  };

  const dislikeSongHandler = (song) => {
    const songId = song?._id;
    fetchDislikeSongWatcher({ songId });
  };

  // // Model handlers
  const openModalHandler = (id) => {
    setModalOpen(true);
    setSongId(id);
  };

  const closeModalHandler = () => setModalOpen(false);

  const addSongToPlaylistHandler = async (id, songId) => {
    fetchAddToPlaylistWatcher({ id, songId });
    setModalOpen(false);
  };


  const removeSongFromPlaylistHandler = async (id, songId) => {
    fetchRemoveFromPlaylistWatcher({ id, songId });
    // fetchUserDetailsWatcher();
  };

  const filteredItems = list?.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="list">
        {filteredItems &&
          filteredItems.map((el, i) => (
            <div className={`list__item md:h-28 md:p-3 xs:h-40 xs:p-1 ${el?.artist?._id === "6513505bef35c9d633139956" ? "vip" : ""}`} key={el?._id}>
              {CurrentId !== el?._id ? (
                <span className="list__num">{i + 1}</span>
              ) : (
                <>
                  <div className="anim">
                    <div className="sq sq1"></div>
                    <div className="sq sq2"></div>
                    <div className="sq sq3"></div>
                    <div className="sq sq4"></div>
                  </div>
                </>
              )}
              <Image src={el?.img} alt="Song cover" width={100} height={54} />
              <div className="md:flex xs:grid justify-between">
                <span className={(CurrentId === el?._id ? "list--green" : "") + " list__name  max-[767px]:w-50 cursor-pointer md:max-w-[63px]"}
                  // onClick={() =>     fetchCurrentSongDetailsWatcher( i, el._id )}
                  onClick={() => playSongHandler(i, el?._id)}>
                  {el?.name}
                </span>
                <Link href={`/artist/${el?.artist?._id}`} className="list__artist-name">
                  {el?.artist?.name}
                </Link>
                <div className="grid grid-cols-2 xs:gap-8">
                  <span className="list__count md:items-center md:w-24">{el?.plays}</span>
                  {userLikedSong(el?._id) ? (
                    <RiHeart2Fill onClick={() => dislikeSongHandler(el)} className="text-green-500"/>
                  ) : (
                    <RiHeart2Line style={{ color: "#fff" }} onClick={() => likeSongHandler(el)}/>
                  )}
                </div>
              </div>

              <span>
                {admin && (
                  <RiEditCircleLine onClick={() => handleOpenEditModal(el?._id)}/>
                )}
                {!admin && (onPlaylist ? (
                    <RiDeleteBin6Line onClick={() => removeSongFromPlaylistHandler(pId, el?._id)}/>
                  ) : (
                    <RiMoreLine onClick={() => openModalHandler(el?._id)} />
                  ))
                }
              </span>
            </div>
          ))}

        {/* Error message */}
        {filteredItems?.length === 0 && (
          <>
            <h2 className="text-center">
              Could not find a match.
            </h2>
          </>
        )}
      </div>

      <ModalWrapper
        heading="Save song to"
        open={modalOpen}
        type="list"
        handleClose={closeModalHandler}
      >
        <ul className="modal__list">
          {playlists?.map((p, i) => (
            <li key={i} className="modal-wrapper__item" onClick={() => addSongToPlaylistHandler(p._id, songId)}>
              {p.name}
            </li>
          ))}
        </ul>
      </ModalWrapper>
    </>
  );
};

export default List;
