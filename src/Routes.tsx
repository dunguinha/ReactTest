import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import CameraList from './pages/CameraList';
import CameraForm from './pages/CameraForm';

const Stack = createStackNavigator();

export default function MainRoutes() {
    return (
        <NavigationContainer >
            <Stack.Navigator initialRouteName='CameraList'   screenOptions={{headerShown: false}}>
                <Stack.Screen name="CameraList" component={CameraList} options={{ headerShown: false }} />
                <Stack.Screen name="CameraForm" component={CameraForm} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
