import React from 'react';
import HtmlRenderer from 'react-native-render-html'

console.disableYellowBox = true;

interface Props {
    html: string
    onLinkPress?: () => void
}
export const Html = ({
    html,
    onLinkPress
}: Props) => (
        <HtmlRenderer
            containerStyle={{
                //backgroundColor: 'white',
                height: '100%',
                padding: 10,

            }}
            baseFontStyle={{

            }}
            html={`${html || "<p></p>"}`}
            onLinkPress={() => typeof (onLinkPress) === 'function' ? onLinkPress() : null} />
    );


