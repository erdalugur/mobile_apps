import React from 'react'
import { Dimensions, StyleSheet, Image, ImageBackground } from 'react-native'
import { View } from './View'
import { Text } from './Text'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Product, NavigationProps } from 'types';
import { Dispatch } from 'redux'
import { IAction } from 'myRedux/types';
import { screens } from 'navigation';

const { width, height } = Dimensions.get("screen")
interface ItemProps {
    ID: number
    IMAGE_URL: string
}
interface Props extends NavigationProps<any, any> {
    items: Array<Product>
    dispatch: Dispatch<IAction<any>>
}
interface State {
    active: number
}
export class SliderProducts extends React.PureComponent<Props, State> {
    state: State = {
        active: 0
    }

    ref = React.createRef<any>();
    renderItem = ({ item, index }: { item: Product, index: number }) => {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.slide}
                onPress={() => this.props.navigation.navigate(screens.product, { item })}
            >
                <ImageBackground source={{ uri: item.PREVIEW }}
                    resizeMethod="auto"
                    style={{
                        height: height / 4, width: width
                    }}>
                    <View style={{
                        position: 'absolute',
                        height: '100%',
                        width: '100%',
                        backgroundColor: '#12121226',
                        justifyContent: 'flex-end',
                        alignItems: 'center'
                    }}>
                        <Text
                            component="h4" style={{
                                fontWeight: 'bold',
                                backgroundColor: '#12121226',
                                height: 50,
                                width: '100%',
                                textAlign: 'center'
                            }} color={'#fff'}>{item.NAME}</Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        );
    }
    pagination = () => {
        const { items } = this.props;
        return (
            <Pagination
                dotsLength={items.length}
                activeDotIndex={this.state.active}
                containerStyle={{
                    padding: 10
                }}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: 'rgba(255, 255, 255, 0.92)',
                }}
                inactiveDotStyle={{
                    // Define styles for inactive dots here
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        );
    }
    render() {
        return (
            <>
                <Carousel
                    autoplay
                    autoplayDelay={1000}
                    ref={this.ref}
                    data={this.props.items}
                    renderItem={this.renderItem}
                    sliderWidth={width}
                    itemWidth={width}
                    onSnapToItem={index => this.setState({ active: index })}
                    firstItem={0}
                    loop
                />
                {this.pagination()}
            </>
        )
    }
}

const styles = StyleSheet.create({
    slide: {},
})
