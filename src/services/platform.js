import axios from "axios"

export const fetchProblem = (name)=>{
    return (
        axios.post('https://leetcode-backend-j7gg.onrender.com/problem/generate-problem',{"name": name})
        // axios.post('http://localhost:4500/problem/generate-problem',{"name": name})
       .then(res =>  res)
       .catch(err => err )
    )
}

export const postCode = ( payload )=>{
    return (
        axios.post('https://leetcode-backend-j7gg.onrender.com/run-code/',payload)
        // axios.post('http://localhost:4500/run-code/',payload)
        .then(res => res)
        .catch(err => err)
    )
}
