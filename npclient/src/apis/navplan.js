import axios from 'axios';

const {protocol, hostname, port} = window.location;
console.log(`Creating axios client at baseURL \`${protocol}//${hostname}:${port}/api/v1/\``);
export default axios.create({
    baseURL: `${protocol}//${hostname}:${port}/api/v1/`
});

// class NpAPI {
//     api = this.create_anon_api();
//
//     create_anon_api = () => axios.create({
//         baseURL: `${protocol}//${hostname}:${port}/api/v1/`
//     });
//
//
// }