import { create } from "zustand"
import axios from "axios";

const BASE_URL = process.env.NODE_ENV === "development"
    ? "https://the-wall-backend.onrender.com/api"
    : "/api";

const useUserStore = create((set, get) => ({
    isAuthenticated: false,
    user: null,
    loading: false,
    postsLoading: false,
    error: null,
    formData: null,
    userPosts: [],

    setFormDataStore: (data) => {
        set({ formData: data })
    },

    loginStart: () => { set({ loading: true, error: null }) },
    loginSuccess: (user) => set({ isAuthenticated: true, user, loading: false }),
    loginFailure: (error) => set({ loading: false, error }),

    postFetchStart: () => { set({ postsLoading: true, error: null }) },
    postFetchSuccess: (userPosts) => set({ userPosts, postsLoading: false }),
    postFetchFailure: (error) => set({ postsLoading: false, error }),

    checkAuth: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`${BASE_URL}/auth/check`, {
                withCredentials: true,
            });

            const { success, data } = response.data;

            if (success && data) {
                set({
                    isAuthenticated: true,
                    user: data,
                    loading: false,
                });
            } else {
                console.warn("⚠️ Auth check failed:", response.data);
                set({ isAuthenticated: false, user: null, loading: false });
            }
        }
        catch (error) {
            if (error.response?.status === 401 || error.response?.status === 403) {
                console.log("🚫 Token invalid or user not logged in");
            } else {
                console.error("❌ Unexpected error in checkAuth:", error);
            }
            set({ isAuthenticated: false, user: null, loading: false });
        }
    },

    logout: async () => {
        try {
            await axios.post(`${BASE_URL}/user/logout`, {}, {
                withCredentials: true,
            });
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            set({
                isAuthenticated: false,
                user: null,
                loading: false,
                error: null,
                formData: null
            });
        }
    },

    signUp: async (credentials, navigate) => {
        set({ loading: true, error: null })
        try {
            const response = await axios.post(`${BASE_URL}/user/sign-up`, credentials, { withCredentials: true })
            console.log(response.data.data);
            if (response.data?.success) {
                get().loginSuccess(response.data.data);
                navigate('/')
            }
        } catch (error) {
            console.error("Sign Up error:", error.response?.data);
            set({ error: error.response?.data?.message || error.message || 'Sign Up failed' });
        } finally {
            set({ loading: false });
        }

    },
    sendOTP: async (email, navigate) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.post(`${BASE_URL}/user/send-otp`, { email });
            if (response.data?.success) {
                navigate('/otp');
                return true;
            }
            return false;
        } catch (error) {
            set({ error: error.response?.data?.message || 'Failed to send OTP' });
            return false;
        } finally {
            set({ loading: false });
        }
    },
    signIn: async (credentials, navigate) => {
        set({ loading: true, error: null })
        try {
            const response = await axios.post(`${BASE_URL}/user/sign-in`, credentials, {
                withCredentials: true,
            })
            if (response.data?.success) {
                get().loginSuccess(response.data.data);
                navigate('/')
            }
        } catch (error) {
            console.error("Login error:", error.response?.data);
            set({ error: error.response?.data?.message || 'Login failed' });
        } finally {
            set({ loading: false });
        }

    },
    createPost: async (postData, navigate) => {
        set({ loading: true, error: null })
        try {
            const response = await axios.post(`${BASE_URL}/post/create-post`, postData, {
                withCredentials: true,
            })
            if (response.data?.success) {
                navigate('/');
                return { success: true, data: response.data.data };
            } else {
                return { success: false };
            }
        } catch (error) {
            console.error("Post Creation Error:", error.response?.data);
            set({ error: error.response?.data?.message || 'Post Creation Failed' });
            return { success: false };
        } finally {
            set({ loading: false });
        }

    },
    myPosts: async () => {
        get().postFetchStart();
        try {
            const response = await axios.get(`${BASE_URL}/user/my-posts`, {
                withCredentials: true,
            });
            if (response.data?.success) {
                get().postFetchSuccess(response.data.data);
            } else {
                get().postFetchFailure('Failed to fetch posts');
            }
            console.log('posts', response.data);
        } catch (error) {
            console.error("Post fetch Error:", error.response?.data);
            get().postFetchFailure(error.response?.data?.message || 'Post Fetch Failed');
        }
    },
    removeUserPost: (postId) => {
        set((state) => ({
            userPosts: state.userPosts.filter(post => post._id !== postId),
            user: state.user ? {
                ...state.user,
                postsCreated: state.user.postsCreated.filter(id => id !== postId)
            } : null
        }));
    },
}))
export default useUserStore;
