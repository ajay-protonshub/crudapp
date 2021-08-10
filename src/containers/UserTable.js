import React from 'react'

const UserTable = (props) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Author Name</th>
                    <th>Title</th>
                    <th>Content</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.userList.map(userlist => (
                        <tr key={userlist.id}>
                            <td>{userlist.author_name}</td>
                            <td>{userlist.title}</td>
                            <td>{userlist.content}</td>
                            <td>
                                <button onClick={() =>{props.editRow(userlist)}} className="button muted-button">Edit</button>&nbsp;
                                <button onClick={()=>props.deleteUser(userlist.id)} className="button muted-button">Delete</button>
                            </td>
                        </tr>
                    ))
                }

            </tbody>
        </table>
    )
}

export default UserTable
