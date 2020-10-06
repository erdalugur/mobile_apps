import React from 'react'
import { View, Text, Button, Layout, ProductExtra } from 'components'
import { NavigationProps } from 'types'
import { dataManager } from 'api'
import { ScrollView, RefreshControl, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import theme from 'theme'
import { sharedStyles } from 'shared/style'
import { messageBox } from 'utils'
import { Pencil } from 'icons'
import { screens } from 'navigation'

interface Props extends NavigationProps<any, any> {

}

interface WaitingProps {
    ID: string,
    PREPARED: boolean
    PRODUCT_NAME: string
    QUANTITY: number
    TABLEID: number
    EXTRAS: Array<any>
    PRODUCTID: string
    NOTES: string
    STATUS: 1 | 2 | 3
}
interface State {
    loading: boolean
    items: Array<WaitingProps>
    error: string
    filter: 'web' | 'mobile'
    selectedItems: string[]
    displayList: string[]
}

export default class extends React.PureComponent<Props, State>{
    state: State = {
        loading: false,
        items: [],
        error: '',
        filter: 'mobile',
        selectedItems: [],
        displayList: []
    }

    timer: any

    componentDidMount = async () => {
        this.setState({ loading: true })
        this.loadAsync()
        //this.timer = setInterval(() => this.loadAsync(), 5000)
    }

    componentWillUnmount = () => {
        clearInterval(this.timer)
    }

    loadAsync = async () => {
        let { data, error, statusCode } = await dataManager.loadWaiting();
        if (statusCode === 200 && Array.isArray(data)) {
            let _data_ = data.map(x => {
                x.EXTRAS = JSON.parse(x.EXTRAS)
                return x
            })
            this.setState({ items: _data_, loading: false, selectedItems: [] })
        } else {
            this.setState({ loading: false, error: error })
        }
        console.log('fetching')
    }

    renderItems = () => {
        let items = this.state.filter === 'web' ? this.state.items.filter(x => x.TABLEID === 0) : this.state.items.filter(x => x.TABLEID > 0)
        return items.map(x => (
            <TouchableOpacity
                key={x.ID}
                onPress={() => {
                    this.setState((state: State) => {
                        let index = state.selectedItems.indexOf(x.ID);
                        if (index > -1) {
                            state.selectedItems.splice(index, 1);
                        } else {
                            state.selectedItems.push(x.ID);
                        }
                        return { selectedItems: [...state.selectedItems] }
                    })
                }}
                style={[styles.itemContainer, {
                    borderLeftWidth: this.state.selectedItems.indexOf(x.ID) > -1 ? 4 : 0,
                    borderLeftColor: this.state.selectedItems.indexOf(x.ID) > -1 ? theme.colors.text : theme.colors.card
                }]}>
                <View transparent style={[styles.button]}>
                    <View style={{ width: '50%' }}>
                        <Text style={{ fontSize: 16 }}>{x.PRODUCT_NAME}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        width: '50%',
                        justifyContent: 'space-between'
                    }}>
                        <Text style={{ fontSize: 16 }}>{`${x.STATUS === 2 ? 'Onaylandı' : 'Bekliyor'}`}</Text>
                        {this.state.filter === 'mobile' && <Text style={{ fontSize: 16 }}>{x.TABLEID.toString()}</Text>}
                    </View>
                </View>
                <TouchableOpacity style={[styles.others]}
                    onPress={() => {
                        this.setState((state: State) => {
                            let index = state.displayList.indexOf(x.ID)
                            if (index > -1)
                                state.displayList.splice(index, 1)
                            else
                                state.displayList.push(x.ID)

                            return {
                                displayList: [...state.displayList]
                            }
                        })
                    }}
                >
                    <Text>{`Diğer Bilgileri ${this.state.displayList.indexOf(x.ID) > -1 ? 'Gizle' : 'Göster'}`}</Text>


                </TouchableOpacity>
                {this.state.displayList.indexOf(x.ID) > -1 && (
                    <View style={{ padding: 10 }}>
                        {this.renderExtras(x)}
                        {this.renderNote(x)}
                    </View>
                )}
            </TouchableOpacity>
        ))
    }


    renderNote = (item: WaitingProps) => {
        return (
            <View style={[styles.extraContainer]}>
                <Text style={[styles.extraTitle]}>Notlar</Text>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                    <Text style={{ paddingHorizontal: 5 }}>{item.NOTES}</Text>
                    <TouchableOpacity style={{}} onPress={() => this.props.navigation.navigate(screens.noteScreen, {
                        // onNoteChange: (note: string) => {
                        //     this.props.dispatch({ type: actionTypes.SET_NOTE, payload: { key: key, note: note } })
                        // },
                        // note: item.NOTES
                    })}>
                        <Pencil color={theme.colors.white} size={20} />
                    </TouchableOpacity>
                </View>

            </View>
        )
    }

    renderExtras = (item: WaitingProps) => {
        if (item.EXTRAS.length > 0) {
            return (
                <View style={[styles.extraContainer]}>
                    <Text style={[styles.extraTitle]}>Esktralar</Text>
                    {item.EXTRAS.map((e, i) => (
                        <ProductExtra
                            screen="adisyon"
                            extra={e}
                            productKey={item.PRODUCTID}
                            handleExtra={ee => {
                                console.log("ee", ee);

                            }}
                            key={i}
                        />
                    ))}
                </View>
            )
        } else {
            null
        }
    }

    sendStatusAsync = async (status: 2 | 3) => {
        if (this.state.selectedItems.length === 0) {
            messageBox(`Lütfen ${status === 2 ? 'onaylanan' : 'hazır olan'} en az bir kayıt seçin`)
            return
        }
        let items = this.state.selectedItems.map(x => {
            return {
                ID: x
            }
        })
        let result = await dataManager.updateWaitingAsync(status, items)
        if (result.statusCode === 200) {
            messageBox('işlem başarıyla gerçekleşti');
            if (status === 3) {
                this.setState({ loading: true })

                this.loadAsync();
            }
        }
    }

    render() {
        return (
            <Layout style={{ flex: 1 }} loading={this.state.loading}>
                <View style={{ height: 50, flexDirection: 'row', marginVertical: 5 }}>
                    <View style={{ width: '50%', paddingRight: 1 }}>
                        <Button
                            onPress={() => this.setState({ filter: 'web', selectedItems: [] })}
                            className="default"
                            style={{ borderRadius: 0 }}
                            bold>
                            Paket
                        </Button>
                    </View>
                    <View style={{ width: '50%', paddingLeft: 1, }}>
                        <Button
                            style={{ borderRadius: 0 }}
                            onPress={() => this.setState({ filter: 'mobile', selectedItems: [] })}
                            className="default" bold>
                            Restoran
                        </Button>
                    </View>
                </View>
                <View style={[styles.header]}>
                    <View transparent style={{
                        width: '50%',
                    }}>
                        <Text style={{ fontSize: 16 }}>{'Sipariş'}</Text>
                    </View>
                    <View transparent style={[styles.headerRight]}>
                        <Text style={{ fontSize: 16 }}>{`Durum`}</Text>
                        <Text style={{ fontSize: 16 }}>{'Masa'}</Text>
                    </View>
                </View>
                <ScrollView style={{ maxHeight: Dimensions.get('window').height - 250 }} refreshControl={
                    <RefreshControl
                        onRefresh={this.loadAsync}
                        refreshing={this.state.loading}
                    />
                }>
                    {this.renderItems()}
                </ScrollView>
                <View transparent style={[sharedStyles.bottomContainer]}>
                    <View transparent style={{ width: '50%' }}>
                        <Button
                            onPress={() => this.sendStatusAsync(2)}
                            className="default"
                            style={{ borderRadius: 0, height: sharedStyles.bottomContainer.height }}
                            bold>Onay</Button>
                    </View>
                    <View transparent style={{ width: '50%' }}>
                        <Button
                            onPress={() => this.sendStatusAsync(3)}
                            className="primary"
                            style={{ borderRadius: 0, height: sharedStyles.bottomContainer.height }}
                            bold>Hazır</Button>
                    </View>
                </View>
            </Layout>
        )
    };
}

const styles = StyleSheet.create({
    header: {
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        backgroundColor: theme.colors.border
    },
    headerRight: {
        flexDirection: 'row',
        width: '50%',
        justifyContent: 'space-between',
        //backgroundColor: theme.colors.card
    },
    itemContainer: {

        borderBottomWidth: 1,
        borderColor: theme.colors.border,
        //
    },
    button: {
        height: 50,
        flexDirection: 'row',
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    others: { backgroundColor: theme.colors.border, height: 30, justifyContent: 'center', alignItems: 'center' },
    extraTitle: { backgroundColor: theme.colors.border, paddingHorizontal: 5 },
    extraContainer: { marginBottom: 10, borderWidth: 1, borderColor: theme.colors.border },
    extraButton: {
        width: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonSubText: {
        fontSize: 12,
        textAlign: 'center'
    }
})