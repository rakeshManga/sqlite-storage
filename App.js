// import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import ImageUpload from './src/components/ImageUpload';
// import ImageDownload from './src/components/ImageDownload';
// import NewMessage from './src/components/NewMessage';
// import rozopay from './src/components/razopay';
// import VideoPlay from './src/components/VideoPlay';
// import { Modal } from 'react-native/Libraries/Modal/Modal';
// import Modals from './src/components/AllModals';
// import Otp from './src/components/Otp';
// import Login from './src/components/Login';
// import ContactList from './src/components/CheckBoxs';
// import { Checkbox } from 'react-native-paper';
// import Api from './src/components/Api';
// import DigtalSignature from './src/components/DigtalSignature';
// import ProductItem from './src/components/ProductItem';
// import Products from './src/components/Products';
// import AllModals from './src/components/AllModals';
// import Home from './src/components/Home';
// import ViewAll from './src/components/ViewAll';
// import Register from './src/components/Register';
// import Updates from './src/components/Updates';
// import Flatlist from './src/components/Flatlist';
// import Net from './src/components/Net';
// import Table from './src/components/Table';
// import CheckBoxs from './src/components/CheckBoxs';
// import Collapse from './src/components/Collapse';
// import UserDetails from './src/components/UserDetails';
// import Splash from './src/components/Splash';

// const Stack = createNativeStackNavigator();

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen
//           name="Splash"
//           component={Splash}
//           options={{headerShown:false}}
//         />
//         <Stack.Screen
//           name="Login"
//           component={Login}
//           options={{headerShown:false}}
//         />
//          <Stack.Screen
//           name="Register"
//           component={Register}
//           options={{ headerShown: false }}
//         />
//          <Stack.Screen
//           name="ViewAll"
//           component={ViewAll}
//           options={{ headerShown: false }}
//         />
//          <Stack.Screen
//           name="UserDetails"
//           component={UserDetails}
//           options={{ headerShown: false }}
//         /> 
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };
// export default App




import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from './src/components/Splash';
import Login from './src/components/Login';
import ViewAll from './src/components/ViewAll';
import UserDetails from './src/components/UserDetails';

// import AsynsStorage from '@react-native-async-storage/async-storage'
import AsyncStorage from "@react-native-async-storage/async-storage"
import Register from './src/components/Register';
import Items from './src/components/Items';


const Stack = createNativeStackNavigator();

const FirstScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {backgroundColor: '#F58123'},
        headerTitleStyle: {color: 'white'},
      }}
    >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name='Login' component={Login}/>
      <Stack.Screen name='Register' component={Register}/>
      <Stack.Screen name="ViewAll" component={ViewAll} />
      <Stack.Screen name="UserDetails" component={UserDetails} />
      <Stack.Screen name="Items" component={Items} />

    </Stack.Navigator>
  );
};

const MainScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {backgroundColor: '#F58123'},
        headerTitleStyle: {color: 'white'},
      }}
    >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name='Login' component={Login}/>
      <Stack.Screen name='Register' component={Register}/>
      <Stack.Screen name="ViewAll" component={ViewAll} />
      <Stack.Screen name="UserDetails" component={UserDetails} />
      <Stack.Screen name="Items" component={Items} />
    </Stack.Navigator>
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const getRegisteredData = async () => {
    let data = await AsyncStorage.getItem('keepLoggedIn');
    console.log('AsyncStorage.getItem', data);

    console.log('keeploggedIn', data);
    if (data && data == 'true') {
      setIsLoggedIn(true); //true
    }
  };

  React.useEffect(() => {
    getRegisteredData();
  }, []);

  return (
    <NavigationContainer>
      {isLoggedIn == true ?   <FirstScreen /> : <MainScreen />}
      {/* <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {backgroundColor: '#F58123'},
        headerTitleStyle: {color: 'white'},
      }}
    >
      <Stack.Screen name="FingerPrint" component={FingerPrint} />
    </Stack.Navigator> */}
    </NavigationContainer>
  );
};
export default App;
