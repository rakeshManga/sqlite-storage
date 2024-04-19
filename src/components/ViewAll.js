import { FlatList, SafeAreaView, StyleSheet, Text, View,ScrollView, Alert, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { openDatabase } from 'react-native-sqlite-storage'
import { TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo'
import { BackHandler } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"

const db = openDatabase({ name: 'user_db.db' });
const ViewAll = ({ navigation }) => {

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () =>
        BackHandler.removeEventListener('hardwareBackPress', backAction);
}, []);

  const backAction = () => {
    if (navigation.isFocused()) {
        Alert.alert('', 'Are you sure you want to exit app?', [
           {
               text: 'Cancel',
                onPress: () => null,
                style: 'cancel',
            },
           { text: 'YES', onPress: () => BackHandler.exitApp() },
        ]);
        return true;
    }
};

  let [flatListItems, setFlatListItems] = useState([]);
  const [isConnected, setIsConnected] = useState(false);  

  console.log("flatListItems.....!!!!!!!!!!!!!!",flatListItems);

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

  const isfocused = useIsFocused()
  useEffect(() => {
    data()
  }, [isfocused]);

  const data = () => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM tbl_user',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setFlatListItems(temp);
        });
    });
  }


  const Delete = (id) => {
    db.transaction(txn => {
      txn.executeSql('DELETE FROM  tbl_user where user_id=?', [id], (tx, res) => {
        data()

      })
    })
  }

  let listItemView = (item) => {
    return (
      <View
        key={item.user_id}
        style={styles.container}>
        <View style={styles.txt}>

          <Text style={styles.txtitem}>User Name: {item.user_firstname}</Text>
        </View>
        <View style={styles.txt}>
          <Text style={styles.txtitem}>Cotact Number: {item.user_pincode}</Text>
        </View>
        {/* <View style={styles.txt1}>
          <Text style={styles.txtitem}>{item.user_address}</Text>
        </View> */}
        {/* <View style={styles.txt}>
          <Text style={styles.txtitem}>{item.user_pincode}</Text>
        </View> */}
        {/* <View style={styles.txt}>
          <Text style={styles.txtitem}>{item.user_gender}</Text>
        </View> */}
     

        <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-around"}}>
        <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("UserDetails", {
                item: item
              }
              )

            }}
          >
            <Text style={{ color: "#FAF9F6", fontSize: 15 }}>User Details</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          style={styles.button}
          onPress={() => {
              Delete(item.user_id)
          }}>
              <Text style={{ color: "#FAF9F6", fontSize: 15 }}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{
        flexDirection:"row",
        width: "100%",
        height: 55,
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: "#rgb(0, 153, 255)",
        
      }}>
        
        <TouchableOpacity onPress={()=>{
           Alert.alert(
            'Logout',
            'Are you sure you want to logout app ?',
            [
              {
                text: 'Cancel',
                 onPress: () => null,
                 style: 'cancel',
             },
              {
                text: 'Yes',
                onPress: () => {navigation.navigate("Login"), AsyncStorage.clear()}
              },
            ]
          );
          
        }}>
       <MaterialIcons name='logout' size={30} color={"#fff"} />
       </TouchableOpacity>
       <Text style={{ color: "#fff", fontSize: 24 }}>View All </Text>
       <TouchableOpacity onPress={()=>{
          navigation.navigate("Items")
        }}>
       <MaterialIcons name='shopping-cart' size={30} color={"#fff"} />
       </TouchableOpacity>

      </View>
      <ScrollView>
      <View style={{ flex: 1 }}>
        {isConnected ? <View style={{ flex: 1 }}>
          <FlatList
            data={flatListItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        </View> : null}
      </View>
      </ScrollView>
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

    </SafeAreaView>
  )
}

export default ViewAll

const styles = StyleSheet.create({
  container: {
    width: "95%",
    alignSelf: "center",
    borderRadius: 10,
    backgroundColor: "#FFF",
    marginTop: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "rgb(0, 153, 255)",
    elevation:10,
    padding: 10,
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 20
  },
  button: {
    width: "38%",
    height: 35,
    backgroundColor: "rgb(0, 153, 255)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    margin: 5,
    alignSelf:"center",
    marginTop:10
  },
  // txt: {
  //   width: "98%",
  //   height: 45,
  //   borderWidth: 1,
  //   borderRadius: 5,
  //   marginTop: 5,
  //   padding: 10,
  //   alignSelf: "center",
  //   borderColor: "#b61e4c",

  // },
  header: {
    color: "#000",
    // fontWeight:"800",
    fontSize: 18,
    padding: 5
  },
  txtitem: {
    color: "#000",
        margin: 1,
        fontSize: 18,
        fontWeight: "500"
  },
  txt1: {
    width: "98%",
    height: 70,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 5,
    padding: 10,
    alignSelf: "center",
    borderColor: "#b61e4c"
  },
})