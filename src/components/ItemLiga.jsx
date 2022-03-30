import { View, Text } from "react-native";
import React from "react";
import { ligaStyles } from "../styles/ligaStyle";

const ItemLiga = ({ item, i }) => {
   return (
      <View style={ligaStyles.item} key = {i} >
         <View style={ligaStyles.rank}>
            <Text style={{color: '#FFFFFF'}}>{i+1}</Text>
         </View>
         <View style={[ligaStyles.img, {backgroundColor: item.code}]}>
         </View>
         <View style={ligaStyles.nick}>
            <Text style={{color: '#FFFFFF'}}>{item.name}</Text>
         </View>
         <View style={ligaStyles.elo}>
            <Text style={{color: '#FFFFFF'}}>{item.elo}</Text>
         </View>
      </View> 
  );
};

export default ItemLiga;