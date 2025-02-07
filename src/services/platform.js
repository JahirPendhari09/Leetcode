import axios from "axios"

const base_url = 'https://leetcode-backend-j7gg.onrender.com'
// const base_url = 'http://localhost:4600'

// fetch problem from backend
export const fetchProblem = (name)=>{
    return (
        axios.post(` ${base_url}/problem/generate-problem`, {"name": name})
       .then(res =>  res)
       .catch(err => err )
    )
}

// verify the user code
export const postCode = ( payload )=>{
    return (
        axios.post(`${base_url}/run-code/`, payload)
        .then(res => res)
        .catch(err => err)
    )
}
