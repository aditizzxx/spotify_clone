import { useEffect, useRef, useState } from "react";
import { RiLogoutBoxLine } from "react-icons/ri";
import Button from "src/components/UI/Button";
import Input from "src/components/UI/Input";
import { signOut, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { BsQrCodeScan } from "react-icons/bs";
import { useRouter } from "next/router";
import ModalWrapper from "src/components/UI/ModalWrapper";

const Profile = ({
  fetchUpdatePasswordWatcher,
  UpdatePasswordData,
  UpdatePasswordError,
  fetchUpdateUserWatcher,
  UpdateUserInfoData,
  fetchUserDetailsWatcher,
  UserData,
  fetchArtistRoleWatcher,
  BecomeArtist,
}) => {
  const session = useSession();
  const formInfoRef = useRef();
  const formPassRef = useRef();

  const [qrCode, setQrCode] = useState("");
  const [bgColor, setBgColor] = useState("ffffff");
  const [size, setSize] = useState(400);
  const [showQrCode, setShowQrCode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const router = useRouter();
  // const profileUrl = `http://localhost:3000${router.asPath}`;
  const profileUrl = `https://musicplayerspotifyapp.netlify.app${router.asPath}`;

  const formInfoHandler = (e) => {
    e.preventDefault();
    const form = document.getElementById("userInfo");
    const formData = new FormData(form);
    const photo = formData.get("photo");
    const userImg = photo.name;
    const data = Object.fromEntries(
      [...formData.entries()].filter(([key, value]) => key !== "photo")
    );

    fetchUpdateUserWatcher({ data, userImg, photo });
  };

  const formPassHandler = (e) => {
    e.preventDefault();
    const data = {
      currentPassword: e.target[0].value,
      password: e.target[1].value,
      passwordConfirm: e.target[2].value,
    };
    fetchUpdatePasswordWatcher(data);
    formPassRef.current.reset();
  };

  const updatePasswordError = UpdatePasswordError;
  useEffect(() => {
    if (updatePasswordError?.status === 401) {
      toast.error(updatePasswordError?.data?.message);
    }
  }, [updatePasswordError]);

  const UserInfo = UpdateUserInfoData;
  useEffect(() => {
    if (UserInfo?.status === 200 || BecomeArtist?.status === 200) {
      fetchUserDetailsWatcher();
    }
  }, [UserInfo, BecomeArtist]);

  // useEffect(() => {
  //   if (UserData?.data[0]?.becomeArtist?.forcedLogout == 2) {
  //     fetchArtistRoleWatcher({ forceLogout: true });
  //     signOut();
  //   }
  // }, [UserData]);

  useEffect(() => {
    fetchUserDetailsWatcher();
  }, [BecomeArtist]);

  useEffect(() => {
    if (session) {
      const userDetails = `${profileUrl}`;
      setQrCode(
        `http://api.qrserver.com/v1/create-qr-code/?data=${userDetails}!&size=${size}x${size}&bgcolor=${bgColor}`
      );
    }
  }, [session, size, bgColor]);
  
  const becomeArtistHandler = () => {
    setModalOpen(true);
    fetchArtistRoleWatcher();
  };

  const logoutHandler = () => {
    window.localStorage.removeItem("session");
    signOut();
  };

  const QRcodeHandler = () => {
    if (session) {
      const userDetails = `profileUrl:${profileUrl}`;
      setQrCode(
        `http://api.qrserver.com/v1/create-qr-code/?data=${userDetails}!&size=${size}x${size}&bgcolor=${bgColor}`
      );
    }
    setShowQrCode(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  // console.log(BecomeArtist);
  return (
    <>
      {UserData?.data.map((user) => (
        <div className="profile text-white">
          <div className="profile__header md:h-[34rem] xs:h-[30rem]">
            <div className="profile__photo">
              <img src={user.img} alt="Avatar" className="md:h-72 max-[767px]:h-[9rem] rounded-full"/>
            </div>
            <div className="profile__info">
              <span>Profile</span>
              <h1 className="profile__name mb-10 max-[767px]:mb-5 md:text-8xl font-bold xs:text-6xl">{user?.name}</h1>
              <span>{user?.followedArtists.length} Following</span>
            </div>
          </div>
          <div className="profile__body md:p-10 xs:p-6">
            <div className="profile__form">
            <h2 className="md:text-4xl xs:text-3xl mb-12 font-bold">Update your information</h2>
              <form ref={formInfoRef} onSubmit={formInfoHandler} id="userInfo" className="items-center md:grid xs:flex xs:flex-wrap pb-9">
                <label htmlFor="name" className="justify-self-end">Name</label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  minLength="3"
                  maxLength="24"
                  defaultValue={user?.name}
                  placeholder={user?.name}
                  required
                />
               <label htmlFor="email" className="justify-self-end">Email</label>
                <Input
                  type="text"
                  name="email"
                  id="email"
                  defaultValue={user?.email}
                  placeholder={user?.email}
                  required
                />
                <label htmlFor="photo" className="justify-self-end">Photo</label>
                <Input type="file" name="photo" accept="image/*" required />
                <Button type="submit">Update</Button>
              </form>
              <h2 className="md:text-4xl xs:text-3xl mb-12 font-bold">Update your password</h2>
              <form
                id="updatePasswordForm"
                ref={formPassRef}
                onSubmit={formPassHandler}
                className="items-center md:grid xs:flex xs:flex-wrap pb-9"
              >
                <label htmlFor="oldPassword" className="justify-self-end">Old password</label>
                <Input
                  type="password"
                  name="oldPassword"
                  id="oldPassword"
                  minLength="8"
                  maxLength="16"
                  required
                />
              <label htmlFor="newPassword" className="justify-self-end">New password</label>
                <Input
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  minLength="8"
                  maxLength="16"
                  required
                />
               <label htmlFor="confirmPassword" className="justify-self-end">Confirm password</label>
                <Input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  minLength="8"
                  maxLength="16"
                  required
                />
                <Button type="submit" >Update</Button>
              </form>

              {user?.role === "user" &&  user?.becomeArtist?.status == "pending" ? (
                <p style={{ color: "#22c55e" }}> Pending Request ... </p>
              ) : (  user?.role === "user" && (
                  <p onClick={becomeArtistHandler} style={{ color: "#22c55e", cursor: "pointer" }}>
                    🎤 Become an Artist
                  </p>
                )
              )}
              <p onClick={logoutHandler} className="flex text-red-500 cursor-pointer mb-1 gap-2">
                <RiLogoutBoxLine className="mt-2" /> Log out
              </p>
              <p onClick={QRcodeHandler} className="flex text-green-500 cursor-pointer mb-1 gap-2">
                <BsQrCodeScan className="mt-2" /> Generate QR
              </p>
            </div>
          </div>

          <div className="qr-code-section">
            {showQrCode && (
              <>
                <div className="qr-code-section">
                  <h2>Generate QR Code</h2>
                  <div>
                    <label htmlFor="bgColor">Background Color:</label>
                    <input
                      type="color"
                      id="bgColor"
                      value={`#${bgColor}`}
                      onChange={(e) => setBgColor(e.target.value.substring(1))}
                    />
                  </div>
                  <div>
                    <label htmlFor="size">Dimension:</label>
                    <input
                      type="range"
                      id="size"
                      min="10"
                      max="500"
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                    />
                  </div>
                </div>
                <img src={qrCode} alt="QR Code" />
                <a href={qrCode} download="QRCode">
                  <Button type="button">Download</Button>
                </a>
              </>
            )}
          </div>
        </div>
      ))}
      {/* : (
         <div>Really?? You are not logged in man!!</div>
       ))} */}

      {/* //////////////// modal ////////////////// */}
      <ModalWrapper
        heading="Send Request"
        open={modalOpen}
        handleClose={handleCloseModal}
      >
        <p>Reuest has been sent. It will take around 48 hours for approval.</p>
      </ModalWrapper>
    </>
  );
};
export default Profile;
