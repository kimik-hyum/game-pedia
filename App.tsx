import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {Platform} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import styled from 'styled-components/native';
import Home from './containers/Home';
import Detail from './containers/Detail';
import YoutubeDetail from './containers/YoutubeDetail';
import {Provider} from 'react-redux';
import store from './store';

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
      AppDetail: {
        path: '/app_detail/:id',
      },
      YoutubeDetail: '/youtube_detail/:id',
    },
  },
};

const App = () => {
  const isWeb = Platform.OS === 'web';
  const AppWrap = styled.View`
    ${isWeb ? 'height:100vh;' : 'flex:1;'}
  `;
  return (
    <Provider store={store}>
      <AppWrap>
        <NavigationContainer theme={MentoTheme} linking={linking}>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
            />
            <Stack.Screen
              name="AppDetail"
              component={Detail}
            />
            <Stack.Screen
              name="YoutubeDetail"
              component={YoutubeDetail}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AppWrap>
    </Provider>
  );
};

export default App;
