import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";

import CustomerDrawer from "./src/components/CustomerDrawer";
import { AuthProvider } from "./src/context/AuthContext";

export default function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <AuthProvider>
        <CustomerDrawer />
      </AuthProvider>
    </NavigationContainer>
  );
}
