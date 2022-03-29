import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  Dimensions
} from 'react-native';

var {height, width} = Dimensions.get('window');

export default class Menu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [
        {id:1,  title: "Grupo 1",      color:"#FF4500", image:"https://img1.freepng.es/20180320/weq/kisspng-football-ball-game-clip-art-soccer-ball-photo-png-5ab14d84d44d07.8042061215215691568696.jpg"},
        {id:2,  title: "Grupo 2",     color:"#87CEEB", image:"https://img.icons8.com/office/70/000000/home-page.png"},
        {id:3,  title: "Grupo 3",     color:"#4682B4", image:"https://img.icons8.com/color/70/000000/two-hearts.png"} ,
        {id:4,  title: "Grupo 4",   color:"#6A5ACD", image:"https://img.icons8.com/color/70/000000/family.png"} ,
        {id:5,  title: "Grupo 5",  color:"#FF69B4", image:"https://img.icons8.com/color/70/000000/groups.png"} ,
        {id:6,  title: "Grupo 6",   color:"#00BFFF", image:"https://img.icons8.com/color/70/000000/classroom.png"} ,
        {id:7,  title: "Grupo 7",   color:"#00FFFF", image:"https://img.icons8.com/dusk/70/000000/checklist.png"} ,
        {id:8,  title: "Grupo 8",    color:"#20B2AA", image:"https://img.icons8.com/dusk/70/000000/globe-earth.png"} ,
        {id:9,  title: "Grupo 9", color:"#191970", image:"https://img.icons8.com/color/70/000000/to-do.png"} ,
        {id:10, title: "Grupo 10",     color:"#008080", image:"https://img.icons8.com/color/70/000000/basketball.png"} ,
      ]
    };
  }

  clickEventListener(item) {
    Alert.alert(item.title)
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={this.state.data}
          horizontal={false}
          keyExtractor= {(item) => {
            return item.id;
          }}
          renderItem={({item}) => {
            return (
              <TouchableOpacity style={[styles.card, {backgroundColor:item.color}]} onPress={() => {this.clickEventListener(item)}}>
                <Image style={styles.cardImage} source={{uri:item.image}}/>
                <Text style={styles.title}>{item.title}</Text>
              </TouchableOpacity>
            )
          }}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    marginTop:20,
  },
  list: {
    backgroundColor:"#0e0b29",
  },

  /******** card **************/
  card:{
    width: width,
    height:100,
    flexDirection:'row',
    padding:20,

    justifyContent: 'center', 
    alignItems: 'center' 
  },
  cardImage:{
    height: 70,
    width: 70,
  },
  title:{
    fontSize:28,
    flex:1,
    color:"#FFFFFF",
    fontWeight:'bold',
    marginLeft:40
  },
  subTitle:{
    fontSize:12,
    flex:1,
    color:"#FFFFFF",
  },
  icon:{
    height: 20,
    width: 20, 
  }
});     
