import React, { Component } from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const bottomTab = createBottomTabNavigator();

import Convites from './listar';
import Eventos from './cadastrarConsultas';
import Perfil from './perfil';

class Main extends Component {

  render(){
    return (
      <View style={styles.main}>
        <StatusBar 
          hidden={false}
        />

          <bottomTab.Navigator
            initialRouteName='Eventos'

            screenOptions={ ({ route }) => ({
              tabBarIcon: () => {
                if (route.name === 'Convites') {
                  return(
                    <Image
                      source={require('../../assets/img/plane.png')}
                      style={styles.tabBarIcon}
                    />
                  )
                }
                if (route.name === 'Eventos') {
                  return(
                    <Image
                      source={require('../../assets/img/calendar.png')}
                      style={styles.tabBarIcon}
                    />
                  )
                }
                if (route.name === 'Perfil') {
                  return(
                    <Image
                      source={require('../../assets/img/profile.png')}
                      style={styles.tabBarIcon}
                    />
                  )
                }
              },

              // React Navigation 6.x
              headerShown: false,
              tabBarShowLabel: false,
              tabBarActiveBackgroundColor: '#2A7879',
              tabBarInactiveBackgroundColor: '#69999A',

              tabBarStyle: { height: 50 }              
            }) }
          >
            <bottomTab.Screen name="Convites" component={Convites} />
            <bottomTab.Screen name="Eventos" component={Eventos} />
            <bottomTab.Screen name="Perfil" component={Perfil} />
          </bottomTab.Navigator>        

      </View>
    );
  }
  
};

const styles = StyleSheet.create({

  // conteúdo da main
  main: {
    flex: 1,
    backgroundColor: '#F1F1F1'
  },

  // estilo dos ícones da tabBar
  tabBarIcon: {
    width: 22,
    height: 22
  }

});

export default Main;
