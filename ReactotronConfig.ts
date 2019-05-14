import Reactotron, { asyncStorage } from 'reactotron-react-native'

Reactotron
    .configure() // controls connection & communication settings
    .useReactNative() // add all built-in react native plugins
    .use(asyncStorage())
    .connect({
        enabled: true,
        host: '192.168.128.17',  // server ip
        port: 9090
    }) // let's connect!