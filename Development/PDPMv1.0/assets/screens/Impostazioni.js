import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const themeHighlight = "#7CFC00";
const themeBackground = "#000000";
const titleFont = 'font1';
const largebuttonFont = 'font2';

import colorsData from '../theme_colors.json';

const color1 = colorsData.color1;
const color2 = colorsData.color2;
const color3 = colorsData.color3;
let color4;
let themeName;

const textVariables = [
  'Fixed #0', 'Fixed #1', 'Fixed #2', 'Fixed #3',
  'Fixed #4', 'Fixed #5', 'Fixed #6', 'Fixed #7',
  'Editable #0', 'Editable #1', 'Editable #2', 'Editable #3',
  'Linkable #0', 'Linkable #1', 'Linkable #2', 'Linkable #3',
];

const AboutPage = () => {
  const [currentColor1, setCurrentColor1] = useState(color1);
  const [currentColor2, setCurrentColor2] = useState(color2);
  const [currentColor3, setCurrentColor3] = useState(color3);
  const [currentColor4, setCurrentColor4] = useState(color4);
  const [currentThemeName, setCurrentThemeName] = useState(themeName);

  const [tableData, setTableData] = useState(Array(16).fill(''));

  const updateThemeColors = async (newColors) => {
    try {
      await AsyncStorage.setItem('theme_colors', JSON.stringify(newColors));
      setCurrentColor1(newColors.color1);
      setCurrentColor2(newColors.color2);
      setCurrentColor3(newColors.color3);
      setCurrentColor4(newColors.color4);
      setCurrentThemeName(newColors.themeName);
      console.log('Updated theme colors:', newColors);
    } catch (error) {
      console.error('Error updating theme colors:', error);
    }
  };

  const handleTextChange = async (index, value) => {
    const updatedTableData = [...tableData];
    updatedTableData[index] = value;
    setTableData(updatedTableData);

    try {
      await AsyncStorage.setItem(`item_${index}`, value);
      console.log(`Item ${index} updated in AsyncStorage with value:`, value);
    } catch (error) {
      console.error(`Error updating item ${index} in AsyncStorage:`, error);
    }
  };

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
          setCurrentThemeName(storedColors.themeName);
        }
      } catch (error) {
        console.error('Error loading theme colors:', error);
      }
    };
    loadThemeColors();

    const loadTableData = async () => {
      try {
        const storedTableData = [];
        for (let i = 0; i < 16; i++) {
          const item = await AsyncStorage.getItem(`item_${i}`);
          storedTableData.push(item || '');
        }
        setTableData(storedTableData);
      } catch (error) {
        console.error('Error loading table data:', error);
      }
    };
    loadTableData();

  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentColor3 }]}>
      <ScrollView style={styles.scrollView}>
        <Text style={[styles.header, { color: currentColor1 }]}>Change Theme Color</Text>

        <View style={[styles.rowContainer, { borderColor: currentColor1, backgroundColor: currentColor2 }]}>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.presetButton, { backgroundColor: "#7CFC00" }]} onPress={() => {
              updateThemeColors({
                "color1": "#7CFC00",
                "color2": "#000000",
                "color3": "#111413",
                "color4": "#394230",
                "themeName": "theme_1 - Classic"
              });
            }}>
              <Text style={[styles.presetButtonText, { fontFamily: largebuttonFont}]}>Preset_1</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.presetButton, { backgroundColor: "#000000" }]} onPress={() => {
              updateThemeColors({
                "color1": "#ffffff",
                "color2": "#000000",
                "color3": "#000000",
                "color4": "#575757",
                "themeName": "theme_2 - Terminal"
              });
            }}>
              <Text style={[styles.presetButtonText, { fontFamily: largebuttonFont , color: "#ffffff"}]}>Preset_2</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.presetButton, { backgroundColor: "#0082FF" }]} onPress={() => {
              updateThemeColors({
                "color1": "#00FFB3",
                "color2": "#001395",
                "color3": "#0268c9",
                "color4": "#0c9169",
                "themeName": "theme_3 - WenJie"
              });
            }}>
              <Text style={[styles.presetButtonText, { fontFamily: largebuttonFont }]}>Preset_3</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.presetButton, { backgroundColor: "#fff700" }]} onPress={() => {
              updateThemeColors({
                "color1": "#fff700",
                "color2": "#31270e",
                "color3": "#191200",
                "color4": "#5c5a2a",
                "themeName": "theme_4 - DE HR"
              });
            }}>
              <Text style={[styles.presetButtonText, { fontFamily: largebuttonFont }]}>Preset_4</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.presetButton, { backgroundColor: "#ff7300" }]} onPress={() => {
              updateThemeColors({
                "color1": "#ff6600",
                "color2": "#a1083b",
                "color3": "#541743",
                "color4": "#ff6600",
                "themeName": "theme_5 - ADC"
              });
            }}>
              <Text style={[styles.presetButtonText, { fontFamily: largebuttonFont }]}>Preset_5</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.presetButton, { backgroundColor: "#FF00D0" }]} onPress={() => {
              updateThemeColors({
                "color1": "#FFF800",
                "color2": "#FF00D0",
                "color3": "#00FF02",
                "color4": "#00bfff",
                "themeName": "theme_6 - Cruelty squad"
              });
            }}>
              <Text style={[styles.presetButtonText, { fontFamily: largebuttonFont }]}>Preset_6</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.presetButton, { backgroundColor: "#b576c4" }]} onPress={() => {
              updateThemeColors({
                "color1": "#ebe3f0",
                "color2": "#463061",
                "color3": "#1d172f",
                "color4": "#27064f",
                "themeName": "theme_7 - Saints"
              });
            }}>
              <Text style={[styles.presetButtonText, { fontFamily: largebuttonFont }]}>Preset_7</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.presetButton, { backgroundColor: "#454546" }]} onPress={() => {
              updateThemeColors({
                "color1": "#000000",
                "color2": "#0b0b0b",
                "color3": "#0f0f10",
                "color4": "#0b0b0b",
                "themeName": "theme_8 - damnnn"
              });
            }}>
              <Text style={[styles.presetButtonText, { fontFamily: largebuttonFont }]}>Preset_8</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.presetButton, { backgroundColor: "#dee4e7" }]} onPress={() => {
              updateThemeColors({
                "color1": "#37474f",
                "color2": "#dee4e7",
                "color3": "#fafafa",
                "color4": "#dee4e7",
                "themeName": "theme_9 - Light Theme"
              });
            }}>
              <Text style={[styles.presetButtonText, { fontFamily: largebuttonFont }]}>Preset_9</Text>
            </TouchableOpacity>
          </View>
        {/* </View> */}

        <View style={[styles.container3, { borderColor: currentColor1, backgroundColor: currentColor2 }]}>
          <Text style={[styles.header2, { color: currentColor1, textAlign: 'center'  }]}>Theme color preview:</Text>
          <Text style={[styles.header2, { color: currentColor1, textAlign: 'center', fontFamily: largebuttonFont }]}>{currentThemeName}</Text>

          <View style={styles.colorPreviewContainer}>
            <View style={styles.colorPreviewBox}>
              <View style={[styles.colorPreview, { backgroundColor: currentColor1 }]} />
            </View>
            <View style={styles.colorPreviewBox}>
              <View style={[styles.colorPreview, { backgroundColor: currentColor2 }]} />
            </View>
            <View style={styles.colorPreviewBox}>
              <View style={[styles.colorPreview, { backgroundColor: currentColor3 }]} />
            </View>
          </View>
        </View>
        </View>

        <Text style={[styles.header, { color: currentColor1 }]}>Payload descriptions</Text>

        <View style={[styles.rowContainer, { borderColor: currentColor1, backgroundColor: currentColor2 }]}>
          {tableData.map((value, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCell, { color: currentColor1 }]}>{textVariables[index]}</Text>
              <TextInput
                style={[styles.tableInput, { color: currentColor1, borderColor: currentColor1, fontFamily: largebuttonFont }]}
                value={value}
                onChangeText={(text) => handleTextChange(index, text)}
              />
            </View>
          ))}
          {/* <TouchableOpacity style={[styles.largeButton, { backgroundColor: currentColor1 }]} onPress={() => console.log('Save changes pressed')}>
            <Text style={[styles.content, { fontFamily: largebuttonFont }]}>Save changes</Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  container3: {
    flex: 1,
    padding: 15,
    borderWidth: 3,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 10,
    
  },
  scrollView: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontFamily: titleFont,
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center',
  },
  header2: {
    fontSize: 18,
    fontFamily: titleFont,
    marginBottom: 10,
  },
  rowContainer: {
    backgroundColor: color3,
    borderColor: color1,
    borderWidth: 3,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 30,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  presetButton: {
    borderRadius: 13,
    height: 45,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 2,
  },
  presetButtonText: {
    textAlign: 'center',
    fontSize: 15,
  },
  colorPreviewContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  colorPreviewBox: {
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    padding: 3,
    marginHorizontal: 10,
  },
  colorPreview: {
    width: 50,
    height: 50,
  },
  tableContainer: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 16,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tableCell: {
    flex: 1,
    fontSize: 16,
    fontFamily: largebuttonFont,
  },
  tableInput: {
    flex: 3,
    padding: 8,
    borderWidth: 1,
    borderRadius: 8,
  },
  largeButton: {
    padding: 15,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  content: {
    fontSize: 18,
  },
});

export default AboutPage;
