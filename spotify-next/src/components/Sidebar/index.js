import React, { useEffect, useState } from "react";
import {
  RiHome4Fill,
  RiHome4Line,
  RiMusicFill,
  RiMusicLine,
  RiSearchFill,
  RiSearchLine,
  RiUserFill,
  RiUserLine,
} from "react-icons/ri";
import Library from "../Library";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { CgProfile } from "react-icons/cg";

function Sidebar() {
  const router = useRouter();
  const session = useSession();
  const role = session?.data?.user?.role;

  const [collapsed, setCollapsed] = useState(false);
  const [checkScreen, setScreen] = useState(0);


  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleResize = () => {
    const width = window.innerWidth;
    setScreen(width);
    if (width < 768) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  };

  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      setCollapsed(true);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <>
      <nav className={`nav h-full min-w-[36rem] m-[1.2rem] xs:m-[0.7rem] flex flex-col gap-[1.2rem] overflow-hidden transition-all duration-300 ${collapsed ? "collapsed" : ""}`}>
        <div className="nav__block">
          <Link href="/" className={`nav__link ${router.route === "/" ? "active" : ""}`} onClick={handleLinkClick}>
            <RiHome4Line className="line 2xl:text-5xl xs:text-4xl" />
            <RiHome4Fill className="fill 2xl:text-5xl xs:text-4xl" />
            {!collapsed && <span>Home</span>}
          </Link>

          <Link href="/search" className={`nav__link ${ router.route === "/search" ? "active" : "" }`} onClick={handleLinkClick}>
            <RiSearchLine className="line 2xl:text-5xl xs:text-4xl" />
            <RiSearchFill className="fill 2xl:text-5xl xs:text-4xl" />
              {!collapsed && <span>Search</span>}
          </Link>
        </div>

        <div className="nav__block library">
          <Library collapsed={collapsed} toggleCollapse={toggleCollapse} />
        </div>

        <div className="nav__block">
          {(role !== "user" && role !== "undefined") && (
            <Link href="/admin" className={`nav__link ${router.route === "/admin" ? "active" : ""}`} onClick={handleLinkClick}>
             <RiMusicLine className="line 2xl:text-5xl xs:text-4xl" />
             <RiMusicFill className="fill 2xl:text-5xl xs:text-4xl" />
              {!collapsed && <span>Admin</span>}
            </Link>
          )}

          {(role === "superAdmin" && role !== "undefined") && (
            <Link href="/listeners" className={`nav__link ${router.route === "/listeners" ? "active" : ""}`} onClick={handleLinkClick}>
              <RiUserLine className="line 2xl:text-5xl xs:text-4xl" />
              <RiUserFill className="fill 2xl:text-5xl xs:text-4xl" />
              {!collapsed && <span>Users</span>}
            </Link>
          )}

          <Link href="/profile" className={`nav__link ${router.route === "/profile" ? "active" : ""}`} onClick={handleLinkClick}>
            <CgProfile className="line 2xl:text-5xl xs:text-4xl" />
            <RiUserFill className="fill 2xl:text-5xl xs:text-4xl" />
            {!collapsed && <span>Profile</span>}
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Sidebar;
