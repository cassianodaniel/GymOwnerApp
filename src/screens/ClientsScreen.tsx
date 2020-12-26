import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import AwesomeAlert from 'react-native-awesome-alerts';
import { View, Text, StyleSheet, Platform, Image, Alert } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { ListItem  } from 'react-native-elements'
import { Searchbar } from 'react-native-paper';
import { useModal } from '../contexts/ModalContext';
import { sanFranciscoWeights } from 'react-native-typography'
import { robotoWeights } from 'react-native-typography'
import { IUser } from '../alias/IUser';
import { Button, Input } from 'react-native-elements';

const ClientsScreen = (): JSX.Element => {
  const { toggleEditInfo, toggleEditInfo2 } = useModal();
  const [search, setSearch] = useState("");
  const { users, setUsers } = useModal();
  const [editNome, setEditNome] = useState('');
  const [editCpf, setEditCpf] = useState('');
  const [editEndereco, setEditEndereco] = useState('');
  const [editTelefone, setEditTelefone] = useState('');
  const [editDataPagto, setEditDataPagto] = useState('');

  const get = async () => {
    try{
      const value = await AsyncStorage.getItem('@clientes');
      if(value){
        const JSONParse : IUser[] = JSON.parse(value);
        setUsers(JSONParse as IUser[]);
      }
    }catch(error){
      console.log('Erro no get!', error);
    }
  };

  const searchArray = (users: IUser[], search: string) => {
    return users.filter((item) => {
      return item.nome.toUpperCase().match(search.toUpperCase());
    });
  };

  const componentUpdate = async () => {
    const jsonValue = JSON.stringify(users);
    await AsyncStorage.setItem('@clientes', jsonValue);
  }

  const eraseData = () => {
    setEditNome('');
    setEditCpf('');
    setEditEndereco('');
    setEditTelefone(''); 
    setEditDataPagto('');
  }

  useEffect(() => {
    get();
  }, [users])

  return (
    <>
    <ScrollView>
      {!toggleEditInfo &&
        <> 
          <View style={styles.searchBarContainer}>
            {/*@ts-ignore*/}
            <Searchbar
              placeholder="Procurar cliente"
              style={styles.searchBar}
              onLayout={() => get()}
              onChangeText={(e) => setSearch(e)}
            />
          </View>
        </>
      }
      {!toggleEditInfo /* && users && console.log('Assim está users:', users) */ &&
        searchArray(users, search).map((item: IUser, i: any) => (
          item.nome !== '' &&
          (!toggleEditInfo2 ? <View style={styles.clientsContainer} key={i}>
          <ListItem style={styles.clientsItem}> 
            <ListItem.Content>
              <View style={styles.clientsInformationContainer}>
                <Icon name="ios-person" size={30} style={styles.removeClient}/>
                <View style={styles.clientsInformation}>
                  <TouchableOpacity onPress={() => 
                    {
                      if(item.edited === false){
                        item.opened = !item.opened;
                      }else{
                        item.edited = false;
                        item.opened = !item.opened;
                      }
                      componentUpdate();
                    }
                  }>
                    <ListItem.Title>
                    <Text 
                      style={Platform.select({
                      ios: styles.itemNomeIOS,
                      // @ts-ignore
                      android: styles.itemNomeAndroid,
                    })}>{item.nome}</Text>
                  </ListItem.Title>
                    <ListItem.Subtitle>
                      <Text 
                        style={Platform.select({
                          ios: styles.itemSubtitleIOS,
                          // @ts-ignore
                          android: styles.itemSubtitleAndroid,
                      })}>{item.subtitle}</Text>
                    </ListItem.Subtitle>
                  </TouchableOpacity>
                </View>
              </View>   
            </ListItem.Content>
              <TouchableOpacity onPress={() => {
                  if(item.edited === false){
                    item.edited = true;
                  }else{
                    item.edited = false;
                  }
                  item.opened = false;
                  componentUpdate();
                }}>
                <Icon name="md-create" size={30} color={"gray"} style={styles.editClients}/>
              </TouchableOpacity>
              
              <TouchableOpacity onPress={() => {
                item.nome = '';
                componentUpdate();
              }
              }>
                <Icon name="ios-trash" size={30} color={"gray"} style={styles.removeClientFirst}/>
              </TouchableOpacity>
          
          </ListItem>

              { item.edited && <View>
                    <View style={styles.formContainer}>
                      <View style={styles.avatarContainer}>
{/*                         <Image source={require('./../assets/images/editinfo.jpg')} style={styles.avatar}/>*/}                          
                            </View>
                              <View style={styles.formInputContainer}>
                                <Input style={Platform.select({
                                    ios: styles.formInputSelfFirstIOS,
                                    // @ts-ignore
                                    android: styles.formInputSelfFirstAndroid,
                                })}
                                placeholder='Nome Completo'
                                defaultValue={item.nome}
                                onChangeText={(e) => setEditNome(e)}
                                />
                                  <Input style={Platform.select({
                                      ios: styles.formInputSelfIOS,
                                      // @ts-ignore
                                      android: styles.formInputSelfAndroid,
                                  })}
                                placeholder='Cadastro de Pessoa Física (CPF)'
                                defaultValue={item.cpf}
                                onChangeText={(e) => setEditCpf(e)}
                                />
                                <Input style={Platform.select({
                                    ios: styles.formInputSelfIOS,
                                    // @ts-ignore
                                    android: styles.formInputSelfAndroid,
                                })}
                                placeholder='Endereço'
                                defaultValue={item.endereco}
                                onChangeText={(e) => setEditEndereco(e)}
                                />
                                <Input style={Platform.select({
                                    ios: styles.formInputSelfIOS,
                                    // @ts-ignore
                                    android: styles.formInputSelfAndroid,
                                })}
                                placeholder='Telefone de Contato'
                                defaultValue={item.telefone}
                                onChangeText={(e) => setEditTelefone(e)}
                                />
                                <Input style={Platform.select({
                                    ios: styles.formInputSelfIOS,
                                    // @ts-ignore
                                    android: styles.formInputSelfAndroid,
                                })}
                                placeholder='Dia de pagamento do aluno (Ex: 10)'
                                defaultValue={item.dataPagamento}
                                onChangeText={(e) => setEditDataPagto(e)
                                }
                                />
                                <Button
                                style={Platform.select({
                                ios: styles.confirmButtonIOS,
                                // @ts-ignore
                                android: styles.confirmButtonAndroid,
                                })}
                                title="Salvar dados"
                                onPress={() => 
                                  {
                                      item.nome = editNome !== '' ? editNome : item.nome;
                                      item.cpf = editCpf !== '' ? editCpf : item.cpf;
                                      item.endereco = editEndereco !== '' ? editEndereco : item.endereco;
                                      item.telefone = editTelefone !== '' ? editTelefone : item.telefone;
                                      item.dataPagamento = editDataPagto !== '' ? editDataPagto : item.dataPagamento;
                                      item.dataDePagamento.janeiro = editDataPagto !== '' ? editDataPagto : item.dataDePagamento.janeiro;
                                      item.dataDePagamento.fevereiro = editDataPagto !== '' ? editDataPagto : item.dataDePagamento.fevereiro;
                                      item.dataDePagamento.marco = editDataPagto !== '' ? editDataPagto : item.dataDePagamento.marco;
                                      item.dataDePagamento.abril = editDataPagto !== '' ? editDataPagto : item.dataDePagamento.abril;
                                      item.dataDePagamento.maio = editDataPagto !== '' ? editDataPagto : item.dataDePagamento.maio;
                                      item.dataDePagamento.junho = editDataPagto !== '' ? editDataPagto : item.dataDePagamento.junho;
                                      item.dataDePagamento.julho = editDataPagto !== '' ? editDataPagto : item.dataDePagamento.julho;
                                      item.dataDePagamento.agosto = editDataPagto !== '' ? editDataPagto : item.dataDePagamento.agosto;
                                      item.dataDePagamento.setembro = editDataPagto !== '' ? editDataPagto : item.dataDePagamento.setembro;
                                      item.dataDePagamento.outubro = editDataPagto !== '' ? editDataPagto : item.dataDePagamento.outubro;
                                      item.dataDePagamento.novembro = editDataPagto !== '' ? editDataPagto : item.dataDePagamento.novembro;
                                      item.dataDePagamento.dezembro = editDataPagto !== '' ? editDataPagto : item.dataDePagamento.dezembro;
                                      item.edited = false;
                                      item.opened = false;
                                      componentUpdate();
                                      eraseData();
                                  }
                                }
                                />
                          </View>
                      </View>
                  </View> 
          } 
          
          { item.opened === true &&
            <>
            <ListItem>
                <ListItem.Content>
                  <View>
                    <View style={styles.clientsPaymentsContainer}>
                        <Icon name={item.janeiro === true ? "ios-checkmark" : "ios-close"} size={30} color={item.janeiro === true ? "#3693d7" : "red"} style={styles.checkPayment}/>
                      <View style={styles.clientPaymentsContainerColumn}>
                        <ListItem.Title><Text style={Platform.select({
                          ios: styles.titleIOS,
                          //@ts-ignore
                          android: styles.titleAndroid
                        })}>Janeiro: {item.dataDePagamento.janeiro.split('./')[0] === 'dd' ? "" : item.dataDePagamento.janeiro.split('./'[0])}</Text></ListItem.Title>
                        <ListItem.Subtitle><Text style={Platform.select({
                          ios: styles.subtitleIOS,
                          //@ts-ignore
                          android: styles.subtitleAndroid
                        })}>{item.janeiro === true ? 'Pagamento Efetuado' : 'Em aberto'}</Text></ListItem.Subtitle>
                      </View>
                    </View>
                  </View>
                </ListItem.Content>
                <TouchableOpacity onPress={
                  () => {
                    item.janeiro === true ? 
                  (item.janeiro = false)
                  :
                  (item.janeiro = true) 
                  componentUpdate();
                  }
                }>
                  <Icon name={item.janeiro === true ? "ios-trash" : "ios-card"} size={30} color={item.janeiro === true ? '#3693d7' : "gray"} style={item.janeiro === true ? styles.removeClientPaymnent : styles.checkPayment} />
                </TouchableOpacity>
              </ListItem>
  
              <ListItem>
                <ListItem.Content>
                    <View>
                      <View style={styles.clientsPaymentsContainer}>
                          <Icon name={item.fevereiro === true ? "ios-checkmark" : "ios-close"} size={30} color={item.fevereiro === true ? "#3693d7" : "red"} style={styles.checkPayment}/>
                        <View style={styles.clientPaymentsContainerColumn}>
                          <ListItem.Title><Text style={Platform.select({
                          ios: styles.titleIOS,
                          //@ts-ignore
                          android: styles.titleAndroid
                        })}>Fevereiro: {item.dataDePagamento.fevereiro.split('./')[0] === 'dd' ? "" : item.dataDePagamento.fevereiro.split('./'[0])}</Text></ListItem.Title>
                          <ListItem.Subtitle><Text style={Platform.select({
                          ios: styles.subtitleIOS,
                          //@ts-ignore
                          android: styles.subtitleAndroid
                        })}>{item.fevereiro === true ? 'Pagamento Efetuado' : 'Em aberto'}</Text></ListItem.Subtitle>
                        </View>
                      </View>
                    </View>
                  </ListItem.Content>
                  <TouchableOpacity onPress={
                  () => {
                    item.fevereiro === true ? 
                  (item.fevereiro = false)
                  :
                  (item.fevereiro = true) 
                  componentUpdate();
                  }
                }>
                  <Icon name={item.fevereiro === true ? "ios-trash" : "ios-card"}
                   size={30} color={item.fevereiro === true ? '#3693d7' : "gray"}
                  style={item.fevereiro === true ? styles.removeClientPaymnent : styles.checkPayment} />
                </TouchableOpacity>
              </ListItem>
              
              <ListItem>
                <ListItem.Content>
                    <View>
                      <View style={styles.clientsPaymentsContainer}>
                          <Icon name={item.marco === true ? "ios-checkmark" : "ios-close"} size={30} color={item.marco === true ? "#3693d7" : "red"} style={styles.checkPayment}/>
                        <View style={styles.clientPaymentsContainerColumn}>
                          <ListItem.Title><Text style={Platform.select({
                          ios: styles.titleIOS,
                          //@ts-ignore
                          android: styles.titleAndroid
                        })}>Março: {item.dataDePagamento.marco.split('./')[0] === 'dd' ? "" : item.dataDePagamento.marco.split('./'[0])}</Text></ListItem.Title>
                          <ListItem.Subtitle><Text style={Platform.select({
                          ios: styles.subtitleIOS,
                          //@ts-ignore
                          android: styles.subtitleAndroid
                        })}>{item.marco === true ? 'Pagamento Efetuado' : 'Em aberto'}</Text></ListItem.Subtitle>
                        </View>
                      </View>
                    </View>
                  </ListItem.Content>
                  <TouchableOpacity onPress={
                  () => {
                    item.marco === true ? 
                  (item.marco = false)
                  :
                  (item.marco = true) 
                  componentUpdate();
                  }
                }>
                  <Icon name={item.marco === true ? "ios-trash" : "ios-card"} size={30} color={item.marco === true ? '#3693d7' : "gray"} style={item.marco === true ? styles.removeClientPaymnent : styles.checkPayment} />
                </TouchableOpacity>
              </ListItem>
              
              <ListItem>
                <ListItem.Content>
                    <View>
                      <View style={styles.clientsPaymentsContainer}>
                          <Icon name={item.abril === true ? "ios-checkmark" : "ios-close"} size={30} color={item.abril === true ? "#3693d7" : "red"} style={styles.checkPayment}/>
                        <View style={styles.clientPaymentsContainerColumn}>
                          <ListItem.Title><Text style={Platform.select({
                          ios: styles.titleIOS,
                          //@ts-ignore
                          android: styles.titleAndroid
                        })}>Abril: {item.dataDePagamento.abril.split('./')[0] === 'dd' ? "" : item.dataDePagamento.abril.split('./'[0])}</Text></ListItem.Title>
                          <ListItem.Subtitle><Text style={Platform.select({
                          ios: styles.subtitleIOS,
                          //@ts-ignore
                          android: styles.subtitleAndroid
                        })}>{item.abril === true ? 'Pagamento Efetuado' : 'Em aberto'}</Text></ListItem.Subtitle>
                        </View>
                      </View>
                    </View>
                  </ListItem.Content>
                  <TouchableOpacity onPress={
                  () => {
                    item.abril === true ? 
                  (item.abril = false)
                  :
                  (item.abril = true) 
                  componentUpdate();
                  }
                  }>
                  <Icon name={item.abril === true ? "ios-trash" : "ios-card"} size={30} color={item.abril === true ? '#3693d7' : "gray"} style={item.abril === true ? styles.removeClientPaymnent : styles.checkPayment} />
                  </TouchableOpacity>
              </ListItem>
              <ListItem>
                <ListItem.Content>
                  <View>
                    <View style={styles.clientsPaymentsContainer}>
                        <Icon name={item.maio === true ? "ios-checkmark" : "ios-close"} size={30} color={item.maio === true ? "#3693d7" : "red"} style={styles.checkPayment}/>
                      <View style={styles.clientPaymentsContainerColumn}>
                        <ListItem.Title><Text style={Platform.select({
                          ios: styles.titleIOS,
                          //@ts-ignore
                          android: styles.titleAndroid
                        })}>Maio: {item.dataDePagamento.maio.split('./')[0] === 'dd' ? "" : item.dataDePagamento.maio.split('./'[0])}</Text></ListItem.Title>
                        <ListItem.Subtitle><Text style={Platform.select({
                          ios: styles.subtitleIOS,
                          //@ts-ignore
                          android: styles.subtitleAndroid
                        })}>{item.maio === true ? 'Pagamento Efetuado' : 'Em aberto'}</Text></ListItem.Subtitle>
                      </View>
                    </View>
                  </View>
                </ListItem.Content>
                <TouchableOpacity onPress={
                  () => {
                    item.maio === true ? 
                  (item.maio = false)
                  :
                  (item.maio = true) 
                  componentUpdate();
                  }
                }>
                  <Icon name={item.maio === true ? "ios-trash" : "ios-card"} size={30} color={item.maio === true ? '#3693d7' : "gray"} style={item.maio === true ? styles.removeClientPaymnent : styles.checkPayment} />
                </TouchableOpacity>
              </ListItem>
  
              <ListItem>
                <ListItem.Content>
                    <View>
                      <View style={styles.clientsPaymentsContainer}>
                          <Icon name={item.junho === true ? "ios-checkmark" : "ios-close"} size={30} color={item.junho === true ? "#3693d7" : "red"} style={styles.checkPayment}/>
                        <View style={styles.clientPaymentsContainerColumn}>
                          <ListItem.Title><Text style={Platform.select({
                          ios: styles.titleIOS,
                          //@ts-ignore
                          android: styles.titleAndroid
                        })}>Junho: {item.dataDePagamento.junho.split('./')[0] === 'dd' ? "" : item.dataDePagamento.junho.split('./'[0])}</Text></ListItem.Title>
                          <ListItem.Subtitle><Text style={Platform.select({
                          ios: styles.subtitleIOS,
                          //@ts-ignore
                          android: styles.subtitleAndroid
                        })}>{item.junho === true ? 'Pagamento Efetuado' : 'Em aberto'}</Text></ListItem.Subtitle>
                        </View>
                      </View>
                    </View>
                  </ListItem.Content>
                  <TouchableOpacity onPress={
                  () => {
                    item.junho === true ? 
                  (item.junho = false)
                  :
                  (item.junho = true) 
                  componentUpdate();
                  }
                }>
                  <Icon name={item.junho === true ? "ios-trash" : "ios-card"} size={30} color={item.junho === true ? '#3693d7' : "gray"} style={item.junho === true ? styles.removeClientPaymnent : styles.checkPayment} />
                </TouchableOpacity>
              </ListItem>
              
              <ListItem>
                <ListItem.Content>
                    <View>
                      <View style={styles.clientsPaymentsContainer}>
                          <Icon name={item.julho === true ? "ios-checkmark" : "ios-close"} size={30} color={item.julho === true ? "#3693d7" : "red"} style={styles.checkPayment}/>
                        <View style={styles.clientPaymentsContainerColumn}>
                          <ListItem.Title><Text style={Platform.select({
                          ios: styles.titleIOS,
                          //@ts-ignore
                          android: styles.titleAndroid
                        })}>Julho: {item.dataDePagamento.julho.split('./')[0] === 'dd' ? "" : item.dataDePagamento.julho.split('./'[0])}</Text></ListItem.Title>
                          <ListItem.Subtitle><Text style={Platform.select({
                          ios: styles.subtitleIOS,
                          //@ts-ignore
                          android: styles.subtitleAndroid
                        })}>{item.julho === true ? 'Pagamento Efetuado' : 'Em aberto'}</Text></ListItem.Subtitle>
                        </View>
                      </View>
                    </View>
                  </ListItem.Content>
                  <TouchableOpacity onPress={
                  () =>{
                    item.julho === true ? 
                  (item.julho = false)
                  :
                  (item.julho = true) 
                  componentUpdate();
                  }
                }>
                  <Icon name={item.julho === true ? "ios-trash" : "ios-card"} size={30} color={item.julho === true ? '#3693d7' : "gray"} style={item.julho === true ? styles.removeClientPaymnent : styles.checkPayment} />
                </TouchableOpacity>
              </ListItem>
              
              <ListItem>
                <ListItem.Content>
                    <View>
                      <View style={styles.clientsPaymentsContainer}>
                          <Icon name={item.agosto === true ? "ios-checkmark" : "ios-close"} size={30} color={item.agosto === true ? "#3693d7" : "red"} style={styles.checkPayment}/>
                        <View style={styles.clientPaymentsContainerColumn}>
                          <ListItem.Title><Text style={Platform.select({
                          ios: styles.titleIOS,
                          //@ts-ignore
                          android: styles.titleAndroid
                        })}>Agosto: {item.dataDePagamento.agosto.split('./')[0] === 'dd' ? "" : item.dataDePagamento.agosto.split('./'[0])}</Text></ListItem.Title>
                          <ListItem.Subtitle><Text style={Platform.select({
                          ios: styles.subtitleIOS,
                          //@ts-ignore
                          android: styles.subtitleAndroid
                        })}>{item.agosto === true ? 'Pagamento Efetuado' : 'Em aberto'}</Text></ListItem.Subtitle>
                        </View>
                      </View>
                    </View>
                  </ListItem.Content>
                  <TouchableOpacity onPress={
                  () =>{
                    item.agosto === true ? 
                  (item.agosto = false)
                  :
                  (item.agosto = true) 
                  componentUpdate();
                  }
                }>
                  <Icon name={item.agosto === true ? "ios-trash" : "ios-card"} size={30} color={item.agosto === true ? '#3693d7' : "gray"} style={item.agosto === true ? styles.removeClientPaymnent : styles.checkPayment} />
                </TouchableOpacity>
              </ListItem>
              <ListItem>
                <ListItem.Content>
                  <View>
                    <View style={styles.clientsPaymentsContainer}>
                        <Icon name={item.setembro === true ? "ios-checkmark" : "ios-close"} size={30} color={item.setembro === true ? "#3693d7" : "red"} style={styles.checkPayment}/>
                      <View style={styles.clientPaymentsContainerColumn}>
                        <ListItem.Title><Text style={Platform.select({
                          ios: styles.titleIOS,
                          //@ts-ignore
                          android: styles.titleAndroid
                        })}>Setembro: {item.dataDePagamento.setembro.split('./')[0] === 'dd' ? "" : item.dataDePagamento.setembro.split('./'[0])}</Text></ListItem.Title>
                        <ListItem.Subtitle><Text style={Platform.select({
                          ios: styles.subtitleIOS,
                          //@ts-ignore
                          android: styles.subtitleAndroid
                        })}>{item.setembro === true ? 'Pagamento Efetuado' : 'Em aberto'}</Text></ListItem.Subtitle>
                      </View>
                    </View>
                  </View>
                </ListItem.Content>
                <TouchableOpacity onPress={
                  () => {
                    item.setembro === true ? 
                    (item.setembro = false)
                    :
                    (item.setembro = true) 
                    componentUpdate(); 
                  }
                  }>
                  <Icon name={item.setembro === true ? "ios-trash" : "ios-card"} size={30} color={item.setembro === true ? '#3693d7' : "gray"} style={item.setembro === true ? styles.removeClientPaymnent : styles.checkPayment} />  
                </TouchableOpacity>
              </ListItem>
  
              <ListItem>
                <ListItem.Content>
                    <View>
                      <View style={styles.clientsPaymentsContainer}>
                          <Icon name={item.outubro === true ? "ios-checkmark" : "ios-close"} size={30} color={item.outubro === true ? "#3693d7" : "red"} style={styles.checkPayment}/>
                        <View style={styles.clientPaymentsContainerColumn}>
                          <ListItem.Title><Text style={Platform.select({
                          ios: styles.titleIOS,
                          //@ts-ignore
                          android: styles.titleAndroid
                        })}>Outubro: {item.dataDePagamento.outubro.split('./')[0] === 'dd' ? "" : item.dataDePagamento.outubro.split('./'[0])}</Text></ListItem.Title>
                          <ListItem.Subtitle><Text style={Platform.select({
                          ios: styles.subtitleIOS,
                          //@ts-ignore
                          android: styles.subtitleAndroid
                        })}>{item.outubro === true ? 'Pagamento Efetuado' : 'Em aberto'}</Text></ListItem.Subtitle>
                        </View>
                      </View>
                    </View>
                  </ListItem.Content>
                  <TouchableOpacity onPress={
                  () => {
                    item.outubro === true ? 
                  (item.outubro = false)
                  :
                  (item.outubro = true) 
                  componentUpdate();
                  }
                }>
                  <Icon name={item.outubro === true ? "ios-trash" : "ios-card"} size={30} color={item.outubro === true ? '#3693d7' : "gray"} style={item.outubro === true ? styles.removeClientPaymnent : styles.checkPayment} />
                </TouchableOpacity>
              </ListItem>
              
              <ListItem>
                <ListItem.Content>
                    <View>
                      <View style={styles.clientsPaymentsContainer}>
                          <Icon name={item.novembro === true ? "ios-checkmark" : "ios-close"} size={30} color={item.novembro === true ? "#3693d7" : "red"} style={styles.checkPayment}/>
                        <View style={styles.clientPaymentsContainerColumn}>
                          <ListItem.Title><Text style={Platform.select({
                          ios: styles.titleIOS,
                          //@ts-ignore
                          android: styles.titleAndroid
                        })}>Novembro: {item.dataDePagamento.novembro.split('./')[0] === 'dd' ? "" : item.dataDePagamento.novembro.split('./'[0])}</Text></ListItem.Title>
                          <ListItem.Subtitle><Text style={Platform.select({
                          ios: styles.subtitleIOS,
                          //@ts-ignore
                          android: styles.subtitleAndroid
                        })}>{item.novembro === true ? 'Pagamento Efetuado' : 'Em aberto'}</Text></ListItem.Subtitle>
                        </View>
                      </View>
                    </View>
                  </ListItem.Content>
                  <TouchableOpacity onPress={
                  () =>{
                    item.novembro === true ? 
                  (item.novembro = false)
                  :
                  (item.novembro = true) 
                  componentUpdate();
                  }
                }>
                  <Icon name={item.novembro === true ? "ios-trash" : "ios-card"} size={30} color={item.novembro === true ? '#3693d7' : "gray"} style={item.novembro === true ? styles.removeClientPaymnent : styles.checkPayment} />
                </TouchableOpacity>
              </ListItem>
              
              <ListItem>
                <ListItem.Content>
                    <View>
                      <View style={styles.clientsPaymentsContainer}>
                          <Icon name={item.dezembro === true ? "ios-checkmark" : "ios-close"} size={30} color={item.dezembro === true ? "#3693d7" : "red"} style={styles.checkPayment}/>
                        <View style={styles.clientPaymentsContainerColumn}>
                          <ListItem.Title><Text style={Platform.select({
                          ios: styles.titleIOS,
                          //@ts-ignore
                          android: styles.titleAndroid
                        })}>Dezembro: {item.dataDePagamento.dezembro.split('./')[0] === 'dd' ? "" : item.dataDePagamento.dezembro.split('./'[0])}</Text></ListItem.Title>
                          <ListItem.Subtitle><Text style={Platform.select({
                          ios: styles.subtitleIOS,
                          //@ts-ignore
                          android: styles.subtitleAndroid
                        })}>{item.dezembro === true ? 'Pagamento Efetuado' : 'Em aberto'}</Text></ListItem.Subtitle>
                        </View>
                      </View>
                    </View>
                  </ListItem.Content>
                  <TouchableOpacity onPress={
                  () => {
                    item.dezembro === true ? 
                  (item.dezembro = false)
                  :
                  (item.dezembro = true) 
                  componentUpdate();
                  } 
                }>
                  <Icon name={item.dezembro === true ? "ios-trash" : "ios-card"} size={30} color={item.dezembro === true ? '#3693d7' : "gray"} style={item.dezembro === true ? styles.removeClientPaymnent : styles.checkPayment} />
                </TouchableOpacity>
              </ListItem>
            </>
          }
        </View>
        : <></>
        )))
      }
    </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  refresh:{
    height: 30,
    backgroundColor: '#3693d7',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#FFF'
  },
  clientsItem:{
    borderTopColor: '#d3d3d3',
    borderTopWidth: 0.25,
  },
  clientsContainer:{
    padding: 8
  },
  searchBarContainer:{
    padding: 8
  },
  itemSubtitleIOS:{
    ...sanFranciscoWeights.thin
  },
  itemSubtitleAndroid:{
    ...robotoWeights.thin
  },
  itemNomeAndroid:{
    ...robotoWeights.regular
  },
  itemNomeIOS:{
    ...sanFranciscoWeights.regular
  },
  test:{
    backgroundColor: 'red',
  },
  checkPayment:{
    alignSelf: 'flex-end',
    marginRight: 5,
    marginLeft: 8,
    marginBottom: 3
  },
  removeClientFirst:{
    alignSelf: 'flex-end',
    color: 'black'
  },
  editClients:{
    alignSelf: 'flex-end',
    color: 'black'
  },
  removeClient:{
    alignSelf: 'flex-end',
  },
  removeClientPaymnent:{
    alignSelf: 'flex-end',
    color: '#3693d7'
  },
  subtitle:{
    color: "gray",
  },
  searchBar:{
    padding: 20,
    borderBottomColor: "gray",
    borderWidth: 0.20,
    marginBottom: 5,
  },
  clientsInformationContainer:{
    flexDirection: 'row',
  },
  clientsInformation:{
    flexDirection: 'column',
    marginLeft: 10
  },
  clientsPaymentsContainer:{
    flexDirection: 'row',
  },
  clientPaymentsContainerColumn:{
    flexDirection: 'column',
    width: "100%",
    marginRight: 5,
    marginLeft: 8,
  },
  avatarImages: {
    height: 10,
    width: 10
  },
  titleIOS:{
    ...sanFranciscoWeights.regular
  },
  subtitleIOS:{
    ...sanFranciscoWeights.light,
    color: "gray",
  },
  titleAndroid:{
    ...robotoWeights.regular
  },
  subtitleAndroid:{
    ...robotoWeights.light,
    color: "gray",
  },
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

ClientsScreen.navigationOptions = {
  title: 'Clientes',
  headerStyle: { backgroundColor: '#3693d7' },
  headerTitleStyle: { color: 'white' },
};

export default ClientsScreen;
