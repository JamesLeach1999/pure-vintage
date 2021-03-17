// in src/App.js
import * as React from "react";
import { Provider } from "react-redux";
import { createHashHistory } from "history";
import { Admin, Resource } from "react-admin";
import restProvider from "ra-data-json-server"
// import defaultMessages from "ra-language-english";
// import polyglotI18nProvider from "ra-i18n-polyglot";

import createAdminStore from "./createAdminStore";
import ProductList from "./ProductList"
// // your app components
// import Dashboard from "./Dashboard";
// import { PostList, PostCreate, PostEdit, PostShow } from "./Post";
// import { CommentList, CommentEdit, CommentCreate } from "./Comment";
// import { UserList, UserEdit, UserCreate } from "./User";

// dependency injection
const dataProvider = restProvider(
  "https://cryptic-temple-54361.herokuapp.com/store1"
);
const authProvider = () => Promise.resolve();

const history = createHashHistory();

const App = () => (
  <Provider
    store={createAdminStore({
      authProvider,
      dataProvider,
      history,
    })}
  >
    <Admin
      authProvider={authProvider}
      dataProvider={dataProvider}
      history={history}
      title="My Admin"
    >
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <Resource
        name="store1"
        list={ProductList}
        // create={PostCreate}
        // edit={PostEdit}
        // show={PostShow}
      />
      {/* <Resource
        name="comments"
        list={CommentList}
        edit={CommentEdit}
        create={CommentCreate}
      />
      <Resource
        name="users"
        list={UserList}
        edit={UserEdit}
        create={UserCreate}
      /> */}
    </Admin>
  </Provider>
);

export default App;
