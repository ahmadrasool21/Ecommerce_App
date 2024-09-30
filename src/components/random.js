import React, { useState, useEffect } from 'react';
const App = () => {
const [title, setTitle] = useState('');
const [body, setBody] = useState('');
// ...
const addPosts = async (title, body) => {
   await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
         title: title,
         body: body,
         userId: Math.random().toString(36).slice(2),
      }),
      headers: {
         'Content-type': 'application/json; charset=UTF-8',
      },
   })
      .then((response) => response.json())
      .then((data) => {
         setPosts((posts) => [data, ...posts]);
         setTitle('');
         setBody('');
      })
      .catch((err) => {
         console.log(err.message);
      });
};

const handleSubmit = (e) => {
   e.preventDefault();
   addPosts(title, body);
}
}   
