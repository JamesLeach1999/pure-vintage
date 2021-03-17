// in src/App.js
import * as React from "react";
import { Provider } from "react-redux";
import { createHashHistory } from "history";
import { Admin, Resource } from "react-admin";
import restProvider from "ra-data-simple-rest";
// import defaultMessages from "ra-language-english";
// import polyglotI18nProvider from "ra-i18n-polyglot";

import createAdminStore from "./createAdminStore";
import ProductList from "./ProductList";
// // your app components
// import Dashboard from "./Dashboard";
// import { PostList, PostCreate, PostEdit, PostShow } from "./Post";
// import { CommentList, CommentEdit, CommentCreate } from "./Comment";
// import { UserList, UserEdit, UserCreate } from "./User";

// dependency injection
const dataProvider = restProvider("http://localhost:5000");

const authProvider = () => Promise.resolve();

const history = createHashHistory();
console.log("numberwang1");
const App = () => {
  return (
    <Provider
      store={createAdminStore({
        authProvider,
        dataProvider,
        history,
      })}
    >
      {console.log("numberwang2")}
      <Admin
        authProvider={authProvider}
        dataProvider={dataProvider}
        history={history}
        title="My Admin"
      >
        {console.log("numberwang3")}
        <Resource name="posts" list={ProductList} />
      </Admin>
    </Provider>
  );
};

export default App;
