import 'moment';
import 'moment/locale/es'

import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import CalendarStrip from 'react-native-calendar-strip'

import Constants from "expo-constants";

import List from "../commons/List";
import ItemRecord from "./ItemRecord";

import { recordStyles } from "../styles/record";
import { useSelector } from 'react-redux';
import axios from 'axios';

const Record = () => {
    let [recordList, setRecordList] = useState([])

    const { manifest } = Constants
    const uri = `http://${manifest.debuggerHost.split(":").shift()}:3000`      
    
    const user= useSelector( state => state.user)

    useEffect(()=>{
      console.log("este es el usuario", user)
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
                startingDate={Date.now()}
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
      </SafeAreaView>
    );
  }

export default Record