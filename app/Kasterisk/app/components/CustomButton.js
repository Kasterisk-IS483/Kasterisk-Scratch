import React from 'react'
import { View, Text, TouchableOpacity, Dimensions, Image, StyleSheet } from 'react-native'
import { whiteCol, blackCol } from "../styles.js";

const width = Dimensions.get('window').width
const height = Dimensions.get('window').Height

export default function CustomButton({ image, text, onPress, type = 'filled', bordered = false, size = 'large' }) {
  
  const large = width>height? (width / 3) :(width/2.5)
  const small = width / 4
  const btnSize = size === 'large' ? large : small
  const btnBgColor = type === 'filled' ? whiteCol : 'transparent'
  const btnTextColor = type === 'filled' ? blackCol : '#6371c2'
  const btnBorderRadius = bordered ? 30 : 5

  const border = type === 'outlined' && { borderColor: '#ffffff', borderWidth: 2 }

  const containerCommonStyle = {
    backgroundColor: btnBgColor,
    paddingVertical: 10,
    marginVertical: 10,
    width: btnSize,
    borderRadius: btnBorderRadius,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    margin: 5,
  }

  const textCommonStyle = {
    color: btnTextColor,
    fontSize: 18,
    fontFamily: 'System',
    fontWeight: 'bold'
  }

  const iconStyle = {
    imageIcon: {
      padding: 10,
      margin: 5,
      height: 25,
      width: 25,
      resizeMode: 'stretch',
    },

    buttonIconSeparator: {
      backgroundColor: 'grey',
      width: 1,
      height: 40,
    },
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={[containerCommonStyle, border]}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={image}
            style={iconStyle.imageIcon}
          />
        </View>

        <View style={iconStyle.buttonIconSeparator} />
        <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={[textCommonStyle]}> {text} </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}