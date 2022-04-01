import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity} from "react-native";
import List from "../commons/List";

import { leagueStyles } from "../styles/league";
import Constants from "expo-constants";
import ItemMatch from "./ItemMatch";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Picker} from '@react-native-picker/picker'


const Match = () => {
   let [memberList, setMemberList] = useState([])
   let [leagueList, setLeagueList] = useState([])
   let [actualleague, setActualLeague] = useState({})
   let  [user, setUser] = useState({})

const { manifest } = Constants;
const uri = `http://${manifest.debuggerHost.split(":").shift()}:3000`;

   const [selectedValue, setSelectedValue] = useState(" ");

   const getUser = async () => {
      try {
         const userString = await AsyncStorage.getItem("userInfo")
            
         const result = await axios
         .post(`${uri}/api/user/me`, {}, 
               { headers: { Authorization: `Bearer ${userString}` } } )
             
         setUser({
            id: result.data._id,
            rank: 0,
            color:"red",
            nickname: result.data.nickname,
            elo: 2931,
         })
         
      } catch (err) { console.log(err); }
   }

   const getMembers = async () => {
      try {
         const userString = await AsyncStorage.getItem("userInfo")
            
         const result = await axios
         .post(`${uri}/api/user/me`, {}, 
               { headers: { Authorization: `Bearer ${userString}` } } )

         const { data } = await axios
         .get(`${uri}/api/league/getUsers/${selectedValue}`)

         setMemberList( data.map( (element, i) =>{
            if ( result.data._id === element._id) {
               setUser({
                  id: result.data._id,
                  rank: i+1,
                  color:"red",
                  nickname: result.data.nickname,
                  elo: 2931,
               })
            }
            return {
               id: element._id,
               rank: i+1,
               color:"blue",
               nickname: element.nickname,
               elo: 2931,
            }
         }))
      } catch (err) { console.log(err); }
   }

   const getLeagues = async () => {
      try {
         const userString = await AsyncStorage.getItem("userInfo")
            
         const result = await axios
         .post(`${uri}/api/user/me`, {}, 
               { headers: { Authorization: `Bearer ${userString}` } } )

         const res = await axios
         .get(`${uri}/api/user/getLeagues/${result.data._id}`)

         setLeagueList(res.data)

      } catch (err) { console.log(err); }
   }

   useEffect(() => {
         getUser()
         getMembers()
         getLeagues()
   },[selectedValue])

   const changeHandler = (itemValue) => {
      axios
      .get(`${uri}/api/league/showLeague/${itemValue}`)
      .then( ({ data }) => {
         setActualLeague(data)
      })
   }

   const buttonHandler = async () => {
      try {
         const jsonTeam = await AsyncStorage.getItem("A")
         let arr = jsonTeam ? JSON.parse(jsonTeam) : [];

         const jsonTeam2 = await AsyncStorage.getItem("B")
         let arr2 = jsonTeam2 ? JSON.parse(jsonTeam2) : [];

         await axios
         .post(`${uri}/api/match/newMatch`, 
            {
               equipo_1: arr, 
               equipo_2: arr2, 
               fecha: null
            })

         await AsyncStorage.setItem("A", "")
         await AsyncStorage.setItem("B", "")
         
      } catch (e) { console.log(e)
      }
   }

   return (
      <SafeAreaView style={leagueStyles.back}>
         
         <View style={[leagueStyles.head, {backgroundColor: actualleague.color}]}>
            <View style={leagueStyles.menu}>
               <Picker
                  selectedValue={selectedValue}
                  style={{ height: 50, width: 40, alignSelf: "flex-end", color: actualleague.color}}
                  itemStyle={{ height: 50 }}
                  onValueChange={(itemValue, itemIndex) => {
                     changeHandler(itemValue)
                     setSelectedValue(itemValue)
                  }}
               >
                  {leagueList.map( (element, i) => 
                     <Picker.Item label={element.name} value={element._id} key= {i}/> )}
               </Picker>
            </View>
            
            <View style={leagueStyles.info}>
               <Text style={leagueStyles.title}>{actualleague.name}</Text>
            </View>
         </View>
      
         <View style={leagueStyles.body}>
            <View style={leagueStyles.listHead}>
               <View style={leagueStyles.enum}>
                  <View style={{width: 50, alignItems: "center"}}>
                     <Text style={{color: '#FFFFFF'}}>Rank</Text>
                  </View>
                  <View style={{width: 50, alignItems: "center"}}>
                     <Text style={{color: '#FFFFFF'}}></Text>
                  </View>
                  <View style={{flex: 1, width: "auto", alignItems: "center"}}>
                     <Text style={{color: '#FFFFFF'}}>Nick</Text>
                  </View>
                  <View style={{width: 100, alignItems: "center"}}>
                     <Text style={{color: '#FFFFFF'}}>Equipos</Text>
                  </View>
               </View>
            </View>
            
            <List list={memberList} Element={ItemMatch}/>
            
            <View style={[leagueStyles.foot, { height: 100 }]}>
               <TouchableOpacity style={[leagueStyles.join, {backgroundColor:"#16a085"}]} 
                  onPress={buttonHandler}>
                  <Text style={leagueStyles.joinTxt}>Crear</Text>
               </TouchableOpacity> 
            </View>
         </View>
      </SafeAreaView>
) }

export default Match;
