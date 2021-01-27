import { StyleSheet } from "react-native";

export default (Styles = StyleSheet.create({
  cardView: {
    backgroundColor: "white",
    margin: 10,
    elevation: 5
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft:30,
    padding: 5,
    backgroundColor: "#02ADAD",
    width: 80,
    borderRadius: 10
  },
  buttonText: { color: "white", margin: 5, alignSelf: "center" },
  lineView: { height: 2, marginTop: 10, backgroundColor: "#EDEDED" },
  movieList: { marginLeft: 10, marginRight: 10, backgroundColor: "white", elevation: 10 },
  image: { width: 120, height: 180, marginLeft: 5, marginRight: 20 },
  rowView: { flexDirection: "row", marginTop: 10 },
  imageUnselected :{


    padding: 10, width: 20, height: 20, alignSelf: 'center',
  },
  imageSelected :{


    padding: 10, width: 20, height: 20, alignSelf: 'center',
    tintColor:'purple'
  },
  selectedText:{

    color:'purple'
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    borderColor:'red',
    width:50,
    height:50,
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
}));
