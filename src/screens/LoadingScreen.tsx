import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export interface LoadingScreenProps {
}

export default class LoadingScreenComponent extends React.Component<LoadingScreenProps, any> {
    constructor(props: LoadingScreenProps) {
        super(props);
    }

    public render() {
        return (
            <View>
                <Text>Loading Screen Component</Text>
            </View>
        );
    }
}
