import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ProductItem = ({ route }) => {
    const { productitem } =route.params
  return (
        <View style={{width:100,height:50}}>
            <Text>{productitem.title}</Text>
        </View>
    )
}

export default ProductItem

const styles = StyleSheet.create({})