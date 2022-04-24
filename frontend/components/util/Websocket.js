import SockJS from 'sockjs-client';

let sock = new SockJS('http://localhost:8080/api/ws');

export default sock;
