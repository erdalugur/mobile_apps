import React from 'react'
import { View, Text } from 'components'
import { TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { AppState } from 'myRedux'
import { NavigationProps } from 'types'

interface Props extends NavigationProps<{}, any> {
    screen: string
}

interface State { }

class Index extends React.PureComponent<Props, State>{
    render() {
        console.log(this.props.screen)
        return (
            <View full style={{
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text>Cart Result</Text>
                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate(this.props.screen)
                }}>
                    <Text>Ana Sayfa</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapState = (state: AppState) => ({
    screen: state.app.screen
})

export default connect(mapState)(Index)