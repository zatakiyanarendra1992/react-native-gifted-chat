import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Image, StyleSheet, View,TouchableOpacity,Linking,Alert } from 'react-native';
// TODO: support web
// @ts-ignore
import Lightbox from 'react-native-lightbox';
import { StylePropType } from './utils';
const styles = StyleSheet.create({
    container: {},
    image: {
        width: 150,
        height: 100,
        borderRadius: 13,
        margin: 3,
        resizeMode: 'cover',
    },
    imageActive: {
        flex: 1,
        resizeMode: 'contain',
    },
});
export default class MessageImage extends Component {
    render() {
        const { containerStyle, lightboxProps, imageProps, imageStyle, currentMessage, } = this.props;
        
        if (!!currentMessage) {
            if(currentMessage.file_type == "application/pdf" || currentMessage.file_type == "application/doc" || currentMessage.file_type == "application/docx" || currentMessage.file_type == "application/ppt" || currentMessage.file_type == "application/pptx"){
                return (<View style={[styles.container, containerStyle]}>
                    <TouchableOpacity onPress={async () => {
                        const supported = await Linking.canOpenURL(currentMessage.image);

                        if (supported) {
                          // Opening the link with some app, if the URL scheme is "http" the web link should be opened
                          // by some browser in the mobile
                          await Linking.openURL(currentMessage.image);
                        } else {
                          Alert.alert(`Don't know how to open this URL: ${url}`);
                        }
                    }} activeProps={{
                          style: styles.imageActive,
                      }} >
                        <Image {...imageProps} style={[styles.image, imageStyle]} source={{ uri: 'https://cdn.pixabay.com/photo/2017/06/10/07/13/file-2389211_960_720.png' }}/>
                    </TouchableOpacity>
                  </View>);
            }else{
                return (<View style={[styles.container, containerStyle]}>
                    <Lightbox activeProps={{
                          style: styles.imageActive,
                      }} {...lightboxProps}>
                      <Image {...imageProps} style={[styles.image, imageStyle]} source={{ uri: currentMessage.image }}/>
                    </Lightbox>
                  </View>);
            }

            
        }
        return null;
    }
}
MessageImage.defaultProps = {
    currentMessage: {
        image: null,
    },
    containerStyle: {},
    imageStyle: {},
    imageProps: {},
    lightboxProps: {},
};
MessageImage.propTypes = {
    currentMessage: PropTypes.object,
    containerStyle: StylePropType,
    imageStyle: StylePropType,
    imageProps: PropTypes.object,
    lightboxProps: PropTypes.object,
};
//# sourceMappingURL=MessageImage.js.map
