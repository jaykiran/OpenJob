import { createSwitchNavigator } from 'react-navigation';
import LoadingScreen from '../screens/LoadingScreen';
import SignUpPage from '../screens/SignUpPage';
import SignInPage from '../screens/SignInPage';
import EmailSignUp from '../screens/EmailSignUp';
import PhoneSignUp from '../screens/PhoneSignUp';
import InitialLanguageSelection from '../screens/InitialLanguageSelection';
import AboutScreen from '../screens/AboutScreen';
import InitialScreen from '../screens/InitialScreen';
const AuthNavigator = createSwitchNavigator(
  {
   
    Launguage: { screen: InitialLanguageSelection },
    Initial: { screen: InitialScreen },
    About: { screen: AboutScreen },
    Loading: { screen: LoadingScreen },
    SignUp: { screen: SignUpPage },
    SignIn: { screen: SignInPage },
    Email: { screen: EmailSignUp },
    Phone: { screen: PhoneSignUp },
    //Insta: { screen: InstaSignUp }
  },
  { initialRouteName: 'Launguage' }
);
export default AuthNavigator;