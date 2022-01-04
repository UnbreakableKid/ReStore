import axios, { AxiosError, AxiosResponse } from "axios";
import { history } from "..";

axios.defaults.baseURL = "http://localhost:5034/api/";
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

//delay request for testing purposes only
const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));
axios.interceptors.response.use(
  async (response) => {
    await sleep();
    return response;
  },
  (error: AxiosError) => {
    const { data, status } = error.response!;

    switch (status) {
      case 400:
        if (data.errors) {
          const modelState: string[] = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modelState.push(data.errors[key]);
            }
          }
          throw modelState.flat();
        }
        break;

      case 401:
        break;

      case 404:
        break;

      case 500:
        history.push({
          pathname: "/server-error",
          state: { error: data },
        });
        break;

      default:
        break;
    }

    return Promise.reject(error.response);
  }
);

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Catalog = {
  list: () => requests.get("products"),
  details: (id: number) => requests.get(`products/${id}`),
  fetchFilters: () => requests.get("products/filters"),
};

const TestErrors = {
  get400Error: () => requests.get("buggy/bad-request"),
  get401Error: () => requests.get("buggy/unauthorized"),
  get404Error: () => requests.get("buggy/not-found"),
  get500Error: () => requests.get("buggy/server-error"),
  getValidationError: () => requests.get("buggy/validation-error"),
};

const Basket = {
  get: () => requests.get("basket"),
  addItem: (productId: number, quantity = 1) =>
    requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
  removeItem: (productId: number, quantity = 1) =>
    requests.delete(`basket?productId=${productId}&quantity=${quantity}`),
};

const agent = {
  Catalog,
  TestErrors,
  Basket,
};

export default agent;
