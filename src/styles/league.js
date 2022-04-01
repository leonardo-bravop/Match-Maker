import { StyleSheet } from "react-native";


export const leagueStyles = StyleSheet.create({
   back: {
      flex: 1,
      paddingTop: 30
    },

   head: {
      flex: 4,
      backgroundColor: "#9b59b6"
   },
   body: {
      flex: 8,
      backgroundColor: "#090717",
   },
   foot: {
      height: 58,
      backgroundColor: "#090717",
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
      justifyContent: "center"
   },
   title:{
      fontSize: 25,
      alignSelf: "center",
      fontStyle: "italic",
      fontWeight: "bold",
      color: "white",
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
      height: 50,
      marginBottom: 3,
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