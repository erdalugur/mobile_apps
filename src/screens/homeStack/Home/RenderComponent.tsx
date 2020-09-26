import React from 'react';
import {
    ProductScrollView,
    SliderProducts,
    ProductsWithoutImageView
} from 'components'

let themes: { [key: string]: any } = {
    '1': ProductScrollView,
    '2': SliderProducts,
    '3': ProductsWithoutImageView
}

interface Props {
    themeNo: string
    items: any[]
    navigation: any
    route: any
}
export class RenderComponent extends React.PureComponent<Props, any> {
    render() {
        console.log('themeNo', this.props.themeNo)
        let Component = themes[this.props.themeNo]
        return <Component {...this.props} />
    }
}
