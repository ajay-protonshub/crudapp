import React, { useState } from 'react'

const AddUserForm = (props) => {
    const initialFormState = { id: '', author_name: '', title: '', content:''}
    const [user, setUser] = useState(initialFormState)

    const handleInputChange = event => {
        const { name, value } = event.target
        setUser({ ...user, [name]: value })
    }

    return (
        <form
            onSubmit={event => {
                event.preventDefault()
                if (!user.author_name || !user.title || !user.content) return
                props.addUser(user)
                setUser(initialFormState)
            }}
        >
            <label>AUTHOR NAME:</label>
            <input type="text" name="author_name" value={user.author_name} onChange={handleInputChange} required  />
            <label>TITLE:</label>
            <input type="text" name="title" value={user.title} onChange={handleInputChange} required />
            <label>CONTENT:</label>
            <input type="text" name="content" value={user.content} onChange={handleInputChange} required />
            <button>Save</button>
        </form>
    )
}

export default AddUserForm
