import Image from "next/image";
import { useEffect, useState } from "react";
import { FcApproval, FcCancel } from "react-icons/fc";

export default function Listeners({
  fetchUserRoleDetailsAction,
  ListenerData,
  fetchApproveRequestDetailsWatcher,
  fetchDisApproveRequestDetailsWatcher,
  ApproveRequestData,
  DisApproveRequestData
}) {
  const [queryType, setQueryType] = useState("");

  useEffect(() => {
    if(queryType === ""){
      setQueryType("user");
      fetchUserRoleDetailsAction({ role: "user" });
    }
  }, [queryType]);


  useEffect(() => {
    if(ApproveRequestData?.status == 200 || DisApproveRequestData?.status == 200){
      fetchUserRoleDetailsAction({role: "pending request"});
    }
  },[ApproveRequestData,DisApproveRequestData])
  
  const changeTagHandler = (tag) => {
    setQueryType(tag);
    // console.log("tag" , tag);
    switch (tag) {
      case "user":
        fetchUserRoleDetailsAction({ role: tag });
        break;
      case "artist":
        fetchUserRoleDetailsAction({ role: tag });
        break;
      case "pending request":
        fetchUserRoleDetailsAction({ role: tag });
        break;
      default:
        break;
    }
  };

  const approveHandler = (id) => {
    fetchApproveRequestDetailsWatcher({id});
  };

  const disapproveHandler = (id) => {
    fetchDisApproveRequestDetailsWatcher({id});
  };

  return (
    <>
      <div className="search">
        <div className="users">
          <ul className="search__tags">
            <li className={"search__tag " + (queryType === "user" && "search__tag--active")} onClick={() => changeTagHandler("user")}>
              User
            </li>
            <li className={"search__tag " + (queryType === "artist" && "search__tag--active")} onClick={() => changeTagHandler("artist")}>
              Artist
            </li>
            <li className={"search__tag " + (queryType === "pending request" && "search__tag--active")} onClick={() => changeTagHandler("pending request")}>
              Request
            </li>
          </ul>
        </div>

        <div className="list">
          {ListenerData && ListenerData.map((el, i) => (
              <div className="list__item" key={el?._id}>
                <span className="list__num">{i + 1}</span>

                <Image src={el?.img} alt="user profile image" width={100} height={54}/>
                <span className="list__artist-name">{el?.name}</span>

                <span>{el?.email}</span>
                
                <span className="status__btn">
                  {queryType == "pending request" && el?.becomeArtist?.status === "pending" && (
                      <>
                        <FcApproval onClick={() => approveHandler(el?._id)} className="approval-icon" /> {"  "}
                        <FcCancel onClick={() => disapproveHandler(el?._id)} className="disapproval-icon"/>
                      </>
                  )}
                </span>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
