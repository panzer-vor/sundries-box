import axios from 'axios'


export function httpPost(url,ajaxData,cb) {

  axios.post(process.env.HOST+url,ajaxData).then((res)=>{
    cb(res.data)||cb
  })
}

export function httpGet(url,ajaxData,cb=()=>{}) {
  axios.get(url,ajaxData).then((res)=>{
    cb(res.data)||cb
  })
}

export function httpBinaryPost(url,ajaxData,cb) {
  axios.post(process.env.HOST+url,ajaxData).then((res)=>{
    cb(res.data)||cb
  })
}
