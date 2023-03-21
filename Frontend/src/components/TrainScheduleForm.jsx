import React, { useState } from 'react';
import axios from 'axios';
import './component.css';

function TrainScheduleForm({ setShowModal, updateData, cleanModal, refreshWays }) {
  const [Departure_time, setDeparture_time] = useState('');
  const [Arrival_time, setArrival_time] = useState('');
  const [Path_of_train, setPath_of_train] = useState('');
  const [Number_of_train, setNumber_of_train] = useState('');
  const [Type_of_train, setType_of_train] = useState('Passenger');

  if (updateData && updateData != 0 && Departure_time != updateData.Departure_time) {
    setDeparture_time(updateData.Departure_time);
    setArrival_time(updateData.Arrival_time);
    setPath_of_train(updateData.Path_of_train);
    setNumber_of_train(updateData.Number_of_train);
    setType_of_train(updateData.Type_of_train);
  }

  const cleanStateAfterSave = () => {
    setShowModal(false);
    cleanModal();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = {
        Departure_time: Departure_time,
        Arrival_time: Arrival_time,
        Path_of_train: Path_of_train,
        Number_of_train: Number_of_train,
        Type_of_train: Type_of_train,
      };

      let response;

      if (updateData && updateData != 0) {
        const id = updateData.id;
        response = await axios.put(`http://localhost:3005/schedule-of-trains/${id}`, data);
        alert('path updated');
      } else {
        response = await axios.post('http://localhost:3005/schedule-of-trains/', data);
        alert('path created');
      }

      cleanStateAfterSave();
      refreshWays(event);

    } catch (error) {
      error.response.data.forEach((element) => {
        alert(element)
      })
    }
  };
  return (
    <div>
      <span className="close-button" onClick={cleanStateAfterSave}>&times;</span>
      <form className="train-schedule-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="train-number">Number of train</label>
          <input type="text" id="train-number" name="train-number" value={Number_of_train} onChange={(event) => setNumber_of_train(event.target.value)} />
        </div>
        <div className="input-group">
          <label htmlFor="train-type">Type of train</label>
          <select id="train-type" name="train-type" value={Type_of_train} onChange={(event) => setType_of_train(event.target.value)}>
            <option value="passenger">Passenger</option>
            <option value="freight">Freight</option>
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="departure-time">Departure time</label>
          <input type="time" id="departure-time" name="departure-time" value={Departure_time} onChange={(event) => setDeparture_time(event.target.value)} />
        </div>
        <div className="input-group">
          <label htmlFor="arrival-time">Arrival time</label>
          <input type="time" id="arrival-time" name="arrival-time" value={Arrival_time} onChange={(event) => setArrival_time(event.target.value)} />
        </div>
        <div className="input-group">
          <label htmlFor="train-path">Path of train</label>
          <textarea id="train-path" name="train-path" rows="1" value={Path_of_train} onChange={(event) => setPath_of_train(event.target.value)}></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default TrainScheduleForm;
