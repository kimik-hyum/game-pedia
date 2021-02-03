import React  from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'; 
import {Platform} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import styled from 'styled-components/native';
import Home from './containers/Home';
import Detail from './containers/Detail';

const Stack = createStackNavigator();
const MentoTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
  },
};
const linking = {
  prefixes: ['App://'],
  config: {
    screens: {
      Home: '',
      Detail: '/detail/:id'
    },
  },
}

const App = () => {
  const isWeb = Platform.OS === 'web';
  const AppWrap = styled.View`
    ${isWeb ? 'height:100vh;' : 'flex:1;'}
  `
  return (
    <AppWrap>
      <NavigationContainer 
        theme={MentoTheme}
        linking={linking}
      >
        <Stack.Navigator
          screenOptions={{
            headerShown: isWeb ? false : true
          }}
        >
          <Stack.Screen 
            name="Home" 
            component={Home} 
          />
          <Stack.Screen 
            name="Detail" 
            component={Detail} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppWrap>
  );
};


export default App;