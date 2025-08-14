import { create } from "zustand";

const usePostStore = create((set, get) => ({
  loader: false,
  postList: [],
  addPost: (post) =>
    set((state) => ({ postList: [post, ...state.postList] })),
  removePost: (postId) =>
    set((state) => ({
      postList: state.postList.filter((post) => post.id !== postId),
    })),
  fetchInitialPosts: async () => {
    if (get().loader) return;
    set({ loader: true });
    try {
      const res = await fetch("https://dummyjson.com/posts?limit=14");
      const data = await res.json();
      set({ postList: data?.posts || [] });
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    } finally {
      set({ loader: false });
    }
  },
}));

export default usePostStore;