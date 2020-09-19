import React from 'react'
import { View, Text, Input } from 'components'
import { NavigationProps } from 'types'
import theme from 'theme'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { messageBox } from 'utils'

interface Props extends NavigationProps<{
    onNoteChange: (note: string) => void
    note: string
}, any> { }

interface State {
    note: string
}
export class ProductNoteScreen extends React.PureComponent<Props, any>{
    state: State = {
        note: ''
    }
    componentDidMount = async () => {
        this.setState({
            note: this.props.route.params.note
        })
    }
    addNote = () => {
        this.props.route.params.onNoteChange(this.state.note)
        //messageBox('Değişiklikler güncellendi.')
        this.props.navigation.goBack();
    }
    render() {
        return (
            <View full>
                <Input
                    numberOfLines={10}
                    style={[styles.inputStyle]}
                    multiline
                    autoFocus
                    value={this.state.note}
                    onChangeText={text => this.setState({ note: text })} />
                <View style={{
                    height: 50,
                    flexDirection: 'row',

                }}>
                    <View style={[styles.buttonContainer, { borderColor: theme.colors.border, borderWidth: 1 }]}>
                        <TouchableOpacity style={[styles.button]} onPress={this.addNote}>
                            <Text>Tamam</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.buttonContainer, {
                        backgroundColor: theme.colors.card
                    }]}>
                        <TouchableOpacity style={[styles.button]} onPress={() => this.props.navigation.goBack()}>
                            <Text>Vazgeç</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

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