import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import { leagueStyles } from "../styles/league";
import axios from "axios";

const ConfirmCard = ({ match }) => {
      
   useEffect(()=>{
      // axios
      // .post(`${uri}/api/match/newMatch`, match)
      // .then(()=>{
      //    navigation.navigate('Historial')
      // })
   },[])

   return(
      <View style={{width:"auto", height: "auto", backgroundColor: "rgba(255, 255, 255, 0.1)"}}>
         <View style={{position: 'absolute', backgroundColor: "red", width: 200, height: 200, alignSelf: ""}}>

         </View>
      </View>
   )
}

export default ConfirmCard