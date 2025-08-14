import { create } from "zustand"
import axios from "axios";

const BASE_URL = process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api"
    : "/api";

const useUserStore = create((set, get) => ({
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
    formData: null,
    userPosts: [],

    setFormDataStore: (data) => {
        set({ formData: data })
    },

    loginStart: () => { set({ loading: true, error: null }) },
    loginSuccess: (user) => set({ isAuthenticated: true, user, loading: false }),
    loginFailure: (error) => set({ loading: false, error }),

    postFetchStart: () => { set({ loading: true, error: null }) },
    postFetchSuccess: (userPosts) => set({ userPosts, loading: false }),
    postFetchFailure: (error) => set({ loading: false, error }),
    checkAuth: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`${BASE_URL}/auth/check`, {
                withCredentials: true,
            });

            const { success, data } = response.data;

            if (success && data) {
                console.log("✅ Authenticated user:", data);
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
            const response = await axios.post(`${BASE_URL}/user/sign-up`, credentials)
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
            console.log(response.data.data);
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
            console.log(response.data.data);
            if (response.data?.success) {
                navigate('/')
            }
        } catch (error) {
            console.error("Post Creation Error:", error.response?.data);
            set({ error: error.response?.data?.message || 'Post Creation Failed' });
        } finally {
            set({ loading: false });
        }

    },
    myPosts: async () => {
        set({ loading: true, error: null })
        try {
            const response = await axios.get(`${BASE_URL}/user/my-posts`, {
                withCredentials: true,
            })
            if (response.data?.success) {
                get().postFetchSuccess(response.data.data); // Now correctly expects data
            } else {
                get().postFetchFailure('Failed to fetch posts');
            }
            console.log('posts', response.data)
        } catch (error) {
            console.error("Post fetch Error:", error.response?.data);
            get().postFetchFailure(error.response?.data?.message || 'Post Fetch Failed');
        } finally {
            set({ loading: false }); 
        }
    }
}))
export default useUserStore;
