import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

import { dimensions, commonStyles } from "../styles.js";

export default function CustomButton({ image, text, onPress, type = 'filled', bordered = false, size = 'large', align = 'center', vertSpacing = 'large', disabled = false }) {
  
  const large = dimensions.fullWidth>dimensions.fullHeight ? (dimensions.fullWidth / 3) : (dimensions.fullWidth / 2.5)
  const small = dimensions.fullWidth>dimensions.fullHeight ? (dimensions.fullWidth / 6) :  (dimensions.fullWidth / 3)
  const btnSize = size === 'large' ? large : small
  const btnBgColor = type === 'filled' ? 'white' : 'transparent'
  const btnTextColor = type === 'filled' ? 'black' : '#6371c2'
  const btnBorderRadius = bordered ? 30 : 5
  const border = type === 'outlined' && { borderColor: 'white', borderWidth: 2 }
  const verticalSpacing = vertSpacing === 'large' ? 10 : 3

  const containerStyle = { flex: 1, ...commonStyles.centralise }
  const textStyle = { flex: 4, justifyContent: 'center', alignItems: align }

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
    marginHorizontal: 30,
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