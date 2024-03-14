import { View, Text, Image, SafeAreaView, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import billGates from '../assets/bill_gates.jpg'
import elonMusk from '../assets/elon_musk.jpg'
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const ImageItems = [
    {
        id: 1,
        name: "Bill Gates",
        imgPath: billGates
    },
    {
        id: 2,
        name: "Elon Musk",
        imgPath: elonMusk
    }
]
const styles = StyleSheet.create({
    ball: {
        width: 100,
        height: 100,
        borderRadius: 100,
        backgroundColor: 'blue',
        alignSelf: 'center',
    }
})


const TryImage = () => {
    const numberColumns = 3
    const isPressed = useSharedValue(false);
    const offset = useSharedValue({ x: 0, y: 0 });
    
    const animatedStyles = useAnimatedStyle(() => {
        return {
          transform: [
            { translateX: offset.value.x },
            { translateY: offset.value.y },
            { scale: withSpring(isPressed.value ? 1.2 : 1) },
          ],
          backgroundColor: isPressed.value ? 'yellow' : 'blue',
        };
      });


      const start = useSharedValue({ x: 0, y: 0 });


      const longPress = Gesture.LongPress()
        .minDuration(500)
        .onStart(() => {
            isPressed.value = true;
        });
    
      const panGesture = Gesture.Pan()
        .manualActivation(true)
        .onTouchesMove((event, stateManager) => {
          if (isPressed.value) {
            stateManager.activate();
          } else {
            stateManager.fail();
          }
        })
        .onUpdate(event => {
            
          offset.value = {
            x: event.translationX + start.value.x,
            y: event.translationY + start.value.y,
          };
        })
        .onTouchesUp(() => {
            isPressed.value = false;
        })
        .onEnd(()=>{
            start.value = {
                x: offset.value.x,
                y: offset.value.y,
              };
        })
    
      const composed = Gesture.Simultaneous(longPress, panGesture);
      




      
   
      
      
  return (
    <>
        <View>
            <Text>tryImage</Text>
            <SafeAreaView>
                <View>
                    <FlatList
                        data={ImageItems}
                        
                        renderItem={({item}) =>{
                            return(
                                <View style={{justifyContent: 'center', alignItems:'center', height: 200, flex: 1}}>
                                    <Image source={item.imgPath} style={{width: 200, height: 180}} />
                                    <Text>{item.name}</Text>
                                </View>
                            )
                        }}
                        numColumns={numberColumns} />
                </View>
            </SafeAreaView>
            <GestureDetector gesture={composed}>
                <Animated.View style={[styles.ball, animatedStyles]} />
            </GestureDetector>
        </View>
    </>
  )
}

export default TryImage