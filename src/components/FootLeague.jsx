
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { leagueStyles } from "../styles/league";
import axios from "axios";
import Constants from "expo-constants";
const { manifest } = Constants;

const uri = `http://${manifest.debuggerHost.split(":").shift()}:3000`;

const FootLigue = ({ ligueId, rank }) => {
   let [userData, setUserData] = useState(null)

   useEffect(async () => {
      try {
        const userString = await AsyncStorage.getItem("userInfo");
        if (userString) {
          const result = await axios
          .post(`${uri}/api/user/me`, {},
            {
              headers: { Authorization: `Bearer ${userString}` },
            }
          )
          setUserData({
            id: result.data._id,
            rank: rank,
            color:"red",
            nickname: result.data.nickname,
            elo: 2931,
         })
        }
      } 
      catch (err) { console.log(err) }
   },[])

   return ( <>
      { userData
         ?  ( userData.rank > 8 
            ? <View style={leagueStyles.foot}>
               <View style={leagueStyles.user}>
                  <View style={leagueStyles.rank}>
                     <Text style={{color: '#FFFFFF'}}>{userData.rank}</Text>
                  </View>
                  <View style={[leagueStyles.img, {backgroundColor: userData.color}]}>
                  </View>
                  <View style={leagueStyles.nick}>
                     <Text style={{color: '#FFFFFF'}}>{userData.nickname}</Text>
                  </View>
                  <View style={leagueStyles.elo}>
                     <Text style={{color: '#FFFFFF'}}>{userData.elo}</Text>
                  </View> 
               </View>
            </View>
            :  <></> )
         : <View style={leagueStyles.foot}>
            <TouchableOpacity style={[leagueStyles.join, {backgroundColor:"#16a085"}]}>
               <Text style={leagueStyles.joinTxt}>Unirse</Text>
            </TouchableOpacity> 
         </View>}
      </>
)}

export default FootLigue;