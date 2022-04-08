import { View, Text, Image } from "react-native";
import React from "react";
import { leagueStyles } from "../styles/league";

const ItemLeague = ({ item }) => {
  return (
    <View style={leagueStyles.item}>
      <View style={leagueStyles.rank}>
        <Text style={{ color: "#FFFFFF" }}>{item.rank}</Text>
      </View>
      <Image style={leagueStyles.img} source={{ uri: item.img }}/>
      <View style={leagueStyles.nick}>
        <Text style={{ color: "#FFFFFF" }}>{item.nickname}</Text>
      </View>
      <View style={leagueStyles.elo}>
        <Text style={{ color: "#FFFFFF" }}>{item.elo[0].value}</Text>
      </View>
    </View>
  );
};

export default ItemLeague;
