import React from 'react';
import { StyleSheet, FlatList, RefreshControl, TouchableOpacity, Dimensions } from 'react-native';
import { Text, View } from 'components'
import { dataManager } from 'api';
import theme from 'theme';
import { messageBox } from 'utils';
import { NavigationProps } from 'types';
import { screens } from 'navigation';
const { height } = Dimensions.get('screen')
interface Props extends NavigationProps<any, any> { }


interface ItemModel {
    GUEST: number
    NAME: string
    ID: string
}
interface State {
    items: Array<ItemModel>
    loading: boolean
    error: string
    selected: string
}
export default class extends React.PureComponent<Props, State>{
    state: State = {
        items: [],
        loading: false,
        error: '',
        selected: ''
    }

    componentDidMount = async () => {
        this.loadAsync();
    }

    loadAsync = async () => {
        let { data, statusCode, error } = await dataManager.loadTables();
        console.log("data", data)
        if (statusCode === 200 && Array.isArray(data)) {
            this.setState({
                items: data,
                loading: false
            })
        } else {
            this.setState({ error: error, loading: false })
        }
    }

    showAddition = async () => {
        const { selected } = this.state
        if (selected === '') {
            messageBox('Masa seçiniz');
            return;
        } else {
            // masa ıd ye göre adisyonu çek
            let { data, statusCode, error } = await dataManager.loadAddion(selected);
            if (statusCode === 200 && Array.isArray(data)) {
                this.props.navigation.navigate(screens.addition, { items: data });
            } else {
                messageBox(error);
            }
        }
    }

    renderItem = (item: ItemModel, index: number) => {
        let isSelected = this.state.selected === item.ID
        return (
            <View style={{
                width: '25%',
                height: 50,
                padding: 5
            }}>
                <TouchableOpacity
                    onPress={() => {
                        this.setState((state: State) => {
                            return { selected: isSelected ? '' : item.ID }
                        })
                    }}
                    style={[styles.button, {
                        backgroundColor: isSelected ? 'green' : (item.GUEST > 0 ? theme.colors.text : theme.colors.border)
                    }]}>
                    <Text color={
                        isSelected ? theme.colors.text : (item.GUEST > 0 ? theme.colors.card : theme.colors.text)
                    }>{item.NAME}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{
                    height: 45,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginBottom: 5,
                    backgroundColor: theme.colors.card
                }}>
                    <TouchableOpacity
                        style={[styles.action]}
                    >
                        <Text component="h6">Dolu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.action]}
                    >
                        <Text component="h6">Boş</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.showAddition}
                        style={[styles.action]}
                    >
                        <Text component="h6">Hesabı Göster</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    refreshControl={
                        <RefreshControl
                            onRefresh={this.loadAsync}
                            refreshing={this.state.loading}
                        />
                    }
                    style={{ width: '100%', height: height - 70 }}
                    initialNumToRender={2}
                    numColumns={4}
                    keyExtractor={item => item.ID.toString()}
                    data={this.state.items}
                    renderItem={({ item, index }) => this.renderItem(item, index)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        width: '100%',
        alignItems: 'center',
        height: '100%',
        justifyContent: 'center',
        borderRadius: 5
    },
    action: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.border,
        paddingHorizontal: 10,
        width: '33%',
        borderRadius: 5,
    }
});
