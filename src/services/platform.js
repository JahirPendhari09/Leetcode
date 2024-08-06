import axios from "axios"

export const fetchProblem = (topic)=>{
    return (
        axios.post('http://127.0.0.1:5000/questions/generate-coding-question',{"topic": topic})
       .then(res =>  res)
       .catch(err => err )
    )
}

export const postCode = ( payload )=>{
    return (
        axios.post('http://127.0.0.1:5000/run-code/',payload)
        .then(res => res)
        .catch(err => err)
    )
}
