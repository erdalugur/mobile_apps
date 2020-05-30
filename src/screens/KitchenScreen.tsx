import React from 'react'
import { View, Text } from 'components'
import { NavigationProps } from 'types'
import { dataManager } from 'api'
import { ScrollView, RefreshControl } from 'react-native'
import theme from 'theme'

interface Props extends NavigationProps<any, any> {

}

interface WaitingProps {
    ID: string,
    PREPARED: boolean
    PRODUCT_NAME: string
    QUANTITY: number
    TABLEID: string
}
interface State {
    loading: boolean
    items: Array<WaitingProps>
    error: string
}

export default class extends React.PureComponent<Props, State>{
    state: State = {
        loading: false,
        items: [],
        error: ''
    }

    componentDidMount = async () => {
        this.loadAsync();
    }

    loadAsync = async () => {
        let { data, error, statusCode } = await dataManager.loadWaiting();
        if (statusCode === 200 && Array.isArray(data)) {
            this.setState({ items: data, loading: false })
        } else {
            this.setState({ loading: false, error: error })
        }
    }

    renderItems = () => {
        return this.state.items.map(x => (
            <View key={x.ID} style={{
                height: 60,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottomWidth: 1,
                borderColor: theme.colors.border,
                paddingHorizontal: 10
            }}>
                <View style={{
                    width: '50%'
                }}>
                    <Text style={{ fontSize: 16 }}>{x.PRODUCT_NAME}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    width: '50%',
                    justifyContent: 'space-between'
                }}>
                    <Text style={{ fontSize: 16 }}>{`${x.PREPARED ? 'Hazırlandı' : 'Bekleniyor'}`}</Text>
                    <Text style={{ fontSize: 16 }}>{x.TABLEID}</Text>
                </View>

            </View>
        ))
    }

    render() {
        return (
            <View full>
                <ScrollView refreshControl={
                    <RefreshControl
                        onRefresh={this.loadAsync}
                        refreshing={this.state.loading}
                    />
                }>
                    {this.renderItems()}
                </ScrollView>
            </View>
        )
    };
}