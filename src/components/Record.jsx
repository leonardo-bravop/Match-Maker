import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

var { height, width } = Dimensions.get("window");

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: 1,
          user: "Pepe",
          opponent: 'Oponente',
          color: "#dc2f02",
        },
        {
          id: 2,
          user: "Pepe",
          opponent: 'Oponente',
          color: "#dc2f02",
        },
        {
          id: 3,
          user: "Pepe",
          opponent: 'Oponente',
          color: "#90be6d",
        },
        {
          id: 4,
          user: "Pepe",
          opponent: 'Oponente',
          color: "#90be6d",
        },
        {
          id: 5,
          user: "Pepe",
          opponent: 'Oponente',
          color: "#90be6d",
        },
        {
          id: 6,
          user: "Pepe",
          opponent: 'Oponente',
          color: "#dc2f02",
        },
        {
          id: 7,
          user: "Pepe",
          opponent: 'Oponente',
          color: "#90be6d",
        },
        {
          id: 8,
          user: "Pepe",
          opponent: 'Oponente',
          color: "#90be6d",
        },
        {
          id: 9,
          user: "Pepe",
          opponent: 'Oponente',
          color: "#dc2f02",
        },
        {
          id: 10,
          user: "Pepe",
          opponent: 'Oponente',
          color: "#dc2f02",
        },
      ],
    };
  }

  clickEventListener(item) {
    Alert.alert(item.title);
  }

  render() {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <FlatList
            style={styles.list}
            contentContainerStyle={styles.listContainer}
            data={this.state.data}
            horizontal={false}
            keyExtractor={(item) => {
              return item.id;
            }}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={[styles.card, { backgroundColor: item.color }]}
                  onPress={() => {
                    this.clickEventListener(item);
                  }}
                >
                  <Text style={styles.title}>{item.user}</Text>
                  <Text style={styles.title}>{item.opponent}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  list: {
    backgroundColor: "#0e0b29",
  },

  /******** card **************/
  card: {
    width: width,
    height: 100,
    flexDirection: "row",
    padding: 20,
    borderWidth:2,
    borderColor: 'white',
    justifyContent: "center",
    alignItems: "center",
  },
  cardImage: {
    height: 70,
    width: 70,
  },
  title: {
    fontSize: 28,
    flex: 1,
    color: "#FFFFFF",
    fontWeight: "bold",
    marginLeft: 40,
  },
  subTitle: {
    fontSize: 12,
    flex: 1,
    color: "#FFFFFF",
  },
  icon: {
    height: 20,
    width: 20,
  },
});
