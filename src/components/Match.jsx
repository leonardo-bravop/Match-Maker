import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity} from "react-native";
import List from "../commons/List";

import { leagueStyles } from "../styles/league";
import Constants from "expo-constants";
import HeadLeague from "./HeadLeague";
import ItemMatch from "./ItemMatch";
import axios from "axios";

const { manifest } = Constants;

const uri = `http://${manifest.debuggerHost.split(":").shift()}:3000`;

const Match = () => {
   let [memberList, setMemberList] = useState([]),
      [userRank, setUserRank] = useState(null)

   useEffect(()=>{
      axios
      .get(`${uri}/api/league//${1}`)
      .then( res => {
         //pedir usuarios segun elo y ordenar usuarios segun elo
         console.log("users: ",res)
         setUserRank(1)
      })
      setMemberList([
      ])
   },[])

   return (
      <SafeAreaView style={leagueStyles.back}>
         
         <HeadLeague screen="Match" leagueId={1}/>
      
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
              <TouchableOpacity style={[leagueStyles.join, {backgroundColor:"#16a085"}]}>
                <Text style={leagueStyles.joinTxt}>Crear</Text>
              </TouchableOpacity> 
            </View>
         </View>
      </SafeAreaView>
) }

export default Match;
