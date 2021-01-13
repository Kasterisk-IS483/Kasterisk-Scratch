import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

import { dimensions, fonts, commonStyles } from "../utils/styles.js";

export default function CustomButton({ image, text, onPress, type = 'filled', bordered = false, size = 'large', align = 'center', disabled = false }) {
  
  const large = dimensions.fullWidth>dimensions.fullHeight ? (dimensions.fullWidth / 3) : 'auto'
  const small = dimensions.fullWidth>dimensions.fullHeight ? (dimensions.fullWidth / 3) : (dimensions.fullWidth / 2)
  const btnSize = size === 'large' ? large : small

  const btnBgColor = type === 'filled' ? 'white' : 'transparent'
  const btnTextColor = type === 'filled' ? 'black' : '#6371c2'

  const btnBorderRadius = bordered ? 30 : 5
  const border = type === 'checkbox' && { borderColor: 'white', borderWidth: 2 }
  const bolded = type === 'filled' ? 'bold' : 'normal'

  const verticalSpacing = type === 'filled' ? 10 : 3

  const containerStyle = { flex: 1, ...commonStyles.centralise }
  const textStyle = { flex: 4, justifyContent: 'center', alignItems: align }

  const containerCommonStyle = {
    backgroundColor: btnBgColor,
    paddingVertical: verticalSpacing,
    marginVertical: verticalSpacing,
    width: btnSize,
    borderRadius: btnBorderRadius,
    flexDirection: 'row',
    borderWidth: 0.5,
    ...commonStyles.centralise
  }

  const textCommonStyle = {
    color: btnTextColor,
    fontSize: fonts.md,
    fontFamily: 'System',
    fontWeight: bolded,
    marginHorizontal: 10,
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