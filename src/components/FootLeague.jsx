
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { leagueStyles } from "../styles/league";
import axios from "axios";
import Constants from "expo-constants";
import { useDispatch, useSelector } from "react-redux";
import { addUserToLeague } from "../state/memberList";
import { setUserLeagues } from "../state/userLeague";
const { manifest } = Constants;

const uri = `http://${manifest.debuggerHost.split(":").shift()}:3000`;

const FootLigue = ({ ligueId, userData }) => {
   const dispatch = useDispatch()
   const members = useSelector((state) => state.members)
   const user = useSelector(state => state.user)
   // if (!userData.rank) return <></>

/*    const [buttonValue, setButtonValue] = useState(false) */

   let member = members?.filter( (member) => member?.nickname == user.nickname)


   const buttonHandler = async () => {
      try {
         // const userString = await AsyncStorage.getItem("userInfo")
            
         // const result = await axios
         // .post(`${uri}/api/user/me`, {}, 
         //       { headers: { Authorization: `Bearer ${userString}` } } )

         const res = await dispatch(addUserToLeague({ligueId: ligueId, userData: user}))
         await dispatch(setUserLeagues({userId: user._id}))
         setButtonValue(true)
      } catch (err) { console.log(err); }
   }

   useEffect(()=>{
      member = members?.filter( (member) => member?.nickname == user.nickname)
   }, [dispatch])

   return ( <>
      { member[0] /* && buttonValue */ ?
           ( userData.rank > 8 
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
         : <View style={[leagueStyles.foot, { height: 100 }]}>
            <TouchableOpacity style={[leagueStyles.join, {backgroundColor:"#16a085"}]}
               onPress={buttonHandler}>
               <Text style={leagueStyles.joinTxt}>Unirse</Text>
            </TouchableOpacity> 
         </View>}
      </>
)}

export default FootLigue;