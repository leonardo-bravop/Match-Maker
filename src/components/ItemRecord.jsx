import axios from "axios";
import moment from 'moment';
import React, { useEffect } from "react";
import { View, TouchableOpacity, Text, ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import { setMatch } from "../state/record";
import { colorSet } from "../styles/colorSet";

import { itemStyles, record2Styles } from "../styles/record";

const ItemRecord = ({ item }) => {

   const dispatch = useDispatch();

   return (
      <TouchableOpacity onPress={() => dispatch(setMatch(item))} 
         style={[itemStyles.item, {borderColor: colorSet.button , borderWidth:1.5}]}>
         
         
         <View style={[itemStyles.team, {borderColor: "blue" , borderWidth:0}]}>
            
         {/*<ScrollView >
         <View >
            { item.team_1.map( (user, i) => {
               return (
                  <Text style={itemStyles.text}>
                     {user.nickname}
                  </Text>
               )}
            )}
         </View>
      </ScrollView>*/}
            
            {item.team_1.slice(0,3).map( (user, i) => {
               // if (i>2) return (<></>)
                  return (
                     <Text style={itemStyles.text} key= {i}>
                        {item.team_1.length > 3 && i === 2 
                        ? `y ${item.team_1.length-2} mas` 
                        : user.nickname }
                     </Text>)
                  })}
         </View>
            
         <View style={[itemStyles.info, {borderColor: "red" , borderWidth:0}]}>
            <Text style={[itemStyles.text, { textTransform: "uppercase" }]}>
              {item.status}
            </Text>
            <Text style={itemStyles.text}>
              {moment(item.date, "DD-MM-YYYY").format("DD-MM")}
            </Text>
         </View>

         <View style={[itemStyles.team, {borderColor: "blue" , borderWidth:0}]}>
               {item.team_2.slice(0,3).map( (user, i) => {
               // if (i>2) return (<></>)
                  return (
                     <Text style={itemStyles.text} key= {i}>
                        {item.team_2.length > 3 && i === 2 
                        ? `y ${item.team_2.length-2} mas` 
                        : user.nickname }
                     </Text>)
                  })}
         </View>
      </TouchableOpacity> 
  );
};

export default ItemRecord;


{/*

<View>
      <TouchableOpacity style={[record2Styles.item]} onPress={() => dispatch(setMatch(item)) }>
         
         <View style={{flex:1, borderBottomRightRadius: 10, borderTopRightRadius: 10}}>
            /* <View style={{ flexDirection: "row", height: 40, justifyContent: "center", alignItems: "center", borderTopRightRadius: 10}}>
               
               <View style={{flex:1,height: 40, justifyContent: "center", alignItems: "center"}}>
                  <Text style={{color: item.color, fontWeight: "bold"}}>16</Text>
               </View>
               <View style={{flex:1,height: 40, justifyContent: "center", alignItems: "center", borderTopRightRadius: 10}}>
                  <Text style={{color: item.color, fontWeight: "bold"}}>22</Text>
               </View>
            </View> 
            
         
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
*/}










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

