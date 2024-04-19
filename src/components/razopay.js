import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
 
  Image,
  Alert,
  ScrollView,
  Platform,
  BackHandler,
  StatusBar,
  KeyboardAvoidingView
} from 'react-native'





import { DateTimePickerComponent } from '../DatePicker/DateTimePickerComponent '
import { DateHelper } from '../DatePicker/DateHelper'
import RazorpayCheckout from 'react-native-razorpay'



const rozopay = ({ navigation }) => {
  {/*Backhandler starts here*/} 

  useEffect(() => {
    const backAction = () => {
      navigation.navigate("Home")
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

 
{/*Backhandler ends here*/} 


{/*Usestates starts here*/} 
  
  const [checked, setChecked] = useState('Other Active')
  const [Active, setActive] = useState(false)
  const [referal, setReferal] = useState([])
  const [referalmember, setreferalMember] = useState()
  const [referalname, setReferalname] = useState()
  const [amount_paid, setAmount_paid] = useState('') //payment
  const [education, setEducation] = useState([])

  const [toggleCheckBox, setToggleCheckBox] = useState(false)
 
  const [calendar, setCalendar] = useState('')
  const [userid, setUserId] = useState('')
  
  const [mobilenumber, setMobileNumber] = useState('')
  const [select1, setSelect1] = useState('')
  const [number,setNumber]=useState('')
  const [Parliamentary, setParliamentary] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)

  const [doorNumber, setDoorNumber] = useState('')
  const [street, setStreet] = useState('')
  const [pincode, setpincode] = useState('')
  const [since, setSince] = useState()
  const [emailD, setEmailD] = useState();
  const[email,setEmail]=useState()
  const [name, setName] = useState('')
  const [parlimentName, setParlimentName] = useState('')
  const [donateName, setDonateName] = useState('')
 const [isVisibleIndicator,setIsVisibleIndicator]=useState(false)

  const [imageSource, setImageSource] = useState()
  const [startDate, setStartDate] = useState({
    date: new Date(),
    dateText: '',
  })
 



  const getReferals = async (number) => {
    const res = await api.user.Referal({}, number)
     console.log("getReferals response...........................!",JSON.stringify(res));
  setReferal(res.data.user_obj)
   
  }
{/*Getreferals ended here*/} 


  useEffect(() => {
    getuserid()
    getparliamentary()
  }, [])

  // const strongRegex = new RegExp(
  //   '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$',
  // )


{/*Paymentmethod started here*/} 

      const paymentMethod = async (values) => {
      setIsModalVisible(true)
     
    let payload ;
    if(Active==true){
     payload = new FormData()
    payload.append("user_id", userid)
    payload.append("product_info", "SelfDonate")
    payload.append("amount_paid", values.amount_paid)
    payload.append("environment", "QA")
    // payload.append("environment", "PROD")
    payload.append("name", values.firstname)
    payload.append("surname", values.surname)
    payload.append("email", emailD)
    payload.append("mobile_number", mobilenumber)
    payload.append("cast_name", "")
    payload.append("pincode", values.pinCode)
    payload.append("address", values.door_number)
    payload.append("parliment_code", parlimentName)
    payload.append("parliment_name", donateName.name)
    //  payload.append("pancard", "pancard photo");
    if (imageSource && imageSource != undefined) {
      payload.append('pancard', {
        uri: imageSource,
        name: 'image.png',
        fileName: 'image',
        type: 'image/png',
      })
    }
  }else{
    payload = new FormData()
    payload.append("user_id", referalname.user_id)
    payload.append("product_info", "ReferralDonate")
    payload.append("amount_paid", values.amount_paid)
    payload.append("environment", "QA")
    // payload.append("environment", "PROD")
    payload.append("name", referalname.name)
    payload.append("surname", values.surname)
    payload.append('email', email)
    payload.append("mobile_number", referalname.mobile_number)
    payload.append("cast_name", "")
    payload.append("pincode", values.pinCode)
    payload.append("address", values.door_number)
    payload.append("parliment_code", parlimentName)
    payload.append("parliment_name", donateName.name)
    //  payload.append("pancard", "pancard photo");
    if (imageSource && imageSource != undefined) {
      payload.append('pancard', {
        uri: imageSource,
        name: 'image.png',
        fileName: 'image',
        type: 'image/png',
      })
    }
  }
  // setIsModalVisible(false)
    console.log('picupload..................!', JSON.stringify(payload))

     
    const responseJson= await api.user.RazorCreate(payload ,
      (responseJson) => {
        // console.log('res =====> ', responseJson)
        const req_id = responseJson.data.request_id
        console.log('reqqqqqqqqqqqqq ', responseJson.data)
           if (
          responseJson.data.message ==
          'Transaction request created Successfully'
        ) {
          razopay(responseJson.data.response_data, req_id, values)
          setIsModalVisible(false)
        } else {
          alert('Payment Failed')
          setIsModalVisible(false)
         }
      })
     console.log("...........Donation respons",responseJson);
    
    if (
          responseJson.data.message ==
          'Transaction request created Successfully'
        ) {
          razopay(responseJson.data.response_data, req_id, values)
          // setIsModalVisible(false)
        } else {
          alert('Payment Failed')
          // setIsModalVisible(false)
        }
      }
    
   


    // let url = 'https://apps.apbjpdata.org/services/razorpay/create_transaction'

    // fetch(url, {
    //   method: 'POST',
    //   body: payload,
    //   headers: {
    //     // Accept: 'application/json',
    //     'Content-Type': 'multipart/form-data',
    //   },
    // })
      // .then((response) => response.json())
      // .then((responseJson) => {
      //   console.log('success............', responseJson)
      //   const req_id = responseJson.data.request_id
      //   console.log('id..!', req_id)
      //   if (
      //     responseJson.data.message ==
      //     'Transaction request created Successfully'
      //   ) {
      //     razopay(responseJson.data.response_data, req_id, values)
      //     setIsModalVisible(false)
      //   } else {
      //     alert('Payment Failed')
      //     setIsModalVisible(false)
      //   }
      // })

  //     .catch((errors) => console.error('errors', errors))
  // }

{/*Paymentmethod endedn here*/} 


{/*Razorpay started here*/} 
  const razopay = (response, req_id, values) => {
    var options = {
      description: response.product_info,
      // image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: response.merchant_id,
      // key:"rzp_test_UnhlPUzWidGpvX",
      amount: `${response.order_info.amount}` + `00`, // to string
      name: Active ?values.firstname: referalname.name,
      // Active ? name : referalname.name,
      // name:name,
      // prefill: {
      //   email: 'void@razorpay.com',
      //   contact: '9191919191',
      //   name: 'Razorpay Software'
      // },
      theme: { color: '#F37254' },
    }
    console.log('razorpay options.............!', options)
    RazorpayCheckout.open(options)
      .then((data) => {
        // handle success
        console.log('razopay success  Data.................!', data)
        //  alert(data)
        // alert(`Success: ${data.razorpay_payment_id}`);

        //if condition......
        updateTrans_action(`${data.razorpay_payment_id}`, req_id)
      })
      .catch((error) => {
        // handle failure
        //alert(`Error: ${error.code} | ${error.description}`);
        alert('Payment Cancelled')
      })
  }
{/*Razorpay edned here*/} 

{/*Updatetrnsaction started here*/} 
  const updateTrans_action = async (paymenttransaction, req_id) => {
    console.log('paymentid......!', paymenttransaction)

    const body = {
      request_id: req_id,
      status: 'success',
      txnid: `${paymenttransaction}`,
      response_data: {},
    }

    console.log('payload body.............!', body)



    const res = await api.user.RazopayUpDateTransaction(body)

    console.log('updated response..............!', res)
    if (res.data.message == 'Transaction request updated Successfully') {
      Alert.alert('APBJP', 'Your Payment Successfully', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('Home')
          },
        },
      ])
    } else {
      alert('payment Updated Failed')
    }


    // await fetch(
    //   'https://apps.apbjpdata.org/services/razorpay/update_transaction',
    //   {
    //     method: 'POST',
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(body),
    //   },
    // )


      // .then((response) => response.json())
      // .then((responseJson) => {
      //   console.log('Update Response............', responseJson)
      //   if (
      //     responseJson.data.message ==
      //     'Transaction request updated Successfully'
      //   ) {
      //     Alert.alert('AP BJP', 'Payment SuccessFully', [
            
      //       { text: 'OK', onPress: () => navigation.navigate('Home') },
      //     ])
      //   } else {
      //     alert('payment Updated Failed')
      //   }
      // })

      // .catch((errors) => console.error('errors', errors))
  
  
    }
{/*Updatetrnsaction ended here*/} 
  // validateName = (name) => {
  //   var re = /^(?:[A-Za-z]+|\d+)$/;
  //   return re.test(name);
  // };
  const [select, setSelect] = useState('')

  {/*submitValidationSchema started here*/} 
//   const submitValidationSchema = yup.object().shape({
//     firstname: yup.string().required(' name is Required'),

//     surname: yup.string().required('surname is required'),

//     door_number: yup.string().required('DoorNumber is required'),

//     mobilenumber: yup.string().required(' mobilenumber is required'),

//     amount_paid: yup.string().required('Payment is required'),
//     pinCode: yup.string().required('PinCode is required'),
//   })
  {/*submitValidationSchema ended here*/} 


  {/*getparliamentary started here*/} 
  const getparliamentary = async() => {
    const payload={}
const res= await api.user.Parliament({},payload)
// console.log('par res...',res);


 setParliamentary(res);

};
{/*getparliamentary ended here*/} 
  

  const getuserid = async () => {
    const data = await getUserProfileInfo()
    console.log('userid details.......', data)
    setUserId(data.user_id)
    // setName(data.name)
    setNumber(data.username)
    // console.log(name);
    getReferals(data.username)
    
  }

  return (
    
    <View style={{ flex: 1, backgroundColor: 'white' }}>
   
      
      <View>
        {/* <Loader isModalVisible={isModalVisible} /> */}
      </View>
      <View>
  {/*Header started here*/} 
      {/* <Header
      title={strings.Donate}
      onPress={()=>{
        navigation.navigate("Home")
      }}
      
      /> */}
   {/*Header ended here*/}
        

          
         
       
      </View>

      <View
        style={{
          borderWidth: 1,
          height: 50,
          justifyContent: 'space-around',
          alignItems: 'center',
          flexDirection: 'row',
          marginTop: 10,
          // marginBottom: 2,
        }}
      >


   {/*Radiobuttons started here*/}      
        <View style={{ flexDirection: 'row' }}>
          {/* <RadioButton
            value="SelfDonate"
            status={checked === 'SelfDonate' ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked('SelfDonate'), setActive(true)
            }}
          /> */}
         <TouchableOpacity   onPress={() => {
              setChecked('SelfDonate'), setActive(true)
            }}>
              <TouchableOpacity   onPress={() => {
              setChecked('SelfDonate'), setActive(true)
            }}></TouchableOpacity>
          {/* <Apptext
            style={{
              fontWeight: 'bold',
              fontSize: 17,
              color: 'black',
              marginLeft: 5,
              marginTop: 5,
            }}
          >
            SelfDonate
          </Apptext> */}
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row' }}>
          
          <TouchableOpacity   onPress={() => {
              setChecked('OthersDonate'), setActive(false)
            }}
           >
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 17,
              color: 'black',
              marginLeft: 5,
              marginTop: 5,
            }}
          >
            OthersDonate
          </Text>
          </TouchableOpacity>
        </View>
      </View>
{/*Radiobuttons ended here*/}
      <ScrollView>
      <KeyboardAvoidingView>



  {/*Formik started here*/}      
      
       
   
              <>
                <ScrollView>
                  <View>
                    
                    
                  </View>


  
                  {/* {errors.referalmember && touched.referalmember && (
                        <Text
                          style={{ fontSize: 10, color: 'red', marginLeft: 9 }}
                        >
                          {errors.referalmember}
                        </Text>
                      )} */}
           
                  <>
                  {/*Buttons started here*/} 
           
                  </>

                  
                </ScrollView>
              </>
       
   

        </KeyboardAvoidingView>
      </ScrollView>
      
    </View>
    
  )
}

export default rozopay
