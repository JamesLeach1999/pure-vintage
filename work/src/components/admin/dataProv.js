import { fetchUtils } from "react-admin";
import { stringify } from "query-string";

const apiUrl = "https://cryptic-temple-54361.herokuapp.com";

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
    });
  }
  // add your own headers here
  options.headers.set(
    "X-Custom-Header",
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Origin",
    "*"
  );
  //console.log('4 options: ', options);
  return fetchUtils.fetchJson(url, options);
};
// var dataProvider
export const dataProv = {
  getList: async (resource, params) => {
    const url = `${apiUrl}/${resource}`;
    //console.log('url: ', url);
    console.log(url);
    var results = await fetch(url);

    var resJson = await results.json();
    console.log(resJson.names[0]);
    var responseJson = [];
    resJson.names.map(
      ({
        _id,
        name,
        image,
        brand,
        price,
        category,
        description,
        size,
        featured,
        gender,
        inStock,
      }) => {
        responseJson.push({
          id: _id,
          name,
          image,
          brand,
          price,
          category,
          description,
          size,
          featured,
          gender,
          inStock,
        });
      }
    );

    return httpClient(url).then(({ headers, json }) => ({
      data: responseJson,
      total: 10,
      //   total: parseInt(headers.get('content-range').split('/').pop(), 10),
    }));
  },

  getOne: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
      data: json,
    })),

  getMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    return httpClient(url).then(({ json }) => ({ data: json }));
  },

  getManyReference: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify({
        ...params.filter,
        [params.target]: params.id,
      }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return httpClient(url).then(({ headers, json }) => ({
      data: json,
      total: parseInt(headers.get("content-range").split("/").pop(), 10),
    }));
  },

  update: (resource, params) => {
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json }));
  },
  updateMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json }));
  },

  create: (resource, params) =>
    httpClient(`${apiUrl}/${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({
      data: { ...params.data, id: json.id },
    })),

  delete: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "DELETE",
    }).then(({ json }) => ({ data: json })),

  deleteMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
      method: "DELETE",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json }));
  },
};
