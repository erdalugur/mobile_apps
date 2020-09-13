import React from 'react'
import { Dimensions, StyleSheet, Image } from 'react-native'
import { View } from './View'
import { Text } from './Text'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get("screen")
interface ItemProps {
    ID: number
    IMAGE_URL: string
}
interface Props {
    items: Array<ItemProps>
}
interface State {
    active: number
}
export class Slider extends React.PureComponent<Props, State> {
    state: State = {
        active: 0
    }
    ref = React.createRef<any>();
    renderItem = ({ item, index }: { item: ItemProps, index: number }) => {
        return (
            <TouchableOpacity activeOpacity={0.8} style={styles.slide}>
                <Image source={{ uri: item.IMAGE_URL }}
                    style={{ height: 100, width: width, resizeMode: 'contain' }} />

            </TouchableOpacity>
        );
    }
    pagination = () => {
        const { items } = this.props;
        return (
            <Pagination
                dotsLength={items.length}
                activeDotIndex={this.state.active}
                containerStyle={{}}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 8,
                    backgroundColor: 'rgba(255, 255, 255, 0.92)'
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
            <View>
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
            </View>
        )
    }
}

const styles = StyleSheet.create({
    slide: {},
})
