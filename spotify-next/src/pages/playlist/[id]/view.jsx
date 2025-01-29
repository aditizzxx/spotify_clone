import {
  IoCloseCircle,
  IoHeart,
  IoHeartOutline,
  IoPlayCircle,
} from "react-icons/io5";
import { useEffect, useState } from "react";
import { RiEditCircleLine } from "react-icons/ri";
import { useRouter } from "next/router";
import Button from "src/components/UI/Button";
import Modal from "react-bootstrap/Modal";
import Loading from "src/components/UI/Loading";
import List from "src/components/UI/List";
import { useSession } from "next-auth/react";

const Playlist = ({
  fetchPlaylistDetailsWatcher,
  PlaylistData,
  UpdatePlaylistData,
  fetchEditPlaylistWatcher,
  resetfetchEditPlaylistDetailsWatcher,
  fetchDeletePlaylistWatcher,
  DeletePlaylistData,
  fetchViewPlaylistsDetailsWatcher,
  LikedPlaylistData,
  fetchLikedPlaylistWatcher,
  fetchUserDetailsWatcher,
  resetfetchUserDetailsWatcher,
  UserData,
  replaceQueueDetailsWatcher,
  fetchDislikedPlaylistWatcher,
  DislikedPlaylistData,
  RemoveFromPlaylistData,
  fetchRemoveFromPlaylistWatcher,
  fetchLikeSongWatcher,
  LikeSongData,
  fetchDislikeSongWatcher,
  DislikeSongData,
  fetchCurrentSongDetailsWatcher,
  fetchSongDetailsWatcher,
  fetchPlayerDetailsWatcher,
}) => {
  const [modal, setModal] = useState(false);
  // const [refresh, setRefresh] = useState(false);
  const session = useSession();
  const user = session?.data?.user?.id;
  const router = useRouter();
  const { id } = router.query;
  const likedPlaylists = UserData?.data.map((data) => data.likedPlaylists);

  useEffect(() => {
    if (id) {
      fetchPlaylistDetailsWatcher({ id });
    }
  }, [id]);

  useEffect(() => {
    if (RemoveFromPlaylistData?.status === 200) {
      // fetchUserDetailsWatcher();
    }
  }, [RemoveFromPlaylistData]);

  useEffect(() => {
    if (UpdatePlaylistData?.status === 200){
      fetchPlaylistDetailsWatcher({ id });
      resetfetchEditPlaylistDetailsWatcher();
    }
  }, [UpdatePlaylistData]);

  useEffect(()=>{
    if(LikedPlaylistData?.status === 200 || DislikedPlaylistData?.status === 200){
      fetchUserDetailsWatcher();
      resetfetchUserDetailsWatcher();
    }
  },[LikedPlaylistData?.status, DislikedPlaylistData?.status])

  const playlist = PlaylistData;

  const replaceQueueHandler = (songs) => {
    let i = 0;
    const id = songs?.map((data) => data._id);
    if (songs.length > 0) {
      // localStorage.setItem('lastPlayedPlaylist', JSON.stringify(router.query));
      replaceQueueDetailsWatcher({ songs, i, id , playlist_id : router.query.id });
      fetchCurrentSongDetailsWatcher({ i, id });
      fetchSongDetailsWatcher(id);
      fetchPlayerDetailsWatcher();
    }
  };

  const openModalHandler = () => {
    if (playlist?.user?._id === user) {
      setModal(true);
    }
  };

  const closeModalHandler = () => {
    setModal(false);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const form = document.getElementById("updateForm");
    const formData = new FormData(form);
    const img = formData.get("img");
    const imgName = img.name;
    const data = Object.fromEntries(
      [...formData.entries()].filter(([key, value]) => key !== "img")
    );

    fetchEditPlaylistWatcher({ img, imgName, data, id: playlist?._id });
    setModal(false);
  };

  const deletePlaylistHandler = (id) => {
    fetchDeletePlaylistWatcher({ id });
    fetchViewPlaylistsDetailsWatcher();
    router.replace("/");
  };

  const likePlaylistHandler = (id) => {
    fetchLikedPlaylistWatcher({ id });
  };

  const dislikePlaylistHandler = (id) => {
    fetchDislikedPlaylistWatcher({ id });
  };

  const userLikedPlaylist = (id) => {
    let pl = likedPlaylists.find((obj) => obj.includes(id));
    // console.log(likedPlaylists.find((obj) => obj.includes(id)));
    // let pl = likedPlaylists.find((obj) => obj[0] === playlist?._id);
    return !!pl;
  };

  return (
    <>
      {playlist ? (
        <div className="playlist">
          <div className="playlist__header md:h-[40rem] md:px-10 md:gap-10 xs:px-3 xs:gap-5 xs:h-[30rem]">
            <div className="playlist__img sm:h-[24rem] sm:w-[24rem] sm:min-w-[24rem] xs:min-w-[13rem] xs:w-[14rem] xs:h-[13rem]">
              <img src={playlist?.img} alt="Playlist cover"/>
            </div>
            <div>
              <p>Playlist</p>
              <h1 className="playlist__name md:pb-6 2xl:text-8xl md:text-7xl xs:text-4xl xs:pb-0 font-bold text-white ">{playlist?.name}</h1>
              {playlist?.description && (
                <p className="playlist__des mb-5">{playlist?.description}</p>
              )}
              <div className="playlist__user flex items-center md:gap-4 xs:flex-wrap xs:gap-0">
                <img
                  className="playlist__user-img h-[3rem] w-[3rem] rounded-full"
                  src={playlist?.user?.img}
                  alt="user"
                  style={{ height: "100", width: "100" }}
                />
                <span className="playlist__user-name font-bold">{" "}{playlist?.user.name}{" "}</span>
                <span className="playlist__user-songs">
                  {playlist?.songs.length} songs
                </span>
              </div>
            </div>
          </div>

          <div className="playlist__nav md:text-8xl xs:text-7xl md:p-10 xs:p-6 text-green-600 cursor-pointer">
            <IoPlayCircle onClick={() => replaceQueueHandler(playlist?.songs)}/>
            {
              // playlist?.user?._id !== user &&
              playlist && (UserData && userLikedPlaylist(playlist._id) ? (
                  <IoHeart className="heart heart--active text-7xl text-gray-400" onClick={() => dislikePlaylistHandler(playlist?._id)}/>
                ) : (
                  <IoHeartOutline className="heart text-7xl text-gray-400" onClick={() => likePlaylistHandler(playlist?._id)}/>
                ))
            }
            {playlist?.user?._id === user && (
              <RiEditCircleLine onClick={openModalHandler} style={{ fontSize: "3.2rem", color: "#fff" }}/>
            )}
          </div>

          <div className="playlist__songs md:px-10 xs:px-6">
            {/* {refresh !== true ? ( */}
              <List
                list={playlist.songs}
                onPlaylist={true}
                pId={playlist._id}
                // UserData={UserData}
                // fetchRemoveFromPlaylistWatcher={fetchRemoveFromPlaylistWatcher}
                // RemoveFromPlaylistData={RemoveFromPlaylistData}
                // fetchLikeSongWatcher={fetchLikeSongWatcher}
                // fetchDislikeSongWatcher={fetchDislikeSongWatcher}
              />
            {/* ) : (
              <Loading />
            )} */}
          </div>
        </div>
      ) : (
        <Loading fullHeight={true} />
      )}

      <Modal show={modal} onHide={closeModalHandler} className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-[50rem] xs:w-[27rem]  md:p-[2.4rem] xs:p-6 text-white bg-[#282828] rounded-[9px] shadow-[0_0_4rem_2rem_rgba(0,0,0,0.5)]">
        <Modal.Header className="flex justify-between mb-2">
          <Modal.Title>
            <h2 className="text-4xl mb-3">Edit playlist info</h2>
          </Modal.Title>
          <IoCloseCircle onClick={closeModalHandler} className="close-btn" />
        </Modal.Header>

        <Modal.Body>
          <form encType="multipart/form-data" id="updateForm" className="modal__form md:grid xs:block" onSubmit={formSubmitHandler}>
            <div className="modal__img">
              <img src={playlist?.img} alt="Playlist cover" className="md:w-[18rem] md:h-[18rem] xs:w-[15rem] xs:h-[15rem] mb-3"/>
              <input type="file" name="img" className="xs:mb-3" />
            </div>
            <div>
              <input type="text" name="name" placeholder={playlist?.name} defaultValue={playlist?.name}/>
              <textarea name="description" cols="30" placeholder="Add an optional description" defaultValue={playlist?.description}></textarea>
            </div>
            <div className="xs:flex">
              <Button type="submit" color="white" fullWidth={true}>
                Save
              </Button>
              <Button color="red" fullWidth={true}
                onClick={(e) => {
                  e.preventDefault();
                  deletePlaylistHandler(playlist._id);
                }}
              >
                Delete
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Playlist;
