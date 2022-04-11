import { StyleSheet } from "react-native";

/*//populate users al add user y devolver usuarios
//setear opciones de colores al crear una liga
//imagenes con fondo en degradado de transparente a negro
//cambiar color a triangulo de picker
//probar redondeado a container de info de liga
//coherencia de redondeados


//Matchmaker h4
subtitulos H5
texto normal 18
texto botones 18 todas en mayusculas*/ 

export const colors = {
   background: "#090A1C",
   content: "#1A1C38",
   item: "#4C657F"/*"#657A91"/*"#92A1B1"/*"#A2AEBB"/*"#D8DBE2"/*"#437F97"*/,
   text: "#E8EFF8"/*"#FFFFFA"*/,
   button: "#C49337"/*"#781919"/*"#af1b3f"/*"#E5DADA"/*"#0094C6"/*"#E59500"/*"#945600"/*"#E9B44C"*/,
   error: "#C42021"/*"#EA2B1F"*/,
   modalBack: 'rgba(9,10,28,0.85)'/*'rgba(30,30,50,0.85)'*/
}

export const matchStyles = StyleSheet.create({

   back: {
      flex: 1,
      backgroundColor: colors.background
   },

   ///////////////////////////////
   head: {
      /*flexDirection: "row",*/
      height: 200,
      paddingTop: 30,
      paddingHorizontal: 16
   },
   info: {
      flex: 1,
      justifyContent: "center"
   },
   title:{
      paddingTop:20,
      fontSize: 32,
      alignSelf: "center",
      fontStyle: "italic",
      fontWeight: "bold",
      color: colors.text
   },
   pickerButton: {
      height: 50, 
      marginHorizontal: 8,
      alignSelf: "center"/*"flex-end"*/, 
      justifyContent:"center"
   },
   listHead:{
      paddingVertical: 8,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      flexDirection: "row",
      justifyContent: "space-evenly",
      backgroundColor: colors.content
   },

   ///////////////////////////////
   body: {
      flex: 1,
      marginHorizontal:16
   },
   list: {
      flex: 1,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      backgroundColor: colors.content
   },
   labels:{
      flexDirection: "row",
      height: 50,
      marginBottom: 3,
      alignItems: "center"
   },

   ////////////////////////////////
   foot: {
      backgroundColor: colors.background
   },
   calendar: {
      height: 170,
      marginTop: 10,
      paddingVertical: 8,
      borderRadius: 10,
      backgroundColor: colors.content
   },
   time: {
      height: 30,   
      borderRadius: 10,
      marginTop: 8,
      marginBottom: 6,
      paddingHorizontal: 8,
      alignSelf: "center",
      justifyContent: "center",
      backgroundColor: "white"
   },
   timeTxt: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.content
   },

   createButton: {
      height: 50,
      marginLeft:"auto",
      marginRight: "auto",
      marginTop: 30,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center"
   },
   buttonTxt: {
      fontSize: 20,
      marginHorizontal:16,
      color: colors.text,
    },
   errTxt: { 
      margin:5,
      alignSelf: "center",
      color: colors.error
   }
})

export const itemStyles = StyleSheet.create({

   item: {
      height: 66,
      flexDirection: "row",
      marginVertical: 3,
      borderRadius: 10,
      justifyContent: "space-evenly",
   },
   img: {
      height: 46,
      aspectRatio:1,
      borderRadius: 92,
      alignSelf: "center"
   },
   nick: {
      width: 182, 
      flexDirection: "row",
      paddingHorizontal:10,
      alignContent: "center",
      borderRadius: 10,
      //backgroundColor: colors.item
   },
   text: {
      fontSize: 18, 
      color: '#FFFFFF',
      alignSelf: "center",
      marginLeft: 10
   },
   checkContainer: {
       width: 60,
      justifyContent: "center",
      alignItems: "center",
    }
})

export const pickerStyles = StyleSheet.create({
   back: {
      height: "100%",
      paddingVertical: 16,  
      backgroundColor: colors.modalBack
   },
   pressArea: {
      flex: 1, 
      width: "100%",
   },
   body: {
      flex: 1,
      marginHorizontal: 16,
      borderRadius: 10,
      backgroundColor: colors.content
   },
   text: { 
      margin: 8,
      fontSize: 18, 
      textAlign: 'center',
      color: colors.text
   }
})


export const cardStyles = StyleSheet.create({
   back: {
      height: "100%",  
      justifyContent: "flex-end",
      backgroundColor: colors.modalBack
   },
   body: {
      flex: 1,
      marginHorizontal: 16,
      paddingHorizontal: 8,
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      backgroundColor: colors.content
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
      color: colors.text
   },
   txt: {
      fontSize: 18,
      marginTop: 12,
      paddingHorizontal: 8,  
      color: colors.text
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
      color: colors.content,
      backgroundColor: colors.text,
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
      backgroundColor: colors.button
   },
   buttonTxt: {
      fontSize: 20,
      marginHorizontal:16,
      color: colors.text,
   },
})