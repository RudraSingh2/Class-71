import React, {Component} from 'react';
import { StyleSheet, Text, View,TouchableOpacity   } from 'react-native';
import * as Permissions from 'expo-permissions';

import {BarCodeScanner} from "expo-barcode-scanner";


export default class BookTransactionScreen extends Component {

  constructor(){
    super();
    this.state = {
      hasCameraPermissions:null,
      scanned:false,
      scannedData : '',
      buttonState:'normal'          
    }
  }

  getCameraPermissions = async ()=>{
    console.log("getCameraPermissions ");
    // returns a value granted if permission is given
      const {status} = Permissions.askAsync(Permissions.CAMERA);
      console.log(status);
      this.setState({
          /*status === "granted" is true when user has granted permission
          status === "granted" is false when user has not granted the permission
        */
        hasCameraPermissions: status === "granted",
        buttonState:'clicked',
        scanned: false
      })
      console.log(this.state.hasCameraPermissions);
  }
  handleBarCodeScanned = async({type,data})=>{
    this.setState({
      scanned:true,
      scannedData : data,
      buttonState:'normal'
    })
  }
  
  render(){
    const hasCameraPermissions = this.state.hasCameraPermissions;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState
    if(buttonState === "clicked" && hasCameraPermissions){
      return(
        <BarCodeScanner
        onBarCodeScanned = {scanned?undefined:this.handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
        />
        )
    }else {
      return (  
        <View style={styles.container} >
          <Text style={styles.displayText}>
           {hasCameraPermissions === true ? this.state.scannedData : "Request Camera Permission"}
          </Text>  
          <TouchableOpacity 
            style={styles.scanButton}
            onPress = {()=>{
              this.getCameraPermissions();
            }}
          >
           <Text style={styles.buttonText}>Scan QR Code</Text> 
          </TouchableOpacity>   
        </View>
      );
    }
    
  }
  
}
                                                                     
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  displayText:{
    fontSize: 15,
    textDecorationLine: 'underline'
  },
  scanButton:{
    backgroundColor: '#2196F3',
    padding: 10,
    margin: 10
  },
  buttonText:{
    fontSize: 20,
  }
});
