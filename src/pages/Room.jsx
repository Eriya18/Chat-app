
  import React, {useState, useEffect} from 'react'
  import client, {databases, DATABASE_ID, COLLECTION_ID_MESSAGES} from '../appWriteConfig'
  import { ID, Query, Role, Permission} from 'appwrite'
  import {Trash2} from 'react-feather'
  import Header from '../components/Header'
import { useAuth } from '../utils/AuthContext'

  const Room = () => {
      const {user}= useAuth()
      const [messages, setMessages]= useState([])
      const [messageBody, setMessageBody]= useState('')

      useEffect(()=>{
              getMessages()

            const unsubscribe=  client.subscribe(`databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGES}.documents`, response => {
                // Callback will be executed on changes for documents A and all files.

                if(response.events.includes( "databases.*.collections.*.documents.*.create",)){
                  console.log('A message was created')
                  setMessages([prevState=>[response.payload, ...prevState]])
                }

                if(response.events.includes( "databases.*.collections.*.documents.*.delete",)){
                  console.log('A message was deleted')
                   setMessages(prevState=> messages.filter(message=>message.$id!==response.payload.$id))
                }
              });

              return()=>{
                  unsubscribe()
              }
      }, [])

      const getMessages= async ()=>{
        const response= await databases.listDocuments(
            DATABASE_ID, 
            COLLECTION_ID_MESSAGES,
          [
            Query.orderDesc('$createdAt'),
            Query.limit(50),
          ]
        );
        console.log("RESPONSE:", response);
        setMessages(response.documents)
    }

      const handleSubmit= async (e)=>{
        e.preventDefault()

        let payload = {
              user_id: user.$id,
              username:user.name,
              body:messageBody
        }

        let permissions=[
            Permission.write(Role.user(user.$id))

        ]

        let response=await databases.createDocument(
          DATABASE_ID,
          COLLECTION_ID_MESSAGES,
          ID.unique(),
          payload,
          permissions
        )
        console.log('Created!', response)
        // setMessages([prevState=>[response, ...prevState]])
        setMessageBody('')
      }

    
      
      
      const deleteMessage= async(message_id)=>{
        databases.deleteDocument(DATABASE_ID, COLLECTION_ID_MESSAGES,message_id)
        // setMessages(prevState=> messages.filter(message=>message.$id!==message_id))
       
      }










    return (
      <main className="container">
        <Header/>
        <div className="room--container">

          <form onSubmit={handleSubmit} id='message--form'>
            <div>
              <textarea required maxLength={1000} placeholder='Say Something...' onChange={(e)=>{setMessageBody(e.target.value)}}
              value={messageBody}>
              </textarea>
            </div>

            <div className='send-btn--wrapper'>
              <input className="btn btn--secondary" type="submit" value="Send"/>
            </div>
          </form>

          <div>
            {messages.map((message) => (
              <div key={message.$id} className='message--wrapper'>
                <div className='message--header'>
                  <p>
                    {message?.username? (
                        <span>{message?.username}</span>
                    ):(
                      <span>Anonymous User</span>
                    )}
                    <small className='message-timestamp'>{new Date(message.$createdAt).toLocaleString()}</small>
                  </p>

                  {message.$permissions.includes(`delete(\"user:${user.$id}\")`) &&(
                       <Trash2 className='delete--btn'
                       onClick={()=>{deleteMessage(message.$id)}}/>
                  )
                  }
                </div>

                <div className={"message--body" + (message.user_id === user.$id ? ' message--body--owner' : '')}>
                  <span>{message.body}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  export default Room