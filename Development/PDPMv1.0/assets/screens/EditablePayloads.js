// Fully editable payloads :)

// --------------------- dependencies --------------------------------
import {MaterialCommunityIcons } from '@expo/vector-icons';
import React, {useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Collapsible from 'react-native-collapsible';
//----------------------------------------------------------------------
// --------------------- weird variables -------------------------------
const themeColor1 = "#7CFC00";
const themeColor2 = "#000000";
const themeColor3 = "#111413";
themeHighlight = themeColor1;
themeBackground = themeColor2;

const titleFont = 'font1';
const largebuttonFont = 'font2';
const boxFont = 'font1';
//----------------------------------------------------------------------
// --------------------- Payloads definition ---------------------------
const payload0 = 'editPayload0.dd';
const payload1 = 'editPayload1.dd';
const payload2 = 'editPayload2.dd';
const payload3 = 'editPayload3.dd';
//----------------------------------------------------------------------



const Editable = () => {

// -------------- theme colors and descriptions loading ----------------
  let color1;
  let color2;
  let color3;

  const [currentColor1, setCurrentColor1] = useState(color1);
  const [currentColor2, setCurrentColor2] = useState(color2);
  const [currentColor3, setCurrentColor3] = useState(color3);
  const [tableData, setTableData] = useState(Array(4).fill(''));


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
        for (let i = 8; i < 12; i++) {
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

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const [text0, setText0] = useState(''); 
  const [text1, setText1] = useState(''); 
  const [text2, setText2] = useState(''); 
  const [text3, setText3] = useState(''); 

  const [collapsed0, setCollapsed0] = useState(true);
  const [collapsed1, setCollapsed1] = useState(true);
  const [collapsed2, setCollapsed2] = useState(true);
  const [collapsed3, setCollapsed3] = useState(true);
  

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

  const loadPayload = async (payloadName) => {
    setLoading(true);
    try {
      const response = await fetch(`http://192.168.4.1/view/${payloadName}`);
      const textContent = await response.text();
      const cleanedContent = textContent.replace(/<\/?pre>/g, '');
      setData(cleanedContent);
      return cleanedContent;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  
  // const parsePayload = async (payloadName) => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch(`http://192.168.4.1/view/${payloadName}`);
  //     const textContent = await response.text();
  //     const cleanedContent = textContent.replace(/<\/?pre>/g, '');

  //     setData(cleanedContent);
  //     return cleanedContent;
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  
  const editPayload = async (payloadName, payloadData) => {
    setLoading(true);
    try {
      //console.error("payloadData ->" + payloadData);
      payloadData = payloadData.replace(/ /g, '+').replace(/\r?\n/g, '%0D%0A');
      payloadData = 'scriptData=' + payloadData; 
      //console.error("compiledPayloadData->  ", payloadData);
      const postUrl = `http://192.168.4.1/write/${payloadName}`
      const contentLength = new URLSearchParams(payloadData).toString().length;
      const postOptions = {
        method: 'POST', 
        headers: {                                                   //not really sure all this stuff is necessary but since it works I'm gonna leave it here :P
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': contentLength.toString(),
          'Cache-Control': 'max-age=0',
          'Upgrade-Insecure-Requests': '1',
          'Origin': 'http://192.168.4.1',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.6312.122 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
          'Referer': postUrl,
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7',
          'Connection': 'close'
        },
        body: payloadData.toString()
      };
      const response = await fetch(postUrl, postOptions);

      console.error("compiledPayloadData->  ", payloadData.toString());

      const json = await response.json();
      setData(json.payloads);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // {tableData[1]}

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: currentColor3}]}>
      <ScrollView style={styles.scrollView}>

      {/*------------------------------------------------------------------------------------------------------------------------------------------------------------
      ------------------------------------------------------------------------------------------------------------------------------------------------------------*/}        

      <View style={[styles.container3, {justifyContent: 'space-between', backgroundColor: currentColor2, borderColor:currentColor1}]}>
        <TouchableOpacity onPress={() => setCollapsed0(!collapsed0)}>
          <Text style={[styles.title, {fontFamily: titleFont, backgroundColor: currentColor2, color: currentColor1}]}>&gt; Editable payload #0</Text>
        </TouchableOpacity>
          <TouchableOpacity style={[styles.button, {backgroundColor: currentColor1}]} onPress={() => {executePayload(payload0)}}>
            <MaterialCommunityIcons name="rocket-launch" size={30} color="black" />
          </TouchableOpacity>
      </View> 


      <Collapsible collapsed={collapsed0}>
        <View style={[styles.container2, {backgroundColor: currentColor2, borderColor:currentColor1}]}>

          <View style={[styles.descriptionbox, {backgroundColor: currentColor2, borderColor:currentColor1}]}>
            <Text style={[styles.description, {fontFamily: titleFont, backgroundColor: currentColor2, color: currentColor1}]}>{tableData[0]}</Text>
          </View>

          <View style={styles.container4}>
            <TouchableOpacity style={[styles.largeButton, {backgroundColor:currentColor1}]} onPress={async () => {
              payloadContent0 = await loadPayload(payload0), 
              setText0(payloadContent0);
              }}>
              <Text style={[styles.content, {fontFamily: largebuttonFont}]}>Import payload</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.largeButton, {backgroundColor:currentColor1}]} onPress={async () => {editPayload(payload0, text0)}}>
              <Text style={[styles.content, {fontFamily: largebuttonFont}]}>Save changes</Text>
            </TouchableOpacity>
          </View>

          <TextInput
          selectionColor={currentColor1}
          value={text0}
          inputMode="text"
          multiline={true}
          style={[styles.textbox, {fontFamily: boxFont, color: 'white', borderColor:currentColor1}]}
          onChangeText={newText0 => setText0(newText0)}

          />

        </View>
        
      </Collapsible>

      {/*------------------------------------------------------------------------------------------------------------------------------------------------------------
      ------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
      
      <View style={[styles.container3, {justifyContent: 'space-between', backgroundColor: currentColor2, borderColor:currentColor1}]}>
        <TouchableOpacity onPress={() => setCollapsed1(!collapsed1)}>
        <Text style={[styles.title, {fontFamily: titleFont, backgroundColor: currentColor2, color: currentColor1}]}>&gt; Editable payload #1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, {backgroundColor: currentColor1}]} onPress={() => {executePayload(payload1)}}>
            <MaterialCommunityIcons name="rocket-launch" size={30} color="black" />
          </TouchableOpacity>
      </View> 

      <Collapsible collapsed={collapsed1}>
        <View style={[styles.container2, {backgroundColor: currentColor2, borderColor:currentColor1}]}>

          <View style={[styles.descriptionbox, {backgroundColor: currentColor2, borderColor:currentColor1}]}>
            <Text style={[styles.description, {fontFamily: titleFont, backgroundColor: currentColor2, color: currentColor1}]}>{tableData[1]}</Text>
          </View>

          <View style={styles.container4}>
          <TouchableOpacity style={[styles.largeButton, {backgroundColor:currentColor1}]} onPress={async () => {
              payloadContent1 = await loadPayload(payload1), 
              setText1(payloadContent1);
              }}>
              <Text style={[styles.content, {fontFamily: largebuttonFont}]}>Import payload</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.largeButton, {backgroundColor:currentColor1}]} onPress={async () => {editPayload(payload1, text1)}}>
              <Text style={[styles.content, {fontFamily: largebuttonFont}]}>Save changes</Text>
            </TouchableOpacity>
          </View>

          <TextInput
          value={text1}
          multiline={true}
          selectionColor={currentColor1}
          style={[styles.textbox, {fontFamily: boxFont, color: 'white', borderColor:currentColor1}]}
          onChangeText={newText1 => setText1(newText1)}
          />
        </View>
      </Collapsible>      

      {/*------------------------------------------------------------------------------------------------------------------------------------------------------------
      ------------------------------------------------------------------------------------------------------------------------------------------------------------*/}      

      <View style={[styles.container3, {justifyContent: 'space-between', backgroundColor: currentColor2, borderColor:currentColor1}]}>
        <TouchableOpacity onPress={() => setCollapsed2(!collapsed2)}>
        <Text style={[styles.title, {fontFamily: titleFont, backgroundColor: currentColor2, color: currentColor1}]}>&gt; Editable payload #2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, {backgroundColor: currentColor1}]} onPress={() => {executePayload(payload2)}}>
            <MaterialCommunityIcons name="rocket-launch" size={30} color="black" />
          </TouchableOpacity>
      </View> 

      <Collapsible collapsed={collapsed2}>
        <View style={[styles.container2, {backgroundColor: currentColor2, borderColor:currentColor1}]}>

          <View style={[styles.descriptionbox, {backgroundColor: currentColor2, borderColor:currentColor1}]}>
            <Text style={[styles.description, {fontFamily: titleFont, backgroundColor: currentColor2, color: currentColor1}]}>{tableData[2]}</Text>
          </View>          

          <View style={styles.container4}>
          <TouchableOpacity style={[styles.largeButton, {backgroundColor:currentColor1}]} onPress={async () => {
              payloadContent2 = await loadPayload(payload2), 
              setText2(payloadContent2);
              }}>
              <Text style={[styles.content, {fontFamily: largebuttonFont}]}>Import payload</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.largeButton, {backgroundColor:currentColor1}]} onPress={async () => {editPayload(payload2, text2)}}>
              <Text style={[styles.content, {fontFamily: largebuttonFont}]}>Save changes</Text>
            </TouchableOpacity>
          </View>

          <TextInput
          value={text2}
          multiline={true}
          selectionColor={currentColor1}
          style={[styles.textbox, {fontFamily: boxFont, color: 'white', borderColor:currentColor1}]}
          onChangeText={newText2 => setText2(newText2)}
          />

        </View>
      </Collapsible>

      {/*------------------------------------------------------------------------------------------------------------------------------------------------------------
      ------------------------------------------------------------------------------------------------------------------------------------------------------------*/}

      <View style={[styles.container3, {justifyContent: 'space-between', backgroundColor: currentColor2, borderColor:currentColor1}]}>
        <TouchableOpacity onPress={() => setCollapsed3(!collapsed3)}>
        <Text style={[styles.title, {fontFamily: titleFont, backgroundColor: currentColor2, color: currentColor1}]}>&gt; Editable payload #3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, {backgroundColor: currentColor1}]} onPress={() => {executePayload(payload3)}}>
            <MaterialCommunityIcons name="rocket-launch" size={30} color="black" />
          </TouchableOpacity>
      </View> 

      <Collapsible collapsed={collapsed3}>
        <View style={[styles.container2, {backgroundColor: currentColor2, borderColor:currentColor1}]}>
          
          <View style={[styles.descriptionbox, {backgroundColor: currentColor2, borderColor:currentColor1}]}>
            <Text style={[styles.description, {fontFamily: titleFont, backgroundColor: currentColor2, color: currentColor1}]}>{tableData[3]}</Text>
          </View>

          <View style={styles.container4}>
          <TouchableOpacity style={[styles.largeButton, {backgroundColor:currentColor1}]} onPress={async () => {
              payloadContent0 = await loadPayload(payload3), 
              setText3(payloadContent0);
              }}>
              <Text style={[styles.content, {fontFamily: largebuttonFont}]}>Import payload</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.largeButton, {backgroundColor:currentColor1}]} onPress={async () => {editPayload(payload3, text3)}}>
              <Text style={[styles.content, {fontFamily: largebuttonFont}]}>Save changes</Text>
            </TouchableOpacity>
          </View>

          <TextInput
          value={text3}
          multiline={true}
          selectionColor={themeColor1}
          style={[styles.textbox, {fontFamily: boxFont, color: 'white', borderColor:currentColor1}]}
          onChangeText={newText3 => setText3(newText3)}
          />

        </View>
      </Collapsible>
      {/* <Text style={[styles.content, {fontFamily: largebuttonFont, color: currentColor1}]}>{tableData}</Text>
      <Text style={[styles.content, { fontFamily: largebuttonFont, color: currentColor1 }]}>
    Item 0: {tableData[1]}
  </Text> */}

      {/*------------------------------------------------------------------------------------------------------------------------------------------------------------
      ------------------------------------------------------------------------------------------------------------------------------------------------------------*/}

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
    borderWidth: 3,   
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
  container4:{
    paddingHorizontal: 5,
    paddingVertical: 5, 
    flexDirection: 'row', // Align items in a row
    justifyContent: 'space-around'
  },
  title: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 20,
    textAlign: 'left', 
    color: themeColor1
  },

  description :{
    fontSize: 12,
    textAlign: 'left',
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  descriptionbox: {
    borderWidth: 0.5,
    marginBottom: 10,
  },
  textbox:{
    height: 200,
    borderColor: themeColor1, // Green outline
    borderWidth: 0.5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    textAlignVertical: 'top',
    color: themeColor1,
    marginTop: 10,
    color: 'white'
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
  largeButton: {
    width: 130, // Adjust the width as needed to make the button smaller
    // height: 50, // Adjust the height as needed to make the button smaller
    justifyContent: 'center', // Center the text vertically
    alignItems: 'center', // Center the text horizontally
    paddingHorizontal: 10,
    paddingVertical:10,
    backgroundColor: themeColor1,
    borderRadius: 4,

  },
  content: {
    justifyContent: 'center', // Center the text vertically
    alignItems: 'center', // Center the text horizontally
    fontSize: 15,
  }

});

export default Editable;
