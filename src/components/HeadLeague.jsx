import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, Picker } from "react-native";
import Constants from "expo-constants";

import { leagueStyles } from "../styles/league";

const { manifest } = Constants;
const uri = `http://${manifest.debuggerHost.split(":").shift()}:3000`;

const HeadLeague = ({screen, leagueId}) => {
   let [leagueList, setLeagueList] = useState([])

   const [selectedValue, setSelectedValue] = useState( leagueId || null);

   useEffect(()=>{

      // axios
      // .get(`${uri}/api/user/getLeagues/:userId`)
      // .then( res => {
      //    console.log("getall: ", res)
      // })

   }, [])

   const changeHandler = (itemValue) => {
      axios
      .get(`${uri}/api/league/findShowLeague/${itemValue}`)
      .then( res => {
         console.log("showleague: ", res)
         navigation.navigate(screen, {infoLeague: res})
      })
   }

   return (
      <View style={leagueStyles.head}>
            <View style={leagueStyles.menu}>
               <Picker
                  selectedValue={selectedValue}
                  style={{ height: 50, width: "auto", color: '#FFFFFF'}}
                  itemStyle={{ height: 50 }}
                  onValueChange={(itemValue, itemIndex) => {
                     console.log("pickerValue:  ", itemValue)//anular el texto
                     setSelectedValue(null)
                     changeHandler(itemValue)
                  }}
               >
                  <Picker.Item label="Liga de Ping Pong" value="liga"/>
                  {leagueList.map( element => 
                     <Picker.Item label={element.name} value={element.id}/> )}
               </Picker>
            </View>
            
            <View style={leagueStyles.info}>
               <Text style={leagueStyles.title}>{selectedValue}</Text>
            </View>
         </View>
)}

export default HeadLeague;