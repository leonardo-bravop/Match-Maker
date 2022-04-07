import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { leagueStyles } from "../styles/league";
import { CheckBox } from 'react-native-elements';
import { useDispatch, useSelector } from "react-redux";
import { removeTeam, setTeam, setTeamA } from "../state/teams";

const ItemMatch = ({ item }) => {
      
   let [select, setSelect] = useState(false),
      [select2, setSelect2] = useState(false)

   const dispatch = useDispatch();

   const isCreated = useSelector( state => state.checks )

   useEffect(()=>{
      setSelect(false)
      setSelect2(false)
   },[isCreated])

      
   const checker = () => {
      if ( select ){
         dispatch( removeTeam({ team: "teamA", id: item.id }))
      }
      else {
         dispatch( setTeam({ team: "teamA", id: item.id, nick: item.nickname }))
      }
      setSelect(!select)
      setSelect2(false)
   }
      
   const checker2 = () => {
      if ( select2 ){
         dispatch( removeTeam({ team: "teamB", id: item.id }))
      }
      else {
         dispatch( setTeam({ team: "teamB", id: item.id, nick: item.nickname }))
      }
      setSelect2(!select2)
      setSelect(false)
   }

   return (
      <View style={leagueStyles.item}>
         <View style={[leagueStyles.elo, {flexDirection: "row"}]}>
            <View style={leagueStyles.checkContainer}>
               <CheckBox
                  checked={select}
                  onPress={checker}
                  iconType="ionicon"
                  uncheckedIcon="checkbox-outline"
                  checkedIcon="checkbox"
                  uncheckedColor='green'
                  checkedColor="green"
               />
            </View>
         </View>

         <View style={[leagueStyles.img, {backgroundColor: "blue"                                                                                                                                                                                                                                                                              }]}>
         </View>
         
         <View style={leagueStyles.nick}>
            <Text style={{color: '#FFFFFF'}}>{item.nickname}</Text>
         </View>

         <View style={[leagueStyles.elo, {flexDirection: "row"}]}>
            <View style={leagueStyles.checkContainer}>
               <CheckBox
                  checked={select2}
                  onPress={checker2}
                  iconType="ionicon"
                  uncheckedIcon="checkbox-outline"
                  checkedIcon="checkbox"
                  uncheckedColor='green'
                  checkedColor="green"
               />
            </View>
         </View>
      </View> 
  );
};

export default ItemMatch;