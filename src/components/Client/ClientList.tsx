import React from 'react';
import { connect } from 'react-redux';
import { Client } from '../../store/clients/types';
import { AppState } from '../../store';

import { View, FlatList, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Text, Avatar, Icon, Button, colors, Overlay, Input, CheckBox } from 'react-native-elements';
import AddClient from './AddClient';
import { User } from '../../store/user/types';
import { fetchRequest, deleteRequest, updateRequest, insertRequest } from '../../store/clients/actions';
import { paymentConditionFetchRequest } from '../../store/paymentConditions/actions';
import { CondicaoPagamento } from '../../store/paymentConditions/types';
import { isTemplateElement } from '@babel/types';

interface PropsFromState {
    loading: boolean
    data: Client[]
    errors?: string,
    paymentConditions: CondicaoPagamento[]
}

interface PropsFromDispatch {
    fetchRequest: typeof fetchRequest
    deleteRequest: typeof deleteRequest
    updateRequest: typeof updateRequest
    insertRequest: typeof insertRequest
    paymentConditionFetchRequest: typeof paymentConditionFetchRequest
}

interface IState {
    openDialog: boolean,
    activeItemId: number,
    nome: string,
    nomeFantasia: string,
    logradouro: string,
    bairro: string,
    uf: string,
    limiteCredito: string,
    condicoes: Map<number, boolean>
}

const initialState = {
    openDialog: false,
    clientDetails: 0,
    activeItemId: 0,
    nome: '',
    nomeFantasia: '',
    logradouro: '',
    bairro: '',
    uf: '',
    limiteCredito: '',
    condicoes: new Map()
}

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

        this.submitOrUpdateNewClient = this.submitOrUpdateNewClient.bind(this);
        this.updateClient = this.updateClient.bind(this);
        this.closeOverlay = this.closeOverlay.bind(this);
    }

    submitOrUpdateNewClient = () => {
        this.clearForm();

        const paramCondicoes: Map<string, string> = new Map();

        for (let [key, value] of this.state.condicoes.entries()) {
            if (value == true) {
                paramCondicoes.set("codigo", key.toString());
            }
        }

        if (this.state.activeItemId > 0) {
            this.props.updateRequest(
                this.state.activeItemId,
                this.state.nome,
                this.state.nomeFantasia,
                this.state.logradouro,
                this.state.bairro,
                this.state.uf,
                this.state.limiteCredito,
                paramCondicoes)
        } else {
            this.props.insertRequest(
                this.state.nome,
                this.state.nomeFantasia,
                this.state.logradouro,
                this.state.bairro,
                this.state.uf,
                this.state.limiteCredito,
                paramCondicoes
            );
        }
    }

    clearForm = () => {
        this.setState({
            activeItemId: 0,
            nome: '',
            nomeFantasia: '',
            logradouro: '',
            bairro: '',
            uf: '',
            limiteCredito: '',
            condicoes: new Map()
        })
    }

    closeOverlay = () => {
        this.clearForm();
        this.setState({
            openDialog: false
        })
    }

    handleNameChange = (value: any) => { this.setState({ nome: value }) }
    handleCompanyNameChange = (value: any) => { this.setState({ nomeFantasia: value }) }
    handleAddressChange = (value: any) => { this.setState({ logradouro: value }) }
    handleNeighbourhoodChange = (value: any) => { this.setState({ bairro: value }) }
    handleUFChange = (value: any) => { this.setState({ uf: value }) }
    handleCreditChange = (value: any) => { this.setState({ limiteCredito: value }) }
    handleConditionCheck = (value: string) => {

    }

    insertClient = () => {
        this.setState({ openDialog: true }),
            this.clearForm();
    }

    deleteClient = (id: number) => {
        this.props.deleteRequest(id);
    }

    updateClient = (item: Client) => {
        console.log(item)
        this.setState({
            activeItemId: item.id,
            openDialog: true,
            nome: item.nome,
            nomeFantasia: item.nomeFantasia,
            logradouro: item.logradouro,
            bairro: item.bairro,
            uf: item.uf,
            limiteCredito: item.limiteCredito.toString()
        })
    }

    public componentDidMount() {
        this.props.fetchRequest();
        this.props.paymentConditionFetchRequest();
    }

    handleDetails(index: number) {
        this.setState({
            openDialog: true
        });
    }

    render() {
        const { data, paymentConditions } = this.props;

        return (
            <View style={styles.view}>
                <TouchableOpacity
                >
                    <Button
                        title="Novo cliente"
                        icon={
                            <Icon name="person-add" size={30} color="#01a699" iconStyle={{ paddingRight: 10 }} />
                        }
                        onPress={() => this.insertClient()}
                    />
                </TouchableOpacity>
                <FlatList
                    style={{ width: "100%" }}
                    data={data}
                    scrollEnabled={true}
                    keyExtractor={(item) => 'client' + item.id}
                    renderItem={
                        ({ item }) => (
                            <View style={styles.tableRow} >
                                <View style={{ flexDirection: 'row', padding: 20 }} >
                                    <Avatar
                                        containerStyle={styles.avatar}
                                        rounded
                                        size="small"
                                        title={item.nome.charAt(0)}
                                        onPress={() => console.log("Works!")}
                                        activeOpacity={0.7}
                                        overlayContainerStyle={{ backgroundColor: "#57CDFF" }}
                                    />
                                    <View style={{ flexDirection: 'column' }}>
                                        <View style={{
                                            flex: 1
                                        }}>
                                            <Text style={{ fontWeight: 'bold' }}>{item.nome}</Text>
                                        </View>
                                        <View style={{
                                            flex: 1
                                        }}>
                                            <Text>{item.nomeFantasia}</Text>
                                        </View>
                                    </View>

                                </View>
                                <View style={{ flex: 1, paddingHorizontal: 20, paddingBottom: 10 }}>
                                    <View>
                                        <Text>{item.logradouro} | {item.bairro} | {item.uf}</Text>
                                    </View>
                                    <View>
                                        <Text style={{ fontSize: 18 }}>R$ {item.limiteCredito}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', borderTopWidth: 1, borderTopColor: colors.divider, marginTop: 5 }}>
                                    <View style={{ flex: 1, borderRightWidth: 1, borderColor: colors.divider }}>
                                        <Button
                                            key={'btnUpdate_' + item.id}
                                            title="Atualizar"
                                            type="clear"
                                            titleStyle={{ color: 'green' }}
                                            icon={
                                                <Icon size={24} name='update' color='green' />
                                            }
                                            onPress={() => this.updateClient(item)}
                                        />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Button
                                            key={'btnExcluir_' + item.id}
                                            title="Excluir"
                                            titleStyle={{ color: 'red' }}
                                            type="clear"
                                            icon={
                                                <Icon size={24} name='delete' color='red' />
                                            }
                                            onPress={() => this.deleteClient(item.id)}
                                        />
                                    </View>
                                </View>
                            </View>
                        )
                    } />
                <Overlay overlayStyle={styles.overlay} isVisible={this.state.openDialog}>
                    <ScrollView>
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
                        {paymentConditions.map((condicao) => (
                            <CheckBox
                                key={'check_' + condicao.id}
                                checked={this.state.condicoes.get(condicao.id)}
                                title={condicao.descricao}
                                onPress={() => {
                                    if (this.state.condicoes.has(condicao.id)) {
                                        this.setState({
                                            condicoes: this.state.condicoes.set(condicao.id, !this.state.condicoes.get(condicao.id))
                                        })
                                    }
                                    else {
                                        this.setState({
                                            condicoes: this.state.condicoes.set(condicao.id, false)
                                        })
                                    }
                                }}
                            />
                        ))}
                        <View>
                            <View>
                                <Button
                                    containerStyle={{
                                        marginLeft: 10, marginRight: 10
                                    }}
                                    title="INCLUIR"
                                    onPress={this.submitOrUpdateNewClient}
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
                    </ScrollView>
                </Overlay>
            </View >
        )
    }
}


const styles = StyleSheet.create({
    view: {
        height: "100%",
        zIndex: -1
    },
    overlay: {
        height: "70%",
        padding: 30
    },
    tableRow: {
        alignContent: 'flex-start',
        borderBottomColor: "#ccc",
        marginVertical: 8,
        marginHorizontal: 10,
        backgroundColor: 'white',
        elevation: 2
    },
    avatar: {
        marginRight: 10
    },
    button: {

    },
    icon: {
        paddingLeft: 10
    }
})


const mapStateToProps = ({ clients, paymentConditions }: AppState) => ({
    loading: clients.loading,
    errors: clients.errors,
    data: clients.data,
    paymentConditions: paymentConditions.data
})

const mapDispatchToProps = {
    fetchRequest,
    deleteRequest,
    updateRequest,
    insertRequest,
    paymentConditionFetchRequest
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ClientList)