import { View, Text } from "react-native";
import React from "react";
import { leagueStyles } from "../styles/league";

const ItemLeague = ({ item, key }) => {

   return (
      <View style={leagueStyles.item} >
         <View style={leagueStyles.rank}>
            <Text style={{color: '#FFFFFF'}}>{item.rank}</Text>
         </View>
         <View style={[leagueStyles.img, {backgroundColor: item.color}]}>
         </View>
         <View style={leagueStyles.nick}>
            <Text style={{color: '#FFFFFF'}}>{item.nickname}</Text>
         </View>
         <View style={leagueStyles.elo}>
            <Text style={{color: '#FFFFFF'}}>{item.elo}</Text>
         </View>
      </View> 
  );
};

export default ItemLeague;