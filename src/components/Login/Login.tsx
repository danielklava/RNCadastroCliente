import React from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ViewStyle, TextInputBase, TextStyle } from 'react-native'
import { Input, Button, Image } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { TouchableHighlight } from 'react-native';
import { AppState } from '../../store';
import { authRequest } from '../../store/user/actions';
import { connect } from 'react-redux';
import { tsNonNullExpression } from '@babel/types';

export interface PropsFromDispatch {
    authRequest: typeof authRequest
}


const initialState = {
    username: "",
    password: "",
    loggedIn: false
}

type IState = Readonly<typeof initialState>

type AllProps = PropsFromDispatch;

class LoginFormComponent extends React.Component<AllProps, IState> {
    constructor(props: AllProps) {
        super(props);

        this.state = {
            username: 'dklava',
            password: '123123',
            loggedIn: false
        }

        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsernameChange = (value: any) => {
        this.setState({
            username: value
        })
    }

    handlePasswordChange = (value: any) => {
        this.setState({
            password: value
        })
    }

    handleSubmit = () => {
        console.log(this.state);

        this.props.authRequest(this.state.username, this.state.password);
    }

    public render() {
        return (
            <View style={styles.view}>
                <Image source={require('../../../assets/images/trace-user.png')}
                    style={{
                        width: "100%", height: 200,
                        marginBottom: 20
                    }}
                    resizeMode="contain" />
                <Text style={{
                    fontSize: 30,
                    textAlign: "center",
                    padding: 10,
                    color: "#57CDFF",
                    marginBottom: 20
                }}>Cadastro de Clientes</Text>
                <Input
                    inputContainerStyle={styles.inputContainer}
                    inputStyle={styles.input}
                    placeholder='Usuário'
                    key="inputUser"
                    value={this.state.username}
                    onChangeText={this.handleUsernameChange}
                    leftIcon={
                        <Icon
                            name='user'
                            size={24}
                            color='#57CDFF'
                        />
                    }
                />
                <Input
                    inputContainerStyle={styles.inputContainer}
                    inputStyle={styles.input}
                    placeholder='Senha'
                    value={this.state.password}
                    onChangeText={this.handlePasswordChange}
                    leftIcon={
                        <Icon
                            name='lock'
                            size={24}
                            color='#57CDFF'
                        />
                    }
                />
                <TouchableHighlight onPress={this.handleSubmit}>
                    <View>
                        <Button
                            buttonStyle={styles.button}
                            containerStyle={{
                                marginLeft: 10, marginRight: 10
                            }}
                            title="ENTRAR"
                            onPress={this.handleSubmit}
                            raised={true}
                        />
                    </View>
                </TouchableHighlight>
                <Text style={{
                    paddingTop: 120,
                    textAlign: "center",
                    color: "#aaa"
                }}>PARTNERS DIGITAL vDemo - 2019</Text>
            </View>
        );
    }
}

export interface Styles {
    view: ViewStyle,
    button: ViewStyle,
    inputContainer: ViewStyle,
    input: TextStyle
}

const styles = StyleSheet.create<Styles>({
    view: {
    },
    button: {
        padding: 15,
        borderRadius: 100
    },
    inputContainer: {
        borderWidth: 1,
        borderRadius: 50,
        borderColor: "#57CDFF",
        marginBottom: 10,
        width: 300
    },
    input: {
        color: "white",
        paddingLeft: 20
    }
})


const mapStateToProps = (state: AppState) => ({
    loggedIn: state.user.loggedIn

})

const mapDispatchToProps = {
    authRequest
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginFormComponent)