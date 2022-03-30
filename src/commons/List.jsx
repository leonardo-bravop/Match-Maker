import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { ligaStyles } from "../styles/ligaStyle";

const List = ({itemList}) => {
   return (
      <ScrollView >
         <View style={ligaStyles.listContainer}>
            { itemList.map( (item, i) => {
               return (
                  <View style={ligaStyles.item} key = {i} >
                     <View style={ligaStyles.rank}>
                        <Text>{i+1}</Text>
                     </View>
                     <View style={ligaStyles.img}>
                     </View>
                     <View style={ligaStyles.nick}>
                        <Text>{item}</Text>
                     </View>
                     <View style={ligaStyles.elo}>
                        <Text>101011</Text>
                     </View>
                  </View> 
               )}
            )}
         </View>
      </ScrollView>
)}

export default List;