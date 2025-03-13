//https://jsonplaceholder.typicode.com/todos

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import getAllPosts from "./postService";
import { addPosts } from "./postService";

function App() {
  const queryClient = useQueryClient();

  // FETCH data with Axios
  const { data, error, isError, isPending, isLoading } = useQuery({
    queryKey: "posts",
    queryFn: getAllPosts,
  });

  /*
  // FETCH data from API
  const { data, error, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/posts").then((res) =>
        res.json()
      ),

    // refetch the data if there is no change in the query (when new instance of the query is remounted or when we refocus the window or when the network is reconnected)
    // staleTime: 4000,

    // automatic refetch after a certain period of time
    // refetchInterval: 4000,
  });
*/

  //MUTATION Axios
  const { mutate } = useMutation({
    mutationFn: addPosts,
    onSuccess: () => {
      queryClient.invalidateQueries({ queries: ["posts"] });
    },
  });
  /*
  // MUTATION fetch

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: (newPost) =>
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify(newPost),
        //adding the content to the post
        headers: { "Content-type": "application/json; charset=UTF-8" },
      }).then((res) => res.json()),

    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queries: ["post"] });
    // },

    onSuccess: (newPost) => {
      // queryClient.invalidateQueries({ queries: ["post"] });

      // add manually a new post to the query cache
      queryClient.setQueryData(["posts"], (oldPosts) => [...oldPosts, newPost]);
    },
  });
*/
  if (error || isError) return <div>There was an error! </div>;

  if (isLoading) return <div>Data is Loading...</div>;

  const handleAllPosts = function () {
    mutate({
      userID: 5000,
      id: 4000,
      title: "This is a new post",
      body: "This is the body of a new post",
    });
  };

  return (
    <div className="App">
      {isPending && <p>DATA IS BEING ADDED...</p>}
      <button onClick={handleAllPosts}>Add Post</button>

      <div>
        {data?.map((todo) => (
          <ul>
            {" "}
            <li>ID:{todo.id}</li>
            <h4>TITLE:{todo.title}</h4>
            <p>{todo.body}</p>
          </ul>
        ))}
      </div>
    </div>
  );
}

export default App;
