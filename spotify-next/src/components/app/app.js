import { useEffect } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetailsWatcher } from "src/store/actions";
import { getUserDetails } from "src/store/selectors";
import Link from "next/link";

export default function AppLayout({ children }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserDetailsWatcher());
}, []);

  const user = useSelector(getUserDetails);
  const userImg = user?.data.map((user) => user.img);
  return (
    <>
        <div className="app h-full mt-3.5 mr-3.5 relative overflow-hidden overflow-y-scroll bg-[#121212] rounded-lg">
        <div className="app__nav w-full absolute bg-transparent p-6 flex justify-between xs:p-5 md:p-6">
          <div className="app__nav__history flex gap-3 items-center">
            <div className="app__nav__history-icon h-16 w-16 xs:w-12 xs:h-12 flex items-center justify-center text-3xl text-white bg-black bg-opacity-70 rounded-full cursor-pointer">
              <RiArrowLeftSLine onClick={() => window.history.back()} />
            </div>
            <div className="app__nav__history-icon h-16 w-16 xs:w-12 xs:h-12 flex items-center justify-center text-3xl text-white bg-black bg-opacity-70 rounded-full cursor-pointer">
              <RiArrowRightSLine onClick={() => window.history.forward()} />
            </div>
          </div>
          <div className="app__nav__profile flex gap-6">
            <Link href="/premium" className="flex font-bold py-3 px-3 xs:px-4 text-3xl lg:text-2xl md:text-2xl xs:text-lg text-center text-black bg-[#1db954] border-none rounded-full cursor-pointer no-underline hover:bg-[#1aa74c] ">
              <span>Explore Premium</span>
            </Link>

           <Link href="/profile">
              <img
                crossOrigin="anonymous"
                src={userImg}
                alt=""
                className="app__nav__profile--img cursor-pointer"
              />
            </Link>
          </div>
        </div>
        {children}
      </div>
    </>
  );
}
