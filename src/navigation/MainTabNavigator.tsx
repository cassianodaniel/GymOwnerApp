import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import AddClientScreen from '../screens/AddClientScreen';
import ClientsScreen from '../screens/ClientsScreen';

interface TabProps {
  focused: boolean;
}

const HomeStack = createStackNavigator({
  Home: ClientsScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Clientes',
  tabBarIcon: ({ focused }: TabProps) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-people' : 'md-people'}
    />
  ),
};

const AddClientStack = createStackNavigator({
  AddClient: AddClientScreen,
});

AddClientStack.navigationOptions = {
  tabBarLabel: 'Cadastrar cliente',
  tabBarIcon: ({ focused }: TabProps) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
    />
  ),
};

const ClientsStack = createStackNavigator({
  Clients: ClientsScreen,
});

ClientsStack.navigationOptions = {
  tabBarLabel: 'Clientes',
  tabBarIcon: ({ focused }: TabProps) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  AddClientStack
});
