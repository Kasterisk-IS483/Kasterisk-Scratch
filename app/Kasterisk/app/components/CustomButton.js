import React from 'react'
import { View, Text, TouchableOpacity, Dimensions, Image, StyleSheet } from 'react-native'
import { whiteCol, blackCol } from "../styles.js";

const width = Dimensions.get('window').width
const height = Dimensions.get('window').Height

export default function CustomButton({ image, text, onPress, type = 'filled', bordered = false, size = 'large', disabled = false }) {
  
  const large = width>height? (width / 3) :(width/2.5)
  const small = 'auto'
  const btnSize = size === 'large' ? large : small
  const btnBgColor = type === 'filled' ? whiteCol : 'transparent'
  const btnTextColor = type === 'filled' ? blackCol : '#6371c2'
  const btnBorderRadius = bordered ? 30 : 5
  const border = type === 'outlined' && { borderColor: '#ffffff', borderWidth: 2 }
  const textAlign = size === 'large' ? 'center' : 'flex-start'
  const verticalSpacing = size === 'large' ? 10 : 3

  const containerStyle = { flex: 1, justifyContent: 'center', alignItems: 'center' }
  const textStyle = { flex: 4, justifyContent: 'center', alignItems: textAlign }

  const containerCommonStyle = {
    backgroundColor: btnBgColor,
    paddingVertical: verticalSpacing,
    marginVertical: verticalSpacing,
    width: btnSize,
    borderRadius: btnBorderRadius,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
  }

  const textCommonStyle = {
    color: btnTextColor,
    fontSize: 18,
    fontFamily: 'System',
    fontWeight: 'bold',
    padding: 5,
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
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} disabled={disabled}>
      <View style={[containerCommonStyle, border]}>
        <View style={containerStyle}>
          <Image
            source={image}
            style={iconStyle.imageIcon}
          />
        </View>

        <View style={iconStyle.buttonIconSeparator} />

        <View style={textStyle}>
          <Text style={[textCommonStyle]}> {text} </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}