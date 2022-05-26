import { View, Text } from "react-native";
import moment from "moment";
import React from "react";
import { cardStyles } from "../styles/match";

const MatchDetails = ({ team1, team2, match }) => {
  return (
    <>
      <View style={cardStyles.titleContainer}>
        <Text style={cardStyles.title}>Match Details </Text>
      </View>

      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={[cardStyles.txt, { marginVertical: 8 }]}>
              Team A
            </Text>

            <View style={{ flex: 1, alignItems: "center" }}>
              {team1.map((nick, i) => {
                return <Text style={cardStyles.txt}>{nick}</Text>;
              })}
            </View>
          </View>

          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={[cardStyles.txt, { marginVertical: 8 }]}>
              Team B
            </Text>

            <View style={{ flex: 1, alignItems: "center" }}>
              {team2.map((nick, i) => {
                return <Text style={cardStyles.txt}>{nick}</Text>;
              })}
            </View>
          </View>
        </View>

        <Text style={cardStyles.txt}>
        The match will be played on {""}
          {moment(match.date, "DD-MM-YYYY").format("MMMM DD YYYY")} at {match.time}
        </Text>
      </View>
    </>
  );
};

export default MatchDetails;
