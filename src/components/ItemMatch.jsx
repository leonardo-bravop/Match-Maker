import { View, Text } from "react-native";
import React from "react";
import { leagueStyles } from "../styles/league";

const ItemMatch = ({ item, i }) => {
   let [userData, setUserData] = useState(null),
      [select, setSelect] = useState(false),
      [select2, setSelect2] = useState(false)



   return (
      <View style={leagueStyles.item} key = {i} >
         <View style={leagueStyles.rank}>
            <Text style={{color: '#FFFFFF'}}>{i+1}</Text>
         </View>
         <View style={[leagueStyles.img, {backgroundColor: userData.color}]}>
         </View>
         <View style={leagueStyles.nick}>
            <Text style={{color: '#FFFFFF'}}>{userData.nickname}</Text>
         </View>
         <View style={[leagueStyles.elo, {flexDirection: "row"}]}>
            <View style={leagueStyles.checkContainer}>
               <CheckBox
                  value={select}
                  onValueChange={setSelect}
                  style={styles.checkbox}
               />
            </View>
            <View style={leagueStyles.checkContainer}>
               <CheckBox
                  value={select2}
                  onValueChange={setSelect2}
                  style={styles.checkbox}
               />
            </View>
         </View>
      </View> 
  );
};

export default ItemMatch;