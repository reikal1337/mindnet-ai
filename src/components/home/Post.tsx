import React from 'react'

type Props = {
    user: string,
    content: string,
    createdAt: string,
}

function Post({user, content, createdAt}: Props) {
  return (
    <>
    <br/>
    <div>
        <span>{user}</span>
        <p>{content}</p>
        <span>{createdAt}</span>
    </div>
    </>
  )
}

export default Post