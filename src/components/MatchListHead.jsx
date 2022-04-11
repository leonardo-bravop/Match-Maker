import { View, Text} from "react-native";
import React from "react";
import { matchStyles } from "../styles/match";

const ListHead = () => {
  return (
      <View style={matchStyles.listHead}>
         {/* <View style={matchStyles.labels}> */}
            <View style={{width: 85, alignItems: "center"}}>
               <Text style={{ fontSize: 18, color: '#FFFFFF' }}>
                  Aliados
               </Text>
            </View>
            
            <View style={{width: 150, alignItems: "center"}}>
               <Text style={{ fontSize: 18, color: '#FFFFFF'}}>
                  Usuario
               </Text>
            </View>
            
            <View style={{width: 85, alignItems: "center"}}>
               <Text style={{ fontSize: 18, color: '#FFFFFF'}}>
                  Rivales
               </Text>
            </View>
         {/* </View> */}
      </View> )
};

export default ListHead;

