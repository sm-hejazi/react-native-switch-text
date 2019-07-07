import React, {Component} from 'react';
import {Animated, StyleSheet, Text, TouchableWithoutFeedback, View,} from 'react-native';


export default class SwitchText extends Component {
    constructor(props, context) {
        super(props, context);
        // this.firsSet = true;
        this.state = {
            // value: props.value,
            backgroundMove: new Animated.Value(props.value ? 1 : 0),
            backgroundWidth: new Animated.Value(props.value ? 1 : 0),
            activeWidth: 0,
            inactiveWidth: 0,

        };
    }

    componentDidMount() {
        // const {value} = this.props;
        // this.animateSwitch(value, () => null);
    }

    componentDidUpdate() {
        this.animateSwitch(this.props.value, () => null);
    }


    handleSwitch(value) {
        // const {value} = this.state;
        const {
            onValueChange,
            disabled,
            // value: propValue
        } = this.props;
        if (disabled) {
            return;
        }

        this.animateSwitch(!value, () => onValueChange(!value));
    };

    animateSwitch = (value, cb = () => {
    }) => {
        Animated.parallel([
            Animated.timing(this.state.backgroundMove, {
                toValue: value ? 0 : 1,
                duration: 200
            }),
            Animated.timing(this.state.backgroundWidth, {
                toValue: value ? 0 : 1,
                duration: 200
            })
        ]).start(cb);
    };

    render() {
        const {
            backgroundMove,
            backgroundWidth,
        } = this.state;
        const {value, activeText, inactiveText, backgroundActive, backgroundInactive, activeTextStyle, inactiveTextStyle} = this.props;

        // if (this.firsSet && value !== this.state.value) {
        //     this.handleSwitch();
        //     this.firsSet = false;
        // }

        const moveBackground = backgroundMove.interpolate({
            inputRange: [0, 1],
            outputRange: [0, this.state.activeWidth]
        });
        const widthBackground = backgroundWidth.interpolate({
            inputRange: [0, 1],
            outputRange: [this.state.activeWidth, this.state.inactiveWidth]
        });
        return (
            <TouchableWithoutFeedback

                onPress={() => this.handleSwitch(value)}>
                <View
                    style={[
                        styles.radiosRight,
                        styles.radiosLeft,
                        {
                            backgroundColor: backgroundInactive,
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row',
                            borderTopRightRadius: 7,
                            borderBottomRightRadius: 7,
                            maxHeight: this.props.height ? this.props.height : 45,
                        }]}
                >
                    <Animated.View
                        style={[
                            value ? styles.radiosLeft : styles.radiosRight,
                            {
                                position: 'absolute',
                                backgroundColor: backgroundActive,
                                height: '100%',
                                width: widthBackground,
                                left: moveBackground,

                            }]}>
                    </Animated.View>
                    <View
                        onLayout={(event) => {
                            let {x, y, width, height} = event.nativeEvent.layout;
                            this.setState({activeWidth: width})
                        }}
                        style={{}}>
                        <Text style={[{
                            color: value ? 'white' : '#777',
                            padding: 7,
                        }, activeTextStyle]}>{activeText}</Text>

                    </View>
                    <View
                        onLayout={(event) => {
                            let {x, y, width, height} = event.nativeEvent.layout;
                            this.setState({inactiveWidth: width})
                        }}
                        style={{}}>
                        <Text style={[{
                            color: value ? '#777' : 'white',
                            paddingHorizontal: 7,
                            paddingVertical: 2
                        }, inactiveTextStyle]}>{inactiveText}</Text>

                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }

}


const styles = StyleSheet.create({
    radiosRight: {
        borderTopRightRadius: 7,
        borderBottomRightRadius: 7
    },
    radiosLeft: {
        borderTopLeftRadius: 7,
        borderBottomLeftRadius: 7
    }

});