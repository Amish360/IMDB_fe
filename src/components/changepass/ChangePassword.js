import React, { useState } from "react";

function ChangePassword (){

    const[newpassword,setNewpassword] =  useState('');
    const[retypenewpass,setRetypenewpass] =  useState('');
    return(
        <div>
            <form>
                <label>Enter new password:</label>
                <input type="password" value={newpassword} onChange={setNewpassword} placeholder="new-password"/>
                <br/>
                <label>Confirm Password:</label>
                <input type="password" value={retypenewpass} onChange={setRetypenewpass} placeholder="new-password"/>
                <br/>

                <button type="submit">Change Password</button>
            </form>
        </div>
    )
};




export default ChangePassword;