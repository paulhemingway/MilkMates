import React, { createContext, useState, useContext } from "react";

// Create a context for storing the batch state and related methods
export const ModalContext = createContext();

// Define a function component that wraps its children with the AuthContext.Provider component
export const ModalProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false)
  const [content, setContent] = useState(<></>)

  const openModal = async (content) => {
    await setContent(content)
    setShowModal(true)
  }

  const closeModal = () => {
    setContent(<></>)
    setShowModal(false)
  }

  return (
    <ModalContext.Provider
      value={{
        showModal,
        content,
        openModal,
        closeModal
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalService = () => {
  return useContext(ModalContext);
};
