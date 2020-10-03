import axios from 'axios';

const {protocol, hostname, port} = window.location;
const navplanapi = axios.create({
    baseURL: `${protocol}//${hostname}:${port}/api/v1/`
});
export default navplanapi
