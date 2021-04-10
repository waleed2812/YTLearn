import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const EditExercise = (props) =>  {
  
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);
  const [firstLoad, setFirstLoad] = useState(true);

  React.useEffect(() => {

    if (firstLoad){
      axios.get('http://localhost:5000/exercises/'+ props.match.params.id)
        .then(response => {
          
          setUsername(response.data.username);
          setDescription(response.data.description);
          setDuration(response.data.duration);
          setDate(new Date(response.data.date));
          setFirstLoad(false);
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    
    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          
          setUsers(response.data.map(user => user.username));
          
        }
      })
      .catch((error) => {
        console.log(error);
      })

  })


  const onSubmit = (e) => {
    e.preventDefault();

    const exercise = {
      username: username,
      description: description,
      duration: duration,
      date: date
    }

    console.log(exercise);

    axios.post('http://localhost:5000/exercises/update/' + props.match.params.id, exercise)
      .then(res => console.log(res.data));

    window.location = '/';
  }
  
  return (
  <div>
    <h3>Edit Exercise Log</h3>
    <form onSubmit={onSubmit}>
      <div className="form-group"> 
        <label>Username: </label>
        <select 
            required
            className="form-control"
            value={username}
            onChange={e => {
                console.log(e.target.value)
                setUsername(e.target.value);
              }}>
            {
              users.map(function(user) {
                return <option key={user} value={user}>{user}</option>;
              })
            }
        </select>
      </div>
      <div className="form-group"> 
        <label>Description: </label>
        <input  type="text"
            required
            className="form-control"
            value={description}
            onChange={e => setDescription(e.target.value)}
            />
      </div>
      <div className="form-group">
        <label>Duration (in minutes): </label>
        <input 
            type="text" 
            className="form-control"
            value={duration}
            onChange={e => setDuration(e.target.value)}
            />
      </div>
      <div className="form-group">
        <label>Date: </label>
        <div>
          <DatePicker
            selected={date}
            onChange={date => setDate(date)}
          />
        </div>
      </div>

      <div className="form-group">
        <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
      </div>
    </form>
  </div>
  );
  
}

export default EditExercise;