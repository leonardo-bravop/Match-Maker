import axios from "axios";
import moment from 'moment';
import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, ScrollView, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setMatch } from "../state/record";
import { colorSet } from "../styles/colorSet";
import { leagueStyles } from "../styles/league";
import Constants from "expo-constants";

import { cardStyles, itemStyles, record2Styles, recordStyles } from "../styles/record";

const ItemRecord = ({ item }) => {
   const { manifest } = Constants;
   const uri = `http://${manifest.debuggerHost.split(":").shift()}:3000`;

   let [showInfo, setShowInfo] = useState(false)
   const [isAccepted, setIsAccepted] = useState(false);
   const [statusColor, setStatusColor] = useState("grey");
   const [result1, setResult1] = useState(0);
   const [result2, setResult2] = useState(0);

   const match = useSelector((state) => state.match);
   const user = useSelector((state) => state.user);
 
 
   useEffect(() => {
      
      if (item.status === "active" && moment().isSameOrAfter(moment(`${item.date} ${item.time}`, "DD-MM-YYYY H:mm"))) {
            item.status = "result"
      }
         console.log("este es item -----------", item)
      setStatusColor(colorSet[item.status])
      const equipos = item.invitations_team1.concat(item.invitations_team2);
     const arrayInvit = equipos.filter(
       (invitation) => invitation.toId === user._id
     );
     if (!arrayInvit[0]) return;
     console.log("====================================");
     console.log(`is accepted e`, isAccepted);
     console.log("====================================");
     console.log(arrayInvit[0].status);
     console.log("====================================");
     // console.log(`match es`, match);
     if (arrayInvit[0].status === "accepted") setIsAccepted(true);
    
   }, [item]);
 
   const acceptHandler = () => {
     axios
       .put(`${uri}/api/invitation/invitAcepted/${item._id}/user/${user._id}`)
       .then(({ data }) => {
         setIsAccepted(true)
         // console.log(`data es`, data);
         // console.log(`match es`, match);
       });
   };

   const resultHandler = () => {
      axios
        .put(`${uri}/api/result/updateResult/${item.result}`, {score_1: result1, score_2: result2})
        .then(({ data }) => {
          console.log("Aver si resulta ------------", data)
        });
    };


   return (
      <TouchableOpacity onPress={() => setShowInfo(!showInfo)/*dispatch(setMatch(item))*/} 
                        style={[itemStyles.item, {borderColor: statusColor , borderWidth:1.5}]}>
         <View style={[itemStyles.head]}>
            <View style={[itemStyles.team, {borderColor: "blue" , borderWidth:0}]}>
               {item.team_1.slice(0,3).map( (user, i) => {
                  return (
                     <Text style={[itemStyles.text, {marginBottom: 3}]} key= {i}>
                        {item.team_1.length > 3 && i === 2 
                        ? `y ${item.team_1.length-2} mas` 
                        : user.nickname }
                     </Text>)
                  })}
            </View>
            
            <View style={[itemStyles.info, {borderColor: "red" , borderWidth:0}]}>
               <Text style={[itemStyles.text, { textTransform: "uppercase", color:statusColor }]}>
                  {item.status}
               </Text>
            
               <Text style={[itemStyles.text, { textTransform: "uppercase", color:statusColor }]}>
                  {moment(item.date, "DD-MM-YYYY").format("DD-MM")}
               </Text>
            </View>

            <View style={[itemStyles.team, {borderColor: "blue" , borderWidth:0}]}>
               {item.team_2.slice(0,3).map( (user, i) => {
                  return (
                     <Text style={[itemStyles.text, {marginBottom: 3}]} key= {i}>
                        {item.team_2.length > 3 && i === 2 
                        ? `y ${item.team_2.length-2} mas` 
                        : user.nickname }
                     </Text>)
                  })}
            </View>
         </View>
         
         { showInfo
         ? <View>
               <View>
                  {item.status !== "result"
                  ?<Text style={[itemStyles.text]}>
                     El partido se disputara a las {item.time}
                  </Text>
                  :<></>
                  }
                  
                  {item.invitationText === ""
                  ? <></>
                  : <Text style={[itemStyles.text]}>
                        {item.invitationText}
                     </Text>
                  }
                  
               </View>
                  {!isAccepted || item.status === "result"
                  ? (
                     <View style={{ marginVertical: 30, flexDirection: "row"}}>
                        {item.status === "result"
                  ? (
                        <TextInput style={cardStyles.input}
                                    name="text" keyboardType="default"
                                    placeholder="Resultado"
                                    value={result1} 
                                    onChangeText={ text => setResult1(parseInt(text))}
                                 />)
                     :<></>}
                     <TouchableOpacity style={[cardStyles.confirmButton, { backgroundColor: statusColor}]}
                                       onPress={item.status !== "result" ? acceptHandler : resultHandler}>
                        <Text style={[cardStyles.buttonTxt]}>{item.status !== "result" ? "Participar" : "Enviar"}</Text>
                     </TouchableOpacity>
                     {item.status === "result"
                  ? (
                     <TextInput style={cardStyles.input}
                                    name="text" keyboardType="default"
                                    placeholder="Resultado"
                                    value={result2} 
                                    onChangeText={ text => setResult2(parseInt(text))}
                                 />)
                                 :<></>}
               </View>
                     ) 
                  : (<Text style={[itemStyles.text, {marginTop: 10, marginBottom: 16}]}>
                        Ya has confirmado tu participación
                     </Text>
                  )}
            </View>
         :<></> 
         }
         
         
      </TouchableOpacity> 
  );
};



{/*
            
               {!isAccepted 
               ? (<>
                  <Text style={[itemStyles.text]}>
                     Debes confirmar tu participacion antes del {moment(item.date, "DD-MM-YYYY").format("DD [de] MMMM")}
                  </Text>
            <View style={{ height: 115 }}>
                  <TouchableOpacity style={[leagueStyles.join, { backgroundColor: "#16a085" }]}
                                    onPress={()=>{}/*acceptHandler}>
                                    <Text style={[itemStyles.text]}>Participar</Text>
                                    </TouchableOpacity>
                              </View>
                                 </>
                                    ) 
                                 : (<Text style={[itemStyles.text]}>
                                       Ya has confirmado tu participación
                                    </Text>
                                 )}*/ }




export default ItemRecord;
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

