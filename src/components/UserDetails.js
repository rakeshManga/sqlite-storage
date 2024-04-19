import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { openDatabase } from 'react-native-sqlite-storage'
import { useIsFocused } from '@react-navigation/native';
import AntDesign from "react-native-vector-icons/AntDesign"

const db = openDatabase({ name: 'user_db.db' });
const UserDetails = ({ route, navigation }) => {



  const { item } = route.params;

  const [firstname, setFirstName] = useState(item.user_firstname);
  const [secondname, setSecondName] = useState(item.user_secondname);
  const [contactnumber, setContactNumber] = useState(item.user_contact);
  const [address, setAddress] = useState(item.user_address);
  const [pincode, setPincode] = useState(item.user_pincode);
  let [flatListItems, setFlatListItems] = useState([]);
console.log("flatListItems....",flatListItems);

useEffect(() => {
  db.transaction((txn) => {
    txn.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='tbl_user1'",
      [],
      function (tx, res) {
        console.log('item:', res.rows.length);
        if (res.rows.length == 0) {
          txn.executeSql('DROP TABLE IF EXISTS tbl_user1', []);
          txn.executeSql(
            'CREATE TABLE IF NOT EXISTS tbl_user1(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_firstname VARCHAR(20), user_secondname VARCHAR(20), user_contact INT(10), user_address VARCHAR(50))',
            [],
          );
        }
        else {
          txn.executeSql(
            'ALTER TABLE tbl_user1 ADD  user_pincode TEXT',
            [],
        
          )
       
        }
      },
    );
  });
  data()
}, []);



  let register = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO tbl_user1 (user_firstname, user_secondname, user_contact, user_address, user_pincode) VALUES (?,?,?,?,?)',
        [firstname, secondname, contactnumber, address, pincode],

        (tx, results) => { 
          console.log("Register data......!", { firstname, secondname, contactnumber, address, pincode });
          console.log('Results', results.rowsAffected);
        
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Add to cart completed',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('ViewAll'),
                },
              ],
              { cancelable: false },
            );
          } else {
            alert('Registration Failed');
          }
        },
      );
    });
  };

  

  const data = () => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM tbl_user1',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setFlatListItems(temp);
        });
    });
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{
        width: "100%",
        height: 55,
        flexDirection:"row",
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: "#rgb(0, 153, 255)"
      }}>
        <AntDesign
         name='arrowleft' size={30} color={"#fff"}
         onPress={()=>{navigation.goBack()}}/>
        <Text style={{ color: "#fff", fontSize: 24 }}>User Details</Text>
        <Text>         </Text>
      </View>
      <View style={styles.container}>

        <Text style={styles.txtitem}>User Id : {firstname}</Text>
        <Text style={styles.txtitem}>Full Name : {secondname}</Text>
        <Text style={styles.txtitem}>Password : {contactnumber}</Text>
        <Text style={styles.txtitem}>Address : {address}</Text>
        <Text style={styles.txtitem}>Phone Number : {pincode}</Text>
        <TouchableOpacity style={styles.registerbtn}
            onPress={()=>{
              const found = flatListItems.some(el => el.user_firstname === firstname );
              // console.log("found.......",found);
              // const found1= flatListItems.some(el1 => el1.user_contact === parseInt(userContact));
              if (!found) {
                register();
              }
              else {
                alert('Cart already added');
              }
            }}
          >
            <Text style={{
              fontWeight: "bold",
              fontSize: 18,
              marginLeft: 10, color: "#FAF9F6"
            }}>Add to Cart</Text>
          </TouchableOpacity>

      </View>
    </View>
  )
};
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
    fontWeight: "500",
    marginTop:8
  },
  registerbtn: {
    width: "50%",
    height: 35,
    backgroundColor: "rgb(0, 153, 255)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    margin: 5,
    alignSelf:"center",
    marginTop:10
  },
})

export default UserDetails