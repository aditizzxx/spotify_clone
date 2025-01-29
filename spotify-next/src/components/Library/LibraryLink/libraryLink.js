import Image from "next/image";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";

export default function LibraryLink({
    isArtist = true,
    to,
    img,
    pinned = false,
    children,
    collapsed,
    isLoading
}) {
  return (
    <>
      <Link className={`py-3.5 grid grid-cols-[auto,1fr] items-center text-inherit text-decoration-none rounded-md ${isArtist ? "library-link--artist" : ""} hover:bg-[#1b1b1b]`} style={{ gap: collapsed ? '0' : '1.6rem' }} href={to}>
        {isLoading ? (
          <>
            <Skeleton height={80} width={100} highlightColor="#E9E9E9" baseColor="#121212"/>
            <div className="flex flex-col gap-1">
              <Skeleton height={20} width={100} style={{ marginBottom: '0.5rem' }} highlightColor="#E9E9E9" baseColor="#121212"/>
              <Skeleton height={15} width={100} highlightColor="#E9E9E9" baseColor="#121212"/>
            </div>
          </>
        ) : (
          <>
            <Image src={img} alt="Heart" width={65} height={65} className="xs:w-20 lg:w-28"/>
            <div className="flex flex-col gap-1">
              <span className="font-medium text-white" style={{ display: collapsed ? 'none' : 'block' }}>
                {children}
              </span>
              <span className="font-medium text-2xl block" style={{ display: collapsed ? 'none' : 'block' }}>
                {pinned && "📌 - "}
                {isArtist ? "Artist" : "Playlist"}
              </span>
            </div>
          </>
        )}
      </Link>
    </>
  );
}
