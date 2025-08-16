import { create } from "zustand"
import axios from "axios";

const BASE_URL = process.env.NODE_ENV === "development"
    ? "https://the-wall-backend.onrender.com/api"
    : "/api";

// Configure axios to include cookies with requests
axios.defaults.withCredentials = true;

const usePostStore = create((set, get) => ({
    loading: false,
    error: null,
    posts: [],
    deleteMessage: null, // Add this for success message


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
    },
    deletePost: async (postId) => {
        try {
            const response = await axios.delete(`${BASE_URL}/post/delete-post/${postId}`);
            if (response.data?.success) {
                // Remove the post from the local store
                set((state) => ({
                    posts: state.posts.filter(post => post._id !== postId),
                    deleteMessage: "Post deleted successfully!" // Set success message
                }));
                
                // Import and update UserStore if available
                const { default: useUserStore } = await import('./UserStore');
                useUserStore.getState().removeUserPost(postId);
                
                // Clear message after 3 seconds
                setTimeout(() => {
                    set({ deleteMessage: null });
                }, 3000);
                
                return true;
            }
        } catch (error) {
            console.error("Delete error:", error.response?.data);
            get().postFetchFailure(error.response?.data?.message || 'Failed to delete post');
            return false;
        }
    },

    // Add method to clear delete message
    clearDeleteMessage: () => set({ deleteMessage: null })
}))

export default usePostStore;
