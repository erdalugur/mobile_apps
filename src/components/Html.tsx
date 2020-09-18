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
}: Props) => {
    if (!html)
        return null

    return (
        <HtmlRenderer
            containerStyle={{
                //backgroundColor: 'white',
                height: '100%',
            }}
            baseFontStyle={{

            }}
            html={`${html || "<p></p>"}`}
            onLinkPress={() => typeof (onLinkPress) === 'function' ? onLinkPress() : null} />
    );
}

