import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './component.css';

function TrainScheduleForm({ setShowModal, updateData, cleanModal, refreshWays }) {
  const [path, setPath] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [trainNumber, setTrainNumber] = useState('');
  const [TypeOfTrain, setTypeOfTrain] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      Path_of_train: path,
      Departure_time: departureTime,
      Arrival_time: arrivalTime,
      Type_of_train: TypeOfTrain,
      Number_of_train: trainNumber,
    };

    try {
      if (updateData.id) {
        await axios.put(`http://localhost:3005/schedule-of-trains/${updateData.id}`, formData);

        alert('path was update')
      } else {
        await axios.post('http://localhost:3005/schedule-of-trains', formData);

        alert('path was create')
      }

      setShowModal(false);
      cleanForm();
      refreshWays();
    } catch (error) {
      error.response.data.forEach((element) => {
        alert(element)
      })
    }
  };

  const cleanForm = () => {
    setPath('');
    setDepartureTime('');
    setArrivalTime('');
    setTrainNumber('');
    cleanModal([]);
  };

  useEffect(() => {
    if (updateData) {
      setDepartureTime(updateData.Departure_time);
      setArrivalTime(updateData.Arrival_time);
      setPath(updateData.Path_of_train);
      setTrainNumber(updateData.Number_of_train);
      setTypeOfTrain(updateData.Type_of_train);
    }
  }, [updateData])

  return (
    <form className="train-schedule-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <label htmlFor="path">Train route</label>
        <input
          type="text"
          id="path"
          value={path}
          onChange={(event) => setPath(event.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="departure-time">Departure time</label>
        <input
          type="time"
          id="departure-time"
          name="departure-time"
          value={departureTime}
          onChange={(event) => setDepartureTime(event.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="arrival-time">Arrival time</label>
        <input
          type="time"
          id="arrival-time"
          name="arrival-time"
          value={arrivalTime}
          onChange={(event) => setArrivalTime(event.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="type-of-train">Train type</label>
        <input
          type="text"
          id="type-of-train"
          name="type-of-train"
          value={TypeOfTrain}
          onChange={(event) => setTypeOfTrain(event.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="trainNumber">Train number</label>
        <input
          type="text"
          id="trainNumber"
          value={trainNumber}
          onChange={(event) => setTrainNumber(event.target.value)}
          required
        />
      </div>
      <div className="button-group">
        <button className="submit-button" type="submit">
          Submit
        </button>
        <button
          className="cancel-button"
          type="button"
          onClick={() => {
            setShowModal(false)
            cleanModal([])
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default TrainScheduleForm;
