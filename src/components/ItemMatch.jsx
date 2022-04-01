import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { leagueStyles } from "../styles/league";
import { CheckBox } from 'react-native-elements';
import AsyncStorage from "@react-native-async-storage/async-storage";

const ItemMatch = ({ item, key }) => {
   let [userData, setUserData] = useState(null),
      [select, setSelect] = useState(false),
      [select2, setSelect2] = useState(false)

   const setTeam = async (team, value, del) => {
         try {
            const jsonTeam = await AsyncStorage.getItem(team)
            let arr = jsonTeam ? JSON.parse(jsonTeam) : [];
            if ( del ){
               arr = arr.filter( element => value !== element )
            }
            else{
               arr.push(value)
            }
            const jsonArr = JSON.stringify(arr)
            await AsyncStorage.setItem(team, jsonArr)
         } catch (e) { console.log(e)
         }
      }
      
      const checker = () => {
         setTeam("A", item.id, select)
         setSelect(!select)
         setSelect2(false)
      }
      
      const checker2 = () => {
         setTeam("B", item.id, select2)
         setSelect2(!select2)
         setSelect(false)
      }

   return (
      <View style={leagueStyles.item} key = {key} >
         <View style={leagueStyles.rank}>
            <Text style={{color: '#FFFFFF'}}>{item.rank}</Text>
         </View>
         <View style={[leagueStyles.img, {backgroundColor: "blue"                                                                                                                                                                                                                                                                              }]}>
         </View>
         <View style={leagueStyles.nick}>
            <Text style={{color: '#FFFFFF'}}>{item.nickname}</Text>
         </View>
         <View style={[leagueStyles.elo, {flexDirection: "row"}]}>
            <View style={leagueStyles.checkContainer}>
               <CheckBox
                  checked={select}
                  onPress={checker}
                  iconType="material"
                  uncheckedIcon="add"
                  checkedIcon="clear"
                  uncheckedColor='green'
                  checkedColor="red"
               />
            </View>
            <View style={leagueStyles.checkContainer}>
               <CheckBox
                  checked={select2}
                  onPress={checker2}
                  iconType="material"
                  uncheckedIcon="add"
                  checkedIcon="clear"
                  uncheckedColor='green'
                  checkedColor="red"
               />
            </View>
         </View>
      </View> 
  );
};

export default ItemMatch;