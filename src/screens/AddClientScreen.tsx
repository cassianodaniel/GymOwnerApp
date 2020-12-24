import AsyncStorage from '@react-native-community/async-storage';
import React, {useState} from 'react';
// @ts-ignore
import { StyleSheet, View, Image, Platform, Alert} from 'react-native';
import { Button, Input } from 'react-native-elements';
import { sanFranciscoWeights } from 'react-native-typography'
import { robotoWeights } from 'react-native-typography'
import { IUser } from '../alias/IUser';
import { useModal } from '../contexts/ModalContext';

const AddClientScreen = () => {
  const save = async () => {
    let user : IUser = {
      nome: nome,
      cpf: cpf,
      endereco: endereco,
      telefone: telefone,
      dataPagamento: dataPagamento,
      item: {
        nome: nome,
        cpf: cpf,
      },
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
      subtitle: 'Cliente ativo',
      dataDePagamento:{
        janeiro: `${dataPagamento}`,
        fevereiro: `${dataPagamento}`,
        marco: `${dataPagamento}`,
        abril: `${dataPagamento}`,
        maio: `${dataPagamento}`,
        junho: `${dataPagamento}`,
        julho: `${dataPagamento}`,
        agosto: `${dataPagamento}`,
        setembro: `${dataPagamento}`,
        outubro: `${dataPagamento}`,
        novembro: `${dataPagamento}`,
        dezembro: `${dataPagamento}`,
      }
    };

    /* setUsers([...users, user]); */
    users.push(user);
    
    try{
      const jsonValue = JSON.stringify(users);
      await AsyncStorage.setItem('@clientes', jsonValue);
      Alert.alert(JSON.stringify(users.filter((item) => item.nome)));
      setNome('');
      setCpf('');
      setTelefone('');
      setEndereco('');
      setDataPagamento('');
      try{
        const value = await AsyncStorage.getItem('@clientes');
        if(value){
          const JSONParse : IUser[] = JSON.parse(value);
          setUsers(JSONParse as IUser[]);
        }
      }catch(error){
        console.log('Erro no get!', error);
      }
      Alert.alert("Sucesso! Cliente cadastrado e get executado!")    
    }catch(error){
      console.log('Erro no SET do asyncStorage', error);
    }
  }
  const { users, setUsers } = useModal();
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [dataPagamento, setDataPagamento] = useState('');
  return(
    <View> 
      <View style={styles.formContainer}>
        <View style={styles.avatarContainer}>
            <Image source={require('./../assets/images/default.png')} style={styles.avatar}/>
        </View>
        <View style={styles.formInputContainer}>
          <Input style={Platform.select({
              ios: styles.formInputSelfFirstIOS,
              // @ts-ignore
              android: styles.formInputSelfFirstAndroid,
            })}
            placeholder='Nome Completo'
            onChangeText={(e) => 
              setNome(e)
            }
          />
          <Input style={Platform.select({
              ios: styles.formInputSelfIOS,
              // @ts-ignore
              android: styles.formInputSelfAndroid,
            })}
            placeholder='Cadastro de Pessoa Física (CPF)'
            onChangeText={(e) => 
              setCpf(e)
            }
          />
          <Input style={Platform.select({
              ios: styles.formInputSelfIOS,
              // @ts-ignore
              android: styles.formInputSelfAndroid,
            })}
            placeholder='Endereço'
            onChangeText={(e) => 
              setEndereco(e)
            }
          />
          <Input style={Platform.select({
              ios: styles.formInputSelfIOS,
              // @ts-ignore
              android: styles.formInputSelfAndroid,
            })}
            placeholder='Telefone de Contato'
            onChangeText={(e) => 
              setTelefone(e)
            }
          />
          <Input style={Platform.select({
              ios: styles.formInputSelfIOS,
              // @ts-ignore
              android: styles.formInputSelfAndroid,
            })}
            placeholder='Dia de pagamento do aluno (Ex: 10)'
            onChangeText={(e) => 

              setDataPagamento(e)
            }
          />
          <Button
          style={Platform.select({
            ios: styles.confirmButtonIOS,
            // @ts-ignore
            android: styles.confirmButtonAndroid,
          })}
            title="Cadastrar cliente"
            onPress={() => save()}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

AddClientScreen.navigationOptions = {
  title: 'Cadastrar cliente',
  headerStyle: { backgroundColor: '#3693d7' },
  headerTitleStyle: { color: 'white' },
};

export default AddClientScreen;
