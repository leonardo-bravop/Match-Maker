
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { ligaStyles } from "../styles/ligaStyle";

const FootLigue = ({ ligueId }) => {
   let [userData, setUserData] = useState(null)

   useEffect(()=>{
      setUserData({
         rank: 10,
         foto:"red",
         nick: "madeINchina",
         elo: 2931,
      })
   },[])

   return ( <>
      { userData
         ?  ( userData.rank > 8 
            ? <View style={ligaStyles.foot}>
               <View style={ligaStyles.user}>
                  <View style={ligaStyles.rank}>
                     <Text style={{color: '#FFFFFF'}}>{userData.rank}</Text>
                  </View>
                  <View style={[ligaStyles.img, {backgroundColor: userData.foto}]}>
                  </View>
                  <View style={ligaStyles.nick}>
                     <Text style={{color: '#FFFFFF'}}>{userData.nick}</Text>
                  </View>
                  <View style={ligaStyles.elo}>
                     <Text style={{color: '#FFFFFF'}}>{userData.elo}</Text>
                  </View> 
               </View>
            </View>
            :  <></> )
         : <View style={ligaStyles.foot}>
            <TouchableOpacity style={[ligaStyles.join, {backgroundColor:"#16a085"}]}>
               <Text style={ligaStyles.joinTxt}>Unirse</Text>
            </TouchableOpacity> 
         </View>}
      </>
)}

export default FootLigue;