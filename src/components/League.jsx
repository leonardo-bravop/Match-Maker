import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Pressable,
  Modal,
  Button,
  TextInput,
  ActivityIndicator,
} from "react-native";

import axios from "axios";
import Constants from "expo-constants";

import "moment/locale/es";
import { Icon } from "react-native-elements";

import { leagueStyles } from "../styles/league";

import List from "../commons/List";
import { useDispatch, useSelector } from "react-redux";
import ItemLeague from "./ItemLeague";
import FootLigue from "./FootLeague";
import { setLeagueId } from "../state/idLeague";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Formik } from "formik";
import * as yup from "yup";
import { formR } from "../styles/form";

const LeagueHome = ({ navigation }) => {
  const { manifest } = Constants;
  const uri = `http://${manifest.debuggerHost.split(":").shift()}:3000`;

  let [memberList, setMemberList] = useState([]);
  let [leagueList, setLeagueList] = useState([]);
  let [actualleague, setActualLeague] = useState({});
  let [user, setUser] = useState({});
  let [showCard, setShowCard] = useState(false);

  const dispatch = useDispatch();

  const userData = useSelector((state) => state.user);

  const leagueId = useSelector((state) => state.leagueId);

  const resetData = useSelector((state) => state.checks);

  useEffect(() => {
    let rank = 0;

    axios.get(`${uri}/api/user/getLeagues/${userData._id}`).then(({ data }) => {
      setLeagueList(data);
      if (leagueId === "") dispatch(setLeagueId(data[0]._id));
    });

    axios
      .get(`${uri}/api/league/getUsers/${leagueId}`)
      .then(({ data }) => {
        setMemberList(
          data.rankedUsers.map((element, i) => {
            if (userData._id === element._id) rank = i + 1;
            return {
              id: element._id,
              rank: i + 1,
              color: "blue",
              nickname: element.nickname,
              elo: 2931,
            };
          })
        );
      })
      .then(() => {
        setUser({
          id: userData._id,
          rank: rank,
          color: "red",
          nickname: userData.nickname,
          elo: 2931,
        });
      });

    axios.get(`${uri}/api/league/showLeague/${leagueId}`).then(({ data }) => {
      setActualLeague(data);
    });
  }, [leagueId, resetData]);

  const pressHandler = (id) => {
    dispatch(setLeagueId(id));
    setShowCard(!showCard);
  };

  return (
    <View style={leagueStyles.back}>
      <Modal animationType="fade" transparent={true} visible={showCard}>
        <Pressable
          onPress={() => {
            setShowCard(false);
          }}
          style={{
            height: "100%",
            backgroundColor: "rgba(30,30,50,0.85)",
            justifyContent: "center",
          }}
        >
          <View>
            <ScrollView>
              <View
                style={{
                  flex: 1,
                  marginHorizontal: 16,
                  backgroundColor: "#0e0b29",
                  padding: 10,
                  borderRadius: 10,
                }}
              >
                <View style={{ flex: 1 }}>
                  <ScrollView>
                    <View>
                      {leagueList.map((item, i) => {
                        return (
                          <TouchableOpacity
                            style={{ margin: 7 }}
                            onPress={() => pressHandler(item._id)}
                          >
                            <Text
                              style={{
                                color: "#FFFFFF",
                                fontSize: 16,
                                textAlign: "center",
                              }}
                            >
                              {item.name}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </ScrollView>
                </View>
              </View>
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
      {/* <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}> */}

      {/* </View> */}
      <View
        style={[leagueStyles.head, { backgroundColor: actualleague.color }]}
      >
        <ImageBackground
          resizeMode="cover"
          source={{ uri: actualleague.img }}
          style={{ flex: 1 }}
        >
          <TouchableOpacity
            style={[
              leagueStyles.menu,
              { alignSelf: "flex-end", justifyContent: "center" },
            ]}
            onPress={() => setShowCard(true)}
          >
            <Icon
              name="caret-down-circle"
              type="ionicon"
              color="green"
              size={32}
            />
          </TouchableOpacity>

          <View style={leagueStyles.info}>
            <Text style={leagueStyles.title}>{actualleague.name}</Text>
          </View>
        </ImageBackground>
      </View>

      <View style={leagueStyles.body}>
        <View style={leagueStyles.listHead}>
          <View style={leagueStyles.enum}>
            <View
              style={{ width: 50, alignItems: "center", marginVertical: 5 }}
            >
              <Text style={{ color: "#FFFFFF" }}>Rank</Text>
            </View>

            <View
              style={{ width: 50, alignItems: "center", marginVertical: 5 }}
            >
              <Text style={{ color: "#FFFFFF" }}></Text>
            </View>

            <View
              style={{
                flex: 1,
                width: "auto",
                alignItems: "center",
                marginVertical: 5,
              }}
            >
              <Text style={{ color: "#FFFFFF" }}>Nick</Text>
            </View>

            <View
              style={{ width: 100, alignItems: "center", marginVertical: 5 }}
            >
              <Text style={{ color: "#FFFFFF" }}>ELO</Text>
            </View>
          </View>
        </View>

        <List list={memberList} Element={ItemLeague} />
        <TouchableOpacity
          style={{
            height: 50,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 2,
            borderColor: "#16a085",
            alignSelf: "center",
            paddingHorizontal: 20,
            position: "relative",

            // left: 10,
            // top: 10,
          }}
          onPress={() => navigation.navigate("Create a league")}
        >
          <Text style={{ fontSize: 24, color: "white" }}>Crear liga</Text>
        </TouchableOpacity>
        <FootLigue leagueId={actualleague._id} user={user} />
      </View>
    </View>
  );
};

const HomeScreen = ({ navigation }) => {
  const { manifest } = Constants;
  const uri = `http://${manifest.debuggerHost.split(":").shift()}:3000`;

  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = (values) => {
    console.log("values son", values);
    if(values.isPrivate.toLowerCase()!=="no") {
      values.isPrivate = !!values.isPrivate;
    }
    else {
      values.isPrivate = false
    }
    if (values.secretKey === "") delete values.secretKey
    console.log("values son", values);
    setIsLoading(true);
    axios.post(`${uri}/api/league/new`, values).then((res) => {
      setIsLoading(false);
      console.log("====================================");
      console.log("antes de navigate");
      console.log("====================================");
      res.status == 201 ? navigation.navigate("Leagues") : null;
    }).catch(error=>{
      setIsLoading(false);
      console.log("error es", error);
    })
  };

  const validationSchema = yup.object().shape({
    name: yup.string("Ingresa tu nombre").required("*Campo requerido"),
    // surname: yup.string("Ingresa tu apellido").required("*Campo requerido"),

    // nickname: yup
    //   .string("Ingresa tu nickname")
    //   .required("*Campo requerido")
    //   .max(10, "El nickname debe tener un maximo de 10 caracteres"),

    // password: yup
    //   .string("Ingresa tu eontraseña")
    //   .min(8, "La contraseña debe tener al menos 8 caracteres")
    //   .required("*Campo requerido")
    //   .matches(
    //     /^(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,}).{8,}$/,
    //     "La contraseña debe tener al menos una mayúscula y un número"
    //   ),
  });

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#090717",
      }}
    >
      <Formik
        validateOnMount={true}
        validationSchema={validationSchema}
        initialValues={{
          name: "",
          sport: "",
          description: "",
          isPrivate: "",
          secretKey: "",
          color: "",
          img: "",
        }}
        onSubmit={(values) => handleRegister(values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isValid,
        }) => (
          <>
            <Text style={formR.formTittle}>Nueva Liga</Text>

            <View style={formR.inputContainer}>
              <TextInput
                style={formR.inputs}
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
                keyboardType="default"
                placeholder="Nombre de la liga"
                name="name"
              />

              {errors.name && touched.name && <Text>{errors.name}</Text>}

              <TextInput
                style={formR.inputs}
                onChangeText={handleChange("sport")}
                onBlur={handleBlur("sport")}
                value={values.sport}
                keyboardType="default"
                placeholder="Deporte"
                name="sport"
              />

              <TextInput
                style={formR.inputs}
                onChangeText={handleChange("description")}
                onBlur={handleBlur("description")}
                value={values.description}
                keyboardType="default"
                placeholder="Descripción"
                name="description"
              />

              <TextInput
                style={formR.inputs}
                placeholder="¿Es privada?"
                name="email"
                onChangeText={handleChange("isPrivate")}
                onBlur={handleBlur("isPrivate")}
                value={values.isPrivate}
                keyboardType="default"
              />

              <TextInput
                style={formR.inputs}
                onChangeText={handleChange("secretKey")}
                onBlur={handleBlur("secretKey")}
                value={values.secretKey}
                keyboardType="default"
                secureTextEntry={true}
                placeholder="Clave Secreta"
                name="secretKey"
              />

              {values.isPrivate && values.isPrivate.toString().toLowerCase() !== "no" ? (
                <Text>Ingrese una clave secreta</Text>
              ) : null}

              <TextInput
                style={formR.inputs}
                onChangeText={handleChange("color")}
                onBlur={handleBlur("color")}
                value={values.color}
                keyboardType="default"
                placeholder="Color en formato: #FFFFFF"
                name="color"
              />

              <TextInput
                style={formR.inputs}
                onChangeText={handleChange("img")}
                onBlur={handleBlur("img")}
                value={values.img}
                keyboardType="default"
                placeholder="Imagen (opcional)"
                name="img"
              />
            </View>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <TouchableOpacity
                style={{
                  alignSelf: "center",
                  borderWidth: 1,
                  borderColor: "#f27e18",
                  padding: 15,
                  marginTop: 20,
                  marginLeft: 20,
                  marginRight: 20,
                  borderRadius: 7,
                }}
                onPress={() => navigation.goBack()}
              >
                <Text style={formR.colorTxtBtn}>CANCELAR</Text>
              </TouchableOpacity>
              <TouchableOpacity style={formR.colorBtn} onPress={handleSubmit}>
                <Text style={formR.colorTxtBtn}>CREAR</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>

      {isLoading ? <ActivityIndicator size="large" color="#00ff00" /> : null}
      {/* <Button title="Cancelar" onPress={() => navigation.goBack()} /> */}
    </View>
  );
};

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animationEnabled: false }}
    >
      <Stack.Screen name="Leagues" component={LeagueHome} />
      <Stack.Screen name="Create a league" component={HomeScreen} />
    </Stack.Navigator>
  );
}

const League = () => {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
};

export default League;
