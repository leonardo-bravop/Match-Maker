import { StyleSheet } from "react-native";

import { colorSet } from "./colorSet";

export const recordStyles = StyleSheet.create({
   back: {
      flex: 1,
      backgroundColor: colorSet.background
   },

   head: {
      paddingTop: 30,
      paddingHorizontal: 16
   },
   info: {
      marginBottom: 10,
      justifyContent: "center"
   },
   title:{
      paddingTop:20,
      fontSize: 32,
      alignSelf: "center",
      fontStyle: "italic",
      fontWeight: "bold",
      color: colorSet.text
   },
   calendar: {
      height: 170,
      marginVertical: 10,
      paddingVertical: 8,
      borderRadius: 10,
      backgroundColor: colorSet.content
   },
   show: {
      height: 30,   
      borderRadius: 10,
      marginTop: 8,
      marginBottom: 6,
      paddingHorizontal: 8,
      alignSelf: "center",
      justifyContent: "center",
      backgroundColor: "white"
   },
   showTxt: {
      fontSize: 16,
      fontWeight: "bold",
      color: colorSet.content
   },


   body: {
      flex: 1,
      marginHorizontal:16,
      marginBottom: 16
   },
   listHead:{
      paddingVertical: 8,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      flexDirection: "row",
      justifyContent: "space-evenly",
      backgroundColor: colorSet.content
   },
   list: {
      flex: 1,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10
   },
})

export const itemStyles = StyleSheet.create({

   item: {
      height: 110,
      width: "100%",
      flexDirection: "row",
      marginTop: 6,
      borderRadius: 10,
      justifyContent: "space-between",
      backgroundColor: colorSet.content
   },
   img: {
      height: 46,
      aspectRatio:1,
      borderRadius: 92,
      alignSelf: "center"
   },
   team: {
      width: 120,
      justifyContent: "center",
      alignContent: "center",
      borderRadius: 10
   },
   info: {
      flex:1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colorSet.button
    },
   text: {
      fontSize: 18, 
      color: '#FFFFFF',
      alignSelf: "center"
   },
})

export const cardStyles = StyleSheet.create({
   back: {
      height: "100%",  
      justifyContent: "flex-end",
      backgroundColor: colorSet.modalBack
   },
   body: {
      flex: 1,
      marginHorizontal: 16,
      paddingHorizontal: 8,
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      backgroundColor: colorSet.content
   },
   closeButton: {
      marginTop: 10, 
      alignItems: "flex-end"
   },
   titleContainer: { 
      height: 50,
      alignItems: "center", 
      justifyContent: "center"
   },
   title: { 
      fontSize: 32, 
      marginBottom: 8, 
      color: colorSet.text
   },
   txt: {
      fontSize: 18,
      marginTop: 12,
      paddingHorizontal: 8,  
      color: colorSet.text
   },
   inputContainer: { 
      height: 84, 
      marginTop: 16, 
      borderRadius: 10
   },
   input: { 
      paddingHorizontal: 12,
      marginHorizontal: 8,
      borderRadius: 10, 
      fontSize: 16,
      color: colorSet.content,
      backgroundColor: colorSet.text,
   },
   confirmButton: {
      height: 50,
      marginLeft:"auto",
      marginRight: "auto",
      marginBottom:"auto",
      marginTop: "auto",
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colorSet.button
   },
   buttonTxt: {
      fontSize: 20,
      marginHorizontal:16,
      color: colorSet.text,
   },
})




export const record2Styles = StyleSheet.create({

   back: {
      flex: 1,
      paddingTop: 30
    },

   head: {
      height: 200,
   },
   body: {
      flex: 8,
      backgroundColor: "#090717",
   },
   foot: {
      height: 58,
      backgroundColor: "#090717",
   },
   calendar: {
      marginLeft:16,
      marginRight:16,
      height: 100, 
      width: "auto"
   },
   menu: {
      marginLeft:16,
      marginRight:16,
      height: 100, 
      width: "auto"
   },
   info: {
      marginLeft:16,
      marginRight:16,
      flex: 1,
   },
   title:{
      fontSize: 25,
      fontStyle: "italic",
      fontWeight: "bold",
      color: "white",
      alignSelf: "center",
      marginTop: 10
   },

   listHead:{
      marginLeft:16,
      marginRight:16
   },
   enum:{
      flexDirection: "row",
      marginBottom: 3
   },
   item: {
      flex: 1,
      flexDirection: "row",
      height: 100,
      marginBottom: 8,
      borderRadius: 10,
      backgroundColor: "rgba(255, 255, 255, 0.3)",
      // borderWidth: 3
   },

   user:{
      flexDirection: "row",
      height: 50,
      marginLeft:16,
      marginRight:16,
      marginBottom:"auto",
      marginTop: "auto",
      borderRadius: 10,
      backgroundColor: "#090717",
   },
   rank: {
      aspectRatio:1,
      justifyContent: "center",
      alignItems: "center"
   },
   img: {
      height: 46,
      margin:2,
      aspectRatio:1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "grey",
      borderRadius: 100
   },
   group: {
      flex: 2,
      width: "auto",
      justifyContent: "center",
      alignItems: "center"
   },
   nick: {
      flex: 1,
      width: "auto",
      justifyContent: "center"
   },
   date: {
      width: 125,
      justifyContent: "center",
      alignItems: "center", 
   },
   elo:{
      width: 70,
      justifyContent: "center",
      alignItems: "center"
   },
   join: {
      height: 50,
      marginLeft:"auto",
      marginRight: "auto",
      marginBottom:"auto",
      marginTop: "auto",
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center"
   },
   joinTxt: {
      color: '#FFFFFF',
      fontSize: 20,
      marginLeft:16,
      marginRight: 16,
    },

    checkContainer: {
      width: 50, 
      height: 50,
      justifyContent: "center",
      alignItems: "center"
    }
})

export const recordOldStyles = StyleSheet.create({

   back: {
      flex: 1,
      paddingTop: 30
    },

   head: {
      height: 200,
   },
   body: {
      flex: 8,
      backgroundColor: "#090717",
   },
   foot: {
      height: 58,
      backgroundColor: "#090717",
   },
   calendar: {
      marginLeft:16,
      marginRight:16,
      height: 100, 
      width: "auto"
   },
   menu: {
      marginLeft:16,
      marginRight:16,
      height: 100, 
      width: "auto"
   },
   info: {
      marginLeft:16,
      marginRight:16,
      flex: 1,
   },
   title:{
      fontSize: 25,
      fontStyle: "italic",
      fontWeight: "bold",
      color: "white",
      alignSelf: "center",
      marginTop: 10
   },

   listHead:{
      marginLeft:16,
      marginRight:16
   },
   enum:{
      flexDirection: "row",
      marginBottom: 3
   },
   item: {
      flex: 1,
      flexDirection: "row",
      height: 100,
      marginBottom: 8,
      borderRadius: 10,
      backgroundColor: "rgba(255, 255, 255, 0.3)",
      // borderWidth: 3
   },

   user:{
      flexDirection: "row",
      height: 50,
      marginLeft:16,
      marginRight:16,
      marginBottom:"auto",
      marginTop: "auto",
      borderRadius: 10,
      backgroundColor: "#090717",
   },
   rank: {
      aspectRatio:1,
      justifyContent: "center",
      alignItems: "center"
   },
   img: {
      height: 46,
      margin:2,
      aspectRatio:1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "grey",
      borderRadius: 100
   },
   group: {
      flex: 2,
      width: "auto",
      justifyContent: "center",
      alignItems: "center"
   },
   nick: {
      flex: 1,
      width: "auto",
      justifyContent: "center"
   },
   date: {
      width: 65,
      justifyContent: "center",
      alignItems: "center", 
      borderTopLeftRadius: 10, 
      borderBottomLeftRadius: 10
   },
   elo:{
      width: 70,
      justifyContent: "center",
      alignItems: "center"
   },
   join: {
      height: 50,
      marginLeft:"auto",
      marginRight: "auto",
      marginBottom:"auto",
      marginTop: "auto",
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center"
   },
   joinTxt: {
      color: '#FFFFFF',
      fontSize: 20,
      marginLeft:16,
      marginRight: 16,
    },

    checkContainer: {
      width: 50, 
      height: 50,
      justifyContent: "center",
      alignItems: "center"
    }
})