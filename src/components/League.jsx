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
  Image,
  Keyboard,
  Alert,
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
import { setMembers } from "../state/memberList";
import { setUserLeagues } from "../state/userLeague";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Formik } from "formik";
import * as yup from "yup";
import { formR } from "../styles/form";

import { CheckBox } from "react-native-elements";
import { setUserMe } from "../state/user";

const LeagueHome = ({ navigation }) => {
  const { manifest } = Constants;
  const uri = `http://${manifest.debuggerHost.split(":").shift()}:3000`;

  let [memberList, setMemberList] = useState([]);
  let [actualleague, setActualLeague] = useState({});
  let [user, setUser] = useState({});
  let [showCard, setShowCard] = useState(false);
  let [showSecretkeyCard, setShowSecretkeyCard] = useState(false);
  let [secretKey, setSecretKey] = useState("");
  let [secretError, setSecretError] = useState("");

  const dispatch = useDispatch();

  const userData = useSelector((state) => state.user);

  const leagueId = useSelector((state) => state.leagueId);

  const leagueList = useSelector((state) => state.userLeagues);

  useEffect(() => {

    const loadData = async () => {

      console.log("lueage ides ", leagueId);
      console.log("userdata es ", userData);

      console.log("Paso 1: ");
      const resData = await dispatch(setUserLeagues({ userId: userData._id }));
      console.log("Paso 2: ");
      if (leagueId === "") dispatch(setLeagueId(resData.payload[0]._id));
      console.log("Paso 3: ");

      const { payload } = await dispatch(
        setMembers(leagueId === "" ? leagueList[0]._id : leagueId)
      );
      console.log("Paso 4: ");

      setMemberList(payload);
      console.log("Paso 5: ");

      const { data } = await axios.get(
        `${uri}/api/league/showLeague/${leagueId}`
      );
      console.log("Paso 6: ");

      setActualLeague(data);
    };

    loadData();
  }, [leagueId, userData]);

  const selectHandler = (id) => {
    console.log("select handler paso 1");
    dispatch(setLeagueId(id));
    console.log("select handler paso 2");
    setShowCard(!showCard);
  };

  const joinHandler = () => {
    if (actualleague.isPrivate) {
      setShowSecretkeyCard(true);
    }
    const loadData = async () => {
      try {
        console.log(`en loadData`);
        console.log(`atnes del dispatch de user, userdata es`, userData);
        const userString = await AsyncStorage.getItem("userInfo");
        await dispatch(setUserMe(userString));
        console.log(`luego del dispatch de user, userdata es`, userData);
        const resData = await dispatch(
          setUserLeagues({ userId: userData._id })
        );

        if (leagueId === "")
          await dispatch(setLeagueId(resData.payload[0]._id));

        const { payload } = await dispatch(
          setMembers(leagueId === "" ? leagueList[0]._id : leagueId)
        );
        // console.log(`payload es`, payload);
        setMemberList(payload);

        const { data } = await axios.get(
          `${uri}/api/league/showLeague/${leagueId}`
        );

        setActualLeague(data);
      } catch (error) {
        console.error(`Error: ${error.message}`);
        setSecretError("Hubo un problema, por favor intenta de nuevo");
      }
    };

    const addUserFunc = async () => {
      try {
        console.log("adduserfunc paso 1");
        const result = await axios.put(
          `${uri}/api/league/${leagueId}/addUser/${userData._id}`,
          {
            enteredKey: secretKey,
          }
        );
        console.log("adduserfunc paso 2");

        console.log(`je`);
        if (result) console.log(`result es`, result.request.status);
        console.log("adduserfunc paso 3");

        await loadData();
        console.log("adduserfunc paso 4");
        setSecretError("");
        console.log(`user data es`, userData);
        console.log(`league id es`, leagueId);

        if (result && result.request.status === 200) {
          Alert.alert(
            "Bienvenido!",
            `Te uniste a la liga ${actualleague.name}`
          );
          setSecretKey = "";
          setShowSecretkeyCard(false);
        } else setSecretError("Clave secreta inválida");
      } catch (error) {
        setSecretError("Clave secreta inválida");
        console.error(`Error: ${error.message}`);
      }
    };

    addUserFunc();
  };

  return (
    <SafeAreaView style={leagueStyles.back}>
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
                            onPress={() => selectHandler(item._id)}
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

      <Modal
        animationType="fade"
        transparent={true}
        visible={showSecretkeyCard}
      >
        <Pressable
          onPress={() => {
            setShowSecretkeyCard(false);
            setSecretError("");
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
                <View
                  style={{ flex: 1, paddingVertical: 15, alignItems: "center" }}
                >
                  <Text
                    style={{ color: "white", paddingBottom: 15, fontSize: 18 }}
                  >
                    Ingrese clave secreta de 5 caracteres:
                  </Text>
                  <TextInput
                    style={{
                      backgroundColor: "white",
                      width: 100,
                      fontSize: 18,
                      textAlign: "center",
                    }}
                    maxLength={5}
                    onChangeText={setSecretKey}
                    onSubmitEditing={() => {
                      Keyboard.dismiss;
                      if (secretKey) {
                        joinHandler(leagueId);
                      } else {
                        alert("Please provide a secretkey");
                      }
                    }}
                  />
                  {secretError.length > 1 ? (
                    <Text style={{ color: "red", marginTop: 10 }}>
                      {secretError}
                    </Text>
                  ) : null}

                  <TouchableOpacity
                    style={[
                      leagueStyles.join,
                      { backgroundColor: "#16a085", marginTop: 20 },
                    ]}
                    onPress={() => {
                      if (secretKey) {
                        joinHandler(leagueId);
                      } else {
                        setSecretError("Please provide a secretkey");
                      }
                    }}
                  >
                    <Text style={leagueStyles.joinTxt}>Aceptar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </Pressable>
      </Modal>

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
            marginVertical: 20,
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
          <Text style={{ fontSize: 18, color: "white" }}>CREAR LIGA</Text>
        </TouchableOpacity>

        {userData.leagues.includes(leagueId) ? (
          userData.rank > 1 ? (
            <View style={leagueStyles.foot}>
              <View style={leagueStyles.user}>
                <View style={leagueStyles.rank}>
                  <Text style={{ color: "#FFFFFF" }}>{user.rank}</Text>
                </View>
                <View
                  style={[leagueStyles.img, { backgroundColor: user.color }]}
                ></View>
                <View style={leagueStyles.nick}>
                  <Text style={{ color: "#FFFFFF" }}>{user.nickname}</Text>
                </View>
                <View style={leagueStyles.elo}>
                  <Text style={{ color: "#FFFFFF" }}>{user.elo}</Text>
                </View>
              </View>
            </View>
          ) : (
            <></>
          )
        ) : (
          <View style={[leagueStyles.foot, { height: 100 }]}>
            <TouchableOpacity
              style={[leagueStyles.join, { backgroundColor: "#16a085" }]}
              onPress={() => {
                if (actualleague.isPrivate) {
                  setShowSecretkeyCard(true);
                } else {
                  joinHandler(leagueId);
                }
              }}
            >
              <Text style={leagueStyles.joinTxt}>Unirse</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const HomeScreen = ({ navigation }) => {
  const { manifest } = Constants;
  const uri = `http://${manifest.debuggerHost.split(":").shift()}:3000`;

  const [isLoading, setIsLoading] = useState(false);
  const userData = useSelector((state) => state.user);

  let [select, setSelect] = useState(false);

  const handleRegister = (values) => {
    values.admin = userData._id;
    values.isPrivate = select;
    console.log('====================================');
    console.log(`values es`, values);
    console.log('====================================');
    if (values.secretKey === "") delete values.secretKey;
    setIsLoading(true);
    // axios
    //   .post(`${uri}/api/league/new`, values)
    //   .then((res) => {
    //     setIsLoading(false);
    //     res.status == 201 ? navigation.navigate("Leagues") : null;
    //   })
    //   .catch((error) => {
    //     setIsLoading(false);
    //     console.log("error es", error);
    //   });
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

  const checker = () => {
    setSelect(!select);
  };

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
          secretKey: "",
          color: "",
          img: "",
        }}
        onSubmit={(values) => handleRegister({ ...values, select })}
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
                style={[formR.inputs, { marginTop: 40 }]}
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

              <View style={formR.customInput}>
                <Text style={formR.textCustomInput}>¿Es privada?</Text>
                <View style={[formR.customInput, { width: "auto", marginLeft: 5 }]}>
                  <CheckBox
                    checked={select}
                    onPress={checker}
                    iconType="ionicon"
                    uncheckedIcon="radio-button-off-outline"
                    checkedIcon="radio-button-on-outline"
                    uncheckedColor="white"
                    checkedColor="#44ebdf"
                  />
                  <Text style={[formR.textCustomInput, {left: -12}]}>Si</Text>
                </View>
                <View style={[formR.customInput, { width: "auto", left: -15 }]}>
                  <CheckBox
                    checked={!select}
                    onPress={checker}
                    iconType="ionicon"
                    uncheckedIcon="radio-button-off-outline"
                    checkedIcon="radio-button-on-outline"
                    uncheckedColor="white"
                    checkedColor="#44ebdf"
                  />
                  <Text style={[formR.textCustomInput, {left: -12}]}>No</Text>
                </View>
              </View>

              {select? <TextInput
                style={formR.inputs}
                onChangeText={handleChange("secretKey")}
                onBlur={handleBlur("secretKey")}
                value={values.secretKey}
                keyboardType="default"
                secureTextEntry={true}
                placeholder="Clave Secreta (5)"
                name="secretKey"
                maxLength={5}
              /> : null}

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
              {<Image
                style={{
                  marginTop: 20,
                  height: "15%",
                  backgroundColor: "transparent",
                  resizeMode: "center",
                }}
                source={{ uri: values.img || "https://www.tibs.org.tw/images/default.jpg" }}
              />}
            </View>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <TouchableOpacity
                style={formR.leagueFormBtn}
                onPress={() => navigation.goBack()}
              >
                <Text style={formR.colorTxtBtn}>CANCELAR</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[formR.leagueFormBtn, { backgroundColor: "#e69249" }]}
                onPress={handleSubmit}
              >
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
