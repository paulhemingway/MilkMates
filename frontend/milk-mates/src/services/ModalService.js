import React, { createContext, useState, useContext } from "react";

// Create a context for storing the batch state and related methods
export const ModalContext = createContext();

// Define a function component that wraps its children with the AuthContext.Provider component
export const ModalProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState(<></>)

  const openModal = async (title, content) => {
    await setContent(content)
    await setTitle(title)
    setShowModal(true)
  }

  const closeModal = () => {
    setContent(<></>)
    setTitle("")
    setShowModal(false)
  }

  return (
    <ModalContext.Provider
      value={{
        showModal,
        content,
        title,
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
