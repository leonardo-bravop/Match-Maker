import { StyleSheet } from "react-native";


export const ligaStyles = StyleSheet.create({
   back: {
      flex: 1,
      paddingTop: 30
    },

   head: {
      flex: 4,
      backgroundColor: "yellow"
   },
   body: {
      flex: 8,
      backgroundColor: "red"
   },
   foot: {
      height: 58,
      backgroundColor: "white"
   },

   menu: {
      marginLeft:16,
      marginRight:16,
      height: 50, 
      width: "auto"
   },
   info: {
      marginLeft:16,
      marginRight:16,
      flex: 1,
      backgroundColor: "pink"
   },

   listHead:{
      marginLeft:16,
      marginRight:16
   },
   enum:{
      flexDirection: "row",
      marginBottom: 3
   },
   listContainer: {
      marginLeft:16,
      marginRight:16
   },
   item: {
      flex: 1,
      flexDirection: "row",
      height: 50,
      marginBottom: 3,
      borderRadius: 10,
      backgroundColor: "violet",
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
      backgroundColor: "green"
   },
   rank: {
      aspectRatio:1,
      justifyContent: "center",
      alignItems: "center"
   },
   img: {
      aspectRatio:1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "grey",
      borderRadius: 100
   },
   nick: {
      flex: 1,
      width: "auto",
      justifyContent: "center",
      alignItems: "center"
   },
   elo:{
      width: 100,
      justifyContent: "center",
      alignItems: "center"
   }
})