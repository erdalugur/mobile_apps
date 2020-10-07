import { Layout, Text, MyCode } from 'components'
import React from 'react'
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
        this.setState({ userId: user !== null ? user.ID : '', loading: false })
    }

    render() {
        return (
            <Layout loading={this.state.loading}>
                {this.state.userId !== '' && (
                    <MyCode code={this.state.userId} />
                )}
            </Layout>
        )
    }
}