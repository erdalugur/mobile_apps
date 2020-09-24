import { Layout, Text } from 'components'
import React from 'react'

export class SurveyScreen extends React.PureComponent<any, any> {
    render() {
        return (
            <Layout style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Size sunabileceğimiz anketimiz henüz bulunmuyor.</Text>
            </Layout>
        )
    }
}