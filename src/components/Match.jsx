import React, { useEffect, useState } from "react";
import { 
   View, 
   Text, 
   SafeAreaView, 
   TouchableOpacity, 
   TextInput, 
   ScrollView, 
   Pressable, 
   Modal 
} from "react-native";

import axios from "axios";
import Constants from "expo-constants";

import moment from 'moment';
import 'moment/locale/es'
import CalendarStrip from 'react-native-calendar-strip'
import { Icon } from "react-native-elements";

import { leagueStyles } from "../styles/league";
import { matchStyles } from "../styles/match";

import List from "../commons/List";
import ItemMatch from "./ItemMatch";
import { useDispatch, useSelector } from "react-redux";
import { resetTeams } from "../state/teams";
import { resetChecks } from "../state/checks";
import { setMembers } from "../state/memberList";
import { setUserLeagues } from "../state/userLeague";


const Match = ({navigation}) => {

   const { manifest } = Constants;
   const uri = `http://${manifest.debuggerHost.split(":").shift()}:3000`;

   let [memberList, setMemberList] = useState([])
   let [actualleague, setActualLeague] = useState({})
   let [selectedValue, setSelectedValue] = useState("")
   let [match, setMatch] = useState({})

   let [onDate, setOnDate] = useState(moment())
   let [nicks1, setNicks1] = useState([])
   let [nicks2, setNicks2] = useState([])
   let [description, setDescription] = useState("")

   let [noPress, setNoPress] = useState(false)
   let [showCard, setShowCard] = useState(false)
   let [showPicker, setShowPicker] = useState(false)

   let [errMessage, setErrMessage] = useState("No ha seleccionado ningun participante")

   const dispatch = useDispatch();

   const userData = useSelector( state => state.user)
   const leagueList = useSelector( state => state.userLeagues)
   const teams = useSelector( state => state.teams )


   useEffect(()=>{
      setNoPress(false)
   },[teams])

   useEffect(() => {

      const loadData = async () => {

         const resData = await dispatch(setUserLeagues({ userId: userData._id }))

         if (selectedValue === "") 
            setSelectedValue(resData.payload[0]._id)

         const {payload} = await dispatch(setMembers(selectedValue === "" ? resData.payload[0]._id : selectedValue ))

         setMemberList(payload)

         const {data} = await axios.get(`${uri}/api/league/showLeague/${selectedValue}`)
            
         setActualLeague(data)
         setDescription("")
         
         dispatch( resetChecks() )
         dispatch( resetTeams() )
      }

      loadData()

   },[selectedValue])   

   const createHandler = () => {
      if (teams.teamA.length === 0 && teams.teamB.length === 0) return setNoPress(true)

      if (teams.teamA.length === teams.teamB.length) {
         let members1Nick = []
         let members1Id = []
         teams.teamA.map( item =>{
            members1Nick = [...members1Nick, item.nick]
            members1Id = [...members1Id, item.id]
            return
         })
         let members2Nick = []
         let members2Id = []
         teams.teamB.map( item =>{
            members2Nick = [...members2Nick, item.nick]
            members2Id = [...members2Id, item.id]
            return
         })

         setNicks1(members1Nick)
         setNicks2(members2Nick)

         setMatch({
            league:actualleague._id,
            team_1: members1Id, 
            team_2: members2Id, 
            date: moment(onDate).format("DD-MM-YYYY"),
            time: "16:45",
            invitationText: ""
         })

         setShowCard(true)

      }
      else {
         setNoPress(true)
         setErrMessage("Ambos equipos deben tener igual numero de participantes")
      }
   }

   const confirmHandler = () => {
      match.invitationText = description
      axios
      .post(`${uri}/api/match/newMatch`, match)
      .then(()=>{
         setShowCard(false)
         dispatch( resetChecks() )
         dispatch( resetTeams() )
         setDescription("")
         navigation.navigate('Historial')
      })
   }

   const pressHandler = id =>{
      setSelectedValue(id)
      setShowPicker(!showPicker)
   }

   return (
      <SafeAreaView style={leagueStyles.back}>
         <Modal
            animationType="fade"
            transparent={true}
            visible={showPicker}
         >
            <Pressable onPress={() => { setShowPicker(false) }}
               style={{
                  height: "100%",  
                  backgroundColor: 'rgba(30,30,50,0.85)',
                  justifyContent: "center"}}>
               
               <View>
                  <ScrollView>
                     <View style={{
                        flex: 1,
                        marginHorizontal: 16,
                        backgroundColor: "#0e0b29", 
                        padding:10,
                        borderRadius: 10 }}>
                        <View style={{ flex: 1}} >
                           <ScrollView >
                              <View>
                                 { leagueList.map( (item, i) => {
                                    return (
                                       <TouchableOpacity style={{margin: 7}} onPress={()=>pressHandler(item._id)} >
                                          <Text style={{ color: "#FFFFFF", fontSize: 16, textAlign: 'center'}}>{item.name}</Text>
                                       </TouchableOpacity>
                                    )}
                                 )}
                              </View>
                           </ScrollView>
                        </View>
                     </View>
                  </ScrollView>
               </View>
            </Pressable>
         </Modal>
         
         <View style={[matchStyles.head, {backgroundColor: actualleague.color}]}>
            <View style={matchStyles.info}>
               <Text style={matchStyles.title}>{actualleague.name}</Text>
            </View>
            
            <TouchableOpacity style={[leagueStyles.menu, {alignSelf: "flex-end", justifyContent:"center"}]} onPress={()=> setShowPicker(true)}>
               <Icon name="caret-down-circle" type="ionicon" color="green" size = {32}/>
            </TouchableOpacity>
         </View>
      
         <View style={leagueStyles.body}>
            <View style={matchStyles.listHead}>
               <View style={matchStyles.enum}>
                  <View style={{width: 100, alignItems: "center"}}>
                     <Text style={{color: '#FFFFFF'}}>Equipo A</Text>
                  </View>
                  <View style={{flex: 1, width: "auto", alignItems: "center"}}>
                     <Text style={{color: '#FFFFFF'}}>Nick</Text>
                  </View>
                  <View style={{width: 100, alignItems: "center"}}>
                     <Text style={{color: '#FFFFFF'}}>Equipo B</Text>
                  </View>
               </View>
            </View>
            
            <List list={memberList} Element={ItemMatch}/>
            
            <View style={[matchStyles.foot]}>
               <View style={[matchStyles.calendar]}>
                  <CalendarStrip
                     scrollable
                     iconContainer={{flex: 0.1}}
                     style={{height:110, paddingTop: 20, paddingBottom: 5}}
                     iconStyle={{backgroundColor: 'white'}}
                     highlightDateNameStyle={{color: 'red'}}
                     highlightDateNumberStyle={{color: 'red'}}
                     calendarHeaderStyle={{color: 'white'}}
                     dateNumberStyle={{color: 'white'}}
                     dateNameStyle={{color: 'white'}}
                     locale={ {name: "es", config: {
                        months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
                        weekdaysShort: 'DOM_LUN_MAR_MIE_JUE_VIE_SAB'.split('_'),}}}
                     minDate={moment("01-01-2022", "MM-DD-YYYY")}
                     maxDate={moment().add(6, "M")}
                     selectedDate={onDate}
                     onDateSelected={ selected => 
                        setOnDate(moment(selected, "YYYY-MM-DDTHH:mm:ss.SSSZ"))}
                  />
               </View>

               <View style={{marginHorizontal: 16, height: 84, marginTop: 16, borderRadius: 10}}>
                  
               </View>
               {noPress 
               ? <Text style={{color: "red", alignSelf: "center"}}>
                     {errMessage}
                  </Text>
               : <></> }
               <TouchableOpacity disabled={noPress} style={[leagueStyles.join, {backgroundColor:noPress ? "grey" : "#16a085"}]} 
                  onPress={createHandler}>
                  <Text style={leagueStyles.joinTxt}>Crear</Text>
               </TouchableOpacity>

            </View>
         </View>
      
         <Modal
            animationType="fade"
            transparent={true}
            visible={showCard}
            onRequestClose={() => { setShowCard(!showCard) }}
         >
            <View style={{
               height: "100%",  
               backgroundColor: 'rgba(30,30,50,0.85)',
               justifyContent: "flex-end"}}>
               
               <View>
                  <ScrollView>
                     <View style={{
                        flex: 1,
                        marginHorizontal: 16,
                        backgroundColor: "#0e0b29", 
                        paddingHorizontal: 8,
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10 }}>
               
                        <Pressable style={{marginTop: 10, alignItems: "flex-end"}} onPress={() => setShowCard(!showCard)} >
                           <Icon name="close-circle" type="ionicon" color="red" />
                        </Pressable>
                  
                        <View style={{ flex: 1, /*backgroundColor: "blue"*/}} >
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
                                       {nicks1.map( (nick, i) => {
                                          return (
                                             <Text style={{ color: 'white'}}>{nick}</Text>)
                                       })}
                                    </View>
                                 </View>
                                 <View style={{ flex: 1, /*backgroundColor: "red",*/ alignItems: "center"}} >
                                    <Text style={{ marginVertical: 8, color: 'white'}}>Equipo B</Text>
                                    <View style={{flex: 1, alignItems: "center"}}>
                                       {nicks2.map( (nick, i) => {
                                          return (
                                             <Text style={{ color: 'white'}}>{nick}</Text>)
                                       })}
                                    </View>
                                 </View>
                              </View>

                              <Text style={{paddingHorizontal: 8, marginTop: 12, color: 'white'}}>
                                 El partido se disputara el {moment(match.date, "DD-MM-YYYY").format("DD [de] MMMM [de] YYYY")} a las {match.time}
                              </Text>
                              <View style={{ height: 84, marginTop: 16, borderRadius: 10}}>
                                 <ScrollView>
                                    <TextInput
                                       style={{backgroundColor:"white", paddingHorizontal: 8,borderRadius: 10, }}
                                       multiline={true}
                                       numberOfLines={4}
                                       placeholder="Texto de invitacion"
                                       name="text"
                                       keyboardType="default"
                                       onChangeText={ text => setDescription(text)}
                                       value={description}
                                    />
                                 </ScrollView>
                              </View>
                           </View>
                           <View style={{ height: 115, /*backgroundColor: "red"*/}} >
                              <TouchableOpacity  style={[leagueStyles.join, {backgroundColor:"#16a085"}]} 
                                 onPress={confirmHandler}>
                                 <Text style={leagueStyles.joinTxt}>Confirmar</Text>
                              </TouchableOpacity>
                           </View>
                        </View>
            
                     </View>
                  </ScrollView>
               </View>
            </View>
         </Modal>
      </SafeAreaView>
) }

export default Match;
