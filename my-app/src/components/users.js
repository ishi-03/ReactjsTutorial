import React from "react";
import user1 from "../data/user1"
function Users (props) {
   
    return (<div> <table>
        {user1.map((user) => {
        return ( 
        <tr>
            <td>
                name: {user.name} 
            </td>
            <td>
                author: {user.age}
            </td>
        </tr>)
    })} </table></div>)
}
export default Users;

