import { View, TouchableOpacity, Text } from "react-native";
import React from "react";
import { recordStyles } from "../styles/record";

const ItemRecord = ({ item }) => {

   return (
      <TouchableOpacity style={recordStyles.item} >
         <View style={[recordStyles.date, {backgroundColor: item.color}]}>
            <Text style={{color: '#FFFFFF'}}>16</Text>
            <Text style={{color: '#FFFFFF'}}>OCT</Text>
         </View>

         <View style={{ flex: 1, width: "auto"}}>
            <View style={[recordStyles.group]}>
               <Text style={{color: '#FFFFFF'}}>{item.nickname} - {item.nickname} - {item.nickname} ...</Text>
            </View>
         
            <View style={[recordStyles.group]}>
               <Text style={{color: '#FFFFFF'}}>{item.nickname} - AleR - {item.nickname} ...</Text>
            </View>
         </View>
         
         <View style={{width: 65}}>
            <View style={[recordStyles.group]}>
               <Text style={{color: item.color}}>16</Text>
            </View>
         
            <View style={[recordStyles.group]}>
               <Text style={{color: item.color}}>22</Text>
            </View>
         </View>
      </TouchableOpacity> 
  );
};

export default ItemRecord;