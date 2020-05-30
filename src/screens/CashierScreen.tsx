import React from 'react';
import { StyleSheet, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { Text, View } from 'components'
import { dataManager } from 'api';
import theme from 'theme';

interface Props { }


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
                <FlatList
                    refreshControl={
                        <RefreshControl
                            onRefresh={this.loadAsync}
                            refreshing={this.state.loading}
                        />
                    }
                    style={{ width: '100%', height: '100%' }}
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
    }
});
