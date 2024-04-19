import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { openDatabase } from 'react-native-sqlite-storage'
import { useIsFocused } from '@react-navigation/native';
import AntDesign from "react-native-vector-icons/AntDesign"


const db = openDatabase({ name: 'user_db.db' });

const Items = ({ route, navigation }) => {

  let [flatListItems1, setFlatListItems1] = useState([]);

  console.log("Data......123", flatListItems1);


  const isfocused = useIsFocused()
  useEffect(() => {
    data()
  }, [isfocused]);
  const data = () => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM tbl_user1',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setFlatListItems1(temp);
          console.log("temp>>>>>>>>>>>",temp)
        });
    });
  }

  const Delete = (id) => {
    db.transaction(txn => {
      txn.executeSql('DELETE FROM  tbl_user1 where user_id=?', [id], (tx, res) => {
        data()

      })
    })

  }
  const DATA =[
    {
      id:1,
      data:"Total no of Registrations: 1233",
      arogya: "Arogya Mitra: 235",
      allopathy:"Allopathy Doctor: 231",
      lead:"Lead Allopathy Mitra: 213",
    },
    {
      id:2,
      data:"Total no of Trainings: 1234",
      arogya: "Total no of Trainings completed: 234",
      allopathy:"Total no of Trainings yet be completed: 23",
    },
    {
      id:3,
      data:"State conducting maximum no of Trainings: Telangana",
      arogya: "District conducting maximum no of Trainings: Hyderabad",
    },
    {
      id:4,
      data:"Maximum trainintg attended by a resource: Vijay(Arogya Mitra)",
    },
  ]

  let listItemView = (item) => {
    return (
      <View
        key={item.user_id}
        style={styles.container}>
        <View style={styles.txt}>

          <Text style={styles.txtitem}>User Name: {item.user_firstname}</Text>
        </View>
        <View style={styles.txt}>
          <Text style={styles.txtitem}>User Password: {item.user_contact}</Text>
        </View>
        <View style={styles.txt}>
          <Text style={styles.txtitem}>User Address: {item.user_address}</Text>
        </View>
        <View style={styles.txt}>
          <Text style={styles.txtitem}>Cotact Number: {item.user_pincode}</Text>
        </View>
        <TouchableOpacity style={styles.registerbtn}
          onPress={() => {
            Delete(item.user_id)
          }}
        >
          <Text style={{
            fontWeight: "bold",
            fontSize: 18,
            marginLeft: 10, color: "#FAF9F6"
          }}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{
        width: "100%",
        height: 55,
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: "#rgb(0, 153, 255)",
        flexDirection:"row"
      }}>
        <AntDesign name='arrowleft' size={30} color={"#fff"}
         onPress={()=>{navigation.goBack()}}/>
        <Text style={{ color: "#fff", fontSize: 24 }}>Cart Details</Text>
        <Text>                   </Text>
      </View>
      <FlatList
        data={flatListItems1}
        scrollEnabled={true}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => listItemView(item)}
      />
    </View>
  )
}

export default Items

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
    elevation: 10,
    padding: 10,
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
  registerbtn: {
    width: "50%",
    height: 35,
    backgroundColor: "rgb(0, 153, 255)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    margin: 5,
    alignSelf: "center",
    marginTop: 10
  },
})