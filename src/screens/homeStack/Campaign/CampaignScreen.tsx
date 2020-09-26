import { dataManager } from 'api';
import { Html, Layout, Text, View } from 'components'
import { Star } from 'icons';
import React from 'react'
import { ScrollView, ImageBackground, Dimensions, StyleSheet } from 'react-native';
import theme from 'theme';
import { applicationManager } from 'utils';
import { DiscoutnComponent } from './DiscountComponent';
import { StarComponent } from './StarComponent';

const { width, height } = Dimensions.get('screen')

interface Props {

}
const components: { [key: string]: any } = {
    'Yıldız': StarComponent,
    'Fiyat': DiscoutnComponent
}
interface ItemProps {
    ID: number
    IMAGE_URL: string
    PRICE: number,
    TYPE: 'Yıldız' | 'Fiyat',
    START_DATE: string,
    END_DATE: string,
    TITLE: string,
    DESCRIPTION: string,
    VALUE: number
}
interface State {
    items: Array<ItemProps>
    loading: boolean
}
export class CampaignScreen extends React.PureComponent<Props, State> {
    state: State = {
        loading: false,
        items: []
    }

    componentDidMount = async () => {
        this.loadAsync();
    }

    loadAsync = async () => {
        this.setState({ loading: true });
        const result = await dataManager.loadCampaignsAsync();
        if (result.statusCode === 200 && result.data) {
            this.setState({ loading: false, items: result.data })
        } else {
            this.setState({ loading: false })
        }
    }

    renderChildren = (x: ItemProps) => {
        let Component = components[x.TYPE]
        return <Component value={x.VALUE} {...x} />
    }

    renderDates = (x: ItemProps) => {
        let dates;
        if (x.START_DATE) {
            dates = applicationManager.formatDate(x.START_DATE)
        }
        if (x.END_DATE) {
            dates += ` ~ ${applicationManager.formatDate(x.END_DATE)}`
        }
        if (dates) {
            return (
                <View style={{
                    position: 'absolute',
                    bottom: 0,
                    padding: 5
                }} transparent>
                    <Text style={{ fontSize: 12 }}>{`Kampanya ${dates} tarihleri arası geçerlidir`}</Text>
                </View>
            )
        } else {
            return null
        }
    }

    renderItem = (x: ItemProps) => {
        return (
            <ImageBackground
                key={x.ID}
                source={{ uri: x.IMAGE_URL }}
                resizeMethod="auto"
                style={{
                    height: (height / 4) - 20,
                    width: width - 20,
                    marginTop: 10,
                    marginHorizontal: 10,
                    borderRadius: 5,
                    overflow: 'hidden',
                    minHeight: 140,
                    maxHeight: 180
                }}>
                <View style={{ backgroundColor: '#0000009c', height: '100%', width: '100%' }}>
                    {this.renderChildren(x)}
                    <Text style={[styles.title]}>{x.TITLE}</Text>
                    {this.renderDates(x)}
                </View>
            </ImageBackground>
        )
    }

    render() {
        return (
            <Layout style={{ flex: 1 }} loading={this.state.loading}>
                {this.state.items.length > 0 ? (
                    <ScrollView>
                        {this.state.items.map(x => this.renderItem(x))}
                    </ScrollView>
                ) : (
                        <Text>Henüz sunabileceğimiz kampanyamız bulunmuyor.</Text>
                    )}
            </Layout>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontSize: 18,
        position: 'absolute',
        width: '100%',
        top: '50%',
        fontWeight: 'bold'
    },
    description: {
        width: '100%',
        backgroundColor: '#ffffff3d',
        position: 'absolute',
        bottom: 0,
        maxHeight: 60,
        paddingHorizontal: 5,
        paddingVertical: 0
    },
    starContainer: {
        backgroundColor: 'transparent',
        position: 'absolute',
        width: '100%',
        bottom: 0,
        height: 30,
        paddingHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})