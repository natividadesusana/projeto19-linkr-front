import React from "react";
import {
  DeleteModalContainer,
  ModalContent,
  ModalTitle,
  ModalButtons,
} from "./styled";
import loadingImage from "../../assets/images/loadingImage.gif";

const DeleteModal = ({ show, onClose, onConfirm, deleting }) => {
  return (
    <>
      {show && (
        <DeleteModalContainer>
          {deleting ? (
            <img src={loadingImage} alt="Loading..." />
          ) : (
            <ModalContent>
              <ModalTitle>
                Are you sure you want to delete this post?
              </ModalTitle>
              <ModalButtons>
                <button onClick={onClose}>No, go back</button>
                <button onClick={onConfirm} disabled={deleting}>
                  "Yes, delete it"
                </button>
              </ModalButtons>
            </ModalContent>
          )}
        </DeleteModalContainer>
      )}
    </>
  );
};

export default DeleteModal;
