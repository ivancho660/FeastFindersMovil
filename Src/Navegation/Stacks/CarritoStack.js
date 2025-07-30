import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Carrito from '../../../Screen/Carrito/Carrito';
import PagoExitoso from '../../../Screen/Carrito/PagoExitoso';
import PagoCancelado from '../../../Screen/Carrito/PagoCancelado';


const  Stack = createNativeStackNavigator();

export default function CarritoStack() {

    return (
        <Stack.Navigator>
            <Stack.Screen 
  name="carrito"
  component={Carrito}
/>
            <Stack.Screen
        name="PagoExitoso"
        component={PagoExitoso}
        options={{ title: "Pago Exitoso" }}
      />
      <Stack.Screen
        name="PagoCancelado"
        component={PagoCancelado}
        options={{ title: "Pago Cancelado" }}
      />
        </Stack.Navigator>
    );
}