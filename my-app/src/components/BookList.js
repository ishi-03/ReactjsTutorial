import React from "react";
import booklist from "../data/booklist"
function BookList (props) {


    return (<div> <table>
        <tr>
            <th>
                name
            </th>
            <th>
                author
            </th>
        </tr>
        {booklist.map((book) => {
        return ( 
        <tr>
            <td>
                 {book.name} 
            </td>
            <td>
                 {book.author}
            </td>
        </tr>)
    })} </table></div>)
}
export default BookList;


