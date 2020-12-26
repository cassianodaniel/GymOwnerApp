import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import AwesomeAlert from 'react-native-awesome-alerts';
import { View, Text, StyleSheet, Platform, Image } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { ListItem  } from 'react-native-elements'
import { Searchbar } from 'react-native-paper';
import { useModal } from '../contexts/ModalContext';
import { sanFranciscoWeights } from 'react-native-typography'
import { robotoWeights } from 'react-native-typography'
import { IUser } from '../alias/IUser';
import { Button, Input } from 'react-native-elements';

const ClientsScreen = (): JSX.Element => {
  const [showAlertJaneiro, setShowAlertJaneiro] = useState(false);
  const [showAlertFevereiro, setShowAlertFevereiro] = useState(false);
  const [showAlertMarco, setShowAlertMarco] = useState(false);
  const [showAlertAbril, setShowAlertAbril] = useState(false);
  const [showAlertMaio, setShowAlertMaio] = useState(false);
  const [showAlertJunho, setShowAlertJunho] = useState(false);
  const [showAlertJulho, setShowAlertJulho] = useState(false);
  const [showAlertAgosto, setShowAlertAgosto] = useState(false);
  const [showAlertSetembro, setShowAlertSetembro] = useState(false);
  const [showAlertOutubro, setShowAlertOutubro] = useState(false);
  const [showAlertNovembro, setShowAlertNovembro] = useState(false);
  const [showAlertDezembro, setShowAlertDezembro] = useState(false);
  const { toggleEditInfo, setToggleEditInfo, setToggleEditInfo2, toggleEditInfo2 } = useModal();
  const { users, setUsers } = useModal();
  const toggleExpandInfo = (item: any) => {
    item.opened = !item.opened;
    item.opened = !item.opened;
  }
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
  const [search, setSearch] = useState("");
  const searchArray = (users: IUser[], search: string) => {
    return users.filter((item) => {
      return item.nome.toUpperCase().match(search.toUpperCase());
    });
  };

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
                }}>
                <Icon name="md-create" size={30} color={"gray"} style={styles.editClients}/>
              </TouchableOpacity>
              
              <TouchableOpacity onPress={() => {
                item.nome = ''
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
                                onChangeText={(e) => item.nome = e}
                                />
                                  <Input style={Platform.select({
                                      ios: styles.formInputSelfIOS,
                                      // @ts-ignore
                                      android: styles.formInputSelfAndroid,
                                  })}
                                placeholder='Cadastro de Pessoa Física (CPF)'
                                defaultValue={item.cpf}
                                onChangeText={(e) => item.cpf = e}
                                />
                                <Input style={Platform.select({
                                    ios: styles.formInputSelfIOS,
                                    // @ts-ignore
                                    android: styles.formInputSelfAndroid,
                                })}
                                placeholder='Endereço'
                                defaultValue={item.endereco}
                                onChangeText={(e) => item.endereco = e}
                                />
                                <Input style={Platform.select({
                                    ios: styles.formInputSelfIOS,
                                    // @ts-ignore
                                    android: styles.formInputSelfAndroid,
                                })}
                                placeholder='Telefone de Contato'
                                defaultValue={item.telefone}
                                onChangeText={(e) => item.telefone = e}
                                />
                                <Input style={Platform.select({
                                    ios: styles.formInputSelfIOS,
                                    // @ts-ignore
                                    android: styles.formInputSelfAndroid,
                                })}
                                placeholder='Dia de pagamento do aluno (Ex: 10)'
                                defaultValue={item.dataPagamento}
                                onChangeText={(e) => 
                                  {
                                    item.dataPagamento = e;
                                    item.dataDePagamento.janeiro = e;
                                    item.dataDePagamento.fevereiro = e;
                                    item.dataDePagamento.marco = e;
                                    item.dataDePagamento.abril = e;
                                    item.dataDePagamento.maio = e;
                                    item.dataDePagamento.junho = e;
                                    item.dataDePagamento.julho = e;
                                    item.dataDePagamento.agosto = e;
                                    item.dataDePagamento.setembro = e;
                                    item.dataDePagamento.outubro = e;
                                    item.dataDePagamento.novembro = e;
                                    item.dataDePagamento.dezembro = e;
                                  }
                                }
                                />
                                <Button
                                style={Platform.select({
                                ios: styles.confirmButtonIOS,
                                // @ts-ignore
                                android: styles.confirmButtonAndroid,
                                })}
                                title="Fechar dados"
                                onPress={() => 
                                  {
                                      item.edited = false;
                                      item.opened = false;
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
                    setShowAlertJaneiro(true);
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
                    setShowAlertFevereiro(true);
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
                    setShowAlertMarco(true);
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
                    setShowAlertAbril(true);
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
                    setShowAlertMaio(true);
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
                    setShowAlertJunho(true);
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
                    setShowAlertJulho(true);
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
                    setShowAlertAgosto(true);
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
                  setShowAlertSetembro(true); 
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
                    setShowAlertOutubro(true); 
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
                    setShowAlertNovembro(true);
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
                    setShowAlertDezembro(true);
                  } 
                }>
                  <Icon name={item.dezembro === true ? "ios-trash" : "ios-card"} size={30} color={item.dezembro === true ? '#3693d7' : "gray"} style={item.dezembro === true ? styles.removeClientPaymnent : styles.checkPayment} />
                </TouchableOpacity>
              </ListItem>

                

              <AwesomeAlert
                show={showAlertJaneiro}
                showProgress={true}
                title="Confirmar alteração?"
                message={"Mês de Janeiro"}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText="Não"
                confirmText="Sim, confirmar!"
                confirmButtonColor="#3693d7"
                onCancelPressed={() => {
                  setShowAlertJaneiro(false);
                }}
                onConfirmPressed={() => {
                  item.janeiro === true ? 
                  (item.janeiro = false, console.log(item.janeiro))
                  :
                  (item.janeiro = true, console.log(item.janeiro)) 
                  setShowAlertJaneiro(false);
                  toggleExpandInfo(item);
                }}
              />

              <AwesomeAlert
                show={showAlertFevereiro}
                showProgress={false}
                title="Confirmar alteração?"
                message={"Mês de Fevereiro"}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText="Não"
                confirmText="Sim, confirmar!"
                confirmButtonColor="#3693d7"
                onCancelPressed={() => {
                  setShowAlertFevereiro(false);
                }}
                onConfirmPressed={() => {
                  item.fevereiro === true ? 
                  (item.fevereiro = false, console.log(item.fevereiro))
                  :
                  (item.fevereiro = true, console.log(item.fevereiro)) 
                  setShowAlertFevereiro(false);
                  toggleExpandInfo(item);
                }}
              />

              <AwesomeAlert
                show={showAlertMarco}
                showProgress={false}
                title="Confirmar alteração?"
                message={"Mês de Marco"}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText="Não"
                confirmText="Sim, confirmar!"
                confirmButtonColor="#3693d7"
                onCancelPressed={() => {
                  setShowAlertMarco(false);
                }}
                onConfirmPressed={() => {
                  item.marco === true ? 
                  (item.marco = false, console.log(item.marco))
                  :
                  (item.marco = true, console.log(item.marco)) 
                  setShowAlertMarco(false);
                  toggleExpandInfo(item);
                }}
              />

              <AwesomeAlert
                show={showAlertAbril}
                showProgress={false}
                title="Confirmar alteração?"
                message={"Mês de Abril"}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText="Não"
                confirmText="Sim, confirmar!"
                confirmButtonColor="#3693d7"
                onCancelPressed={() => {
                  setShowAlertAbril(false);
                }}
                onConfirmPressed={() => {
                  item.abril === true ? 
                  (item.abril = false, console.log(item.abril))
                  :
                  (item.abril = true, console.log(item.abril)) 
                  setShowAlertAbril(false);
                  toggleExpandInfo(item);
                }}
              />

              <AwesomeAlert
                show={showAlertMaio}
                showProgress={false}
                title="Confirmar alteração?"
                message={"Mês de Maio"}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText="Não"
                confirmText="Sim, confirmar!"
                confirmButtonColor="#3693d7"
                onCancelPressed={() => {
                  setShowAlertMaio(false);
                }}
                onConfirmPressed={() => {
                  item.maio === true ? 
                  (item.maio = false, console.log(item.maio))
                  :
                  (item.maio = true, console.log(item.maio)) 
                  setShowAlertMaio(false);
                }}
              />

              <AwesomeAlert
                show={showAlertJunho}
                showProgress={false}
                title="Confirmar alteração?"
                message={"Mês de Junho"}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText="Não"
                confirmText="Sim, confirmar!"
                confirmButtonColor="#3693d7"
                onCancelPressed={() => {
                  setShowAlertJunho(false);
                }}
                onConfirmPressed={() => {
                  item.junho === true ? 
                  (item.junho = false, console.log(item.junho))
                  :
                  (item.junho = true, console.log(item.junho)) 
                  setShowAlertJunho(false);
                  toggleExpandInfo(item);
                }}
              />

              <AwesomeAlert
                show={showAlertJulho}
                showProgress={false}
                title="Confirmar alteração?"
                message={"Mês de Julho"}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText="Não"
                confirmText="Sim, confirmar!"
                confirmButtonColor="#3693d7"
                onCancelPressed={() => {
                  setShowAlertJulho(false);
                }}
                onConfirmPressed={() => {
                  item.julho === true ? 
                  (item.julho = false, console.log(item.julho))
                  :
                  (item.julho = true, console.log(item.julho)) 
                  setShowAlertJulho(false);
                  toggleExpandInfo(item);
                }}
              />

              <AwesomeAlert 
                show={showAlertAgosto}
                showProgress={false}
                title="Confirmar alteração?"
                message={"Mês de Agosto"}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText="Não"
                confirmText="Sim, confirmar!"
                confirmButtonColor="#3693d7"
                onCancelPressed={() => {
                  setShowAlertAgosto(false);
                }}
                onConfirmPressed={() => {
                  item.agosto === true ? 
                  (item.agosto = false, console.log(item.agosto))
                  :
                  (item.agosto = true, console.log(item.agosto)) 
                  setShowAlertAgosto(false);
                  toggleExpandInfo(item);
                }}
              />

              <AwesomeAlert
                show={showAlertSetembro}
                showProgress={false}
                title="Confirmar alteração?"
                message={"Mês de Setembro"}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText="Não"
                confirmText="Sim, confirmar!"
                confirmButtonColor="#3693d7"
                onCancelPressed={() => {
                  setShowAlertSetembro(false);
                }}
                onConfirmPressed={() => {
                  item.setembro === true ? 
                  (item.setembro = false, console.log(item.setembro))
                  :
                  (item.setembro = true, console.log(item.setembro)) 
                  setShowAlertSetembro(false);
                  toggleExpandInfo(item);
                }}
              />

              <AwesomeAlert
                show={showAlertOutubro}
                showProgress={false}
                title="Confirmar alteração?"
                message={"Mês de Outubro"}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText="Não"
                confirmText="Sim, confirmar!"
                confirmButtonColor="#3693d7"
                onCancelPressed={() => {
                  setShowAlertOutubro(false);
                }}
                onConfirmPressed={() => {
                  item.outubro === true ? 
                  (item.outubro = false, console.log(item.outubro))
                  :
                  (item.outubro = true, console.log(item.outubro)) 
                  setShowAlertOutubro(false);
                  toggleExpandInfo(item);
                }}
              />

              <AwesomeAlert
                show={showAlertNovembro}
                showProgress={false}
                title="Confirmar alteração?"
                message={"Mês de Novembro"}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText="Não"
                confirmText="Sim, confirmar!"
                confirmButtonColor="#3693d7"
                onCancelPressed={() => {
                  setShowAlertNovembro(false);
                }}
                onConfirmPressed={() => {
                  item.novembro === true ? 
                  (item.novembro = false, console.log(item.novembro))
                  :
                  (item.novembro = true, console.log(item.novembro)) 
                  setShowAlertNovembro(false);
                  toggleExpandInfo(item);
                }}
              />

              <AwesomeAlert
                show={showAlertDezembro}
                showProgress={false}
                title="Confirmar alteração?"
                message={"Mês de Dezembro"}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText="Não"
                confirmText="Sim, confirmar!"
                confirmButtonColor="#3693d7"
                onCancelPressed={() => {
                  setShowAlertDezembro(false);
                }}
                onConfirmPressed={() => {
                  item.dezembro === true ? 
                  (item.dezembro = false, console.log(item.dezembro))
                  :
                  (item.dezembro = true, console.log(item.dezembro)) 
                  setShowAlertDezembro(false);
                  toggleExpandInfo(item);
                }}
              />
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
