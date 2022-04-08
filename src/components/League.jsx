import React, { useEffect, useState } from "react";
import { 
   View, 
   Text, 
   SafeAreaView, 
   TouchableOpacity, 
   ImageBackground,
   ScrollView, Pressable,
   Modal 
} from "react-native";

import axios from "axios";
import Constants from "expo-constants";

import 'moment/locale/es'
import { Icon } from "react-native-elements";

import { leagueStyles } from "../styles/league";

import List from "../commons/List";
import { useDispatch, useSelector } from "react-redux";
import ItemLeague from "./ItemLeague";
import FootLigue from "./FootLeague";
import { setLeagueId } from "../state/idLeague";
import { setMembers } from "../state/memberList";
import { setUserLeagues } from "../state/userLeague";


const League = ({navigation}) => {

   const { manifest } = Constants;
   const uri = `http://${manifest.debuggerHost.split(":").shift()}:3000`;

   let [memberList, setMemberList] = useState([])
   let [actualleague, setActualLeague] = useState({})
   let [showCard, setShowCard] = useState(false)

   const dispatch = useDispatch();

   const userData = useSelector( state => state.user)

   const leagueId = useSelector( state => state.leagueId)

   const leagueList = useSelector( state => state.userLeagues)


   useEffect(() => {

      const loadData = async () => {

         const resData = await dispatch(setUserLeagues({ userId: userData._id }))

         if (leagueId === "") 
            dispatch( setLeagueId(resData.payload[0]._id) )

         const {payload} = await dispatch(setMembers(leagueId === "" ? leagueList[0]._id : leagueId ))
            
         setMemberList( payload )

         const {data} = await axios.get(`${uri}/api/league/showLeague/${leagueId}`)
            
         setActualLeague(data)
      }

      loadData()

   },[leagueId, userData])

   const selectHandler = id =>{
      dispatch(setLeagueId(id));
      setShowCard(!showCard)
   }

   const joinHandler = () => {
      const loadData = async () => {

         const resData = await dispatch(setUserLeagues({ userId: userData._id }))

         if (leagueId === "") 
            await dispatch( setLeagueId(resData.payload[0]._id) )

         const {payload} = await dispatch(setMembers(leagueId === "" ? leagueList[0]._id : leagueId ))
            
         setMemberList( payload )

         const {data} = await axios.get(`${uri}/api/league/showLeague/${leagueId}`)
            
         setActualLeague(data)
      }
      axios
      .put(`${uri}/api/league/${leagueId}/addUser/${userData._id}`)
      .then( () => {
         loadData()
      })
   }

   return (
      <SafeAreaView style={leagueStyles.back}>
         <Modal
            animationType="fade"
            transparent={true}
            visible={showCard}
         >
             <Pressable onPress={() => { setShowCard(false) }}
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
                                       <TouchableOpacity style={{margin: 7}} 
                                          onPress={()=>selectHandler(item._id)} >
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


         <View style={[leagueStyles.head, { backgroundColor: actualleague.color }]} >
            <ImageBackground resizeMode="cover" source={{uri: actualleague.img}} style={{flex: 1}}>
               <TouchableOpacity style={[leagueStyles.menu, {alignSelf: "flex-end", justifyContent:"center"}]} 
                  onPress={()=> setShowCard(true)}>
                  <Icon name="caret-down-circle" type="ionicon" color="green" size = {32}/>
               </TouchableOpacity>
               
               <View style={leagueStyles.info}>
                  <Text style={leagueStyles.title}>
                     {actualleague.name}
                  </Text>
               </View>
            </ImageBackground>
         </View>


         <View style={leagueStyles.body}>
            <View style={leagueStyles.listHead}>
               <View style={leagueStyles.enum}>
                  <View style={{ width: 50, alignItems: "center", marginVertical: 5 }} >
                     <Text style={{ color: "#FFFFFF" }}>Rank</Text>
                  </View>
                  
                  <View style={{ width: 50, alignItems: "center", marginVertical: 5 }} >
                     <Text style={{ color: "#FFFFFF" }}></Text>
                  </View>
                  
                  <View style={{ flex: 1, width: "auto", alignItems: "center", marginVertical: 5 }} >
                     <Text style={{ color: "#FFFFFF" }}>Nick</Text>
                  </View>
                  
                  <View style={{ width: 100, alignItems: "center", marginVertical: 5 }} >
                     <Text style={{ color: "#FFFFFF" }}>ELO</Text>
                  </View>
               </View>
            </View>

            <List list={memberList} Element={ItemLeague} />
            
            {false && userData.leagues.includes(leagueId)
            ?( userData.rank > 8 
               ? <View style={leagueStyles.foot}>
                  <View style={leagueStyles.user}>
                     <View style={leagueStyles.rank}>
                        <Text style={{color: '#FFFFFF'}}>{user.rank}</Text>
                     </View>
                     <View style={[leagueStyles.img, {backgroundColor: user.color}]}>
                     </View>   
                     <View style={leagueStyles.nick}>
                        <Text style={{color: '#FFFFFF'}}>{user.nickname}</Text>
                     </View>
                     <View style={leagueStyles.elo}>
                        <Text style={{color: '#FFFFFF'}}>{user.elo}</Text>
                     </View> 
                  </View>
               </View>
               : <></> )
            : <View style={[leagueStyles.foot, { height: 100 }]}>
                  <TouchableOpacity style={[leagueStyles.join, {backgroundColor:"#16a085"}]}
                     onPress={() => joinHandler(leagueId)}>
                     <Text style={leagueStyles.joinTxt}>Unirse</Text>
                  </TouchableOpacity> 
            </View>}
         </View>
      </SafeAreaView>
) }

export default League;