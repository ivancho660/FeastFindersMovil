import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PantallaLogin from '../../Screen/Auth/Login';
import PantallaRegistro from '../../Screen/Auth/Registro';
import PantallaRecuperar from '../../Screen/Auth/RecuperarContraseña';
import Validar from '../../Screen/Auth/ValidarCodigo';
import RestablecerPassword from '../../Screen/Auth/RestablecerPassword';


const Stack = createNativeStackNavigator();

export default function AuthNavegacion() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={PantallaLogin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Registro"
        component={PantallaRegistro}
        options={{ title: 'Registro' }}
      />
      <Stack.Screen
        name="RecuperarContraseña"
        component={PantallaRecuperar}
        options={{ title: 'Recuperar Contraseña' }}
      />
      <Stack.Screen
        name="ValidarCodigo"
        component={Validar}
        options={{ title: 'Validar Codigo' }}
      />
      <Stack.Screen
        name="RestablecerPassword"
        component={RestablecerPassword}
        options={{ title: 'Restablecer Contraseña' }}
      />
    </Stack.Navigator>
  );
}
