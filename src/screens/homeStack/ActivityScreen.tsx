import { Layout, Text } from 'components'
import React from 'react'

export class ActivityScreen extends React.PureComponent<any, any> {
    render() {
        return (
            <Layout style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Size sunabileceğimiz aktivitemiz henüz bulunmuyor.</Text>
            </Layout>
        )
    }
}