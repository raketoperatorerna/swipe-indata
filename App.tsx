
import React, { Component, useState } from "react";

import { StyleSheet, View, Button, Image, Text, TextInput, Alert } from "react-native";

export default class App extends Component {
    constructor(props: any) {
        super(props);
        this.state = {
            url: " ",
            text: "Nothing here yet",
	    gid: " ",
            name: "Ludvig",
	    garments: []
        };
    }
    
    fetchRandomGarment = (garment) => {
	let gid = garment["garment_id"]
	let gimages = garment["garment_images"]
	let iid = gimages[gimages.length - 2]["image_id"]
	let url = `http://192.168.0.21:3002/getimage?gid=${gid}&iid=${iid}`;
	
	fetch(url, {
	    method: "GET",
	    headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json'
	    }
	}).then((response) => response.text())
	  .then((url) => {
	      this.setState({
		  url: url,
		  gid: gid,
		  text: garment["garment_label"]
	      });
	  })
	  .catch(err => console.error(err));
    }
    
    componentDidMount() {
    	const url = fetch('http://192.168.0.21:3002/getgarments', {
	    method: 'GET',
	    headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json'
	    }
	}).then((result) => result.json())
	  .then((garments) => this.setState({garments: garments}))
	  .then(() => {
	      
	      const garments = this.state.garments
	      const garment = garments[parseInt(Math.random() * garments.length)]

	      this.fetchRandomGarment(garment)
	  })
    }

    fetchGarments = () => {
	console.log(this.state.images)
	fetch('http://192.168.0.21:3002/getimages', {
	    method: 'GET',
	    headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json'
	    }
	}).then((result) => result.text())
	       .then((url) => {
		   return this.selectGarment(url)
	       }).then((key) => {
		   const url = `http://192.168.0.21:3002/getimage?url=${key}`;
		   fetch(url, {
		       method: "GET",
		       headers: {
			   Accept: 'application/json',
			   'Content-Type': 'application/json'
		       }
		   }).then((response) => response.text())
		     .then((url) => {
			 console.log(url)
			 this.setState({imgUrl: url});
		     })
		     .catch(err => console.error(err));
	       });
    }

    getGarment = () => {
	fetch("http://192.168.0.21:3002/getrandomgarment", {
	    method: 'GET',
	    headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json'
	    }
	}).then((result) => result.json())
	  .then((garment) => { this.fetchRandomGarment(garment) });
    }

    handleLike = () => {
        fetch("http://192.168.0.21:3002/event", {
	    method: "POST",
	    headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
	    },
	    body: JSON.stringify({
                person_name: this.state.name,
                garment_id: this.state.gid,
                action: "like",
	    })
        }).then(() => { this.getGarment() });
    }

    handleDislike = () => {
        fetch("http://192.168.0.21:3002/event", {
	    method: "POST",
	    headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
	    },
	    body: JSON.stringify({
                person_name: this.state.name,
                garment_id: this.state.gid,
                action: "dislike",
	    })
        }).then(() => { this.getGarment() });
    }

    render() {
	return (
	    <View style={styles.container} >
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
		  source={{uri: this.state.url}}
		  style={{ width: 300, height: 400 }}
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
