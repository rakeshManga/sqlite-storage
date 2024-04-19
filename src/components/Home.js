import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { openDatabase } from 'react-native-sqlite-storage'
import NetInfo from '@react-native-community/netinfo'

const db = openDatabase({ name: 'user_db.db' });
const Home = ({ navigation }) => {
  const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log("Connection type..........", state.type);
      console.log("Is connected....!", state.isConnected);
      setIsConnected(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  
  return (
    <View style={{ flex: 1 }}>
       <View style={{
        width: "100%",
        height: 55,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#b61e4c"
      }}>
        <Text style={{ color: "#fff", fontSize: 24 }}>Home </Text>
        
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity style={styles.button}
          onPress={() => {
            navigation.navigate("Register")
          }}>
          <Text style={{ color: "#FAF9F6", fontSize: 16 }}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if(isConnected){
              navigation.navigate("ViewAll")
            }else{
              alert("No Internet Connection")
            }
           
          }}>
          <Text style={{ color: "#FAF9F6", fontSize: 16 }}>ViewAll</Text>
        </TouchableOpacity>
      </View>
      {isConnected ? null : <View style={{
        width: "98%",
        height: 50,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        borderRadius:10,
        marginBottom:5,
        alignSelf:"center"
      }}>
        <Text style={{ color: "#000", }}>No Internet Connection</Text>
      </View>}
    </View>

  )
}

export default Home

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#b61e4c",
    width: "90%",
    height: 50,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 40
  }
})