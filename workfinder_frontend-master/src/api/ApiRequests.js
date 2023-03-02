import axios from "axios";

export const API_URL = "http://127.0.0.1:8001/api";
export const API_URL_LOGIN = `${API_URL}/login/`;
export const API_URL_SIGNUP = `${API_URL}/signup/`;
export const API_URL_COMPANY_INFO = `${API_URL}/company-info/`;
export const API_URL_STUDENT_INFO = `${API_URL}/student-info/`;
export const API_URL_FACTORY_POSITION = `${API_URL}/factory-position/`;
export const API_URL_REMOVE_FACTORY_POSITION = `${API_URL}/student-info/remove_factory_position/`;

export const API_URL_COMPANY_POSITION = `${API_URL}/company-position/`;
export const API_URL_COMPANY_POSITION_AVAILIABLE = `${API_URL_COMPANY_POSITION}get_available/`;

axios.defaults.headers["Authorization"] = `Token ${localStorage.getItem(
  "token"
)}`;
axios.defaults.headers.post["Content-Type"] = "application/json";

export const ApiService = {
  register: (data) => {
    return axios.post(API_URL_SIGNUP, data, { headers: { Authorization: "" } });
  },

  login: (data) => {
    return axios.post(API_URL_LOGIN, data, { headers: { Authorization: "" } });
  },

  patchCompanyInfo: (data) => {
    return axios.patch(
      `${API_URL_COMPANY_INFO}${localStorage.getItem("related_id")}/`,
      data
    );
  },
  getCompanyInfo: () => {
    return axios.get(
      `${API_URL_COMPANY_INFO}${localStorage.getItem("related_id")}/`);
  },
  patchStudentInfo: (data) => {
    return axios.patch(
      `${API_URL_STUDENT_INFO}${localStorage.getItem("related_id")}/`,
      data
    );
  },
  getStudentInfo: () => {
    return axios.get(
      `${API_URL_STUDENT_INFO}${localStorage.getItem("related_id")}/`);
  },
  getFactoryPositions: () => {
    return axios.get(API_URL_FACTORY_POSITION);
  },
  getFactoryPositionDetail: (id) => {
    return axios.get(`${API_URL_FACTORY_POSITION}${id}/`);
  },
  getFactoryPositionAppliedStudents: (id) => {
    return axios.get(`${API_URL_FACTORY_POSITION}${id}/get_applied_students/`);
  },
  removeFactoryPosition: () => {
    return axios.post(API_URL_REMOVE_FACTORY_POSITION);
  },
  addFactoryPosition: (id) => {
    return axios.post(`${API_URL_FACTORY_POSITION}${id}/add_factory_position/`);
  },
  getCompanyAvailiablePositions: () => {
    return axios.get(API_URL_COMPANY_POSITION_AVAILIABLE);
  },
  getCompanyPositionDetail: (id) => {
    return axios.get(`${API_URL_COMPANY_POSITION}${id}/detailed/`);
  },
  addCompanyPosition: (id) => {
    return axios.post(`${API_URL_COMPANY_POSITION}${id}/apply/`);
  },
  getAppliedStudents: (id) => {
    return axios.get(`${API_URL_COMPANY_POSITION}${id}/applied_students/`);
  },
  getCompanyPositionsForCompany: () => {
    return axios.get(API_URL_COMPANY_POSITION);
  },
  getCompanyPositionForCompanyDetail: (id) => {
    return axios.get(`${API_URL_COMPANY_POSITION}${id}/`);
  },
  createCompanyPosition: (data) => {
    return axios.post(API_URL_COMPANY_POSITION, data);
  },
  deleteCompanyPosition: (id) => {
    return axios.delete(`${API_URL_COMPANY_POSITION}${id}/`);
  },
};
