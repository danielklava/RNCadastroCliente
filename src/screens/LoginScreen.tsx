import * as React from 'react';
import { View, StyleSheet, Text, Platform, Image } from 'react-native';
import LoginFormComponent from '../components/Login/Login';
import { NavigationScreenProps } from "react-navigation";
import NavigationService from '../navigator/NavigatorService';

export interface LoginScreenProps {
}

type AllProps = LoginScreenProps & NavigationScreenProps;

const styles = StyleSheet.create({
    view: {
        display: "flex",
        justifyContent: 'center',
        backgroundColor: "#5C5F66",
        height: "100%",
        alignItems: 'center'
    },
    button: {

    },
    icon: {
        paddingLeft: 10
    }
})

export default class LoginScreen extends React.Component<AllProps, any> {
    constructor(props: AllProps) {
        super(props);
    }

    public render() {

        return (
            <View style={styles.view}>
                <LoginFormComponent />
            </View>
        );
    }
}
