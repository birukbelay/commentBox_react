import JwtService from "./jwt.service";
import axios, { AxiosRequestConfig } from "axios";
import {API_URL} from "./config";

export const axiosClient = axios.create({
  baseURL: API_URL
});

const ApiService = {
  setHeader() {
    axiosClient.defaults.headers[
        "Authorization"
        ] = `Bearer ${JwtService.getToken()}`;
  },

  query(resource: string, params: AxiosRequestConfig | undefined) {
    return axiosClient.get(resource, params).catch((error) => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },

  get(resource, slug = "") {
    return axiosClient.get(slug ? `${resource}/${slug}` :`${resource}`).catch((error) => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },

  post(resource, params?: any) {
    return axiosClient.post(`${resource}`, params);
  },

  update(resource, slug, params) {
    return axiosClient.put(`${resource}/${slug}`, params).catch((error) => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },

  put(resource, params) {
    return axiosClient.put(`${resource}`, params).catch((error) => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },

  delete(resource) {
    return axiosClient.delete(resource).catch((error) => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  }
};

export default ApiService;

export const TagsService = {
  get:()=> ApiService.get("tags") };

const users = {
  delete: id => ApiService.delete(`/users/${id}`),
  get: id => ApiService.get(id ? `/users/${id}` : '/users'),
  update: (id, updates) => ApiService.put(`/users/${id}`, updates),
  create: user => ApiService.post('/users', user),
}

export const QuestionService = {
  query(params) {
    return ApiService.query("questions" , {params: params});
  },
  get:(slug) => ApiService.get("questions", slug),
  create:(params) =>  ApiService.post("questions", { article: params }),
  update:(slug, params)=> ApiService.update("questions", slug, { article: params }),
  delete:(slug) => ApiService.delete(`questions/${slug}`),
};

export const CommentsService = {
  get(slug) {
    if (typeof slug !== "string") {
      throw new Error(
        "[RWV] CommentsService.get() article slug required to fetch comments"
      );
    }
    return ApiService.get("articles", `${slug}/comments`);
  },
  post:(slug, payload) => ApiService.post(`articles/${slug}/comments`, {comment: { body: payload }}),
  delete:(slug, commentId) => ApiService.delete(`articles/${slug}/comments/${commentId}`)
};

export const FavoriteService = {
  add(slug) {
    return ApiService.post(`articles/${slug}/favorite`);
  },
  remove(slug) {
    return ApiService.delete(`articles/${slug}/favorite`);
  }
};
