import axios from 'axios';

//workaround for running with expo on the phone until backend is hosted somewhere:
//install localtunnel, then start backend and run 'lt --port 8080', then replace the link below with the generated one

//localhost should work with Android emulator and on web

export default axios.create({
    baseURL: `https://dirty-spiders-swim-89-64-36-135.loca.lt/api`,
});
