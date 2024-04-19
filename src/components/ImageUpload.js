

import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';




const ImageUpload = ({ navigation }) => {

  const [imageData, setImageData] = useState(null)
  const [imageUrl, setImageUrl] = useState('')
  const [images, setImage] = useState(undefined);
  const [path, setPath] = useState('');
  const [fileName, setFileName] = useState('');


  const getPlatformPath = ({ path, uri }) => {
    return Platform.select({
      android: { "value": path },
    })
  }
  const openCamera = async () => {
    const result = await launchCamera({ mediaType: 'photo' });
    console.log('response......!', result)
    const response = result.assets[0]
    const path = getPlatformPath(response).value;
    const fileName = getFileName(response.fileName, path);
    setFileName(fileName)
    setPath(path)
    setImageData(result);
  };


  const getFileName = (name, path) => {
    if (name != null) { return name; }

    if (Platform.OS === "ios") {
      path = "~" + path.substring(path.indexOf("/Documents"));
    }
    return path.split("/").pop();
  }
  const uploadImage = async () => {
    // alert("Successfully.........!!!!!!!!!")
    const reference = storage().ref(`${imageData.assets[0].fileName}`);
    const pathToFile = (imageData.assets[0].uri);
    // uploads file
    await reference.putFile(pathToFile);
    const url = await storage()
      .ref(`${imageData.assets[0].fileName}`)
      .getDownloadURL();
    console.log(url)
    setImageUrl(url)

  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text> Hello world</Text>
      {imageData !== null ? (
        <Image
          source={{ uri: imageData.assets[0].uri }}
          style={{ width: 200, height: 200, marginBottom: 20, borderRadius: 20 }}
        />
      ) : null}

      <TouchableOpacity style={{
        width: 200,
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
      }}
        onPress={() => {
          //  requestPermission()
          openCamera();
        }

        }
      >
        <Text>OpenCamera</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{
        width: 200,
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30
      }}
        onPress={() => {
          uploadImage()
        }

        }
      >
        <Text>Upload Image</Text>
      </TouchableOpacity>
      <View>
        <TouchableOpacity
          style={{
            width: 200,
            height: 50,
            borderWidth: 1,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 30
          }}
          onPress={() => {
            navigation.navigate("ImageDownload")
          }}
        >
          <Text>
            downloadImage
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ImageUpload