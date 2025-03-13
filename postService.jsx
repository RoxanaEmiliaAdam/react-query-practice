import axios from "axios";

export default async function getAllPosts() {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  return data;
}

export async function addPosts(newPost) {
  const response = await axios.post(
    "https://jsonplaceholder.typicode.com/posts",
    newPost
  );
  return response.data;
}
