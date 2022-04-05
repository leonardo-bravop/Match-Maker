import { View, Text, Image } from "react-native";
import React from "react";
import { leagueStyles } from "../styles/league";

const ItemLeague = ({ item }) => {
  return (
    <View style={leagueStyles.item}>
      <View style={leagueStyles.rank}>
        <Text style={{ color: "#FFFFFF" }}>{item.rank}</Text>
      </View>
      <Image
        style={leagueStyles.img}
        source={{
          uri: "https://cdn.pixabay.com/photo/2017/02/23/13/05/profile-2092113_960_720.png",
        }}
      ></Image>
      <View style={leagueStyles.nick}>
        <Text style={{ color: "#FFFFFF" }}>{item.nickname}</Text>
      </View>
      <View style={leagueStyles.elo}>
        <Text style={{ color: "#FFFFFF" }}>1000</Text>
      </View>
    </View>
  );
};

export default ItemLeague;
