import React, { useState, useEffect } from "react";
import UserTable from "./containers/UserTable";
import AddUserForm from "./containers/AddUserForm";
import EditUserForm from "./containers/EditUserForm";

const baseUrl = "https://6263fed4c461.ngrok.io/api/v1/";

const App = () => {
  const [users, SetUserData] = useState([]);
  const [editing, setEditing] = useState(false);
  const initialFormState = { id: "", author_name: "", title: "", content: "" };
  const [currentUser, setCurrentUser] = useState(initialFormState);
  const [error, SetError] = useState("");
  const [isLoading, SetLoading] = useState(false);

  useEffect(() => {
    GetList();
  }, []);
  //User List get

  const GetList = () => {
    SetLoading(true);
    fetch(`${baseUrl}posts/`, {
      method: "GET",
      headers: {
        "access-control-allow-origin": "*",
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        if (res.status >= 400) {
          throw new Error("Server responds with error!");
        }
        return res.json();
      })
      .then(
        (data) => {
          SetUserData(data.response_data.post_listing);
          SetLoading(false);
        },
        (err) => {
          SetError(err);
        }
      );
  };
  const addUser = (user) => {
    // console.log(`add New one***********`, user)
    SetLoading(true);
    fetch(`${baseUrl}posts/`, {
      method: "POST",
      headers: {
        "access-control-allow-origin": "*",
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (res.status >= 400) {
          throw new Error("Server responds with error!");
        }
        return res.json();
      })
      .then(
        (data) => {
          console.log(`response add data`, data.response_data);
          if (data.response_code == 200) {
            SetUserData([...users, data.response_data]);
            SetLoading(false);
          }
        },
        (err) => {
          SetError(err);
        }
      );
  };

  const deleteUser = (id) => {
    SetLoading(true);
    fetch(`${baseUrl}posts/${id}`, {
      method: "DELETE",
      headers: {
        "access-control-allow-origin": "*",
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        if (res.status >= 400) {
          throw new Error("Server responds with error!");
        }
        return res.json();
      })
      .then(
        (data) => {
          console.log(`data of del`, data);
          if (data.response_code == 200) {
            SetUserData(users.filter((user) => user.id !== id));
            SetLoading(false);
          }
        },
        (err) => {
          SetError(err);
        }
      );
    //
  };

  const editRow = (userlist) => {
    setEditing(true);
    setCurrentUser({
      id: userlist.id,
      author_name: userlist.author_name,
      title: userlist.title,
      content: userlist.content,
    });
  };
  const updateUser = (id, updatedUser) => {
    setEditing(false);
    SetLoading(true);
    fetch(`${baseUrl}posts/${id}`, {
      method: "PUT",
      headers: {
        "access-control-allow-origin": "*",
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(updatedUser),
    })
      .then((res) => {
        if (res.status >= 400) {
          throw new Error("Server responds with error!");
        }
        return res.json();
      })
      .then(
        (data) => {
          console.log(`updated data`, data.response_data);
          if (data.response_code == 200) {
            SetUserData(
              users.map((user) =>
                user.id === data.response_data.id ? data.response_data : user
              )
            );
            SetLoading(false);
          }
        },
        (err) => {
          SetError(err);
        }
      );
  };
  if (error) {
    return "something went wrong...";
  }
  if (isLoading) {
    return "Loading...";
  }
  return (
    <div className="container-fluid">
      <div style={{ margin: 40 }}>
        <h1 style={{ textAlign: "center", textDecorationLine: "underline" }}>
          CRUD APP DEMO
        </h1>
        <div className="flex-row">
          <div className="flex-large">
            {editing ? (
              <div>
                <h2>EDIT USER</h2>
                <EditUserForm
                  setEditing={setEditing}
                  currentUser={currentUser}
                  updateUser={updateUser}
                />
              </div>
            ) : (
              <div>
                <h2>ADD USER</h2>
                <AddUserForm addUser={addUser} />
              </div>
            )}
          </div>
          <div className="flex-large">
            <h2>LIST OF USERS</h2>
            <UserTable
              userList={users}
              editRow={editRow}
              deleteUser={deleteUser}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
