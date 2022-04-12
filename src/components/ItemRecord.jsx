import axios from "axios";
import moment from 'moment';
import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, ScrollView, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setMatch } from "../state/record";
import { colorSet } from "../styles/colorSet";
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

      setStatusColor(colorSet[item.status])


      if (item.status === "pending") {
         const equipos = item.invitations_team1.concat(item.invitations_team2);
         const arrayInvit = equipos.filter(
            (invitation) => invitation.toId === user._id
         );
         if (!arrayInvit[0]) return;
         if (arrayInvit[0].status === "accepted") setIsAccepted(true);
      }
    
   }, [item]);
 
   const acceptHandler = () => {
     axios
      .put(`${uri}/api/invitation/invitAcepted/${item._id}/user/${user._id}`)
      .then(({ data }) => {
         item = data   
         setIsAccepted(true)
      });
   };

   const resultHandler = () => {
      axios
      .put(`${uri}/api/result/updateResult/${item.result}`, {score_1: result1, score_2: result2})
      .then(({ data }) => {
      });
   };

   const cancelHandler = () => {

   }


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
               <Text style={[itemStyles.text, { textTransform: "uppercase", color: statusColor }]}>
                  {item.status}
               </Text>
            
               <Text style={[itemStyles.text, { textTransform: "uppercase", color: statusColor }]}>
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
               <Text style={[itemStyles.text]}>
                  El partido se { item.status === "pending" || item.status === "active" ? "disputara" : "disputo"} a las {item.time}
               </Text>
               {item.invitationText === ""
               ? <></>
               : <Text style={[itemStyles.text]}>
                     {item.invitationText}
               </Text>}


               { (item.status === "pending" || item.status === "pendiente") 
               ?<View>
                  {!isAccepted
                  ? <View style={{ marginTop: 30}}>
                        <TouchableOpacity style={[cardStyles.confirmButton, { backgroundColor: statusColor}]}
                                       onPress={acceptHandler}>
                           <Text style={[cardStyles.buttonTxt]}>{"Participar"}</Text>
                        </TouchableOpacity>
                        
                        <View style={{ marginVertical: 10, flexDirection: "row"}}>
                           <TouchableOpacity style={[cardStyles.cancelButton]} onPress={cancelHandler}>
                              <Text style={[cardStyles.cancelTxt, {color: colorSet.error}]}>{"Cancelar"}</Text>
                           </TouchableOpacity>
                        </View>
                  </View>
                  : <View>
                        <Text style={[itemStyles.text, {marginTop: 10}]}>
                           Ya has confirmado tu participación
                        </Text>
                        <View style={{ marginVertical: 10, flexDirection: "row"}}>
                           <TouchableOpacity style={[cardStyles.cancelButton]} onPress={cancelHandler}>
                              <Text style={[cardStyles.cancelTxt, {color: colorSet.error}]}>{"Cancelar"}</Text>
                           </TouchableOpacity>
                        </View>
                     </View>
                  }
               </View>
               :<></> 
               }

               { (item.status === "active" || item.status === "lista") 
               ?<View>
                  <Text style={[itemStyles.text, {marginTop: 10}]}>
                     Ya has confirmado tu participación
                  </Text>
                  <View style={{ marginVertical: 10, flexDirection: "row"}}>
                  <TouchableOpacity style={[cardStyles.cancelButton]} onPress={cancelHandler}>
                     <Text style={[cardStyles.cancelTxt, {color: colorSet.error}]}>{"Cancelar"}</Text>
                  </TouchableOpacity>
                  </View>
               </View>
               :<></> 
               }

               { (item.status === "result") 
               ?<View>
                  <View style={{ marginTop: 30, flexDirection: "row"}}>
                        
                     <TextInput style={[cardStyles.input, {height: 40, alignSelf: "center"}]}
                                    name="text" keyboardType="default"
                                    placeholder="Resultado"
                                    value={result1} 
                                    onChangeText={ text => setResult1(parseInt(text))}
                     />
                     
                     <TouchableOpacity style={[cardStyles.confirmButton, { backgroundColor: statusColor}]}
                                       onPress={resultHandler}>
                        <Text style={[cardStyles.buttonTxt]}>{"Enviar"}</Text>
                     </TouchableOpacity>

                     <TextInput style={[cardStyles.input, {height: 40, alignSelf: "center"}]}
                                    name="text" keyboardType="default"
                                    placeholder="Resultado"
                                    value={result2} 
                                    onChangeText={ text => setResult2(parseInt(text))}
                     />
                  </View>
                  <View style={{ marginVertical: 10, flexDirection: "row"}}>
                  <TouchableOpacity style={[cardStyles.cancelButton]} onPress={cancelHandler}>
                     <Text style={[cardStyles.cancelTxt, {color: colorSet.error}]}>{"Cancelar"}</Text>
                  </TouchableOpacity>
                  </View>
               </View>
               :<></> 
               }

               { (item.status === "completada") 
               ?<View>
                  
               </View>
               :<></> 
               }

               { (item.status === "confirmada") 
               ?<View>
                  
               </View>
               :<></> 
               }
         </View>
         :<></> 
         }
         
         
      </TouchableOpacity> 
  );
};

export default ItemRecord;



/*<View>
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
                  )}*/