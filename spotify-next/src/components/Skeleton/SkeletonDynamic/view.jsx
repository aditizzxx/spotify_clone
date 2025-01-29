import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonDynamic = ({ height, width, bgColor, count, space, aspectVideo, aspectSquare}) => {
    return (
        <>
        <div style={{background: `${bgColor}`}}>
            <SkeletonTheme baseColor="#C8C9CB" highlightColor="#E9E9E9">
            <Skeleton
                count={count}
                containerClassName={`${space != null ? "space-y-["+space+"px]" : "space-y-[20px]"} max-w-[${width}px] mx-auto -mt-[4px] block`}
                style={{ height: `${height}px`}}
                borderRadius={5}
                className={`${aspectVideo == true ? "!aspect-video" : null} ${aspectSquare == true ? "aspect-square" : null}`}
            />
            </SkeletonTheme>
        </div>
        </>
    )
}

export default SkeletonDynamic;