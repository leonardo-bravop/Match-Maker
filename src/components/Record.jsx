import moment from 'moment';
import 'moment/locale/es'

import React, { useEffect, useState } from "react";
import { 
  SafeAreaView, 
  View, 
  Text, 
  TouchableOpacity, 
  Modal,
  Pressable  
} from "react-native";
import CalendarStrip from 'react-native-calendar-strip'
import { Icon } from "react-native-elements";

import Constants from "expo-constants";

import List from "../commons/List";
import ItemRecord from "./ItemRecord";

import { recordStyles } from "../styles/record";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import ConfirmCard from './ConfirmCard';
import { setMatch } from '../state/record';

const Record = () => {
    let [recordList, setRecordList] = useState([])
    let [onDate, setOnDate] = useState(moment())

    const { manifest } = Constants
    const uri = `http://${manifest.debuggerHost.split(":").shift()}:3000`      
    
    const user= useSelector( state => state.user)

    const match = useSelector( state => state.match)

    const dispatch = useDispatch();

    useEffect(()=>{
      axios.get(`${uri}/api/user/getMatches/${user._id}`)
      .then(({data}) => {
          setRecordList(data)
      })
      
    },[])
    
    return (
      <SafeAreaView style= {recordStyles.back}>
        <View style={[recordStyles.head]}>
            
            <View style={recordStyles.info}>
               <Text style={recordStyles.title}>Historial</Text>
            </View>

            <View style={[recordStyles.calendar]}>
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

            <TouchableOpacity  style={{ height: 50, alignItems: "center", justifyContent: "center"}}>
              <Text style={{ color: "#FFFFFF" }}>Mostrar todo</Text>
            </TouchableOpacity>
         </View>

        <View style={recordStyles.body}>
          <View style={[recordStyles.listHead]}>
            <View style={recordStyles.enum}>
              <View style={{ width: 50, alignItems: "center", marginVertical: 5 }}>
                <Text style={{ color: "#FFFFFF" }}>Fecha</Text>
              </View>
              <View style={{ width: 50, alignItems: "center", marginVertical: 5 }}>
                <Text style={{ color: "#FFFFFF" }}></Text>
              </View>
              <View style={{ flex: 1, width: "auto", alignItems: "center", marginVertical: 5 }} >
                <Text style={{ color: "#FFFFFF" }}>Grupo</Text>
              </View>
              <View style={{ width: 100, alignItems: "center", marginVertical: 5 }} >
                <Text style={{ color: "#FFFFFF" }}>Resultado</Text>
              </View>
            </View>
          </View>
             
          <List list={recordList} Element={ItemRecord} />
    {/*      
          <FootLigue ligueId={state.params._id} userData={user} /> */}
        </View>


        <Modal
            animationType="fade"
            transparent={true}
            visible={match && match.id}
            onRequestClose={() => {
              dispatch(setMatch(null)) 
            }}
         >
           <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: "flex-end"}}>
               <View style={{
                  height: "70%",  
                  marginHorizontal: 16,
                  backgroundColor:"white", 
                  paddingHorizontal: 8,
                  borderTopRightRadius: 10,
                  borderTopLeftRadius: 10 }}>
               
                  <Pressable style={{marginTop: 10, alignItems: "flex-end"}} 
                      onPress={() => {
                        dispatch(setMatch(null)) 
                      }} >
                     <Icon name="close-circle" type="ionicon" color="red" />
                  </Pressable>

                  <ConfirmCard/>


               </View>
            </View>
         </Modal>







      </SafeAreaView>
    );
  }

export default Record