import axios from 'axios'

export default ({req }) => {
    if (typeof window === 'undefined') {
        // We are on the server
        return axios.create({
          baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
          headers: req.headers 
          // { Host, cookie } is very important
          // this request is being made inside pod and destined to another network instance inside cluster
        });
      } else {
        // We must be on the browser
        return axios.create({
          baseUrl: '/'
        });
      }
}