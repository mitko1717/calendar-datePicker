import { FC } from "react";

type ModalProps = {
  open: any;
  handleConfirm: any;
};

const Modal: FC<ModalProps> = ({ open, handleConfirm }) => {
  return (
    <>
      <div className={open ? "confirm show" : "confirm"}>
        <div className="confirm-content">
          <div>
            <p>Видалити час?</p>
          </div>
        </div>
        <div className="confirm-btns">
          <button onClick={() => handleConfirm(true)}>ТАК</button>
          <button onClick={() => handleConfirm(false)}>НІ</button>
        </div>
      </div>
      <div className="overlay" onClick={() => handleConfirm(false)} />
    </>
  );
};

export default Modal;
