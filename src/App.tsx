import { Provider } from "react-redux";
import "./App.css";
import PageLayout from "./layouts/PageLayout";
import store from "./store";
import { Toaster } from "sonner";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
export const persistor = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PageLayout />
        <Toaster richColors position="top-center" />
      </PersistGate>
    </Provider>
  );
}

export default App;
