import React from 'react'
import { Button, Input, Layout, Text, View } from 'components'
import { StyleSheet, TouchableOpacity, ScrollView, ImageBackground, Dimensions } from 'react-native'
import theme from 'theme'
import { messageBox } from 'utils'
import { dataManager } from 'api'
import { NavigationProps } from 'types'
import { screens } from 'navigation'

const { width, height } = Dimensions.get('window')

interface Props extends NavigationProps<any, any> {

}

interface ItemProps {
    ID: number
    NAME: string
    IMAGE_URL: string
    DESCRIPTION: string
}

interface State {
    loading: boolean
    items: Array<ItemProps>
    error: { [key: string]: string }
}
export class OrganizationScreen extends React.PureComponent<Props, State> {

    state: State = {
        loading: false,
        items: [],
        error: {}
    }

    componentDidMount = async () => {
        this.loadAsync();
    }

    loadAsync = async () => {
        this.setState({ loading: true })

        const result = await dataManager.loadOrganizations();
        if (result.statusCode === 200 && result.data) {
            this.setState({ items: result.data, loading: false })
        } else {
            this.setState({ loading: false })
        }
    }

    renderItem = (x: ItemProps) => {
        return (
            <TouchableOpacity
                style={{
                    paddingTop: 10,
                    paddingHorizontal: 10,
                    height: (height / 4) - 20,
                    minHeight: 140,
                    maxHeight: 180
                }}
                key={x.ID} onPress={() => this.props.navigation.navigate(screens.organizatonRequestScreen, { item: x })}>
                <ImageBackground
                    source={{ uri: x.IMAGE_URL }}
                    resizeMethod="auto"
                    style={{
                        height: '100%',
                        width: '100%',
                        borderRadius: 5,
                        overflow: 'hidden',
                    }}>
                    <View style={{ backgroundColor: '#0000009c', height: '100%', width: '100%' }}>
                        <Text style={[styles.title]}>{x.NAME}</Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <Layout style={[styles.container]}>
                {this.state.items.length > 0 ? (
                    <ScrollView>
                        {this.state.items.map(x => this.renderItem(x))}
                    </ScrollView>
                ) : (
                        <Text>Henüz sunabileceğimiz organizasyon bulunmuyor.</Text>
                    )}
            </Layout>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        maxHeight: height - 70
        //alignItems: 'center',
        //justifyContent: 'center'
    },
    infoRow: { borderColor: theme.colors.border, borderBottomWidth: 1, marginTop: 10 },
    button: {
        backgroundColor: theme.colors.background,
        height: 50,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    text: {
        fontWeight: 'bold'
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        position: 'absolute',
        width: '100%',
        top: '50%',
        fontWeight: 'bold'
    },
})