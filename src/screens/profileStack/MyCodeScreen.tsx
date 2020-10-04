import { Layout } from 'components'
import React from 'react'
import QRCode from 'react-native-qrcode-svg';
import { userManager } from 'utils';


interface State {
    userId: string
    loading: boolean
}
export class MyCodeScreen extends React.PureComponent<any, State> {
    state: State = {
        loading: true,
        userId: ''
    }

    componentDidMount = async () => {
        let user = await userManager.get();
        if (user) {
            this.setState({ loading: false, userId: user.ID })
        } else {
            this.setState({ loading: false })
        }
    }

    render() {
        return (
            <Layout loading={this.state.loading}>
                {this.state.userId !== '' && (
                    <QRCode
                        value={this.state.userId}
                    />
                )}
            </Layout>
        )
    }
}