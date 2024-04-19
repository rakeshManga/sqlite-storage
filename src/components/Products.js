import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React,{useState, useEffect} from 'react'
import { color } from 'react-native-elements/dist/helpers'

const Products = ({navigation}) => {
    const [productitem, setProductitem] = useState([]);
    const getProduct = async () => {
        try {
          const response = await fetch('https://dummyjson.com/products');
          const json = await response.json();
          setProductitem(json);
          console.log('des..................', json);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      useEffect(() => {
        getProduct();
      }, []);

const Submit=()=>{
navigation.navigate("ProductItem",productitem)
    
}

  return (

     <TouchableOpacity
     
     onPress={Submit()}
     
     >
        <View style={styles.button}>
            <Text>Submit</Text>
        </View>
     </TouchableOpacity>
  
  )
}

export default Products

const styles = StyleSheet.create({
    button:{
        height:50,
        width:"90%",
        backgroundColor:"lightpink"
    },
    text:{
        justifyContent:"center",
        alignItems:"center",
        color:"black"

    }
})