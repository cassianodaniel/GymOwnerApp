import React from "react";
import { ModalProvider } from "./ModalContext";

const GlobalContextAPIProvider: React.FC = ({ children }) => {
  return (
    <ModalProvider>{children}</ModalProvider>
  );
};

export default GlobalContextAPIProvider;
