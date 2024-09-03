import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Input} from "@/components/ui/input.js";
import {Label} from "@/components/ui/label.js";
import {Button} from "@/components/ui/button.js";
import {Textarea} from "@/components/ui/textarea.tsx";

const PostCreate = () => {
  const [title, setTitle] = useState('');
  const [nickname, setNickname] = useState('');
  const [dogName, setDogName] = useState('');
  const [dogAge, setDogAge] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postDTO = {
      title: title,
      nickname: nickname,
      dogName: dogName,
      dogAge: parseInt(dogAge, 10),
      location: location,
      message: message,
    };

    const requestData = {
      post: postDTO,
      password: password,
    };

    try {
      await axios.post('http://localhost:8080/v1/posts', requestData);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
      <div className="max-w-2xl mx-auto p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-6">Create Post</h1>
        {error && <p className="text-red-500 mb-4">Error: {error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</Label>
            <Input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="mt-1 block w-full"
            />
          </div>
          <div>
            <Label htmlFor="nickname" className="block text-sm font-medium text-gray-700">Nickname</Label>
            <Input
                id="nickname"
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                required
                className="mt-1 block w-full"
            />
          </div>
          <div>
            <Label htmlFor="dogName" className="block text-sm font-medium text-gray-700">Dog Name</Label>
            <Input
                id="dogName"
                type="text"
                value={dogName}
                onChange={(e) => setDogName(e.target.value)}
                required
                className="mt-1 block w-full"
            />
          </div>
          <div>
            <Label htmlFor="dogAge" className="block text-sm font-medium text-gray-700">Dog Age</Label>
            <Input
                id="dogAge"
                type="number"
                value={dogAge}
                onChange={(e) => setDogAge(e.target.value)}
                required
                className="mt-1 block w-full"
            />
          </div>
          <div>
            <Label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</Label>
            <Input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="mt-1 block w-full"
            />
          </div>
          <div>
            <Label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</Label>
            <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="mt-1 block w-full"
            />
          </div>
          <div>
            <Label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</Label>
            <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full"
            />
          </div>
          <Button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
            Create Post
          </Button>
        </form>
      </div>
  );
};

export default PostCreate;
