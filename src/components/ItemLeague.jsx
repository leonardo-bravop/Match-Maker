import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { leagueStyles } from "../styles/league";

const ItemLeague = ({ item, i }) => {
   let [userData, setUserData] = useState({
      rank: 10,
      color:"red",
      nickname: "madeINchina",
      elo: 2931,
   })


   useEffect(()=>{
      // item deberia tener elo y user id
      setUserData(item)
   },[])

   return (
      <View style={leagueStyles.item} key = {i} >
         <View style={leagueStyles.rank}>
            <Text style={{color: '#FFFFFF'}}>{i+1}</Text>
         </View>
         <View style={[leagueStyles.img, {backgroundColor: "red"}]}>
         </View>
         <View style={leagueStyles.nick}>
            <Text style={{color: '#FFFFFF'}}>{userData.nickname}</Text>
         </View>
         <View style={leagueStyles.elo}>
            <Text style={{color: '#FFFFFF'}}>{item.elo}</Text>
         </View>
      </View> 
  );
};

export default ItemLeague;