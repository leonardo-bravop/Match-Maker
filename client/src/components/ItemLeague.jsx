import { View, Text, Image } from "react-native";
import React from "react";
import { newLeagueStyles } from "../styles/league";


const ItemLeague = ({ item, colorLeague }) => {
  return (
    <View
      style={[
        newLeagueStyles.item,
        { borderColor: colorLeague, borderWidth: 1.5 },
      ]}
    >
      <View
        style={[newLeagueStyles.team, { borderColor: "blue", borderWidth: 0 }]}
      >
        <Text
          style={[newLeagueStyles.text, { marginBottom: 3, paddingLeft: 15 }]}
        >
          {item.rank}
        </Text>
      </View>

      <View
        style={[newLeagueStyles.nick, { borderColor: "red", borderWidth: 0 }]}
      >
        <Image style={newLeagueStyles.img} source={{ uri: item.img }} />

        <Text style={[newLeagueStyles.text, { marginLeft: 10 }]}>
          {item.nickname}
        </Text>
      </View>

      <View
        style={[newLeagueStyles.team, { borderColor: "blue", borderWidth: 0 }]}
      >
        <Text
          style={[newLeagueStyles.text, { marginBottom: 3, marginRight: 8 }]}
        >
          {item.elo[0].value}
        </Text>
      </View>
    </View>
  );
};

export default ItemLeague;
