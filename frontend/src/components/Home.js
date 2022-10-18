import React, { useState } from 'react'

const Home = () => {

    const [searchText, setSearchText] = useState("")

    const handleChange = e => {
        setSearchText(e.target.value)
    }

    const searchClick = () => {
        window.location.replace(`/search?keyword=${searchText}`)
    }

    return (
        <div>
            <h1 className='App-header'>Welcome to Talk Valley App</h1>
            <div className='fields'>
                <input type="text" onChange={handleChange} onKeyUp={e => {
                    if (e.key === 'Enter') {
                        searchClick()
                    }
                }} />
                <button onClick={searchClick}>Search</button>
            </div>
        </div>
    )
}

export default Home