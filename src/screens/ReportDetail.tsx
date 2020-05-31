import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from 'components'
import { NavigationProps } from 'types';
import { ReportType } from './ReportScreen';
import { dataManager } from 'api';


interface Props extends NavigationProps<{
    type: ReportType
}, any> { }

interface State {
    loading: boolean
}

export default class extends React.PureComponent<Props, State>{
    state: State = {
        loading: false
    }

    componentDidMount = () => {
        this.loadAsync();
    }

    loadByPerson = async () => {
        let { data, statusCode, error } = await dataManager.loadReportByPerson();
        console.log(data);
    }

    loadByProduct = async () => {
        let { data, statusCode, error } = await dataManager.loadReportByProduct();
        console.log(data);
    }

    loadAsync = async () => {
        let report = this.props.route.params.type
        switch (report) {
            case "PERSON":
                return this.loadByPerson();
            case "PRODUCT":
                return this.loadByProduct();
            default:
                break;
        }
    }

    render() {
        console.log(this.props.route.params.type)
        return (
            <View style={styles.container}>
                <Text>Rapor Detay!</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
