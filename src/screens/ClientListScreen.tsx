import * as React from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import ClientList from '../components/Client/ClientList';
import { NavigationScreenProps } from 'react-navigation';
import { Icon, Button, colors, Avatar } from "react-native-elements";
import { authLogoff } from '../store/user/actions';
import { connect } from 'react-redux';
import { User } from '../store/user/types';
import { AppState } from '../store';
import { deviceStorage } from '../utils/DeviceStorage';
import NavigationService from '../navigator/NavigatorService';

interface PropsFromState {
    user: User
}

interface PropsFromDispatch {
    authLogoff: typeof authLogoff
}

type AllProps = PropsFromState & PropsFromDispatch & NavigationScreenProps;

class ClientListScreenComponent extends React.Component<AllProps, any> {

    static navigationOptions = ({ navigation }: NavigationScreenProps) => ({
        headerTitle: "Clientes",
        headerStyle: {
            backgroundColor: "#FFF",
            color: "#57CDFF"
        },
        headerLeft: Platform.select({
            ios: null,
            android: (
                <Icon
                    iconStyle={styles.icon}
                    type='feather'
                    name="power"
                    onPress={() => {
                        deviceStorage.removeItem('id_token');
                        NavigationService.navigate('login', "")
                    }}
                />
            )
        })
    })

    constructor(props: AllProps) {
        super(props);
    }

    public render() {
        return (
            <View style={styles.view}>
                <View style={{
                    backgroundColor: 'white',
                    padding: 10,
                    margin: 20,
                    borderRadius: 7,
                    alignItems: 'center',
                    height: 100,
                    justifyContent: 'center'
                }}>
                    <Avatar
                        rounded
                        size="medium"
                        title={this.props.user.usuario.nome.charAt(0)}
                        activeOpacity={0.7}
                        overlayContainerStyle={{ backgroundColor: "#57CDFF" }}
                    />
                    <Text style={{
                        fontSize: 18
                    }}>Olá, {this.props.user.usuario != undefined ? this.props.user.usuario.nome : "teste"}</Text>
                </View>
                <ClientList />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        display: "flex",
        flex: 1,
        backgroundColor: colors.grey5,
    },
    button: {

    },
    icon: {
        paddingLeft: 10
    }
})

const mapStateToProps = ({ user }: AppState) => ({
    user: user.data
})

const mapDispatchToProps = {
    authLogoff
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ClientListScreenComponent)