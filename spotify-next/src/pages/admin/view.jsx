import { useEffect, useRef, useState } from "react";
import Button from "src/components/UI/Button";
import Input from "src/components/UI/Input";
import List from "src/components/UI/List";
import Loading from "src/components/UI/Loading";
import ModalWrapper from "src/components/UI/ModalWrapper";

const Admin = ({
  CreateSongData,
  fetchCreateSongWatcher,
  ViewSongData,
  fetchViewSongsWatcher,
  fetchViewPlaylistsDetailsWatcher,
  LikeSongData,
  fetchUserDetailsWatcher,
  DislikeSongData,
  UpdateSongData,
  fetchUpdateSongWatcher,
  DeleteSongData,
  fetchDeleteSongWatcher,
  SongDetails,
}) => {
  // console.log(useSelector(state => state));
  const [song, setSong] = useState({});
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [rerenderState, setRerenderState] = useState(false);

  const id = song?._id
  const uploadFormRef = useRef(null);
  useEffect(()=>{
    fetchViewPlaylistsDetailsWatcher();
  },[])

  // Upload song handlers
  const handleOpenModal = () => {
    setUploadModalOpen(true);
  };

  const handleCloseModal = () => {
    uploadFormRef.current.reset();
    setUploadModalOpen(false);
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const form = document.getElementById("uploadSongForm");
    const formData = new FormData(form);
    const img = formData.get("img");
    const song = formData.get("song");
    const data = Object.fromEntries(
      [...formData.entries()].filter(
        ([key, value]) => key !== "img" && key !== "song"
      )
    );
    fetchCreateSongWatcher({ img, song, data });
    setRerenderState(true);
    handleCloseModal();
  };

  useEffect(() => {
    fetchViewSongsWatcher({sort:"",limit:0});
  }, []);

  useEffect(() => {
    if (CreateSongData?.status === 200 || UpdateSongData?.status === 200 || DeleteSongData?.status === 200 || SongDetails?.status === 200) {
      fetchViewSongsWatcher({sort:"",limit:0});
      setRerenderState(false);
    }
  }, [CreateSongData?.status,UpdateSongData?.status,DeleteSongData?.status,SongDetails?.status]);

  const songs = ViewSongData;
  // console.log(songs);

  useEffect(() => {
    if (LikeSongData?.status === 200 || DislikeSongData?.status === 200 ) {
      fetchUserDetailsWatcher();
      setRerenderState(false);
    }
  }, [LikeSongData?.status, DislikeSongData?.status]);

  // Edit song handlers
  const handleOpenEditModal = (id) => {
    const selectedSong = songs?.find((song) => song._id === id);
    setSong(selectedSong);
    setEditModalOpen(true);
  };
  const handleCloseEditModal = () => setEditModalOpen(false);

  const editFormSubmitHandler = (e) => {
    e.preventDefault();
    const form = document.getElementById("updateSongForm");
    const formData = new FormData(form);
    const img = formData.get("img");
    const data = Object.fromEntries(
      [...formData.entries()].filter(([key, value]) => key !== "img")
    );
    fetchUpdateSongWatcher({data,img,id:song?._id});
    setEditModalOpen(false);
  };

  //delete song
  const deleteSongHandler = (id) => {
    fetchDeleteSongWatcher({id});
    setEditModalOpen(false);
  };

  const uploadModal = () => {
    return (
      <ModalWrapper
        heading="Upload song"
        open={uploadModalOpen}
        handleClose={handleCloseModal}
      >
        <form id="uploadSongForm"
          ref={uploadFormRef}
          onSubmit={formSubmitHandler}>
          <label htmlFor="img">Img</label>
          <Input id="img" type="file" name="img" placeholder="Img" />

          <label htmlFor="song">Song</label>
          <Input type="file" name="song" id="song" />

          <label htmlFor="name">Name</label>
          <Input type="text" name="name" id="name" placeholder="Song name" />

          <Button type="submit" color="white" fullWidth={true}>
            Upload
          </Button>
        </form>
      </ModalWrapper>
    );
  };

  const editModal = () => {
    return (
      <ModalWrapper
        heading="Update song"
        open={editModalOpen}
        handleClose={handleCloseEditModal}
      >
        <form
          // ref={editFormRef}
          onSubmit={editFormSubmitHandler} id="updateSongForm">
          <img src={song?.img} alt="Song cover" name="img"/>
          <Input type="file" name="img" placeholder="Img"/>

          <label htmlFor="name">Name</label>
          <Input id="name" type="text" name="name" defaultValue={song?.name}/>

          <Button type="submit" color="white" fullWidth={true}>Update</Button>
          <Button color="red" fullWidth={true}
            onClick={(e) => {
              e.preventDefault();
              deleteSongHandler(song._id);
            }}
          >
            Delete
          </Button>
        </form>
      </ModalWrapper>
    );
  };

  return (
    <>
      {songs ? (
        <div className="admin">
          <div className="admin__header md:grid xs:block xs:py-24 xs:px-6  ">
            <div className="admin__card md:p-14  xs:my-4 xs:p-6">
              <span className="md:text-8xl max-[767px]:text-7xl">{songs?.length}</span> songs
            </div>
            <div className="admin__card md:p-14 xs:my-4 xs:p-6 ">
              <span className="md:text-8xl max-[767px]:text-7xl">
                {songs?.reduce((acc, song) => acc + song?.plays, 0)}
              </span>
              plays
            </div>
            <div className="admin__card md:p-14 xs:my-4 xs:p-6" onClick={handleOpenModal}>
              <span className="md:text-8xl max-[767px]:text-7xl">+</span> upload new
            </div>
          </div>
          <div className="admin__list">
            {rerenderState !== true ? (
              <List list={songs} admin={true} handleOpenEditModal={handleOpenEditModal}/>
            ) : (
              <Loading />
            )}
          </div>
        </div>
      ) : (
        <Loading />
      )}
      {uploadModal()}
      {editModal()}

    </>
  );
};

export default Admin;
