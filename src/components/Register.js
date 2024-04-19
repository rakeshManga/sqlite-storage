import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ScrollView } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { openDatabase } from 'react-native-sqlite-storage'
import NetInfo from '@react-native-community/netinfo'

const db = openDatabase({ name: 'user_db.db' });
const Register = ({ navigation }) => {
  const [userFirstname, setUserFirstname] = useState('');
  const [userSecondname, setUserSecondname] = useState('');
  const [userContact, setUserContact] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [userPincode, setUserPincode] = useState('');
  const [userGender, setUserGender] = useState('');

  const [isConnected, setIsConnected] = useState(false);
  let [flatListItems, setFlatListItems] = useState([]);

  // console.log("Rakesh...........", flatListItems);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      // console.log("Connection type..........", state.type);
      // console.log("Is connected....!", state.isConnected);
      setIsConnected(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  useEffect(() => {
    db.transaction((txn) => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='tbl_user'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS tbl_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS tbl_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_firstname VARCHAR(20), user_secondname VARCHAR(20), user_contact INT(10), user_address VARCHAR(50))',
              [],
            );
          }
          else {
            txn.executeSql(
              'ALTER TABLE tbl_user ADD  user_pincode TEXT',
              [],
          
            )
         
          }
        },
      );
    });
  }, []);




  const register_user = () => {
    // console.log(userFirstname, userSecondname, userContact, userAddress, userPincode);

    if (!userFirstname) {
      alert('Please fill name');
      return;
    }
    if (!userSecondname) {
      alert('Please fill name');
      return;
    }
    if (!userContact) {
      alert('Please fill Contact Number');
      return;
    }
    if (!userAddress) {
      alert('Please fill Address');
      return;
    }
    if (!userPincode) {
      alert('Please fill phone number');
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(

        'INSERT INTO tbl_user (user_firstname, user_secondname, user_contact, user_address, user_pincode) VALUES (?,?,?,?,?)',
        [userFirstname, userSecondname, userContact, userAddress, userPincode],
      
        (tx, results) => {
          alert(JSON.stringify({userFirstname, userSecondname, userContact, userAddress, userPincode, userGender})),
          console.log("Register data......!", { userFirstname, userSecondname, userContact, userAddress, userPincode });
          console.log('Results', results.rowsAffected);
          // if (
          //   `${.user_firstname}` == `${username}` &&
          //   `${temp[0].user_contact}` == `${password}`
          // ) {
          //   AsynsStorage.setItem('keepLoggedIn', 'true');
          //   navigation.navigate('ViewAll');
          // }
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'You are Registered Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Login'),
                },
              ],
              { cancelable: false },
            );
          } else {
            alert('Registration Failed');
          }
        },
      )
    });
  };

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
  useEffect(() => {
    data()
  }, []);



  const lastNameRef = useRef();
  const concatRef = useRef();
  const addressRef = useRef();
  const pincodeRef = useRef();

  return (
    <View style={{ flex: 1 }}>

      <View style={{
        width: "100%",
        height: 55,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgb(0, 153, 255)"
      }}>
        <Text style={{ color: "#fff", fontSize: 24 }}>Registration </Text>
      </View>
      <ScrollView>
        <View style={{ flex: 1 }}>
          <Text style={styles.text}>User Id :</Text>
          <TextInput
            style={styles.txtinput}
            placeholder='UserId'
            maxLength={20}
            value={userFirstname}
            onSubmitEditing={() => {
              lastNameRef.current.focus();
            }}

            onChangeText={(txt) => setUserFirstname(txt)}
          />
          <Text style={styles.text}>Full Name :</Text>
          <TextInput
            style={styles.txtinput}
            placeholder='Full name'
            maxLength={20}
            value={userSecondname}
            ref={lastNameRef}
            onChangeText={(txt) => setUserSecondname(txt)}
            onSubmitEditing={() => {
              concatRef.current.focus();
            }}
          />
          <Text style={styles.text}>Password :</Text>
          <TextInput
            style={styles.txtinput}
            placeholder='Paasword'
            maxLength={10}
            keyboardType="numeric"
            secureTextEntry={true}
            value={userContact}
            ref={concatRef}
            onChangeText={(txt) => setUserContact(txt)}
            onSubmitEditing={() => {
              addressRef.current.focus();
            }}
          />
          <Text style={styles.text}>Address :</Text>
          <TextInput
            style={styles.txtinput}
            placeholder='Address'
            maxLength={50}
            numberOfLines={5}
            value={userAddress}
            ref={addressRef}
            onChangeText={(txt) => setUserAddress(txt)}
            onSubmitEditing={() => {
              pincodeRef.current.focus();
            }}
          />
          <Text style={styles.text}>Phone Number :</Text>
          <TextInput
            style={styles.txtinput}
            placeholder='Phone Number'
            maxLength={10}
            keyboardType="number-pad"
            returnKeyType="next"
            value={userPincode}
            ref={pincodeRef}
            onChangeText={(txt) => setUserPincode(txt)}

          />

          <TouchableOpacity style={styles.registerbtn}
            onPress={() => {
              const found = flatListItems.some(el => el.user_firstname === userFirstname);
              // const found1= flatListItems.some(el1 => el1.user_contact === parseInt(userContact));
              if (!found) {
                register_user();
              }
              else {
                alert('username already exits');
              }
            }}
          >
            <Text style={{
              fontWeight: "bold",
              fontSize: 20,
              marginLeft: 10, color: "#FAF9F6"
            }}>Register</Text>
          </TouchableOpacity>

        </View>
        {isConnected ? null : <View style={{
          width: "98%",
          height: 50,
          backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
          marginBottom: 5,
          alignSelf: "center"
        }}>
          <Text style={{ color: "#000", }}>No Internet Connection</Text>
        </View>}
      </ScrollView>
    </View>
  )
}

export default Register

const styles = StyleSheet.create({
  txtinput: {
    borderWidth: .5,
    padding: 10,
    width: "95%",
    height: 50,
    alignSelf: "center",
    borderColor: "#000",
    fontSize: 16,
    borderRadius: 5
  },
  registerbtn: {
    width: "80%",
    height: 50,
    backgroundColor: "rgb(0, 153, 255)",
    alignSelf: "center",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50
  },
  txtinput1: {
    borderBottomWidth: 2,
    marginTop: 30,
    padding: 10,
    width: "95%",
    height: 50,
    alignSelf: "center",
    borderColor: "rgb(0, 153, 255)",
    fontSize: 16,
  },
  text: {
    marginTop: 10,
    padding: 10,
    fontSize: 18,
    color: "#000"
  }
})