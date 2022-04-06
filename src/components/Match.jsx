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
import {Picker} from '@react-native-picker/picker'
import { Icon } from "react-native-elements";

import { leagueStyles } from "../styles/league";
import { matchStyles } from "../styles/match";

import List from "../commons/List";
import ItemMatch from "./ItemMatch";
import { useDispatch, useSelector } from "react-redux";
import { resetTeams } from "../state/teams";
import { resetChecks } from "../state/checks";


const Match = ({navigation}) => {

   const { manifest } = Constants;
   const uri = `http://${manifest.debuggerHost.split(":").shift()}:3000`;

   let [memberList, setMemberList] = useState([])
   let [leagueList, setLeagueList] = useState([])
   let [actualleague, setActualLeague] = useState({})
   let [user, setUser] = useState({})
   let [match, setMatch] = useState({})
   let [selectedValue, setSelectedValue] = useState("")
   let [showCard, setShowCard] = useState(false)
   let [onDate, setOnDate] = useState(moment().format("YYYY-MM-DD"))
   

   const dispatch = useDispatch();

   const userData = useSelector( state => state.user)
   const teams = useSelector( state => state.teams )

   useEffect(() => {

      let rank = 0

      axios
      .get(`${uri}/api/league/getUsers/${selectedValue}`)
      .then(({ data })=>{
         setMemberList( data.map( (element, i) =>{
            if ( userData._id === element._id) 
                  rank = i+1
            return {
               id: element._id,
               rank: i+1,
               color:"blue",
               nickname: element.nickname,
               elo: 2931,
            }
         }))
      })
      .then(()=>{
         setUser({
            id: userData._id,
            rank: rank,
            color:"red",
            nickname: userData.nickname,
            elo: 2931,
         })
      })

      axios
      .get(`${uri}/api/user/getLeagues/${userData._id}`)
      .then(({data})=>{
         setLeagueList(data)
      })

   },[selectedValue])

   const changeHandler = (itemValue) => {

      axios
      .get(`${uri}/api/league/showLeague/${itemValue}`)
      .then( ({ data }) => {
         setActualLeague(data)
      })
   }
   

   const createHandler = () => {

         setMatch({
            equipo_1: teams.teamA, 
            equipo_2: teams.teamB, 
            fecha: onDate
         })

         setShowCard(true)

         dispatch( resetTeams() )
   }

   const confirmHandler = () => {

      axios
      .post(`${uri}/api/match/newMatch`, match)
      .then(()=>{
         setShowCard(false)
         dispatch(resetChecks())
         navigation.navigate('Historial')
      })
   }

   return (
      <SafeAreaView style={leagueStyles.back}>
         
         <View style={[matchStyles.head, {backgroundColor: actualleague.color}]}>
            <View style={matchStyles.info}>
               <Text style={matchStyles.title}>{actualleague.name}</Text>
            </View>
            <View style={matchStyles.menu}>
               <Picker
                  selectedValue={selectedValue}
                  style={{ height: 50, width: 40, alignSelf: "flex-end", color: actualleague.color}}
                  itemStyle={{ height: 50 }}
                  onValueChange={(itemValue, itemIndex) => {
                     changeHandler(itemValue)
                     setSelectedValue(itemValue)
                  }}               
               >
                  {leagueList.map( (element, i) => 
                     <Picker.Item label={element.name} value={element._id} key= {i}/> )}
               </Picker>
            </View>
            
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
                     iconStyle={{backgroundColor: 'white'}}
                     highlightDateNameStyle={{color: 'red'}}
                     highlightDateNumberStyle={{color: 'red'}}
                     minDate={"01-01-2022"}
                     maxDate={"05-31-2022"}
                     style={{height:100, paddingTop: 20, paddingBottom: 5}}
                     calendarHeaderStyle={{color: 'white'}}
                     dateNumberStyle={{color: 'white'}}
                     dateNameStyle={{color: 'white'}}
                     iconContainer={{flex: 0.1}}
                     locale={ {name: "es", config: {
                        months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
                        weekdaysShort: 'DOM_LUN_MAR_MIE_JUE_VIE_SAB'.split('_'),}}}
                     selectedDate={onDate}
                     onDateSelected={ selected => setOnDate(selected.format("YYYY-MM-DD"))}
                  />
               </View>

               <View style={{marginHorizontal: 16, height: 84, marginTop: 16, borderRadius: 10}}>
                  <ScrollView>
                     <TextInput
                        style={{backgroundColor:"white", paddingHorizontal: 8,borderRadius: 10}}
                        multiline={true}
                        numberOfLines={4}
                        placeholder="Texto de invitacion"
                        name="textArea"
                        keyboardType="default"
                        value={"1"}
                     />
                  </ScrollView>
               </View>
      
               <TouchableOpacity style={[leagueStyles.join, {backgroundColor:"#16a085"}]} 
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
               flex: 1,  
               backgroundColor: 'rgba(0,0,0,0.8)',
               justifyContent: "flex-end"}}>
               <View style={{
                  height: "70%",  
                  marginHorizontal: 16,
                  backgroundColor:"white", 
                  paddingHorizontal: 8,
                  borderTopRightRadius: 10,
                  borderTopLeftRadius: 10 }}>
               
                  <Pressable style={{marginTop: 10, alignItems: "flex-end"}} onPress={() => setShowCard(!showCard)} >
                     <Icon name="close-circle" type="ionicon" color="red" />
                  </Pressable>
                  
                  <View style={{ flex: 1, backgroundColor: "blue"}} >
                     <View style={{ height: 50, backgroundColor: "green"}} >
                     </View>
                     <View style={{ flex: 1, backgroundColor: "yellow"}} >
                        <Text>
                           {match.fecha}
                        </Text>
                     </View>
                     <View style={{ height: 115, backgroundColor: "red"}} >
                        <TouchableOpacity style={[leagueStyles.join, {backgroundColor:"#16a085"}]} 
                           onPress={confirmHandler}>
                           <Text style={leagueStyles.joinTxt}>Confirmar</Text>
                        </TouchableOpacity>
                     </View>
                  </View>
            
               </View>
            </View>
         </Modal>
      </SafeAreaView>
) }

export default Match;
