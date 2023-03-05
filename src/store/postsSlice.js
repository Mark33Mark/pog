import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

// ===============================================================
// ===============================================================

// Action / Reducer - Slices

// ===============================================================
// ===============================================================

const slice = createSlice({
  name: "posts",
  initialState: {
    list:[],
    loading: false,
    lastFetch: null,
  },

  reducers: {

    CREATE_POST: (posts, action) => {
      posts.list.push(action.payload);
    },

    DELETE_POST: (posts, action) => {
      const updatedPosts = posts.list.filter( post => post._id !== action.payload._id);
      posts.list = updatedPosts;
    },

    LIKE_POST: (posts, action) => {
      const index = posts.list.findIndex(
        post => post._id === action.payload._id
      );
      posts.list[index].likeCount = action.payload.likeCount;
    },

    RECEIVE_POSTS: (posts, action) => {
      posts.list = action.payload;
      posts.loading = false;
      posts.lastFetch = Date.now();
    },


    REQUEST_POSTS: (posts, action) => {
      posts.loading = true;
    },

    REQUEST_POSTS_FAILED: (posts, action) => {
      posts.loading = false;
    },

    UPDATE_POST: (posts, action) => {
      const index = posts.list.findIndex( post => post._id === action.payload._id);
      posts.list[index] = action.payload;
    },
  },
});

const {
  CREATE_POST,
  DELETE_POST,
  LIKE_POST,
  RECEIVE_POSTS,
  REQUEST_POSTS,
  REQUEST_POSTS_FAILED,
  UPDATE_POST,
} = slice.actions;

export default slice.reducer;

// ===============================================================
// ===============================================================

// Action Creators

// ===============================================================
// ===============================================================

export const loadPosts = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.posts;

  if (lastFetch) {
    const diffInSeconds = (Date.now() - lastFetch) / 1000;
    if (diffInSeconds < 5) {
      return;
    }
  }

  return dispatch(
    apiCallBegan({
      url: "getPosts",
      method: "GET",
      onStart: REQUEST_POSTS.type,
      onSuccess: RECEIVE_POSTS.type,
      onError: REQUEST_POSTS_FAILED.type,
    })
  );
};

export const createPost = post =>
  apiCallBegan({
    url: "createPost",
    method: "POST",
    data: post,
    onSuccess: CREATE_POST.type
  });

export const likePost = id =>
  apiCallBegan({
    url: "likePost",
    method: "PATCH",
    data: JSON.stringify(id),
    onSuccess: LIKE_POST.type,
  });

export const deletePost = id =>
  apiCallBegan({
    url: "deletePost",
    method: "DELETE",
    data: JSON.stringify(id),
    onSuccess: DELETE_POST.type,
  });

  export const updatePost = (updatedPost) =>
  apiCallBegan({
    url: "updatePost",
    method: "PATCH",
    data: JSON.stringify(updatedPost),
    onSuccess: UPDATE_POST.type,
  });

// ===============================================================
// ===============================================================

// Selector Functions - use cache memoization

// ===============================================================
// ===============================================================

export const getAllPosts = createSelector(
  (state) => state.entities.posts,
  (posts) => posts
);

export const findPost = (currentId) =>
  createSelector(
    (state) => state.entities.posts,
    (posts) =>
      currentId ? posts.list.find((message) => message._id === currentId) : null
  );
