import React from 'react';
import { StyleSheet, View, Image, Platform, TouchableOpacity } from 'react-native';
import  AsyncStorage  from '@react-native-community/async-storage'
import { Button, Input } from 'react-native-elements';
import { sanFranciscoWeights } from 'react-native-typography'
import { robotoWeights } from 'react-native-typography'
import Icon from 'react-native-vector-icons/Ionicons';
import { useModal } from '../contexts/ModalContext';
import { IEditInfo }  from './../alias/IEditInfo';
import { IUser } from '../alias/IUser';
import IItem from '../alias/IItem';
import IPaymentData from '../alias/IPaymentData';

const EditInfoScreen : React.FC<IEditInfo> = ({ nome, cpf, endereco, telefone, dataPagamento, opened, janeiro, fevereiro, marco, abril, maio, junho, julho, agosto, setembro,outubro,novembro,dezembro}) => {
    const { setToggleEditInfo } = useModal();
    const save = async () => {
      let user : IUser = {
        nome: nome as string,
        cpf: cpf as string,
        endereco: endereco as string,
        telefone: telefone as string,
        dataPagamento: dataPagamento as string, 
        item: {nome: nome, cpf: cpf} as IItem,
        opened: opened as boolean,
        janeiro: janeiro,
        fevereiro: fevereiro,
        marco: marco,
        abril: abril,
        maio: maio,
        junho: junho,
        julho: julho,
        agosto: agosto,
        setembro: setembro,
        outubro: outubro,
        novembro: novembro,
        dezembro: dezembro,
        dataDePagamento: {
          janeiro: dataPagamento,
          fevereiro: dataPagamento,
          marco: dataPagamento,
          abril: dataPagamento,
          maio: dataPagamento,
          junho: dataPagamento,
          julho: dataPagamento,
          agosto: dataPagamento,
          setembro: dataPagamento,
          outubro: dataPagamento,
          novembro: dataPagamento,
          dezembro: dataPagamento,
        } as IPaymentData,
        subtitle: 'Cliente ativo',
        edited: false
      };
      try{
        const jsonValue = JSON.stringify(user);
        await AsyncStorage.setItem('@clientes', jsonValue)
      }catch(error){
        console.log(error);
      }
    }

    return(
        <View>
          <TouchableOpacity onPress={() => setToggleEditInfo(false)} style={styles.backPage}>
              <Icon size={60} name="ios-arrow-round-back" color='#3693d7'/>
          </TouchableOpacity>
        <View style={styles.formContainer}>
            <View style={styles.avatarContainer}>
                <Image source={require('./../assets/images/editinfo.jpg')} style={styles.avatar}/>
            </View>
            <View style={styles.formInputContainer}>
                <Input style={Platform.select({
                    ios: styles.formInputSelfFirstIOS,
                    // @ts-ignore
                    android: styles.formInputSelfFirstAndroid,
                })}
                placeholder='Nome Completo'
                defaultValue={nome}
                />
                  <Input style={Platform.select({
                      ios: styles.formInputSelfIOS,
                      // @ts-ignore
                      android: styles.formInputSelfAndroid,
                  })}
                placeholder='Cadastro de Pessoa Física (CPF)'
                defaultValue={cpf}
                />
                <Input style={Platform.select({
                    ios: styles.formInputSelfIOS,
                    // @ts-ignore
                    android: styles.formInputSelfAndroid,
                })}
                placeholder='Endereço'
                defaultValue={endereco}
                />
                <Input style={Platform.select({
                    ios: styles.formInputSelfIOS,
                    // @ts-ignore
                    android: styles.formInputSelfAndroid,
                })}
                placeholder='Telefone de Contato'
                defaultValue={telefone}
                />
                <Input style={Platform.select({
                    ios: styles.formInputSelfIOS,
                    // @ts-ignore
                    android: styles.formInputSelfAndroid,
                })}
                placeholder='Dia de pagamento do aluno (Ex: 10)'
                defaultValue={dataPagamento}
                />
                <Button
                style={Platform.select({
                ios: styles.confirmButtonIOS,
                // @ts-ignore
                android: styles.confirmButtonAndroid,
                })}
                title="Alterar dados"
                onPress={() => 
                  {
                    setToggleEditInfo(false)
                    save();
                  }
                }
                />
            </View>
        </View>
    </View>
    )
} 

const styles = StyleSheet.create({
    backPage:{
      zIndex: 1,
      position: 'absolute',
      left: 30,
      top: 0
    },
    confirmButtonAndroid: {
        marginTop: 11,
      ...robotoWeights.thin
      },
      confirmButtonIOS:{
        marginTop: 11,
      ...sanFranciscoWeights.thin
      },
      avatarContainer:{
        height: "40%",
        width: "100%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
      },
      avatar:{
        height: "100%",
        width: "40%",
        borderRadius: 180,
      },
      formContainer: {
        display: 'flex'
      },
      formInputContainer:{
        padding: 16,
      },
      formInputSelfIOS:{
        marginTop: 5,
        ...sanFranciscoWeights.thin
      },
      formInputSelfAndroid:{
        marginTop: 5,
        ...robotoWeights.thin
      },
      formInputSelfFirstIOS:{
        marginTop: 0,
        ...sanFranciscoWeights.thin
      },
      formInputSelfFirstAndroid:{
        marginTop: 0,
        ...robotoWeights.thin
      }
})
export default EditInfoScreen;