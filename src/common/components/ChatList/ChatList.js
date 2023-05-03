import React, { useState,useEffect } from 'react'
import './ChatList.css'

const ChatList = ({id,name,setchatId,email}) => {

    return (
        <div onClick={()=> setchatId(id)} className="sidebarChat">
            <div className="sidebar_chat_info">
                <h2>{name}</h2>
                <p>{email}</p>
            </div>
        </div>
    )
}

export default ChatList
