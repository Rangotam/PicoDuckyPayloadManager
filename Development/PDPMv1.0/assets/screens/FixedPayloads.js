// Fixed Payloads :)

// --------------------- dependencies --------------------------------
import {MaterialCommunityIcons } from '@expo/vector-icons';
import { React, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import AsyncStorage from '@react-native-async-storage/async-storage';
//----------------------------------------------------------------------
// --------------------- weird variables -------------------------------
const titleFont = 'font1';
const smallbuttonFont = 'font2';
const largebuttonFont = 'font2';
const boxFont = 'font1';
const themeColor1 = "#7CFC00";
const themeColor2 = "#000000";
const themeColor3 = "#141712";
//----------------------------------------------------------------------
// --------------------- Payloads definition ---------------------------
const payload0 = 'Payload0.dd';
const payload1 = 'Payload1.dd';
const payload2 = 'Payload2.dd';
const payload3 = 'Payload3.dd';
const payload4 = 'Payload4.dd';
const payload5 = 'Payload5.dd';
const payload6 = 'Payload6.dd';
const payload7 = 'Payload7.dd';
//----------------------------------------------------------------------


const Fixed = () => {

  const [collapsed0, setCollapsed0] = useState(true);
  const [collapsed1, setCollapsed1] = useState(true);
  const [collapsed2, setCollapsed2] = useState(true);
  const [collapsed3, setCollapsed3] = useState(true);
  const [collapsed4, setCollapsed4] = useState(true);
  const [collapsed5, setCollapsed5] = useState(true);
  const [collapsed6, setCollapsed6] = useState(true);
  const [collapsed7, setCollapsed7] = useState(true);


  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [text, setText] = useState(''); 

  const executePayload = async (payloadName) => {
    setLoading(true); 
    try {
      const response = await fetch(`http://192.168.4.1/run/${payloadName}`);
      const json = await response.json();
      setData(json.payloads);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

// -------------- theme colors and descriptions loading ----------------
  let color1;
  let color2;
  let color3;

  const [currentColor1, setCurrentColor1] = useState(color1);
  const [currentColor2, setCurrentColor2] = useState(color2);
  const [currentColor3, setCurrentColor3] = useState(color3);
  const [tableData, setTableData] = useState(Array(8).fill(''));


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

    const loadTableData = async () => {
      try {
        const storedTableData = [];
        for (let i = 0; i < 8; i++) {
          const item = await AsyncStorage.getItem(`item_${i}`);
          storedTableData.push(item || '');
        }
        console.log('Loaded table data:', storedTableData); // Debugging log
        setTableData(storedTableData);
      } catch (error) {
        console.error('Error loading table data:', error);
      }
    };
  
    loadTableData();

  }, []);

//----------------------------------------------------------------------

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: currentColor3}]}>
      <ScrollView style={styles.scrollView}>

        <View style={[styles.container3, {backgroundColor: currentColor2, borderColor:currentColor1}]}>
          <TouchableOpacity onPress={() => setCollapsed0(!collapsed0)}>
              <Text style={[styles.title, {fontFamily: titleFont, backgroundColor: currentColor2, color: currentColor1}]}>&gt; Payload #0</Text>
          </TouchableOpacity>  
          
          <TouchableOpacity style={[styles.button, {backgroundColor: currentColor1}]} onPress={() => {executePayload(payload0)}}>
            <MaterialCommunityIcons name="rocket-launch" size={30} color="black" />
          </TouchableOpacity>
        </View> 

        <Collapsible collapsed={collapsed0}>
          <View style={[styles.container2, {backgroundColor: currentColor2, borderColor:currentColor1}]}>
              <Text style={[styles.description, {fontFamily: titleFont, backgroundColor: currentColor2, color: currentColor1}]}>{tableData[0]}</Text>
          </View>
        </Collapsible>

{/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

        <View style={[styles.container3, {backgroundColor: currentColor2, borderColor:currentColor1}]}>
          <TouchableOpacity onPress={() => setCollapsed1(!collapsed1)}>
            <Text style={[styles.title, {fontFamily: titleFont, backgroundColor: currentColor2, color: currentColor1}]}>&gt; Payload #1</Text>
          </TouchableOpacity>  

          <TouchableOpacity style={[styles.button, {backgroundColor: currentColor1}]} onPress={() => {executePayload(payload1)}}>
            <MaterialCommunityIcons name="rocket-launch" size={30} color="black" />
          </TouchableOpacity>
        </View> 
        
        <Collapsible collapsed={collapsed1}>
          <View style={[styles.container2, {backgroundColor: currentColor2, borderColor:currentColor1}]}>
              <Text style={[styles.description, {fontFamily: titleFont, backgroundColor: currentColor2, color: currentColor1}]}>{tableData[1]}</Text>
          </View>
        </Collapsible>

{/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

        <View style={[styles.container3, {backgroundColor: currentColor2, borderColor:currentColor1}]}>
          <TouchableOpacity onPress={() => setCollapsed2(!collapsed2)}>
            <Text style={[styles.title, {fontFamily: titleFont, backgroundColor: currentColor2, color: currentColor1}]}>&gt; Payload #2</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, {backgroundColor: currentColor1}]} onPress={() => {executePayload(payload2)}}>
            <MaterialCommunityIcons name="rocket-launch" size={30} color="black" />
          </TouchableOpacity>
        </View> 
                
        <Collapsible collapsed={collapsed2}>
          <View style={[styles.container2, {backgroundColor: currentColor2, borderColor:currentColor1}]}>
              <Text style={[styles.description, {fontFamily: titleFont, backgroundColor: currentColor2, color: currentColor1}]}>{tableData[2]}</Text>
          </View>
        </Collapsible>

{/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

        <View style={[styles.container3, {backgroundColor: currentColor2, borderColor:currentColor1}]}>
          <TouchableOpacity onPress={() => setCollapsed3(!collapsed3)}>
            <Text style={[styles.title, {fontFamily: titleFont, backgroundColor: currentColor2, color: currentColor1}]}>&gt; Payload #3</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, {backgroundColor: currentColor1}]} onPress={() => {executePayload(payload3)}}>
            <MaterialCommunityIcons name="rocket-launch" size={30} color="black" />
          </TouchableOpacity>
        </View> 
                
        <Collapsible collapsed={collapsed3}>
          <View style={[styles.container2, {backgroundColor: currentColor2, borderColor:currentColor1}]}>
              <Text style={[styles.description, {fontFamily: titleFont, backgroundColor: currentColor2, color: currentColor1}]}>{tableData[3]}</Text>
          </View>
        </Collapsible>

{/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

        <View style={[styles.container3, {backgroundColor: currentColor2, borderColor:currentColor1}]}>
          <TouchableOpacity onPress={() => setCollapsed4(!collapsed4)}>
            <Text style={[styles.title, {fontFamily: titleFont, backgroundColor: currentColor2, color: currentColor1}]}>&gt; Payload #4</Text>
          </TouchableOpacity>
            
          <TouchableOpacity style={[styles.button, {backgroundColor: currentColor1}]} onPress={() => {executePayload(payload4)}}>
            <MaterialCommunityIcons name="rocket-launch" size={30} color="black" />
          </TouchableOpacity>
        </View> 
                
        <Collapsible collapsed={collapsed4}>
          <View style={[styles.container2, {backgroundColor: currentColor2, borderColor:currentColor1}]}>
              <Text style={[styles.description, {fontFamily: titleFont, backgroundColor: currentColor2, color: currentColor1}]}>{tableData[4]}</Text>
          </View>
        </Collapsible>

{/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

        <View style={[styles.container3, {backgroundColor: currentColor2, borderColor:currentColor1}]}>
          <TouchableOpacity onPress={() => setCollapsed5(!collapsed5)}>
            <Text style={[styles.title, {fontFamily: titleFont, backgroundColor: currentColor2, color: currentColor1}]}>&gt; Payload #5</Text>
          </TouchableOpacity>
        
          <TouchableOpacity style={[styles.button, {backgroundColor: currentColor1}]} onPress={() => {executePayload(payload5)}}>
              <MaterialCommunityIcons name="rocket-launch" size={30} color="black" />
          </TouchableOpacity>
        </View> 
                
        <Collapsible collapsed={collapsed5}>
          <View style={[styles.container2, {backgroundColor: currentColor2, borderColor:currentColor1}]}>
              <Text style={[styles.description, {fontFamily: titleFont, backgroundColor: currentColor2, color: currentColor1}]}>{tableData[5]}</Text>
          </View>
        </Collapsible>

{/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

        <View style={[styles.container3, {backgroundColor: currentColor2, borderColor:currentColor1}]}>
          <TouchableOpacity onPress={() => setCollapsed6(!collapsed6)}>
            <Text style={[styles.title, {fontFamily: titleFont, backgroundColor: currentColor2, color: currentColor1}]}>&gt; Payload #6</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, {backgroundColor: currentColor1}]} onPress={() => {executePayload(payload6)}}>
            <MaterialCommunityIcons name="rocket-launch" size={30} color="black" />
          </TouchableOpacity>
        </View> 
                
        <Collapsible collapsed={collapsed6}>
          <View style={[styles.container2, {backgroundColor: currentColor2, borderColor:currentColor1}]}>
              <Text style={[styles.description, {fontFamily: titleFont, backgroundColor: currentColor2, color: currentColor1}]}>{tableData[6]}</Text>
          </View>
        </Collapsible>

{/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

        <View style={[styles.container3, {backgroundColor: currentColor2, borderColor:currentColor1}]}>
          <TouchableOpacity onPress={() => setCollapsed7(!collapsed7)}>
            <Text style={[styles.title, {fontFamily: titleFont, backgroundColor: currentColor2, color: currentColor1}]}>&gt; Payload #7</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, {backgroundColor: currentColor1}]} onPress={() => {executePayload(payload7)}}>
            <MaterialCommunityIcons name="rocket-launch" size={30} color="black" />
          </TouchableOpacity>
        </View> 
                
        <Collapsible collapsed={collapsed7}>
          <View style={[styles.container2, {backgroundColor: currentColor2, borderColor:currentColor1}]}>
              <Text style={[styles.description, {fontFamily: titleFont, backgroundColor: currentColor2, color: currentColor1}]}>{tableData[7]}</Text>
          </View>
        </Collapsible>

{/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColor3,
    justifyContent: 'center', // Center the content vertically
    alignItems: 'center', // Center the content horizontally
  },
  container2: {
    borderColor: themeColor1, // Green outline
    borderWidth: 1.5,   
    paddingHorizontal: 10,
    paddingVertical: 10, 
    marginTop: 0,
    width: '95%',
    alignSelf: 'center', // Center horizontally
    backgroundColor: 'black',
    marginVertical: 20, // Add vertical margin to separate boxes

  },
  container3: {
    borderColor: themeColor1, // Green outline
    backgroundColor: themeColor2,
    borderWidth: 3,   
    paddingHorizontal: 10,
    paddingVertical: 8, 
    flexDirection: 'row', // Align items in a row
    marginVertical: 10, // Add vertical margin to separate boxes
    width: '96%', // Set the width to 90% of the screen
    justifyContent: 'space-between', // Ensure items are spaced out with the button at the end
    alignSelf: 'center', // Center the container horizontally
  },
  title: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 20,
    textAlign: 'left', 
    color: themeColor1
  },
  button: {
    width: 50, // Adjust the width as needed to make the button smaller
    height: 50, // Adjust the height as needed to make the button smaller
    alignSelf: 'end', // Align the button to the end of the container
    backgroundColor: themeColor1,
    justifyContent: 'center', // Center the text vertically
    alignItems: 'center', // Center the text horizontally
    right: 0,
    borderRadius: 4,
  },
  
});

export default Fixed;
