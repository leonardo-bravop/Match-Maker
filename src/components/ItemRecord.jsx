import axios from "axios";
import React, { useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useDispatch } from "react-redux";
import { setMatch } from "../state/record";

import { record2Styles } from "../styles/record";

const ItemRecord = ({ item }) => {

   const dispatch = useDispatch();

   return (
      <View>
      <TouchableOpacity style={[record2Styles.item]} onPress={() => dispatch(setMatch(item)) }>
         
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
                  {item.team_1.map( (user, i, arr) => {
                     if (i>2) return (<></>)
                     return (
                     <Text style={{color: '#FFFFFF'}} key= {user._id}>
                        {arr.length > 3 && i === 2 
                        ?  `${user.nickname}`+` y ${arr.length-3} mas` 
                        : user.nickname }
                     </Text>)
                  })}
               </View>

               <View style={[record2Styles.date, {backgroundColor: "grey"}]}>
                  <Text style={{color: '#FFFFFF'}}>{item.date} {item.status}</Text>
               </View>
               
               <View style={{flex: 1, justifyContent: "center", alignItems: "center" , borderBottomRightRadius: 10}}>

                  {item.team_2.map( (user, i, arr) => {
                     if (i>2) return (<></>)
                     return (
                     <Text style={{color: '#FFFFFF'}} key= {i}>
                        {arr.length > 3 && i === 2 
                        ?  `${user.nickname}`+` y ${arr.length-3} mas` 
                        : user.nickname }
                     </Text>)
                  })}
               
               </View>
            </View>
         
         </View>
         
      </TouchableOpacity> 
      </View>
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

