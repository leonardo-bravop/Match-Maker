import React from "react";
import { View, ScrollView, Modal, Pressable,
   TouchableOpacity, Text} from "react-native";
import { Icon } from "react-native-elements";

const Picker2 = () => {
   const pressHandler = ()=>{

      // dispatch(setLeagueId(itemValue));
      // setShowCard(!showCard)
   }
   return (
      <TouchableOpacity style={{marginTop: 10, alignItems: "flex-end", alignItems: "center"}} onPress={pressHandler} >
         <Text style={{ color: "#FFFFFF", fontSize: 16}}>hola</Text>
      </TouchableOpacity>
)}

export default Picker2;