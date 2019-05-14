import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppState } from './src/store';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import Navigator from './src/navigator/Navigator';
import NavigationService from './src/navigator/NavigatorService';
import { ThemeProvider, Theme } from 'react-native-elements';
import { Persistor } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

interface Props {
	store: Store<AppState>;
	persistor: Persistor
}

interface State {
	jwt: string;
}

export default class App extends React.Component<Props, State>{
	constructor(props: Props) {
		super(props);
	}

	render() {
		return (
			<Provider store={this.props.store}>
				<PersistGate loading={<View><Text>Loading</Text></View>} persistor={this.props.persistor}>
					<ThemeProvider theme={theme}>
						<Navigator ref={
							navigatorRef => {
								NavigationService.setTopLevelNavigator(navigatorRef)
							}
						} />
					</ThemeProvider>
				</PersistGate>
			</Provider>
		)
	}
}

const theme: Theme = {
	colors: {
		primary: "#57CDFF",
		secondary: "#ECF9FF"
	}

}