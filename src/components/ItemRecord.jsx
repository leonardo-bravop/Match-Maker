import axios from "axios";
import React, { useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";

import { record2Styles } from "../styles/record";

const ItemRecord = ({ item }) => {

   return (
      <TouchableOpacity style={[record2Styles.item]} >
         <View style={[record2Styles.date, {backgroundColor: item.color}]}>
            <Text style={{color: '#FFFFFF'}}>16 OCT</Text>
         </View>
         
         <View style={{flex:1, borderBottomRightRadius: 10, borderTopRightRadius: 10}}>
            {/* <View style={{ flexDirection: "row", height: 40, justifyContent: "center", alignItems: "center", borderTopRightRadius: 10}}>
               
               <View style={{flex:1,height: 40, justifyContent: "center", alignItems: "center"}}>
                  <Text style={{color: item.color, fontWeight: "bold"}}>16</Text>
               </View>
               <View style={{flex:1,height: 40, justifyContent: "center", alignItems: "center", borderTopRightRadius: 10}}>
                  <Text style={{color: item.color, fontWeight: "bold"}}>22</Text>
               </View>
            </View> */}
            
         
            <View style={{flex:1, flexDirection: "row", borderBottomRightRadius: 10 }}>
               <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                  
                  <Text style={{color: '#FFFFFF'}}>
                     {item.nickname}
                  </Text>
                  <Text style={{color: '#FFFFFF'}}>
                     {item.nickname}
                  </Text>
                  <Text style={{color: '#FFFFFF'}}>
                     {item.nickname} 5+
                  </Text>
               
               </View>
         
               <View style={{flex: 1, justifyContent: "center", alignItems: "center" , borderBottomRightRadius: 10}}>

                  <Text style={{color: '#FFFFFF'}}>
                     {item.nickname}
                  </Text>
                  <Text style={{color: '#FFFFFF'}}>
                     {item.nickname}
                  </Text>
                  <Text style={{color: '#FFFFFF'}}>
                     {item.nickname} 5+
                  </Text>
               
               </View>
            </View>
         
         </View>
         
      </TouchableOpacity> 
  );
};

export default ItemRecord;

{/* <View style={[record2Styles.group]}>
               <Text style={{color: '#FFFFFF'}}>
                  {item.nickname} - {item.nickname} - {item.nickname} ...
               </Text>
            </View>
         
            <View style={[record2Styles.group]}>
               <Text style={{color: '#FFFFFF'}}>
                  {item.nickname} - AleR - {item.nickname} ...
               </Text>
            </View>




<View style={[record2Styles.group]}>
<Text style={{color: item.color, fontWeight: "bold"}}>16</Text>
</View>

<View style={[record2Styles.group]}>
<Text style={{color: item.color, fontWeight: "bold"}}>22</Text>
</View> */}

