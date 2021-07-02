import React, {Component} from 'react';
import { StyleSheet, Text, View,TouchableOpacity ,TextInput ,Image } from 'react-native';
import * as Permissions from 'expo-permissions';

import {BarCodeScanner} from "expo-barcode-scanner";


export default class BookTransactionScreen extends Component {

  constructor(){
    super();
    this.state = {
      hasCameraPermissions:null,
      scanned:false,
      scannedData : '',
      buttonState:'normal' ,
      scannedBookID :'',
      scannedStudentID:''         
    }
  }

  getCameraPermissions = async (id)=>{
    console.log("getCameraPermissions ");
    // returns a value granted if permission is given
      const {status} = Permissions.askAsync(Permissions.CAMERA);
      console.log(status);
      this.setState({
          /*status === "granted" is true when user has granted permission
          status === "granted" is false when user has not granted the permission
        */
        hasCameraPermissions: status === "granted",
        buttonState:id,
        scanned: false
      })
      console.log(this.state.hasCameraPermissions);
  }
  handleBarCodeScanned = async({type,data})=>{
    const {buttonState} = this.state
    if (buttonState==='bookID') {
      this.setState({
        scanned:true,
        scannedBookID : data,
        buttonState:'normal'
      })
    } else if(buttonState==='StudentID'){
      this.setState({
        scanned:true,
        scannedStudentID : data,
        buttonState:'normal'
      })
    }
    
  }
  
  render(){
    const hasCameraPermissions = this.state.hasCameraPermissions;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState
    console.log(buttonState);
    if(buttonState !== "normal" && hasCameraPermissions){
      return(
        <BarCodeScanner
        onBarCodeScanned = {scanned?undefined:this.handleBarCodeScanned}  
        style={StyleSheet.absoluteFillObject}
        />
        )
    }else {
      console.log("I am in else ");
      return (          
        <View style={styles.container} >
          <View>
            <Image source = {require('../assets/booklogo.jpg')} style={{width:200,height:200}}/>
            <Text style={{textAlign:"center",fontSize:30}}>Wily</Text>
          </View>
          <View style = {styles.inputView}>
            <TextInput style={styles.inputBox} placeholder="Book Id" value= {this.state.scannedBookID}/>
            <TouchableOpacity 
              style={styles.scanButton}
              onPress = {()=>{
                this.getCameraPermissions('bookID');
              }}
            >
            <Text style={styles.buttonText}>Scan Book Id</Text> 
            </TouchableOpacity>  
          </View>  
          <View style = {styles.inputView}>            
            <TextInput  style={styles.inputBox} placeholder="Student Id" value= {this.state.scannedStudentID}/>
            <TouchableOpacity 
              style={styles.scanButton}
              onPress = {()=>{
                this.getCameraPermissions('StudentID');
              }}
            >
            <Text style={styles.buttonText}>Scan Student Id</Text> 
            </TouchableOpacity>  
          </View>     
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
    fontSize: 15,
    textAlign: 'center',
    marginTop: 10
  },
  inputView:{
    flexDirection: 'row',
    margin: 20
  },
  inputBox:{
    width: 200,
    height: 40,
    borderWidth: 1.5,
    borderRightWidth: 0,
    fontSize: 20
  },
  scanButton:{
    backgroundColor: '#66BB6A',
    width: 75,
    borderWidth: 1.5,
    borderLeftWidth: 0
  }
});
