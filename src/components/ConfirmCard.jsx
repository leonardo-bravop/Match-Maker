import { 
   View, 
   Text,
   TouchableOpacity  
} from "react-native";
import React, { useEffect } from "react";
import { leagueStyles } from "../styles/league";
import axios from "axios";
import moment from 'moment';
import { useDispatch, useSelector } from "react-redux";

const ConfirmCard = () => {

   const match = useSelector( state => state.match)

   return (<View style={{ flex: 1, /*backgroundColor: "blue"*/}} >
                           <View style={{ height: 50, /*backgroundColor: "green",*/ alignItems: "center", justifyContent: "center"}} >
                              <Text style={{ fontSize: 25, marginBottom: 8, color: 'white' }}>
                                 Detalles del match
                              </Text>
                           </View>
                           <View style={{ flex: 1, /*backgroundColor: "yellow"*/}} >
                              <View style={{ flex: 1, /*backgroundColor: "blue",*/ flexDirection: "row"}} >
                                 <View style={{ flex: 1, /*backgroundColor: "grey",*/ alignItems: "center"}} >
                                    <Text style={{ marginVertical: 8, color: 'white'}}>Equipo A</Text>
                                    <View style={{flex: 1, alignItems: "center"}}>
                                    {match && match.team_1.map( user => {
                                     return (
                                        <Text style={{color: 'white'}}>{user.nickname}</Text>)
                                 })}
                                    </View>
                                 </View>
                                 <View style={{ flex: 1, /*backgroundColor: "red",*/ alignItems: "center"}} >
                                    <Text style={{ marginVertical: 8, color: 'white'}}>Equipo B</Text>
                                    <View style={{flex: 1, alignItems: "center"}}>
                                    {match && match.team_2.map( user => {
                                     return (
                                        <Text style={{color: 'white'}}>{user.nickname}</Text>)
                                  })}
                                    </View>
                                 </View>
                              </View>

                              <Text style={{paddingHorizontal: 8, marginTop: 12, color: 'white'}}>
                                 El partido se disputara el {moment(match.date, "DD-MM-YYYY").format("DD [de] MMMM [de] YYYY")} a las {match.time}
                              </Text>
                              <View style={{ height: "auto", marginTop: 16, borderRadius: 10}}>
               <Text>Descripcion</Text>
             </View>
                           </View>
                           <View style={{ height: 115}} >
             <TouchableOpacity style={[leagueStyles.join, {backgroundColor:"#16a085"}]} 
                      >
                <Text style={leagueStyles.joinTxt}>Boton confirm ocultable</Text>
             </TouchableOpacity>
          </View>
                        </View>)

   // return(

   //    <View style={{ flex: 1, backgroundColor: "blue"}} >
   //       <View style={{ height: 50, backgroundColor: "green", alignItems: "center", justifyContent: "center"}} >
   //          <Text>
   //             Detalles del match
   //          </Text>  
   //       </View>
         
   //       <View style={{ flex: 1, backgroundColor: "yellow"}} >
   //          <View style={{ flex: 1, backgroundColor: "blue", flexDirection: "row"}} >
   //             <View style={{ flex: 1, backgroundColor: "grey", alignItems: "center"}} >
   //                <Text style={{ marginVertical: 8}}>Equipo A</Text>
                        
   //                <View style={{flex: 1, alignItems: "center"}}>
   //                                {match && match.team_1.map( user => {
   //                                  return (
   //                                     <Text>{user.nickname}</Text>)
   //                               })}
   //                </View>
   //             </View>
                           
   //             <View style={{ flex: 1, backgroundColor: "red", alignItems: "center"}} >
   //                <Text style={{ marginVertical: 8}}>Equipo B</Text>
                        
   //                <View style={{flex: 1, alignItems: "center"}}>
   //                               {match && match.team_2.map( user => {
   //                                  return (
   //                                     <Text>{user.nickname}</Text>)
   //                               })}
   //                </View>
   //             </View>
   //          </View>

   //          <Text>
   //             El partido se disputara el {moment(match.date, "DD-MM-YYYY").format("DD [de] MMMM [de] YYYY")} a las {match.time}
   //          </Text>
                  
   //          <View style={{ height: 84, marginTop: 16, borderRadius: 10}}>
   //             <Text>Descripcion</Text>
   //          </View>
   //       </View>
               
   //       <View style={{ height: 115, backgroundColor: "red"}} >
   //          <TouchableOpacity style={[leagueStyles.join, {backgroundColor:"#16a085"}]} 
   //                   >
   //             <Text style={leagueStyles.joinTxt}>Boton confirm ocultable</Text>
   //          </TouchableOpacity>
   //       </View>
   //    </View>
   // )
}

export default ConfirmCard