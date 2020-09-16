import React from 'react';
import { RefreshControl, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { View, TopActions, Slider, ProductScrollView, SliderProducts, Text } from 'components'
import { NavigationProps, FetchAllModel, ProductTreeModel } from 'types'
import { connect } from 'react-redux';
import { AppState, IState } from 'myRedux';
import { IAction, actionTypes } from 'myRedux/types';
import { dataManager } from 'api';
import theme from 'theme';
import { messageBox, messages } from 'utils';
import { screens } from 'navigation';

interface Props extends NavigationProps<any, any> {
    app: IState
    dispatch: (param: IAction<FetchAllModel>) => void
}

interface State {
    loading: boolean
}

let themes: { [key: string]: any } = {
    '1': ProductScrollView,
    '2': SliderProducts
}

class Home extends React.PureComponent<Props, State> {
    state: State = { loading: false };

    componentDidMount = async () => {
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

    getCurrentCategory = (x: ProductTreeModel) => {
        return Array.isArray(x.PRODUCTS) && x.PRODUCTS.length > 0 && x.PRODUCTS[0].CATEGORYID || "0"
    }

    renderComponent = (themeNo: string, props: any) => {
        console.log('themeNo', themeNo)
        let Component = themes[themeNo]
        return <Component {...props} />
    }

    render() {

        return (
            <View full>
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
                                                items: x.PRODUCTS
                                            })
                                        }}>
                                        <Text style={{ fontSize: 16 }}>
                                            {messages.SEE_ALL}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                {/* <ProductScrollView
                                    categoryId={this.getCurrentCategory(x)}
                                    key={x.ID}
                                    title={x.NAME}
                                    items={x.PRODUCTS}
                                    navigation={this.props.navigation}
                                    route={this.props.route}
                                /> */}
                                {this.renderComponent(x.THEME_NO.toString(), {
                                    items: x.PRODUCTS,
                                    navigation: this.props.navigation,
                                    route: this.props.route
                                })}
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.card,
        height: 300,
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