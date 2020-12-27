import React, { Component } from 'react';
import { ImageBackground, View, StyleSheet } from 'react-native';
import Button from './src/components/Button';
const onPress = () => {
  alert('clicked')
}

export default class App extends Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <ImageBackground
            style={styles.container}
            source={require('./assets/login.png')}
            imageStyle={{ resizeMode: 'cover' }}
          />
        </View>

        <View style={styles.rightContainer}>
          <View style={styles.buttonContainer}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Button
                image="Google"
                text='Log in With Google'
                onPress={onPress}
              />
              <Button
                image="Amazon"
                text='Log in With Amazon'
                onPress={onPress}
              />
              <Button
                image="Azure"
                text='Log in With Azure AD'
                onPress={onPress}
              />
              <View style={styles.lineStyle} />
              <Button
                image="google"
                text='Select Kubeconfig'
                onPress={onPress}
              />
            </View>
          </View>
        </View>
      </View>


    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  leftContainer: {
    flex: 2
  },
  rightContainer: {
    flex: 1,
    backgroundColor: '#265395'
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  buttonContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    width: 200
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: '#FFFFFF',
    width: '90%',
    margin: 10,
  }
}) 