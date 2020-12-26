import IPaymentData from './../alias/IPaymentData';
import IItem from './../alias/IItem';

export interface IUser{
    edited?: boolean,
    cpf: string, 
    nome: string, 
    dataPagamento: string, 
    endereco: string, 
    telefone: string,   
    opened: boolean,     
    janeiro: boolean,
    fevereiro: boolean,
    marco: boolean,
    abril: boolean,
    maio: boolean,
    junho: boolean,
    julho: boolean,
    agosto: boolean,
    setembro: boolean,
    outubro: boolean,
    novembro: boolean,
    dezembro: boolean,
    item: IItem,
    subtitle: string,
    dataDePagamento : IPaymentData
}