// About page! :))

// --------------------- dependencies --------------------------------
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
//----------------------------------------------------------------------
// --------------------- weird variables -------------------------------
import colorsData from '../theme_colors.json';
themeHighlight = colorsData.color1;
themeBackground = colorsData.color2;
const themeColor1 = "#7CFC00";
const titleFont = 'font1';
const largebuttonFont = 'font2';

let color1 = "#7CFC00";
let color2 = "#000000";
let color3 = "#394230";

//----------------------------------------------------------------------

const AboutPage = () => {
  const handlePress = async () => {
    const url = 'https://github.com/Rangotam/PicoDuckyPayloadManager';
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  };

  const [currentColor1, setCurrentColor1] = useState(color1);
  const [currentColor2, setCurrentColor2] = useState(color2);
  const [currentColor3, setCurrentColor3] = useState(color3);


  // const updateThemeColors = async (newColors) => {
  //   try {
  //     await AsyncStorage.setItem('theme_colors', JSON.stringify(newColors));
  //     setCurrentColor1(newColors.color1);
  //     setCurrentColor2(newColors.color2);
  //     setCurrentColor3(newColors.color3);
  //     console.log('Updated theme colors:', newColors);
  //   } catch (error) {
  //     console.error('Error updating theme colors:', error);
  //   }
  // };

  useEffect(() => {
    const loadThemeColors = async () => {
      try {
        const storedColorsJSON = await AsyncStorage.getItem('theme_colors');
        if (storedColorsJSON !== null) {
          const storedColors = JSON.parse(storedColorsJSON);
          setCurrentColor1(storedColors.color1);
          setCurrentColor2(storedColors.color2);
          setCurrentColor3(storedColors.color3);
        }
      } catch (error) {
        console.error('Error loading theme colors:', error);
      }
    };
    loadThemeColors();
  }, []);


  return (
    <SafeAreaView style={[styles.container,{ backgroundColor: currentColor3}]}>
      <ScrollView style={styles.scrollView}>
        <Text style={[styles.header, {color:currentColor1}]}>Pico Ducky Payload Manager</Text>
        <Text style={styles.paragraph}>
          Pico Ducky Payload Manager is a application born to better take advantage of the web-page feature of the PicoDuckyW project.
          Be sure to first check out the <Text style={{color: currentColor1}} onPress={() => Linking.openURL('https://github.com/dbisu/pico-ducky')}>original repo</Text>!
         </Text>
         <Text style={styles.paragraph}>

         This application is designed to help you manage and organize your payloads in a neat way. 
          As of now, it offers 3 main features:
          </Text>

        <Text style={[styles.smallertitle, {color:currentColor1}]}>Fixed Payloads</Text>
        <Text style={styles.paragraph}>
          Easily manage pre-defined payloads. These are meant to be your go-to payloads as you won't be able to change them (at least from here!)
        </Text>

        <Text style={[styles.smallertitle, {color:currentColor1}]}>Editable Payloads</Text>
        <Text style={styles.paragraph}>
        Customize your payloads on the go. Simply choose between the 6 available editable payloads which one to modify. To do so:
        </Text>
        <Text style={styles.bulletPoint}>1. Expand the box of the payload you want to edit</Text>
        <Text style={styles.bulletPoint}>2. Click "import", and you should see the content of your payload</Text>
        <Text style={styles.bulletPoint}>3. Click "save" to save your changes and upload them to your pico-ducky</Text>
        <Text style={styles.bulletPoint}>4. Click the rocket to execute your newly-modified payload</Text>

        <Text style={[styles.smallertitle, {color:currentColor1}]}>Linkable Payloads</Text>
        <Text style={styles.paragraph}>
        Similar to the editable payloads, but these ones are made with the intention of executing some code hosted somewhere else. Just pop in the link of the page where your code 
        is written and these payloads will download the code from there and execute it! To do so:
        </Text>
        <Text style={styles.bulletPoint}>1. Expand the box of the payload you want to edit</Text>
        <Text style={styles.bulletPoint}>2. Click "import", and you should see the link that is already inside of your payload</Text>
        <Text style={styles.bulletPoint}>3. Click "save" to save your changes and upload them to your pico-ducky</Text>
        <Text style={styles.bulletPoint}>4. Click the rocket to execute the code of a new link</Text>
        <Text style={styles.paragraph}>
        Just keep in mind that the payloads expect a raw text page. You can use whatever you want as long as it's just text, but for this purpose I suggest either github or pastebin.
        Also, it may be trivial but you obviously will need an internet connection on the computer you'll execute this code on.
        </Text>

        <Text style={styles.note}>
        Please note: in order to be able to modify payloads, you must have <Text style={{color: currentColor1}} onPress={() => Linking.openURL('https://github.com/dbisu/pico-ducky?tab=readme-ov-file#usb-enabledisable-mode')}>USB mode disabled </Text> on your picoDucky
                </Text>
        
        <Text style={[styles.smallertitle, {color:currentColor1}]}>Settings</Text>
        <Text style={styles.paragraph}>
        In the settings page you'll find 2 things:   
        </Text>
        <Text style={styles.bulletPoint}>1. A few other color palettes for the app theme</Text>
        <Text style={styles.bulletPoint}>2. A table where you can store descriptions for each payload (so you don't go insane trying to remember what everything does)</Text>

        <Text style={styles.paragraph}>
        As of now, all these settings require you to reload the application. I know it's not very elegant but I've yet to figure out how to do that. :V
        </Text>






        <Text style={[styles.smallertitle, {color:currentColor1}]}>Feedback</Text>
        <Text style={styles.paragraph}>
          This was my first time developing an app and my first time picking up React-Native, so I know this project has some very rough edges; that said I'm pretty satisfied with the result!
        </Text>
        <Text style={styles.paragraph}>
          If you have suggestions or whatever, please contact me! Any kind of feedback is very much welcome! :)
        </Text>


        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.largeButton, {backgroundColor:currentColor1}]} onPress={handlePress}>
            <MaterialCommunityIcons name="github" size={50} color="black"/>
            <Text style={[styles.content, {fontFamily: largebuttonFont}]}>Rangotam/PDPM</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>Thank you for using Pico Ducky Payload Manager!</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeBackground,
    padding: 15,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    fontSize: 30,
    fontFamily: titleFont,
    color: themeHighlight,
    marginBottom: 20,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 20,
    fontFamily: titleFont,
    color: themeHighlight,
    marginVertical: 10,
  },
  paragraph: {
    fontSize: 16,
    fontFamily: 'font2',
    color: '#ffffff',
    marginBottom: 15,
    lineHeight: 24,
  },
  footer: {
    fontSize: 16,
    fontFamily: 'font4',
    color: '#ffffff',
    marginTop: 30,
    textAlign: 'center',
  },
  bulletPoint: {
  fontSize: 14,
    fontFamily: 'font2',
    color: '#ffffff',
    marginBottom: 15,
    marginTop: 0,
    lineHeight: 13,
    marginLeft: 20,
},
smallertitle: {
  fontSize: 22,
  fontFamily: titleFont,
  color: themeHighlight,
  marginVertical: 10,
},
largeButton: {
  width: 120,
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: 10,
  paddingVertical:10,
  backgroundColor: themeHighlight,
  borderRadius: 20,
},
buttonContainer: {
  justifyContent: 'center',
  alignItems: 'center',
},
note: {
  fontSize: 12,
  fontFamily: 'font2',
  color: '#ffffff',
  marginBottom: 30,
  textAlign: 'center',
},
});

export default AboutPage;
