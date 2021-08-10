import React, { useState } from 'react'

const EditUserForm = props => {
  const [user, setUser] = useState(props.currentUser)
  const handleInputChange = event => {
    const { name, value } = event.target
    setUser({ ...user, [name]: value })
  }

  return (
    <form
      onSubmit={event => {
        event.preventDefault()
        props.updateUser(user.id, user)
      }}>

      <label>AUTHOR NAME:</label>
        <input type="text" 
        name="author_name" 
        value={user.author_name} 
        onChange={handleInputChange} />

      <label>TITLE:</label>
        <input type="text" 
        name="title" 
        value={user.title} 
        onChange={handleInputChange} />

      <label>CONTENT:</label>
        <input type="text" 
        name="content" 
        value={user.content} 
        onChange={handleInputChange} />

        <button>Update</button>&nbsp;
        <button onClick={() => props.setEditing(false)} 
        className="button muted-button">
          Cancel
        </button>
    </form>
  )
}

export default EditUserForm