import { View, Text, Alert, StatusBar, Watched, TextInput, TouchableOpacity, ScrollView, Image } from "react-native";
import React, { Component } from "react";
import Loader from "./utilities/Loader";
import { callRemoteMethod } from "./utilities/WebServiceHandler";
import Constants from "./utilities/Constants";
import { renderIf } from "./utilities/CommonMethods";
import Styles from "./Styles";
import { customAlert } from "./utilities/CommonMethods";
import CheckBox from 'react-native-check-box'
/**
 * @author Wah M
 * @description This is the first screen that loads when the app starts. This screen shows the list of movies
 * according to the search query.
 */
class MainScreen extends Component {
  static navigationOptions = {
    headerTitle: Constants.Strings.MAIN_TITLE
  };
  state = {
    movieList: [],
    watchMovieList: [], // The list of movies to be displayed after search.
    isLoading: false, // Whether loader is to be shown.
    searchText: "", // Text that is to be searched.
    searchMyMoviesText: "",
    Watched: true,
    checked: false,
    unWatched: false,
    noData: false // If there are no results to be displayed.
  };

  /**
   * @description Function to search the entered query.
   * @param searchText The word that is to be searched.
   */

  searchButtonPressed = () => {
    if (this.state.searchText.length) {
      var endpoint =
        Constants.URL.BASE_URL + Constants.URL.SEARCH_QUERY + this.state.searchText + "&" + Constants.URL.API_KEY;
      callRemoteMethod(this, endpoint, {}, "searchCallback", "GET", true);
    } else {
      customAlert(Constants.Strings.MSG);
    }
  };

  /**
   * @description Callback for searchButtonPressed()
   * @returns movieList
   */

  searchCallback = response => {
    if (response.results.length) {
      this.setState({ noData: false, movieList: response.results });

    } else {
      this.setState({ movieList: [], noData: true });
    }
  };
  setWatchUnWatched = (value) => {
    if (value === 0) {

      this.setState({
        Watched: true,
        unWatched: false,
      })
    } else {
      this.setState({
        Watched: false,
        unWatched: true,
      })



    }



  }
  watchMovieList = (val) => {

    let array = [ ...this.state.watchMovieList ]

    let Watched = array?.concat(val)
    this.setState({
      watchMovieList: Watched,
      isChecked: !this.state.isChecked
    })

  }



  // setValue = (val) => {

  //   Alert.alert(val)

  // }
  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.isLoading ? <Loader show={true} loading={this.state.isLoading} /> : null}
        <StatusBar backgroundColor={Constants.Colors.Cyan} barStyle="light-content" />
        <View style={{ backgroundColor: Constants.Colors.Grey }}>
          <View style={Styles.cardView}>
            <View style={{ margin: 10, flexDirection: 'row' }}>
              <View style={{ margin: 10, flexDirection: 'row', borderRadius: 1, borderWidth: 1, borderRadius: 4 }}>

                <Image source={{ uri: 'https://cdn2.iconfinder.com/data/icons/font-awesome/1792/search-512.png' }}
                  style={{ padding: 10, width: 20, height: 20, alignSelf: 'center' }} />
                <TextInput
                  placeholder={Constants.Strings.PLACEHOLDER}
                  style={{ borderRadius: 1, minWidth: 100 }}
                  onChangeText={text => this.setState({ searchText: text })}
                  underlineColorAndroid={Constants.Colors.Transparent}
                />
              </View>
              <TouchableOpacity onPress={() => this.searchButtonPressed()} style={Styles.buttonContainer}>
                <Text style={Styles.buttonText}>{'+'}</Text>
              </TouchableOpacity>

            </View>
            <View style={{ margin: 10, flexDirection: 'row', borderRadius: 1, borderWidth: 1, borderRadius: 4 }}>


              <TextInput
                placeholder={'SearchMyMovies'}
                style={{ borderRadius: 1, height: 40, padding: 10 }}
                onChangeText={text => this.setState({ searchMyMoviesText: text })}
                underlineColorAndroid={Constants.Colors.Transparent}
              />
            </View>
            <View style={{ alignItems: "center", flexDirection: 'row' }}>

              <View style={{ alignItems: "center", padding: 10 }}>

                <TouchableOpacity onPress={() => this.setWatchUnWatched(0)}>

                  <Image source={{ uri: 'https://freeiconshop.com/wp-content/uploads/edd/eye-outline.png' }}
                    style={this.state.Watched ? Styles.imageSelected : Styles.imageUnselected} />

                  <Text style={this.state.Watched ? Styles.selectedText : Styles.unselectedText}>Watched</Text>
                </TouchableOpacity>
              </View>
              <View style={{ alignItems: "center", padding: 10 }}>
                <TouchableOpacity onPress={() => this.setWatchUnWatched(1)}>

                  <Image source={{ uri: 'https://freeiconshop.com/wp-content/uploads/edd/eye-outline.png' }}
                    style={this.state.unWatched ? Styles.imageSelected : Styles.imageUnselected} />
                  <Text style={this.state.unWatched ? Styles.selectedText : Styles.unselectedText} >Un-Watched</Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>
        </View>
        {renderIf(this.state.noData, <Text style={{ textAlign: "center" }}>No data found.</Text>)}
        {/* {renderIf( */}
        {/* this.state.movieList.length, */}
        {this.state.Watched === true ? <ScrollView style={Styles.movieList} showsVerticalScrollIndicator={false}>
          <View>
            {this.state.movieList.map(function (obj, i) {
              return (
                <View
                  onPress={() => this.props.navigation.navigate("SecondScreen", { id: obj.id })}
                  key={i}
                  style={{ margin: 10, marginBottom: 5 }}>
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      style={Styles.image}
                      source={{
                        uri:
                          obj.poster_path != null
                            ? Constants.URL.IMAGE_URL + obj.poster_path
                            : Constants.URL.PLACEHOLDER_IMAGE
                      }}
                    />
                    <View style={{ flexDirection: "column" }}>
                      <Text numberOfLines={3} style={{ fontSize: 17 }}>
                        {obj.original_title}
                      </Text>
                      <View style={Styles.rowView}>
                        <Text>{Constants.Strings.RELEASE_DATE}</Text>
                        <Text>{obj.release_date}</Text>
                      </View>
                      <View style={Styles.rowView}>
                        <Text>{Constants.Strings.LANGUAGE}</Text>
                        <Text>{obj.original_language}</Text>
                      </View>
                      <View style={Styles.rowView}>
                        <Text>{Constants.Strings.POPULARITY}</Text>
                        <Text>{obj.popularity} %</Text>
                      </View>
                      <CheckBox
                        style={{ flex: 1, padding: 10 }}
                        onClick={() => this.watchMovieList(obj)
                        }
                        isChecked={this.state.isChecked}
                        leftText={"CheckBox"}
                      />
                    </View>
                  </View>
                  <View style={Styles.lineView} />
                </View>
              );
            }, this)}
          </View>
        </ScrollView> :

          <ScrollView style={Styles.movieList} showsVerticalScrollIndicator={false}>
            <View>
              {this.state.watchMovieList.map(function (obj, i) {
                return (
                  <View
                    onPress={() => this.props.navigation.navigate("SecondScreen", { id: obj.id })}
                    key={i}
                    style={{ margin: 10, marginBottom: 5 }}>
                    <View style={{ flexDirection: "row" }}>
                      <Image
                        style={Styles.image}
                        source={{
                          uri:
                            obj.poster_path != null
                              ? Constants.URL.IMAGE_URL + obj.poster_path
                              : Constants.URL.PLACEHOLDER_IMAGE
                        }}
                      />
                      <View style={{ flexDirection: "column" }}>
                        <Text numberOfLines={3} style={{ fontSize: 17 }}>
                          {obj.original_title}
                        </Text>
                        <View style={Styles.rowView}>
                          <Text>{Constants.Strings.RELEASE_DATE}</Text>
                          <Text>{obj.release_date}</Text>
                        </View>
                        <View style={Styles.rowView}>
                          <Text>{Constants.Strings.LANGUAGE}</Text>
                          <Text>{obj.original_language}</Text>
                        </View>
                        <View style={Styles.rowView}>
                          <Text>{Constants.Strings.POPULARITY}</Text>
                          <Text>{obj.popularity} %</Text>
                        </View>
                        <CheckBox
                          style={{ flex: 1, padding: 10 }}
                          onClick={() => this.watchMovieList(obj)
                          }
                          isChecked={this.state.isChecked}
                          leftText={"CheckBox"}
                        />
                      </View>
                    </View>
                    <View style={Styles.lineView} />
                  </View>
                );
              }, this)}
            </View>
          </ScrollView>

        }

      </View>
    );
  }
}

export default MainScreen;
