import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
const Search = () => {

    const [data, setData] = useState([])

    const { search } = useLocation()
    const navigate = useNavigate()
    const params = new URLSearchParams(search)
    const keyword = params.get('keyword')

    useEffect(() => {
        fetch(`http://localhost:3500/search?keyword=${keyword}`)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                setData(res)
            })
            .catch(err => console.log(err.message))
    }, [])

    const handleBack = () => {
        navigate('/')
    }

    return (
        <div>
            <h2>Search Results are</h2>
            <button onClick={handleBack}>Go Back</button>
            <div>
                {
                    data.map((x, index) => (
                        <div key={index}>
                            <a href={x?.Result?.url} target="_blank">
                                <img src={x.imageUrl} />
                            </a>
                            <h1>{x.Result.name}</h1>
                            <h2>{x.headLine}</h2>
                            <p>{x.primaryText}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Search