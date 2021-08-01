import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import API, {baseUrl} from "../constants/API";


export interface TopstoriesResponse {
  [index: number]: string
}

export interface ItemKids {
  [index: number]: string
}

export interface ItemResponse {
  "by": string,
  "descendants": number,
  "id": number,
  "kids": ItemKids,
  "score": number,
  "time": number,
  "title": string,
  "type": string,
  "url": string,
}

export interface UserSubmited {
  [index: number]: number
}

export interface UserResponse {
  "created": number,
  "id": string,
  "karma": number,
  "submitted": UserSubmited,
}


export const hackersApi = createApi({
  reducerPath: 'hackersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  tagTypes: ['hackers'],

  endpoints: (build) => ({
    getTopstories: build.query<TopstoriesResponse, void>({
      query: () => API.topstories + '.json',
    }),
    getItem: build.query<ItemResponse, string>({
      query: (id: string) => API.item + id + '.json',
    }),
    getUser: build.query<UserResponse, string>({
      query: (id: string) => API.user + id + '.json',
    }),
  }),

})

export const {
  useGetTopstoriesQuery,
  useGetItemQuery,
  useGetUserQuery,
}: any = hackersApi
