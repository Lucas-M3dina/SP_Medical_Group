import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  TextInput,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'alexandre@gmail.com',
      senha: 'klpoq731',
    };
  }
  
  realizarLogin = async () => {
    
    console.warn(this.state.email + ' ' + this.state.senha);

    const resposta = await api.post('/Login', {
      email: this.state.email, 
      senha: this.state.senha, 
    }).catch((error)=>{
      console.log("Api call error");
      alert(error.message);
   });

    //mostrar no swagger para montar.
    const token = resposta.data.token;
    await AsyncStorage.setItem('userToken', token);

    //agora sim podemos descomentar.
    if (resposta.status == 200) {
      this.props.navigation.navigate('Main');
    }

    console.warn(token);

    //
  };

  render() {
    return (
      <ImageBackground
        source={require('../../assets/img/Background.png')}
        style={StyleSheet.absoluteFillObject}>
        {/* retangulo roxo */}
        <View style={styles.overlay} />
        <View style={styles.main}>
          <Image
            source={require('../../assets/img/logo.png')}
            style={styles.mainImgLogin}
          />

          <TextInput
            style={styles.inputLogin}
            placeholder="username"
            placeholderTextColor="#FFF"
            keyboardType="email-address"
            // ENVENTO PARA FAZERMOS ALGO ENQUANTO O TEXTO MUDA
            onChangeText={email => this.setState({email})}
          />

          <TextInput
            style={styles.inputLogin}
            placeholder="password"
            placeholderTextColor="#FFF"
            keyboardType="default" //para default nao obrigatorio.
            secureTextEntry={true} //proteje a senha.
            // ENVENTO PARA FAZERMOS ALGO ENQUANTO O TEXTO MUDA
            onChangeText={senha => this.setState({senha})}
          />

          <TouchableOpacity
            style={styles.btnLogin}
            onPress={this.realizarLogin}>
            <Text style={styles.btnLoginText}>Login</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  //antes da main
  overlay: {
    ...StyleSheet.absoluteFillObject, //todas as prop do styleShhet, e vamos aplica o abosluteFIL...
    backgroundColor: 'rgba(0, 0, 0, 0.45)', //rgba pq vamos trabalhar com transparencia.
  },

  // conteúdo da main
  main: {
    // flex: 1,
    //backgroundColor: '#F1F1F1', retirar pra nao ter conflito.
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },

  mainImgLogin: {
    tintColor: '#FFF', //confirmar que sera branco
    height: 106, //altura
    width: 99, //largura img nao é quadrada
    margin: 60, //espacamento em todos os lados,menos pra cima.
    marginTop: 0, // tira espacamento pra cima
  },

  inputLogin: {
    width: 240, //largura mesma do botao
    marginBottom: 40, //espacamento pra baixo
    fontSize: 18,
    color: '#FFF',
    borderBottomColor: '#FFF', //linha separadora
    borderBottomWidth: 2, //espessura.
  },

  btnLoginText: {
    fontSize: 12, //aumentar um pouco
    fontFamily: 'Open Sans Light', //troca de fonte
    color: '#2A7879', //mesma cor identidade
    letterSpacing: 6, //espacamento entre as letras
    textTransform: 'uppercase', //estilo maiusculo
  },
  btnLogin: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 38,
    width: 240,
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 4,
    shadowOffset: {height: 1, width: 1},
  },
});
