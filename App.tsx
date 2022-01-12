
import React, { Component, useState } from "react";

import XMLParser from "react-xml-parser";

import { StyleSheet, View, Button, Image, Text, TextInput, Alert } from "react-native";

export default class App extends Component {
    constructor(props: any) {
        super(props);
        this.state = {
            imgUrl: " ",
	    imgId: "4a51bfed-7e36-4679-84db-ec7c273eda6e",
>>>>>>> Stashed changes
            text: "Nothing here yet",
            name: "",
        };
    }

    selectGarment = (url) => {
	return fetch(url)
	    .then((res) => res.text())
	    .then((xmlText) => {
		var xml = new XMLParser().parseFromString(xmlText);
		const garments = xml.getElementsByTagName("Key");
		return garments[parseInt(Math.random() * garments.length)].value;
	    }
    )};

    fetchGarments = (url) => {
	fetch('http://192.168.191.58:3002/getimages', {
	    method: 'GET',
	    headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json'
	    }
	}).then((result) => result.text())
	  .then((url) => {
	      return this.selectGarment(url)
	  }).then((key) => {
	      const url = `http://192.168.191.58:3002/getimage/${key}`;
	      fetch(url, {
		  method: "GET",
		  headers: {
		    Accept: 'application/json',
		    'Content-Type': 'application/json'
		}
	    }).then((response) => response.text())
	      .then((data) => {
		  this.setState({imgUrl: data});
	      })
	      .catch(err => console.error(err));
	  });
    }

    handleLike = () => {
        fetch("http://192.168.191.58:3002/event", {
	    method: "POST",
	    headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
	    },
	    body: JSON.stringify({
                person_name: this.state.name,
                garment_id: this.state.imgId,
                action: "like",
	    })
        }).then(() => {
	    this.fetchGarments()
        });
    }

    handleDislike = () => {
        fetch("http://192.168.191.58:3002/event", {
	    method: "POST",
	    headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
	    },
	    body: JSON.stringify({
                person_name: this.state.name,
                garment_id: this.state.imgId,
                action: "dislike",
	    })
        }).then(() => {
	    fetch("http://178.62.226.79:3002/get")
                .then((res) => res.json())
                .then((data) => {
		    console.log(data)
                });
        });
    }

    handlePress = () => {
	fetch('http://192.168.191.58:3002/getimages', {
	    method: 'GET',
	    headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json'
	    }
	}).then((result) => result.text())
	  .then((url) => {
	      return this.selectGarment(url)
	  }).then((key) => {
	      const url = `http://192.168.191.58:3002/getimage/${key}`;
	      fetch(url, {
		  method: "GET",
		  headers: {
		    Accept: 'application/json',
		    'Content-Type': 'application/json'
		}
	    }).then((response) => response.text())
	      .then((data) => {
		  this.setState({imgUrl: data});
	      })
	      .catch(err => console.error(err));
	  });
    };

    render() {
	return (
	    <View style={styles.container} >
	      <Button title="Press" onPress={this.handlePress} />
	      <TextInput
		  onChangeText={(text) => {
		      this.setState({ name: text });
		  }}
		  value={this.state.name}
		  style={styles.input}
		  placeholder="Ditt namn!"
	      ></TextInput>
	      <Text>{this.state.text}</Text>
	      <Image
		  source={{uri: this.state.imgUrl}}
		  style={{ width: 200, height: 200 }}
	      />
	      <View style={styles.buttonContainer}>
		<Button
		onPress={this.handleLike}
		title="Like"
		color="#841584"
		/>
		<Button
		onPress={this.handleDislike}
		title="Dislike"
		color="#841584"
		/>
	      </View>
	    </View >
	);
>>>>>>> Stashed changes
    }
}

const styles = StyleSheet.create({
    container: {
	flex: 1,
	backgroundColor: "#fff",
	alignItems: "center",
	justifyContent: "center",
    },
    buttonContainer: {
	flexDirection: "row",
    },
    img: {
	width: 350,
	height: 500,
    },
    input: {
	height: 40,
	width: 100,
	margin: 12,
	borderWidth: 1,
	padding: 10,
    },
});
