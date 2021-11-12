import React, { Component } from "react";
import { StyleSheet, View, Image, Button, Text, TextInput } from "react-native";

export default class App extends Component {
    constructor(props: any) {
        super(props);
        this.state = {
            imgUri: "https://lp2.hm.com/hmgoepprod?set=source[/9d/09/9d098da4964f80d579881d26389b6dea6d63d9ca.jpg],origin[dam],category[],type[DESCRIPTIVESTILLLIFE],res[m],hmver[2]&call=url[file:/product/style]",
            imgId: "4a51bfed-7e36-4679-84db-ec7c273eda6e",
            text: "Nothing here yet",
            name: "",
        };
    }

    render() {
        return (
            <View style={styles.container}>
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
                    style={styles.img}
                    source={{
                        uri: this.state.imgUri,
                    }}
                />
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={() => {
                            fetch("http://178.62.226.79:3002/event", {
                                method: "POST",
                                headers: {
                                    Accept: "application/json",
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    person: this.state.name,
                                    c_id: this.state.imgId,
                                    action: "like",
                                }),
                            }).then(() => {
                                fetch("http://178.62.226.79:3002/get")
                                    .then((res) => res.json())
                                    .then((data) => {
                                        this.setState({
                                            imgUri: "https:" + data.img,
                                            imgId: data.id,
                                            text: data.name,
                                        });
                                    });
                            });
                        }}
                        title="Like"
                        color="#841584"
                    />
                    <Button
                        onPress={() => {
                            fetch("http://178.62.226.79:3002/event", {
                                method: "POST",
                                headers: {
                                    Accept: "application/json",
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    person: this.state.name,
                                    c_id: this.state.imgId,
                                    action: "dislike",
                                }),
                            }).then(() => {
                                fetch("http://178.62.226.79:3002/get")
                                    .then((res) => res.json())
                                    .then((data) => {
                                        this.setState({
                                            imgUri: "https:" + data.img,
                                            imgId: data.id,
                                            text: data.name,
                                        });
                                    });
                            });
                        }}
                        title="Dislike"
                        color="#841584"
                    />
                </View>
            </View>
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
