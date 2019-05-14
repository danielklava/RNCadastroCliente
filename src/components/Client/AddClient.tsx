import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../store';

import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Icon, Button, Overlay, Input, colors, Image } from 'react-native-elements';
import { insertRequest } from '../../store/clients/actions';

interface PropsFromState {
}


interface PropsFromDispatch {
    insertRequest: typeof insertRequest
}

const initialState = {
    openDialog: false,
    nome: '',
    nomeFantasia: '',
    logradouro: '',
    bairro: '',
    uf: '',
    limiteCredito: ''
}

type IState = Readonly<typeof initialState>

type AllProps = PropsFromState & PropsFromDispatch;

class ClientList extends React.Component<AllProps, IState> {

    constructor(props: AllProps) {
        super(props);

        this.state = initialState;

        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleCompanyNameChange = this.handleCompanyNameChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleNeighbourhoodChange = this.handleNeighbourhoodChange.bind(this);
        this.handleUFChange = this.handleUFChange.bind(this);

        this.submitNewClient = this.submitNewClient.bind(this);
        this.closeOverlay = this.closeOverlay.bind(this);
    }

    submitNewClient = () => {
        this.setState({
            openDialog: false,
            nome: '',
            nomeFantasia: '',
            logradouro: '',
            bairro: '',
            uf: '',
            limiteCredito: ''
        })

        this.props.insertRequest(
            this.state.nome,
            this.state.nomeFantasia,
            this.state.logradouro,
            this.state.bairro,
            this.state.uf,
            this.state.limiteCredito
        );
    }

    closeOverlay = () => {
        this.setState({
            openDialog: false,
            nome: '',
            nomeFantasia: '',
            logradouro: '',
            bairro: '',
            uf: '',
            limiteCredito: ''
        })
    }

    handleNameChange = (value: any) => { this.setState({ nome: value }) }
    handleCompanyNameChange = (value: any) => { this.setState({ nomeFantasia: value }) }
    handleAddressChange = (value: any) => { this.setState({ logradouro: value }) }
    handleNeighbourhoodChange = (value: any) => { this.setState({ bairro: value }) }
    handleUFChange = (value: any) => { this.setState({ uf: value }) }
    handleCreditChange = (value: any) => { this.setState({ limiteCredito: value }) }

    public componentDidMount() {
    }

    render() {

        return (
            <View style={styles.view}>
                <Overlay overlayStyle={styles.overlay} isVisible={this.state.openDialog}>
                    <View>
                        <Input
                            placeholder='Nome'
                            key="inputName"
                            value={this.state.nome}
                            onChangeText={this.handleNameChange} />
                        <Input
                            placeholder='Nome fantasia'
                            key="inputCompanyName"
                            value={this.state.nomeFantasia}
                            onChangeText={this.handleCompanyNameChange} />
                        <Input
                            placeholder='Logradouro'
                            key="inputAddress"
                            value={this.state.logradouro}
                            onChangeText={this.handleAddressChange} />
                        <Input
                            placeholder='Bairro'
                            key="inputNeighbourhood"
                            value={this.state.bairro}
                            onChangeText={this.handleNeighbourhoodChange} />
                        <Input
                            placeholder='UF'
                            key="inputUF"
                            value={this.state.uf}
                            onChangeText={this.handleUFChange} />
                        <Input
                            placeholder='Limite de crédito'
                            key="inputCredit"
                            keyboardType={'numeric'}
                            value={this.state.limiteCredito}
                            onChangeText={this.handleCreditChange} />
                        <View>
                            <View>
                                <Button
                                    containerStyle={{
                                        marginLeft: 10, marginRight: 10
                                    }}
                                    title="INCLUIR"
                                    onPress={this.submitNewClient}
                                />
                            </View>
                            <View>
                                <Button
                                    containerStyle={{
                                        marginLeft: 10, marginRight: 10
                                    }}
                                    title="CANCELAR"
                                    type="outline"
                                    onPress={this.closeOverlay}
                                    icon={
                                        <Icon name="close" color={colors.secondary} />
                                    }
                                />
                            </View>
                        </View>
                    </View>
                </Overlay>
                <TouchableOpacity
                >
                    <Button
                        title="Novo cliente"
                        icon={
                            <Icon name="person-add" size={30} color="#01a699" iconStyle={{ color: '' paddingRight: 10 }} />
                        }
                        onPress={() => this.setState({ openDialog: true })}
                    />
                </TouchableOpacity>
            </View >
        )
    }
}


const styles = StyleSheet.create({
    view: {
    },
    overlay: {
    }
})


const mapStateToProps = ({ clients }: AppState) => ({

})

const mapDispatchToProps = {
    insertRequest
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ClientList)