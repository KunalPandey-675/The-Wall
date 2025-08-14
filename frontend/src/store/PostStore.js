import { create } from "zustand"
import axios from "axios";

const BASE_URL = process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api"
    : "/api";
