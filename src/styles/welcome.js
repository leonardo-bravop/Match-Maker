import { StyleSheet } from "react-native";

export const welcome = StyleSheet.create({
  container: {
    backgroundColor: "#0e0b29",
    flex: 1,
  },
  titleContainer: {
    justifyContent: "center",
    flex: 1.2,
  },
  loginContainer: {
    justifyContent: "flex-start",
    flex: 1.5,
  },
  info: {
    color: "white",
    fontSize: 48,
    textAlign: "center",
  },
  colorBtn: {
    borderWidth: 1,
    borderColor: "#f27e18",
    backgroundColor: "#e69249",
    padding: 15,
    marginTop: 20,
    marginRight: 20,
    borderRadius: 7,
  },
  colorTxtBtn: {
    color: "#FFFFFF",
    fontSize: 18,
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "900",
    fontFamily: "Roboto",
  },
  btnContainer: {
    backgroundColor: "#0e0b29",
    alignSelf: "center",
    marginBottom: "20%",
    width: "50%",
  },
});
