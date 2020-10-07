import React from 'react';
import { RefreshControl, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native'
import { View, Slider, Text, Layout } from 'components'
import { NavigationProps, FetchAllModel, ProductTreeModel } from 'types'
import { connect } from 'react-redux';
import { AppState, IState } from 'myRedux';
import { IAction, actionTypes } from 'myRedux/types';
import { dataManager } from 'api';
import theme from 'theme';
import { messages, applicationManager } from 'utils';
import { screens } from 'navigation';
import { RenderComponent } from './RenderComponent'

interface Props extends NavigationProps<any, any> {
    app: IState
    dispatch: (param: IAction<FetchAllModel>) => void
}

interface State {
    loading: boolean
    recordNotFound: boolean
}


let { height } = Dimensions.get('window')

class Home extends React.PureComponent<Props, State> {
    state: State = { loading: false, recordNotFound: false };

    componentDidMount = async () => {
        const place = await applicationManager.config.getPlace();
        if (place) {
            this.props.navigation.setOptions({
                title: place.NAME
            })
        }
        if (place === null) {
            this.setState({ recordNotFound: true, loading: false })
            return
        }
        if (this.props.app.menu.tree.length === 0)
            this.loadAsync();
        else {
            return;
        }
    }

    loadAsync = async () => {
        this.setState({ loading: true });
        let result = await dataManager.loadAll();
        this.props.dispatch({ type: actionTypes.FETCH_ALL, payload: result });
        this.setState({ loading: false });
    }

    renderScreen = () => {
        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.loading}
                        onRefresh={this.loadAsync} />
                }
                showsHorizontalScrollIndicator>
                {/* <TopActions /> */}
                <Slider items={this.props.app.sliderItems} />
                <View style={{
                    marginTop: 20
                }}>
                    {this.props.app.menu.tree.map(x => (
                        <View style={[styles.container]} key={x.ID}>
                            <View style={[styles.title]}>
                                <Text style={{ fontSize: 20 }}>{x.NAME}</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.navigation.navigate(screens.category, {
                                            title: x.NAME,
                                            items: x.PRODUCTS,
                                            all: this.props.app.menu.tree
                                        })
                                    }}>
                                    <Text style={{ fontSize: 16 }}>
                                        {messages.SEE_ALL}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <RenderComponent
                                themeNo={x.THEME_NO}
                                navigation={this.props.navigation}
                                route={this.props.route}
                                items={x.PRODUCTS}
                            />
                        </View>
                    ))}
                </View>
            </ScrollView>
        )
    }

    renderNotFound = () => {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text component="h4">Domain kaydı bulunamadı</Text>
                <Text>Lütfen yetkili ile iletişime geçin</Text>
            </View>
        )
    }

    render() {
        return (
            <Layout loading={this.state.loading} style={{ flex: 1 }}>
                {this.state.recordNotFound ? this.renderNotFound() : this.renderScreen()}
            </Layout>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.card,
        paddingBottom: 5,
        marginBottom: 10
    },
    title: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 10,
        paddingBottom: 10
    },
})
const mapState = (state: AppState) => ({
    app: state.app
})
export default connect(mapState)(Home)