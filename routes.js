// NavigationContainer é o componente que gerencia a navegação e que contém o objeto 'state' da Navegação.
// Ele deve ser utilizado somente uma vez no seu projeto e no início da execução
import { NavigationContainer } from '@react-navigation/native';
// O Stack Navigator fornece um mecanismo para executar a transição entre as telas de sua aplicação
// onde cada nova tela fica no topo da stack
import { createStackNavigator } from '@react-navigation/stack';
const AppStack = createStackNavigator();

// Importando os componentes de página
import LoginScreen from "./pages/LoginScreen"
import TecScreen from './pages/TecScreen';
import ListPage from './pages/ListPage';
import ChamadoPage from './pages/ChamadoPage';
import UserListPage from './pages/UserListPage';
import PerfilPage from './pages/perfilPAge';
import UserPage from './pages/UserPage';


// Definindo as rotas através de uma função (anônima) arrow 
const Routes = () => {
  return (
    /**** Definindo o NavigationContainer ****/
    <NavigationContainer>
      {/*** Em JSX sempre que tivermos duas chaves abrindo e fechando, isso indica o processamento CSS ***/}
      <AppStack.Navigator screenOptions={{headerShown: true,  animationEnabled: true}}>
        {/*** Indicando as telas das aplicação e definindo nomes para elas ***/}
        {/*** A primeira que é indicada torna-se a inicial ***/}
        <AppStack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown:false }}/>       
        <AppStack.Screen name="PerfilPage" component={PerfilPage} options={{ headerShown:false }}/>       
        <AppStack.Screen name="UserPage" component={UserPage} options={{ headerShown:false }}/>
        <AppStack.Screen name="TecScreen" component={TecScreen} options={{ headerShown:false }}/>
        <AppStack.Screen name="ListPage" component={ListPage} options={{ headerShown:false }}/>
        <AppStack.Screen name="UserListPage" component={UserListPage} options={{ headerShown:false }}/>              
        <AppStack.Screen name="ChamadoPage" component={ChamadoPage} options={{ headerShown:false }}/>       
      </AppStack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;