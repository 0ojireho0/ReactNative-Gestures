import React from "react";
import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import DragAndDrop from "volkeno-react-native-drag-drop";
import billGates from '../assets/bill_gates.jpg'
import elonMusk from '../assets/elon_musk.jpg'
import { TouchableOpacity } from "react-native-gesture-handler";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native";


export default function TryImage() {
  const [items, setItems] = useState([
    {
      id: 1,
      text: "Bill Gates",
      imgPath: billGates
    },
    {
      id: 2,
      text: "Elon Musk",
      imgPath: elonMusk
    },
    {
      id: 3,
      text: "Elon Musk",
      imgPath: elonMusk
    },
    {
      id: 4,
      text: "Elon Musk",
      imgPath: elonMusk
    },
    {
      id: 6,
      text: "Elon Musk",
      imgPath: elonMusk
    },
    {
      id: 7,
      text: "Elon Musk",
      imgPath: elonMusk
    },
    {
      id: 8,
      text: "Elon Musk",
      imgPath: elonMusk
    },
    {
      id: 9,
      text: "Elon Musk",
      imgPath: elonMusk
    },
    {
      id: 10,
      text: "Elon Musk",
      imgPath: elonMusk
    },
    {
      id: 11,
      text: "Elon Musk",
      imgPath: elonMusk
    },
    {
      id: 12,
      text: "Elon Musk",
      imgPath: elonMusk
    },
    {
      id: 13,
      text: "Elon Musk",
      imgPath: elonMusk
    },
    {
      id: 14,
      text: "Elon Musk",
      imgPath: elonMusk
    },
    {
      id: 15,
      text: "Elon Musk",
      imgPath: elonMusk
    },
    {
      id: 16,
      text: "Elon Musk",
      imgPath: elonMusk
    }

  ])


  const [zones, setZones] = useState([
    {
      id: 1,
      text: "Test zone 1",
     
    },
    {
      id: 2,
      text: "Test zone 2",
    },
  ]);


  const [showFolder, setShowFolder] = useState(false)
  const [getImages, setGetImages] = useState([])


  const pressFolder = (imgItems) =>{
    setShowFolder(true)
    console.log(`This is imgItems: ${imgItems}`)
    console.log(`This is imgItems: ${JSON.stringify(imgItems)}`)
    setGetImages(imgItems)
  }

  const pressExitFolder = () =>{
    setShowFolder(false)
  }
  


  //console.log(showFolder)


  return (
    <>
    <DragAndDrop
      style={styles.container}
      contentContainerStyle={styles.contentContainerStyle}
      itemKeyExtractor={(item) => item.id}
      zoneKeyExtractor={(zone) => zone.id}
      zones={zones}
      items={items}
      itemsContainerStyle={styles.itemsContainerStyle}
      zonesContainerStyle={styles.zonesContainerStyle}
      onMaj={(zones, items) => {
        setItems(items);
        setZones(zones);
      }}
      
     
      itemsInZoneStyle={styles.itemsInZoneStyle}
      renderItem={(item) => {
    


        return (
          <View style={styles.dragItemStyle}>
            <Image source={item.imgPath} style={{width: 30, height: 30}} />
            <Text style={styles.dragItemTextStyle}>{item.text}</Text>
            
          </View>
        );
      }}
      renderZone={(zone, children, hover) => {
       //console.log([zone.items?.[0].imgPath])
       console.log([zone.items])
       
        return (
          <View
            style={{
              ...styles.dragZoneStyle,
              backgroundColor: hover ? "#E2E2E2" : "#FFF",
            }
            }
          >
            <Text styles={styles.dragZoneTextStyle}>{zone.text}</Text>
              {children && 
              <TouchableOpacity onPress={()=> pressFolder(zone.items)}>
                <View style={styles.dragItemStyle}>
                  <Image source={zone.items?.[0].imgPath} style={{width: 30, height: 30}} />
                  <Text style={styles.dragItemTextStyle}>{zone.items?.[0].text}</Text>
                </View>
              </TouchableOpacity>}
          </View>
         
        );
      }}
      
    />

  {showFolder && 
  <>
  <SafeAreaView style={styles.containerSafeAreaView}>
  <Text onPress={pressExitFolder} style={{marginLeft: 'auto', marginRight: 10}}>X</Text>
    <FlatList 
    data={getImages}
    renderItem={({item})=>
      <View>
        <Image source={item.imgPath} style={{width: 30, height:30}} />
        <Text>{item.text}</Text>
      </View>
    } 
    keyExtractor={item => item.id}
    />
  </SafeAreaView>


 

  </>}
      

  </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemsInZoneStyle: {
    width: "100%",
  },
  contentContainerStyle: {
    padding: 20,
    paddingTop: 40,
  },
  itemsContainerStyle: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
  zonesContainerStyle: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  dragItemStyle: {
    borderColor: "#F39200",
    borderWidth: 1,
    width: "47%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    backgroundColor: "#F5F5F5",
    padding: 10,
  },
  dragItemTextStyle: {
    color: "#011F3B",
    fontWeight: "700",
    textAlign: "center",
    width: 100
  },
  dragZoneStyle: {
    borderColor: "#F39200",
    borderWidth: 1,
    width: "47%",
    padding: 15,
    minHeight: 130,
    marginVertical: 15,
  },
  dragZoneTextStyle: {
    position: "absolute",
    opacity: 0.2,
    zIndex: 0,
    alignSelf: "center",
    top: "50%",
  },
  showFolderContainer: {
    flex: 1
  },
  containerSafeAreaView:{
    flex: 1,
  }
});