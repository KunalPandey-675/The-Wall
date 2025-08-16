import { create } from "zustand"
import axios from "axios";

const BASE_URL = process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api"
    : "/api";

const usePostStore= create((set, get) => ({
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
            console.error("Post Creation Error:", error.response?.data);
            set({ error: error.response?.data?.message || 'Post Creation Failed' });
        } finally {
            set({ loading: false });
        }
    }
}))

export default usePostStore;
