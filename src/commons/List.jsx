import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { ligaStyles } from "../styles/ligaStyle";

const List = ({list, Element}) => {
   return (
      <ScrollView >
         <View style={ligaStyles.listContainer}>
            { list.map( (item, i) => {
               return (
                  <Element item={item} i={i}/>
               )}
            )}
         </View>
      </ScrollView>
)}

export default List;