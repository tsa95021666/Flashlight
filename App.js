import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';

const App = () => {
  const [toggle, setToggle] = useState(false)
  
  const handleChangeToggle = () => setToggle(oldToggle => !oldToggle);

  useEffect(() => {
    //liga flash do celular
    Torch.switchState(toggle);
  }, [toggle]);

  useEffect(() => {
    //Quando o celular for chacoalhado, mudaremos o toggle
    const subscription = RNShake.addListener(()=>{
      setToggle(oldToggle => !oldToggle);
    });
    //Essa func vai ser chamada quando o componete
    //for ser desmontado
    return () => subscription.remove();
  }, []);

  return (
   <View style={toggle ? style.containerLight : style.container}>
     <TouchableOpacity onPress={handleChangeToggle}>
     <Image 
        style={toggle ? style.lightimagon : style.lightimagoff} 
        source={
          toggle 
            ? require('./assets/icons/eco-light.png')
            : require('./assets/icons/eco-light-off.png')
          }
     />
     <Image 
        style={style.logodio} 
        source={
          toggle 
            ? require('./assets/icons/logo-dio.png')
            : require('./assets/icons/logo-dio-white.png')
          }
     />
     </TouchableOpacity>
    </View>
  );
};

export default App;

const style =StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLight: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightimagon:{
    resizeMode: 'contain',
    alignSelf: 'center',
    width: '150',
    length: '150',
  },
  lightimagoff:{
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'white',
    width: '150',
    length: '150',
  },
  logodio:{
    resizeMode: 'contain',
    alignSelf: 'center',
    width: '250',
    length: '250',
  },
});