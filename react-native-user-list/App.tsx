import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import UserList from "./components/UserList";

const App = () => {
  return (
    <Provider store={store}>
      <UserList />
    </Provider>
  );
};

export default App;
