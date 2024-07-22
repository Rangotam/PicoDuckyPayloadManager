//
// ______ _            ______            _           ______           _                 _  ___  ___                                  
// | ___ (_)           |  _  \          | |          | ___ \         | |               | | |  \/  |                                  
// | |_/ /_  ___ ___   | | | |_   _  ___| | ___   _  | |_/ /_ _ _   _| | ___   __ _  __| | | .  . | __ _ _ __   __ _  __ _  ___ _ __ 
// |  __/| |/ __/ _ \  | | | | | | |/ __| |/ / | | | |  __/ _` | | | | |/ _ \ / _` |/ _` | | |\/| |/ _` | '_ \ / _` |/ _` |/ _ \ '__|
// | |   | | (_| (_) | | |/ /| |_| | (__|   <| |_| | | | | (_| | |_| | | (_) | (_| | (_| | | |  | | (_| | | | | (_| | (_| |  __/ |   
// \_|   |_|\___\___/  |___/  \__,_|\___|_|\_\\__, | \_|  \__,_|\__, |_|\___/ \__,_|\__,_| \_|  |_/\__,_|_| |_|\__,_|\__, |\___|_|   
//                                             __/ |             __/ |                                                __/ |          
//                                            |___/             |___/                                                |___/           
//
// By Rangotam, https://github.com/Rangotam/PicoDuckyPayloadManager
// 
//
//
// --------------------- dependencies --------------------------------
import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
//----------------------------------------------------------------------
// --------------------- Pages -----------------------------------------
import Linkable from './assets/screens/LinkPayloads.js';
import Editable from './assets/screens/EditablePayloads.js';
import Fixed from './assets/screens/FixedPayloads.js';
import AboutPage from './assets/screens/AboutPage.js';
import Impostazioni from './assets/screens/Impostazioni.js';
//----------------------------------------------------------------------
// --------------------- weird variables n stuff -----------------------
const drawerFont = 'font1';
const titleFont = 'font1';
const headerFont = 'font1';

const themeColor1 = "#7CFC00";
const themeColor2 = "#000000";
const themeColor3 = "#394230";
const themeColor4 = "#111413";

const Drawer = createDrawerNavigator();
//----------------------------------------------------------------------

export default function App() {

// --------------------- theme colors loading ---------------------------
  let color1, color2, color3, color4;
  
  const [currentColor1, setCurrentColor1] = useState(color1);
  const [currentColor2, setCurrentColor2] = useState(color2);
  const [currentColor3, setCurrentColor3] = useState(color3);
  const [currentColor4, setCurrentColor4] = useState(color4);

  useEffect(() => {
    const loadThemeColors = async () => {
      try {
        const storedColorsJSON = await AsyncStorage.getItem('theme_colors');
        if (storedColorsJSON !== null) {
          const storedColors = JSON.parse(storedColorsJSON);
          setCurrentColor1(storedColors.color1);
          setCurrentColor2(storedColors.color2);
          setCurrentColor3(storedColors.color3);
          setCurrentColor4(storedColors.color4);
        }
        else {
          setCurrentColor1("#7CFC00");
          setCurrentColor2("#000000");
          setCurrentColor3("#394230");
          setCurrentColor4("#111413");
        }
      } catch (error) {
        console.error('Error loading theme colors:', error);
      }
    };
    loadThemeColors();
  }, []);
  //----------------------------------------------------------------------

  // --------------------- fonts loading --------------------------------- 
  const [loaded] = useFonts({
    font1: require('./assets/fonts/larabiefont-free.rg-regular.otf'),
    font2: require('./assets/fonts/SvBasicManual-nRPP.ttf'),
    font3: require('./assets/fonts/GlitchGoblin-2O87v.ttf'),
    font4: require('./assets/fonts/hackerchaos.otf'),
    font5: require('./assets/fonts/Hacked-KerX.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    if (currentColor3) {
      StatusBar.setBackgroundColor(currentColor3, true);
    }
  }, [currentColor3]);

  if (!loaded) {
    return null;
  }
  //----------------------------------------------------------------------

  // --------------------- Custom Drawer Content -------------------------
  const CustomDrawerContent = (props) => {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{
          height: 180,
          width: '100%',
          justifyContent: 'center',
          borderBottomColor: currentColor1,
          borderBottomWidth: 0.5,
          marginLeft: 0,
          alignItems: 'center',
          textAlign: 'center',
        }}>
          <Text style={{
            fontSize: 30,
            marginVertical: 6,
            justifyContent: 'space-evenly',
            color: currentColor1,
            fontFamily: titleFont,
            textAlign: 'center', // Center-align the text horizontally
          }}>
            Pico Ducky
            payload manager
          </Text>
        </View>
        <DrawerItemList {...props} />
        <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 20 }}>
          <DrawerItem
            label={() => (<Text style={[styles.innerText, { color: currentColor1 }]}>About</Text>)}
            icon={() => (<MaterialCommunityIcons name="information-outline" size={30} color={currentColor1} />)}
            onPress={() => props.navigation.navigate('AboutPage')}
          />
          <DrawerItem
            label={() => (<Text style={[styles.innerText, { color: currentColor1 }]}>Settings</Text>)}
            icon={() => (<MaterialCommunityIcons name="cog" size={30} color={currentColor1} />)}
            onPress={() => props.navigation.navigate('Settings')}
          />
          
        </View>
      </SafeAreaView>
    );
  };
  //----------------------------------------------------------------------

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" translucent={false}/> 
      <Drawer.Navigator 
        initialRouteName="Fixed"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerStyle: {
            backgroundColor: currentColor3,
            width: 250,
          },
          headerStyle: {
            backgroundColor: currentColor3,
          },
          
          headerTintColor: currentColor1,

          headerTitleStyle: {
            fontFamily: headerFont,
          },

          drawerLabelStyle: {
            color: '#111',
            fontFamily: 'font1',
          },

          headerTitle: {
            color: '#111',
            fontFamily: 'font1',
          },
          drawerActiveBackgroundColor: currentColor4,         
        }}>

        <Drawer.Screen
          name="Fixed payloads"
          options={{
            title: 'Fixed payloads',
            drawerLabel: () => (<Text style={[styles.innerText, {color: currentColor1}]}>Fixed payloads</Text>),
            drawerIcon: () => (<MaterialCommunityIcons name="airplane" size={30} color={currentColor1}/>),
          }}       
          component={Fixed}
        />

        <Drawer.Screen
          name="Editable"
          options={{
            title: 'Editable payloads',
            drawerLabel: () => (<Text style={[styles.innerText, {color: currentColor1}]}>Editable payloads</Text>),
            drawerIcon: () => (<MaterialCommunityIcons name="file-document-edit" size={30} color={currentColor1}/>),
          }}
          component={Editable}
        />
        
        <Drawer.Screen
          name="Linkable"
          options={{
            title: 'Linkable payloads',
            drawerLabel: () => (<Text style={[styles.innerText, {color: currentColor1}]}>Linkable payloads</Text>),
            drawerIcon: () => (<MaterialCommunityIcons name="link-variant-minus" size={30} color={currentColor1}/>),
          }}
          component={Linkable}
        />

        <Drawer.Screen
          name="AboutPage"
          options={{
            drawerItemStyle: { display: 'none' }
          }}
          component={AboutPage}
        />

        <Drawer.Screen
          name="Settings"
          options={{
            drawerItemStyle: { display: 'none' }
          }}
          component={Impostazioni}
        />

      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  innerText: {
    color: themeColor1,
    fontFamily: titleFont,
    fontSize: 18,
  },
});
