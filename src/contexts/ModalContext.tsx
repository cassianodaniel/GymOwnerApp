import React, { createContext, useContext, useState } from "react";
import { IEditInfo } from "../alias/IEditInfo";
import { IUser } from "../alias/IUser";

interface IModalContext {
  toggleEditInfo: boolean;
  setToggleEditInfo(value: boolean): void;
  toggleEditInfo2: boolean;
  setToggleEditInfo2(value: boolean): void;
  users: IUser[];
  setUsers(value: IUser[]): void;

}

export const ModalContext = createContext<IModalContext>({} as IModalContext);

export const ModalProvider: React.FC = ({ children }) => {
  const [toggleEditInfo, setToggleEditInfo] = useState(false);
  const [toggleEditInfo2, setToggleEditInfo2] = useState(false);
  const [users, setUsers] = useState<IUser[]>([
    {
      cpf: '', 
      nome: '', 
      dataPagamento: '', 
      endereco: '', 
      telefone: '',   
      opened: false,     
      janeiro: false,
      fevereiro: false,
      marco: false,
      abril: false,
      maio: false,
      junho: false,
      julho: false,
      agosto: false,
      setembro: false,
      outubro: false,
      novembro: false,
      dezembro: false,
      item: {
        nome: '',
        cpf: ''
      },
      subtitle: 'Atleta',
      dataDePagamento: {
        janeiro: 'dd/mm/yyyy',
        fevereiro: 'dd/mm/yyyy',
        marco: 'dd/mm/yyyy',
        abril: 'dd/mm/yyyy',
        maio: 'dd/mm/yyyy',
        junho: 'dd/mm/yyyy',
        julho: 'dd/mm/yyyy',
        agosto: 'dd/mm/yyyy',
        setembro: 'dd/mm/yyyy',
        outubro: 'dd/mm/yyyy',
        novembro: 'dd/mm/yyyy',
        dezembro: 'dd/mm/yyyy',
      },
      edited: false
    }
  ]);

  return (
    <ModalContext.Provider
      value={{
          toggleEditInfo,
          setToggleEditInfo,
          toggleEditInfo2,
          setToggleEditInfo2,
          users,
          setUsers,

      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export function useModal() {
  return useContext(ModalContext);
}
