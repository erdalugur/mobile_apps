import React from 'react';
import { RefreshControl, ScrollView } from 'react-native'
import { View, TopActions, Slider, ProductScrollView } from 'components'
import { NavigationProps, FetchAllModel } from 'types'
import { connect } from 'react-redux';
import { AppState, IState } from 'myRedux';
import { IAction, actionTypes } from 'myRedux/types';
import { dataManager } from 'api';

interface Props extends NavigationProps<any, any> {
    app: IState
    dispatch: (param: IAction<FetchAllModel>) => void
}

interface State {
    loading: boolean
}

class Home extends React.PureComponent<Props, State> {
    state: State = { loading: false };

    componentDidMount = async () => {
        if (this.props.app.menu.tree.length === 0)
            this.loadAsync();
        else {
            console.log("menuItems", this.props.app.menu.tree.length)
            return;
        }
    }

    loadAsync = async () => {
        console.log("fetchAllStart")
        this.setState({ loading: true });
        let result = await dataManager.loadAll();
        this.props.dispatch({ type: actionTypes.FETCH_ALL, payload: result });
        console.log("fetchAllEnd", result.tree.length)
        this.setState({ loading: false });
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
                    <TopActions />
                    <Slider />
                    {this.props.app.menu.tree.map(x => (
                        <ProductScrollView
                            categoryId={x.PRODUCTS[0].CATEGORYID}
                            key={x.ID}
                            title={x.NAME}
                            items={x.PRODUCTS}
                            navigation={this.props.navigation}
                            route={this.props.route}
                        />
                    ))}
                </ScrollView>
            </View>
        );
    }
}
const mapState = (state: AppState) => ({
    app: state.app
})
export default connect(mapState)(Home)