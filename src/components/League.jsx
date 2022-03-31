import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import List from "../commons/List";

import { leagueStyles } from "../styles/league";
import FootLigue from "./FootLeague";
import Constants from "expo-constants";
import HeadLeague from "./HeadLeague";
import axios from "axios";
import ItemLeague from "./ItemLeague";

const { manifest } = Constants;

const uri = `http://${manifest.debuggerHost.split(":").shift()}:3000`;

const League = ({infoLeague}) => {
   let [memberList, setMemberList] = useState([]),
      [userRank, setUserRank] = useState(null)

   useEffect(()=>{
      // axios
      // .get(`${uri}/api/league/getUsers/6244f013dad34c2fbb345d31`)
      // .then( res => {
      //    //pedir usuarios segun elo y ordenar usuarios segun elo
      //    console.log("users: ",res)
      //    setUserRank(1)
      // })
      setMemberList([{
         rank: 10,
         color:"red",
         nickname: "madeINchina",
         elo: 2931,
      }
      ])
      setUserRank(11)
   },[])

   return (
      <SafeAreaView style={leagueStyles.back}>
         
         <HeadLeague screen="League" ligueId={"6244f013dad34c2fbb345d31"}/>
      
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
                     <Text style={{color: '#FFFFFF'}}>ELO</Text>
                  </View>
               </View>
            </View>
            
            <List list={memberList} Element={ItemLeague}/>
            
            <FootLigue ligueId={"6244f013dad34c2fbb345d31"} rank={userRank}/>
         </View>
      </SafeAreaView>
) }

export default League;
