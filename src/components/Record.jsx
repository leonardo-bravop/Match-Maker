import React from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import { recordStyles } from "../styles/record";
import Constants from "expo-constants";

const Record = () => {

    const { manifest } = Constants;
    const uri = `http://${manifest.debuggerHost.split(":").shift()}:3000`;
    
    return (
      <SafeAreaView style= {recordStyles.back}>
        <View style={[recordStyles.head, {backgroundColor: "yellow"}]}>
            
            <View style={recordStyles.info}>
               <Text style={recordStyles.title}>Historial</Text>
            </View>

            <View style={recordStyles.menu}>
               
            </View>
            
         </View>

        <View style={recordStyles.body}>
          <View style={[recordStyles.listHead, {backgroundColor: "red"}]}>
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
{/*             
          <List list={recordList} Element={ItemRecord} />
          
          <FootLigue ligueId={state.params._id} userData={user} /> */}
        </View>
      </SafeAreaView>
    );
  }

export default Record
// var { height, width } = Dimensions.get("window");

// export default class Menu extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: [
//         {
//           id: 1,
//           user: "Pepe",
//           opponent: 'Oponente',
//           color: "#dc2f02",
//         },
//         {
//           id: 2,
//           user: "Pepe",
//           opponent: 'Oponente',
//           color: "#dc2f02",
//         },
//         {
//           id: 3,
//           user: "Pepe",
//           opponent: 'Oponente',
//           color: "#90be6d",
//         },
//         {
//           id: 4,
//           user: "Pepe",
//           opponent: 'Oponente',
//           color: "#90be6d",
//         },
//         {
//           id: 5,
//           user: "Pepe",
//           opponent: 'Oponente',
//           color: "#90be6d",
//         },
//         {
//           id: 6,
//           user: "Pepe",
//           opponent: 'Oponente',
//           color: "#dc2f02",
//         },
//         {
//           id: 7,
//           user: "Pepe",
//           opponent: 'Oponente',
//           color: "#90be6d",
//         },
//         {
//           id: 8,
//           user: "Pepe",
//           opponent: 'Oponente',
//           color: "#90be6d",
//         },
//         {
//           id: 9,
//           user: "Pepe",
//           opponent: 'Oponente',
//           color: "#dc2f02",
//         },
//         {
//           id: 10,
//           user: "Pepe",
//           opponent: 'Oponente',
//           color: "#dc2f02",
//         },
//       ],
//     };
//   }

//   clickEventListener(item) {
//     Alert.alert(item.title);
//   }

//   render() {
//     return (
//       <SafeAreaView>
//         <View style={styles.container}>
//           <FlatList
//             style={styles.list}
//             contentContainerStyle={styles.listContainer}
//             data={this.state.data}
//             horizontal={false}
//             keyExtractor={(item) => {
//               return item.id;
//             }}
//             renderItem={({ item }) => {
//               return (
//                 <TouchableOpacity
//                   style={[styles.card, { backgroundColor: item.color }]}
//                   onPress={() => {
//                     this.clickEventListener(item);
//                   }}
//                 >
//                   <Text style={styles.title}>{item.user}</Text>
//                   <Text style={styles.title}>{item.opponent}</Text>
//                 </TouchableOpacity>
//               );
//             }}
//           />
//         </View>
//       </SafeAreaView>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 20,
//   },
//   list: {
//     backgroundColor: "#0e0b29",
//   },

//   /******** card **************/
//   card: {
//     width: width,
//     height: 100,
//     flexDirection: "row",
//     padding: 20,
//     borderWidth:2,
//     borderColor: 'white',
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   cardImage: {
//     height: 70,
//     width: 70,
//   },
//   title: {
//     fontSize: 28,
//     flex: 1,
//     color: "#FFFFFF",
//     fontWeight: "bold",
//     marginLeft: 40,
//   },
//   subTitle: {
//     fontSize: 12,
//     flex: 1,
//     color: "#FFFFFF",
//   },
//   icon: {
//     height: 20,
//     width: 20,
//   },
// });
