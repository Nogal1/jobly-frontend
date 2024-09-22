import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** Jobly API class.
 *
 *  This class contains methods for making HTTP requests to the backend.
 *  It handles things like user authentication, fetching companies, jobs,
 *  and applying to jobs.
 */
class JoblyApi {
  // Store the JWT token for API requests
  static token;

  /** Generic method for making requests to the API.
   *
   * @param {string} endpoint - The API endpoint (e.g., 'companies')
   * @param {object} [data={}] - Data to send with the request
   * @param {string} [method="get"] - HTTP method (e.g., 'get', 'post')
   */
  static async request(endpoint, data = {}, method = "get") {
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` }; // Pass token in headers
    const params = method === "get" ? data : {}; // For GET requests, data goes in params

    try {
      console.debug("API Call:", method, url, data); // Debugging log
      const response = await axios({ url, method, data, params, headers });
      return response.data;
    } catch (err) {
      console.error("API Error:", err);
      let message = err.response ? err.response.data.error.message : "Unknown Error";
      throw Array.isArray(message) ? message : [message];
    }
  }

  /** User login: get a token and store it */
  static async login(loginData) {
    const res = await this.request("auth/token", loginData, "post");
    JoblyApi.token = res.token; // Store token in JoblyAPI class
    return res.token;
  }

  /** User signup: register a new user and get a token */
  static async signup(signupData) {
    const res = await this.request("auth/register", signupData, "post");
    JoblyApi.token = res.token; // Store token in JoblyAPI class
    return res.token;
  }

  /** Get the current user's profile from the backend */
  static async getCurrentUser(username) {
    const res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Update user profile */
  static async updateProfile(username, data) {
    const res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

  /** Get list of companies */
  static async getCompanies() {
    const res = await this.request("companies");
    return res.companies;
  }

  /** Get details about a single company */
  static async getCompany(handle) {
    const res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get list of jobs */
  static async getJobs() {
    const res = await this.request("jobs");
    return res.jobs;
  }

 /** Apply to a job */
static async applyToJob(username, jobId) {
  const res = await this.request(`users/${username}/jobs/${jobId}`, {}, "post");
  return res.message;
  }
}

export default JoblyApi;
