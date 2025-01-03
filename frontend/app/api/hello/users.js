import axios from "axios";
import axiosInstance from "./axios.js";
export const signup = async ({ name, email, password }) => {
  try {
    const { data } = await axios.post("http://127.0.0.1:8000/api/user/register/", {
      name,
      email,
      password,
    });
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const login = async ({ email, password }) => {
  try {
    const { data } = await axiosInstance.post("http://127.0.0.1:8000/api/user/login/token/", {
      email,
      password,
    });
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};


export const logoutreq = async ({}) => {
  try {
    const { data } = await axiosInstance.post("http://127.0.0.1:8000/api/user/logout/");
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const getUserProfile = async ({}) => {
 
  try {
    const { data } = await axiosInstance.get("http://127.0.0.1:8000/api/user/profile/");
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const updateProfile = async ({ userData, userId }) => {
  try {
    
    const { data } = await axiosInstance.put(
      `http://127.0.0.1:8000/api/user/updateProfile/${userId}/`,
      userData
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const updateProfilePicture = async ({formData }) => {
  
  try {
    

    const { data } = await axiosInstance.put(
      "http://127.0.0.1:8000/api/user/profile/updateProfilePicture",
      formData,
      {headers:{
        "Content-Type": "multipart/form-data",
        
      }}
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const getAllUsers = async (
  token,
  searchKeyword = "",
  page = 1,
  limit = 10
) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data, headers } = await axios.get(
      `/api/users?searchKeyword=${searchKeyword}&page=${page}&limit=${limit}`,
      config
    );
    return { data, headers };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const deleteUser = async ({ slug, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.delete(`/api/users/${slug}`, config);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
