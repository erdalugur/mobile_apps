import React from 'react';
import { View, TopActions, Slider, ProductScrollView } from 'components'
import { NavigationProps } from 'types'
import { connect } from 'react-redux';
import { AppState, IState } from 'myRedux';
import { ScrollView } from 'react-native-gesture-handler';
import { QueryableIO, dataManager } from 'api';
import { IProc } from 'api/types';
import { IAction } from 'myRedux/types';

interface Props extends NavigationProps {
    app: IState
    dispatch: (param: IAction) => void
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
        let result = await dataManager.loadAll();
        this.props.dispatch({ type: 'FETCH_ALL', payload: result });
        console.log("fetchAllEnd", result.tree.length)
    }

    render() {
        return (
            <View full>
                <ScrollView showsHorizontalScrollIndicator>
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