import { StyleSheet } from "react-native";


export const matchStyles = StyleSheet.create({
   head: {
      height: 70,
      flexDirection: "row",
      backgroundColor: "#9b59b6",
      alignItems: "center"
   },
   body: {
      flex: 8,
      backgroundColor: "#090717",
   },
   foot: {
      height: 300,
      backgroundColor: "#090717",
   },

   menu: {
      marginLeft:16,
      marginRight:16,
      height: 60, 
      width: "auto"
   },
   info: {
      marginLeft:16,
      marginRight:16,
      flex: 1,
      justifyContent: "center"
   },
   title:{
      fontSize: 25,
      alignSelf: "center",
      fontStyle: "italic",
      fontWeight: "bold",
      color: "white"
   },

   listHead:{
      marginLeft:16,
      marginRight:16,
   },
   enum:{
      flexDirection: "row",
      marginBottom: 3,
      height: 50,
      alignItems: "center"
   },

   calendar: {
      marginLeft:16,
      marginRight:16,
      height: 100, 
      width: "auto"
   }
})