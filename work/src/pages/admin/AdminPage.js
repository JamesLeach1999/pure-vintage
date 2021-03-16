import * as React from "react";
// import { Admin, Resource } from "react-admin";
import restProvider from "ra-data-json-server";
import ProductList from "./ProductList"

// function AdminPage() {
//   return (
//     <Admin dataProvider={dataProvider}>
//       <Resource
//         name="store1"
//         list={ProductList}
        
//       />
//     </Admin>
//   );
// }


// import * as React from "react";
import { Provider } from "react-redux";
import { createHashHistory } from "history";
import { Admin, Resource } from "react-admin";


import createAdminStore from "./createAdminStore";

// your app components
// import Dashboard from "./Dashboard";
// import { PostList, PostCreate, PostEdit, PostShow } from "./Post";
// import { CommentList, CommentEdit, CommentCreate } from "./Comment";
// import { UserList, UserEdit, UserCreate } from "./User";

// dependency injection
const dataProvider = restProvider(
  "https://cryptic-temple-54361.herokuapp.com/"
);
const authProvider = () => Promise.resolve();

const history = createHashHistory();

const AdminPage = () => (
  <Provider
    store={createAdminStore({
      authProvider,
      dataProvider,
      history,
    })}
  >
    <Admin
      // authProvider={authProvider}
      dataProvider={dataProvider}
      // history={history}
      title="My Admin"
    >
      <Resource
        name="store1"
        list={ProductList}
        // create={PostCreate}
        // edit={PostEdit}
        // show={PostShow}
      />
      
    </Admin>
  </Provider>
);

export default AdminPage;