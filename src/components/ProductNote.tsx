import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import theme from 'theme'
import { Input } from './Input'
import { Text } from './Text'
import { View } from './View'
import { AppState } from 'myRedux'
import { CartItem } from 'types'

interface Props {
    saveNote: (note: string) => void
    cancel: () => void
    cart: { [key: string]: CartItem }
    note: string
    productKey: string
}
function Index(props: Props) {
    const [note, setNote] = React.useState<string>('');

    const hasNote = props.cart[props.productKey] != null

    React.useEffect(() => {
        let item = props.cart[props.productKey]
        if (item) {
            setNote(item.NOTES)
        } else {
            setNote(props.note)
        }
    }, [props.note, hasNote])

    return (
        <React.Fragment>
            <Input
                numberOfLines={10}
                style={[styles.inputStyle]}
                multiline
                autoFocus
                value={note}
                onChangeText={text => setNote(text)} />
            <View style={{
                height: 50,
                flexDirection: 'row',

            }}>
                <View style={[styles.buttonContainer, { backgroundColor: theme.colors.border }]}>
                    <TouchableOpacity style={[styles.button]} onPress={() => props.saveNote(note)}>
                        <Text>Tamam</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.buttonContainer, {
                    backgroundColor: theme.colors.card
                }]}>
                    <TouchableOpacity style={[styles.button]} onPress={() => props.cancel()}>
                        <Text>Vazgeç</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </React.Fragment>
    )
}

const mapState = (state: AppState) => ({
    cart: state.app.cart
})
export const ProductNote = connect(mapState)(Index)
const styles = StyleSheet.create({
    buttonContainer: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%'
    },
    inputStyle: {
        borderWidth: 1,
        borderColor: theme.colors.border,
        margin: 15,
        borderRadius: 10,
        minHeight: 150,
        paddingVertical: 5
    }
})