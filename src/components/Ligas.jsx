import React, { useEffect, useState } from "react";
import { View, Text, Picker, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import List from "../commons/List";

import { ligaStyles } from "../styles/ligaStyle";
import { styles } from "../styles/Styles";

const Ligas = () => {
   let [memberList, setMemberList] = useState([])

   const [selectedValue, setSelectedValue] = useState("Liga");

   useEffect(()=>{
      setMemberList(["Persona 1", "Persona 2", "Persona 3", "Persona 4", "Persona 5", "Persona 1", "Persona 2", "Persona 3", "Persona 4", "Persona 5","Persona 1", "Persona 2", "Persona 3", "Persona 4", "Persona 5", "Persona 1", "Persona 2", "Persona 3", "Persona 4", "Persona 5"])
   },[])

   return (
      <View style={ligaStyles.back}>
         
         <View style={ligaStyles.head}><View style={ligaStyles.info}>
               <Text>Info Liga</Text>
            </View>
            <View style={ligaStyles.menu}>
                  <Picker
                     selectedValue={selectedValue}
                     style={{ height: 50, width: "auto" }}
                     onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                  >
                     <Picker.Item label="Liga de Ping Pong" value="liga" />
                     <Picker.Item label="Liga de Futbol" value="liga2" />
                  </Picker>
            </View>
            
            

         </View>
      
         
      
         <View style={ligaStyles.body}>
            <View style={ligaStyles.listHead}>
               <View style={ligaStyles.enum}>
                  <View style={{width: 50, alignItems: "center"}}>
                     <Text>Rank</Text>
                  </View>
                  <View style={{width: 50, alignItems: "center"}}>
                     <Text>Foto</Text>
                  </View>
                  <View style={{flex: 1, width: "auto", alignItems: "center"}}>
                     <Text>Nick</Text>
                  </View>
                  <View style={{width: 100, alignItems: "center"}}>
                     <Text>ELO</Text>
                  </View>
               </View>
               
            </View>
            
            <List itemList={memberList}/>
         </View>
         <View style={ligaStyles.foot}>
         <TouchableOpacity style={ligaStyles.user}>
               <View style={ligaStyles.rank}>
                     <Text>num</Text>
               </View>
               <View style={ligaStyles.img}>
               </View>
               <View style={ligaStyles.nick}>
                  <Text>Tu usuario</Text>
               </View>
               <View style={ligaStyles.elo}>
                  <Text>101011</Text>
            </View> 
               </TouchableOpacity>
         </View>

         
      </View>
) }

export default Ligas;
