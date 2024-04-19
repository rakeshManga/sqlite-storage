import React, { useRef, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage"


const Splash= ({ navigation }) => {
    let animationRef = useRef();

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

//   const getRegisteredData = async () => {
//     let data = await AsyncStorage.getItem('keepLoggedIn');
//     console.log('AsyncStorage.getItem', data);

//     console.log('keeploggedIn', data);
//     if (data && data == 'true') {
//      navigation.navigate("ViewAll")
//     }else{
//         navigation.navigate("Login")
//     }
//   };
    const getasyc = async () => {

        let data = await AsyncStorage.getItem('keepLoggedIn');
    console.log('AsyncStorage.getItem', data);
    // Alert("Rakesh....")

    console.log('keeploggedIn', data);
    if (data && data == 'true') {
     navigation.navigate("ViewAll")
    }else{
        navigation.navigate("Login")
    }
    }

    const isFocused = useIsFocused()

    useEffect(() => {

        // To play complete animation
        animationRef.play();
        // getRegisteredData();

        setTimeout(() => {
            getasyc()
        }, 3000);

    }, [isFocused]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'rgb(0, 153, 255)' }}>
            <View style={styles.container}>
                <LottieView
                    ref={(animation) => {
                        animationRef = animation;
                    }}
                    source={require("../lotties/boy.json.json")}
                    autoPlay
                    loop
                />
            </View>

        </SafeAreaView>
    );
};

export default Splash;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(0, 153, 255)',
        padding: 16,
        height: 200
    },
    header: {
        fontSize: 24,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    smallText: {
        fontSize: 18,
        textAlign: 'center',
    },
});