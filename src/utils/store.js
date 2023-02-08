import { create } from "zustand";
import axios from "../lib/axios";

export const useStore = create((set) => ({
  user: null,
  isRecruiter: false,
  companyId: null,

  getProfile: async () => {
    let res = await axios.get("/profile");
    console.log({ res });

    if (res) {
      set({
        user: res,
        isRecruiter: res.isRecruiter,
        companyId: res.company ? res.company.id : null,
      });
    } else {
      localStorage.removeItem("token");
    }
  },
}));
