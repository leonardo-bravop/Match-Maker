import React from "react";
import {
  Button,
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { styles } from "../styles/Styles";

import { useEffect, useState } from "react";
import axios from "axios";

import Constants from "expo-constants";

const { manifest } = Constants;

const uri = `http://${manifest.debuggerHost.split(":").shift()}:3000`;

function Register({ navigation }) {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });

  onChangeText = (key, val) => {
    setForm({ ...form, [key]: val });
  };

  const handleSubmit = (e) => {
    axios.post(`${uri}/api/user/register`, e).then((res) => {
      res.status == 201 ? navigation.navigate("Login") : null;
    });
  };

  const validationSchema = yup.object().shape({
    name: yup.string("Ingresa tu name").required("*Campo requerido"),

    surname: yup.string("Ingresa tu surname").required("*Campo requerido"),

    email: yup
      .string("Ingresa tu email")
      .required("*Campo requerido")
      .email("Ingresa un Email válido"),

    password: yup
      .string("Ingresa tu eontraseña")
      .min(3, "La contraseña debe tener al menos 3 caracteres")
      .required("*Campo requerido"),
  });

  return (
//     <View>
//       <Text>Registro</Text>

//       <Text>Llene el siguente formulario para registrarse</Text>

//       <SafeAreaView>
//         <View>
//           <TextInput
//             onChangeText={(val) => onChangeText("name", val)}
//             type="text"
//             placeholder="name"
//             name="name"
//           />
//         </View>

//         <View>
//           <TextInput
//             onChangeText={(val) => onChangeText("surname", val)}
//             type="text"
//             placeholder="surname"
//             name="surname"
//           />
//         </View>

//         <View>
//           <TextInput
//             onChangeText={(val) => onChangeText("email", val)}
//             type="email"
//             placeholder="Email"
//             name="email"
//           />
//         </View>

//         <View>
//           <TextInput
//             onChangeText={(val) => onChangeText("password", val)}
//             type="password"
//             placeholder="Password"
//             name="password"
//           />
//         </View>

//         <View>
//           <Button type="submit" title="Registrarse" onPress={handleSubmit} />
//         </View>
//       </SafeAreaView>
//     </View>
//   );
// }

// export default Register;

 <View>

    <Text style={styles.info} >Llene el siguente formulario para registrarse</Text>

    <SafeAreaView>
      <View>
        <Formik
          validateOnMount={true}
          validationSchema={validationSchema}
          initialValues={{ name: '', surname: '',email:'', password: '' }}
          onSubmit={values => handleSubmit(values)}
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
            <TextInput
              style={styles.inputs} 
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              keyboardType="default"
              placeholder="name"
              name="name"
            />
     
   
            {(errors.name && touched.name) &&
              <Text>{errors.name}</Text> }
            
            <TextInput
              style={styles.inputs} 
              onChangeText={handleChange('surname')}
              onBlur={handleBlur('surname')}
              value={values.surname}
              keyboardType="default"
              placeholder="surname"
              name="surname"
            />
        
            {(errors.surname && touched.surname) &&
              <Text>{errors.surname}</Text> }
            
            <TextInput style={styles.inputs} 
              placeholder="Email"
              name="email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address" 
            /> 

            {(errors.email && touched.email) &&
              <Text>{errors.email}</Text> }

            <TextInput
              style={styles.inputs} 
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              keyboardType="default"
              secureTextEntry={true}
              placeholder="Password"
              name="password"
            />
        
            {(errors.password && touched.password) &&
              <Text>{errors.password}</Text> }

            <TouchableOpacity
              style={styles.colorBtn}
              onPress={handleSubmit}
            >
              <Text style={styles.colorTxtBtn}>Registrarse</Text>
            </TouchableOpacity>

          </>)}
        </Formik>
      </View>
    </SafeAreaView>
  </View>
  );
}

export default Register