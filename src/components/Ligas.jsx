import React, { useEffect, useState } from "react";
import { View, Text, Picker, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import List from "../commons/List";

import { ligaStyles } from "../styles/ligaStyle";
import { styles } from "../styles/Styles";
import FootLigue from "./FootLigue";
import ItemLiga from "./ItemLiga";

const Ligas = () => {
   let [memberList, setMemberList] = useState([])
   let [userData, setUserData] = useState(null)

   const [selectedValue, setSelectedValue] = useState("Liga");

   useEffect(()=>{
      setMemberList([
         { name: "TURQUOISE", code: "#1abc9c", elo: 5931  },
    { name: "EMERALD", code: "#2ecc71" , elo: 4834  },
    { name: "PETER RIVER", code: "#3498db" , elo: 4231  },
    { name: "AMETHYST", code: "#9b59b6" , elo: 3931  },
    { name: "WET ASPHALT", code: "#34495e" , elo: 3031  },
    { name: "GREEN SEA", code: "#16a085" , elo: 2931  },
    { name: "NEPHRITIS", code: "#27ae60" , elo: 2930  },
    { name: "BELIZE HOLE", code: "#2980b9" , elo: 2911  },
    { name: "WISTERIA", code: "#8e44ad" , elo: 2901  },
    {
      code:"red",
      name: "madeINchina",
      elo: 2931,
   },
    { name: "MIDNIGHT BLUE", code: "#2c3e50", elo: 2431   },
    { name: "SUN FLOWER", code: "#f1c40f", elo: 2231   },
    { name: "CARROT", code: "#e67e22", elo: 1931   },
    { name: "ALIZARIN", code: "#e74c3c", elo: 1731   },
    { name: "CLOUDS", code: "#ecf0f1" , elo: 1531  },
    { name: "CONCRETE", code: "#95a5a6", elo: 1331   },
    { name: "ORANGE", code: "#f39c12", elo: 1031   },
    { name: "PUMPKIN", code: "#d35400", elo: 931   },
    { name: "POMEGRANATE", code: "#c0392b", elo: 31   },
    { name: "SILVER", code: "#bdc3c7", elo: 10   },
    { name: "ASBESTOS", code: "#7f8c8d", elo: 1   }
      ])
   },[])
   

   return (
      <View style={ligaStyles.back}>
         <View style={ligaStyles.head}>
            <View style={ligaStyles.info}>
               <Text></Text>
            </View>
         
            <View style={ligaStyles.menu}>
               <Picker
                  selectedValue={selectedValue}
                  style={{ height: 50, width: "auto", color: '#FFFFFF'}}
                  itemStyle={{height: 50,}}
                  onValueChange={(itemValue, itemIndex) => {setSelectedValue(itemValue)
                     changeHandler()}}
               >
                  <Picker.Item label="Liga de Ping Pong" value="liga"/>
                  <Picker.Item label="Liga de Futbol" value="liga2" />
               </Picker>
            </View>
         </View>
      
         <View style={ligaStyles.body}>
            <View style={ligaStyles.listHead}>
               <View style={ligaStyles.enum}>
                  <View style={{width: 50, alignItems: "center"}}>
                     <Text style={{color: '#FFFFFF'}}>Rank</Text>
                  </View>
                  <View style={{width: 50, alignItems: "center"}}>
                     <Text style={{color: '#FFFFFF'}}>Foto</Text>
                  </View>
                  <View style={{flex: 1, width: "auto", alignItems: "center"}}>
                     <Text style={{color: '#FFFFFF'}}>Nick</Text>
                  </View>
                  <View style={{width: 100, alignItems: "center"}}>
                     <Text style={{color: '#FFFFFF'}}>ELO</Text>
                  </View>
               </View>
            </View>
            
            <List list={memberList} Element={ItemLiga}/>
            
            <FootLigue ligueId={1}/>
         </View>
      </View>
) }

export default Ligas;
