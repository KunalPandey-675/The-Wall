import { create } from "zustand"
import axios from "axios";

const BASE_URL = process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api"
    : "/api";

// Configure axios to include cookies with requests
axios.defaults.withCredentials = true;

const usePostStore = create((set, get) => ({
    loading: false,
    error: null,
    posts: [],


    postFetchingStart: () => { set({ loading: true, error: null }) },
    postFetchingSuccess: (posts) => {
        const sortedPosts = [...posts].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        set({ posts: sortedPosts, loading: false });
    },
    postFetchFailure: (error) => set({ loading: false, error }),

    fetchPost: async () => {
        get().postFetchingStart()
        try {
            const response = await axios.get(`${BASE_URL}/post/all-posts`)
            if (response.data?.success) {
                get().postFetchingSuccess(response.data.data)
            } else {
                get().postFetchFailure('Failed to load Posts')
            }
        } catch (error) {
            console.error("Post Fetching Error:", error.response?.data);
            set({ error: error.response?.data?.message || 'Post Fetching Failed' });
        } finally {
            set({ loading: false });
        }
    },

    likePost: async (postId) => {
        try {
            // No need for auth headers - cookies will be sent automatically
            const response = await axios.patch(`${BASE_URL}/post/like-post/${postId}`);

            if (response.data?.success) {
                // Update the post in the store
                const { posts } = get();
                const updatedPosts = posts.map(post => 
                    post._id === postId 
                        ? { ...post, likes: response.data.data.likes }
                        : post
                );
                set({ posts: updatedPosts });
                return response.data.data.isLiked;
            }
        } catch (error) {
            console.error("Like error:", error.response?.data);
            get().postFetchFailure(error.response?.data?.message || 'Failed to like post');
        }
    }
}))

export default usePostStore;
