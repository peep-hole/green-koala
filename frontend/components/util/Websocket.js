import SockJS from 'sockjs-client';

let sock = new SockJS('http://localhost:8080/ws');

export default sock;
