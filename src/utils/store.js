import { create } from "zustand";
import axios from "../lib/axios";

export const useStore = create((set) => ({
  user: null,
  isRecruiter: false,

  getProfile: async () => {
    let res = await axios.get("/profile");
    console.log({ res });
    if (res)
      set({
        user: res,
        isRecruiter: res.isRecruiter,
      });
    else {
      localStorage.removeItem("token");
    }
  },
}));
