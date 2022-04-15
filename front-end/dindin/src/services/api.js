import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
});

// https://desafio-backend-03-dindin.herokuapp.com/
//http://localhost:8000
