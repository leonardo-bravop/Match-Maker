import React from "react";
import { View} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const List = ({list, Element}) => {
   return (
      <ScrollView >
         <View style={ { marginLeft:16, marginRight:16 } }>
            { list.map( (item, i) => {
               return (
                  <Element item={item} key={i} i={i}/>
               )}
            )}
         </View>
      </ScrollView>
)}

export default List;