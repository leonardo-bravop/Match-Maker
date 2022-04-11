import React, { useEffect, useState } from "react";
/* import { Icon } from "react-native-elements"; */
import { profile } from "../styles/profile";
import { Avatar } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import axios from "axios";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView,
  Button,
  SafeAreaView
} from "react-native";
import { leagueStyles } from "../styles/league";
import { setLeague } from "../state/selectLeague";
import { setMembers } from "../state/memberList";
import { useDispatch, useSelector } from "react-redux";
import { setLeagueId } from "../state/idLeague";
import { FAB, Portal, Provider } from "react-native-paper";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons'; 
import * as ImagePicker from "expo-image-picker";

const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white",
  },
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  buttonReverse: {
    height: 48,
    width:48,
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  buttonPicture: {
    height: 48,
    width:48,
    display: 'flex',
    position: 'absolute',
    bottom: 0,
    right: '50%',
    marginRight: -25,
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});

const User = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const leagues = useSelector((state) => state.userLeagues);

  const [userData, setUserData] = useState({});
  const [userLeagues, setUserLeagues] = useState([]);
  const [editImage, setEditImage] = useState(false);

  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  const { manifest } = Constants;
  const uri = `http://${manifest.debuggerHost.split(":").shift()}:3000`;

  useEffect(() => {
    axios
      .get(`${uri}/api/user/getLeaguesAndRank/${user._id}`)
      .then(({ data }) => {
        setUserLeagues(data);
        console.log("ligas de usuario ===>", userLeagues);
      });
  }, []);

  const handleLogout = async () => {
    try {
      const result = await axios.post(`${uri}/api/user/logout`);
      await AsyncStorage.setItem("userInfo", "");
      const emptyUser = result.data;
      setUserData(emptyUser);
      navigation.navigate("Welcome");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={profile.container}>
      <View style={{ borderColor: "#FFF", borderRadius: 85, borderWidth: 3 }}>
        <Avatar
          size={160}
          rounded
          source={{
            uri: "https://cdn.pixabay.com/photo/2017/02/23/13/05/profile-2092113_960_720.png",
          }}
          title="Bj"
          containerStyle={{ backgroundColor: "grey" }}
        >
          <Avatar.Accessory
            size={48}
            onPress={() => navigation.navigate("Change image user")}
          />
        </Avatar>
      </View>

      <Text style={profile.userNameText}>{`${user.name} ${user.surname}`}</Text>
      <Text style={profile.userNameText}>{`${user.nickname}`}</Text>

      <View style={[leagueStyles.body, { width: "95%" }]}>
        <View style={leagueStyles.listHead}>
          <View style={leagueStyles.enum}>
            <View style={{ width: 50, alignItems: "center" }}>
              <Text style={{ color: "#FFFFFF" }}>Rank</Text>
            </View>
            <View style={{ width: 50, alignItems: "center" }}>
              <Text style={{ color: "#FFFFFF" }}>Foto</Text>
            </View>
            <View style={{ flex: 1, width: "auto", alignItems: "center" }}>
              <Text style={{ color: "#FFFFFF" }}>Nick</Text>
            </View>
            <View style={{ width: 100, alignItems: "center" }}>
              <Text style={{ color: "#FFFFFF" }}>ELO</Text>
            </View>
          </View>
        </View>
        {leagues[0] ? (
          <ScrollView style={profile.listContainer}>
            {leagues.map((item, i) => {
              return (
                <View key={i}>
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(setLeague(item.league));
                      dispatch(setMembers(item.league._id));
                      dispatch(setLeagueId(item.league._id));
                      navigation.navigate("Liga", item);
                    }}
                  >
                    <View
                      style={[
                        leagueStyles.item,
                        { backgroundColor: `${item.league.color}` },
                      ]}
                    >
                      <View style={leagueStyles.rank}>
                        <Text style={{ color: "#FFFFFF" }}>
                          {item.user.rank}
                        </Text>
                      </View>
                      <View
                        style={[
                          leagueStyles.img,
                          { backgroundColor: item.code },
                        ]}
                      >
                        <Image
                          style={profile.cardImage}
                          source={{ uri: item.league.img }}
                        />
                      </View>
                      <View style={leagueStyles.nick}>
                        <Text style={{ color: "#FFFFFF" }}>
                          {item.league.name}
                        </Text>
                      </View>
                      <View style={leagueStyles.elo}>
                        <Text style={{ color: "#FFFFFF" }}>
                          {item.user.elo[0].value}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
        ) : null}
      </View>
      <Provider>
        <Portal>
          <FAB.Group
            style={[
              ,
              {
                // position: 'relative',
                // marginBottom: 50
                //marginTop: 20,
                //position: "absolute",
                // bottom: 0,
                // right: 0,
                //color: "black",
                //margin: 16,
              },
            ]}
            open={open}
            icon={open ? "close" : "cog"}
            actions={[
              // {
              //   icon: "bell",
              //   label: "NOTIFICACIONES",
              //   onPress: () => {},
              // },
              // {
              //   icon: "account-cog",
              //   label: "EDIT",
              //   onPress: () => handleLogout(),
              // },
              {
                icon: "account-remove",
                label: "LOGOUT",
                onPress: () => handleLogout(),
              },
            ]}
            onStateChange={onStateChange}
            onPress={() => {
              if (open) {
                // do something if the speed dial is open
              }
            }}
          />
        </Portal>
      </Provider>
    </View>
  );
};

function Add({ setEditImage, navigation }) {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [galleryPermission, setGalleryPermission] = useState(null);
  const [showCamera, setShowCamera] = useState(false);

  const [camera, setCamera] = useState(null);
  const [imageUri, setImageUri] = useState([]);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [imageArray, setImageArray] = useState([]);

  const permisionFunction = async () => {
    // here is how you can get the camera permission
    const cameraPermission = await Camera.requestCameraPermissionsAsync();
    console.log("camera permission:", cameraPermission.status);

    setCameraPermission(cameraPermission.status === "granted");

    const imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync();
    console.log("permission:", imagePermission.status);

    setGalleryPermission(imagePermission.status === "granted");

    if (
      imagePermission.status !== "granted" &&
      cameraPermission.status !== "granted"
    ) {
      alert("Permission for media access needed.");
    }
  };

  useEffect(() => {
    permisionFunction();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      console.log("DATA URI ===>", data.uri);
      setImageUri(data.uri);
      setImageArray([...imageArray, data.uri]);
      setShowCamera(false);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    console.log("RESULT URI ===>", result.uri);
    if (!result.cancelled) {
      setImageArray([result.uri]);
    }
  };

  return (
    <View style={{flex: 4, marginTop: 50}}>
      {showCamera && (
        <View style={styles.container}>
          <Camera
            style={styles.camera}
            type={type}
            ref={(ref) => setCamera(ref)}
          >
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.buttonReverse}
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}
              >
                <Ionicons name="camera-reverse-outline" size={36} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonPicture}
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}
              >
                <Entypo name="circle" size={48} color="white" />
              </TouchableOpacity>
              
            </View>
          </Camera>
        </View>
      )}
      {!showCamera && (
        <>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "row" }}>
              <Button
                title={"Camera"}
                onPress={() => {
                  setShowCamera(true);
                }}
              />
              <Button title={"Gallery"} onPress={pickImage} />
              <Button
                title={"Cancelar"}
                onPress={() => navigation.navigate("User")}
              />
            </View>
          </View>
          {imageArray.length > 0 && (
            <View style={{ height: 110 }}>
              <FlatList
                horizontal
                data={imageArray}
                renderItem={({ item }) => (
                  <Image
                    source={{ uri: item }}
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 10,
                      margin: 5,
                    }}
                  />
                )}
              />
            </View>
          )}
        </>
      )}
    </View>
  );
}

const Stack = createStackNavigator();

function MyStack() {
  return (

      <Stack.Navigator
      
      screenOptions={{ headerShown: false, animationEnabled: false}}
    >
      <Stack.Screen name="User" component={User} />
      <Stack.Screen name="Change image user" component={Add} />
    </Stack.Navigator>
  );
}

const Profile = () => {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
};

export default Profile;
