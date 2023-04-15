/* eslint-disable */
import { useRef, useEffect } from "react";

function useDocumentTitle(title, prevailOnUnmount = false) {
  const defaultTitle = useRef(document.title);

  useEffect(() => {
    document.title = title + " | MilkMates";
  }, [title]);

  useEffect(() => {
    setTitle()
  }, []);

  const setTitle = () => {
    if (!prevailOnUnmount) {
      document.title = defaultTitle.current;
    }
  };
}

export default useDocumentTitle;
