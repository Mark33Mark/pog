import axios from 'axios';

// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: amount }), 1000)
  );
}

export const fetchPosts = () => axios.get('/.netlify/functions/getPosts');