import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { openDatabase } from 'react-native-sqlite-storage'

const db = openDatabase({ name: 'user_db.db' });
const Updates = ({ route, navigation }) => {
  const { item } = route.params;
  const [userFirstname, setUserFirstname] = useState(item.user_firstname);
  const [userSecondname, setUserSecondname] = useState(item.user_secondname);
  const [userContact, setUserContact] = useState(item.user_contact);
  const [userAddress, setUserAddress] = useState(item.user_address);
  const [userPincode, setUserPincode] = useState(item.user_pincode);
  const [id, setId] = useState(item.user_id)
  console.log(JSON.stringify(item));
  // console.log("hello................!", item);


  const updateUser = () => {

    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE  tbl_user set user_firstname=?, user_secondname=?, user_contact=?, user_address=?, user_pincode=?, where user_id=?',
        [userFirstname, userSecondname, userContact, userAddress, userPincode, id],
        console.log("username......",userFirstname),
        (tx, results) => {
          console.log('Results', results);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User updated successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Home'),
                },
              ],
              {cancelable: false},
            );
          } else alert('Updation Failed');
        },
      );
    });

  }



  return (
    <View style={{ flex: 1 }}>
      <View style={{
        width: "100%",
        height: 55,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#b61e4c"
      }}>
        <Text style={{ color: "#fff", fontSize: 24 }}>Update </Text>
      </View>
      <View >
        <TextInput
          style={styles.txtinput}
          placeholder='First name'
          maxLength={20}
          value={userFirstname}
          onChangeText={(txt) => setUserFirstname(txt)}
        />
        <TextInput
          style={styles.txtinput}
          placeholder='Second name'
          maxLength={20}
          value={userSecondname}
          onChangeText={(txt) => setUserSecondname(txt)}
        />
        <TextInput
          style={styles.txtinput}
          placeholder='Phone number'
          keyboardType="numeric"
          maxLength={10}
          value={'' + userContact}
          onChangeText={(txt) => setUserContact(txt)}
        />
        <TextInput
          style={styles.txtinput1}
          placeholder='Address'
          multiline={true}
          maxLength={50}
          value={userAddress}
          onChangeText={(txt) => setUserAddress(txt)}
        />
        <TextInput
          style={styles.txtinput}
          placeholder='Pincode'
          keyboardType="numeric"
          maxLength={6}
          value={userPincode}
          onChangeText={(txt) => setUserPincode(txt)}
        />
        {/* <TextInput
          style={styles.txtinput}
          placeholder='Select Gender'
          // keyboardType="numeric"
          maxLength={6}
          value={userGender}
          onChangeText={(txt) => setUserGender(txt)}
        /> */}
        <TouchableOpacity style={styles.registerbtn}
          onPress={()=>{
            updateUser()
          }}
        >
          <Text style={{ color: "#FAF9F6", fontSize: 16 }}>Update</Text>
        </TouchableOpacity>

      </View>
    </View>
  )
}

export default Updates

const styles = StyleSheet.create({
  txtinput: {
    borderWidth: 1,
    marginTop: 30,
    padding: 10,
    width: "98%",
    height: 50,
    alignSelf: "center",
    borderRadius: 10,
    borderColor: "#b61e4c",
    fontSize: 16,
  },
  registerbtn: {
    backgroundColor: "#b61e4c",
    width: "95%",
    height: 45,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 40
  },
  txtinput1: {
    borderWidth: 1,
    marginTop: 30,
    padding: 5,
    width: "98%",
    height: 65,
    alignSelf: "center",
    borderRadius: 10,
    borderColor: "#b61e4c",
    fontSize: 16,
  }
})