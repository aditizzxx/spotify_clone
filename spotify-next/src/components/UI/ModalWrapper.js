// import "./ModalWrapper.scss";
import { useRef } from "react";
import { RiCloseCircleFill } from "react-icons/ri";

const ModalWrapper = ({
  heading,
  open = false,
  type = "",
  handleClose,
  children,
}) => {
  const modalRef = useRef();

  return (
    <dialog className={`modal-wrapper md:w-[38rem] md:p-7 xs:w-[30rem] xs:p-6  ${type ? "modal-wrapper--" + type : null}`} ref={modalRef} open={open}>
      <header className="modal-wrapper__header">
        <h2>{heading}</h2>
        <RiCloseCircleFill className="modal-wrapper__close" onClick={handleClose}/>
      </header>
      {children}
    </dialog>
  );
};

export default ModalWrapper;