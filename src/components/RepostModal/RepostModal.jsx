import React from "react";
import {
  RepostModalContainer,
  ModalContent,
  ModalTitle,
  ModalButtons,
} from "./styled";
import loadingImage from "../../assets/images/loadingImage.gif";

const RepostModal = ({ show, onClose, onConfirm, sharing }) => {
  return (
    <>
      {show && (
        <RepostModalContainer>
          {sharing ? (
            <img src={loadingImage} alt="Loading..." />
          ) : (
            <ModalContent>
              <ModalTitle>Do you want to re-post this link?</ModalTitle>
              <ModalButtons>
                <button data-test="cancel" onClick={onClose}>
                  No, cancel
                </button>
                <button
                  data-test="confirm"
                  onClick={onConfirm}
                  disabled={sharing}
                >
                  "Yes, share!"
                </button>
              </ModalButtons>
            </ModalContent>
          )}
        </RepostModalContainer>
      )}
    </>
  );
};

export default RepostModal;
