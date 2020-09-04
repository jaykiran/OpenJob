import { createSwitchNavigator } from 'react-navigation';
import LoadingScreen from '../screens/LoadingScreen';
import SignUpPage from '../screens/SignUpPage';
import SignInPage from '../screens/SignInPage';
import EmailSignUp from '../screens/EmailSignUp';
import PhoneSignUp from '../screens/PhoneSignUp';
//import InstaSignUp from '../screens/InstaSignUp';

const AuthNavigator = createSwitchNavigator(
  {
    Loading: { screen: LoadingScreen },
    SignUp: { screen: SignUpPage },
    SignIn: { screen: SignInPage },
    Email: { screen: EmailSignUp },
    Phone: { screen: PhoneSignUp },
    //Insta: { screen: InstaSignUp }
  },
  { initialRouteName: 'Loading' }
);
export default AuthNavigator;