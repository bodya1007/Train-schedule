import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './component.css';
import MyModal from './Modal'
import TrainScheduleForm from './TrainScheduleForm';

function DataDisplay() {
  const [ways, setWays] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [updateData, setUpdateData] = useState([]);
  const [search, setSearch] = useState('');
  const [waysToLook, setWaysToLook] = useState([]);
  const searched = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get('http://localhost:3005/schedule-of-trains');
    setWays(response.data);
    setWaysToLook(response.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3005/schedule-of-trains/${id}`);
    fetchData();
  };

  const handleGetOne = async (id) => {
    const response = await axios.get(`http://localhost:3005/schedule-of-trains/${id}`);
    setShowModal(true);
    setUpdateData(response.data);
  };

  const searchWays = (event) => {
    event.preventDefault();
    const filteredData = ways.filter((element) =>
      element.Path_of_train.toLowerCase().includes(search.toLowerCase())
    );
    filteredData.sort((a, b) => a.Path_of_train.localeCompare(b.Path_of_train));
    setWaysToLook(filteredData);
  };

  const refreshData = (event) => {
    event.preventDefault();
    setSearch('');
    searched.current.value = '';
    fetchData();
  };

  return (
    <div className="data">
      <form onSubmit={searchWays}>
        <input
          type="text"
          className='searchInput'
          ref={searched}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <button className='openModalButton' type="submit">Search</button>
        <button type="submit" onClick={refreshData}>Refresh</button>
      </form>
      <button type="submit" onClick={() => setShowModal(true)}>Create a path</button>
      {showModal && (
        <MyModal>
          <TrainScheduleForm
            setShowModal={setShowModal}
            updateData={updateData}
            cleanModal={setUpdateData}
            refreshWays={fetchData}
          />
        </MyModal>
      )}
      {waysToLook.length ? (
        waysToLook.map((way) => (
          <div className="data-display" key={way.id}>
            <span className="data-item" title="Path of train">
              <strong>Path of train</strong>
              <br /> {way.Path_of_train}
            </span>
            <span className="data-item" title="Departure time">
              <strong>Departure time</strong> <br />
              {way.Departure_time}
            </span>
            <span className="data-item" title="Arrival time">
              <strong>Arrival time</strong> <br />
              {way.Arrival_time}
            </span>
            <span className="data-item" title="Number of train">
              <strong>Number of train</strong> <br />
              {way.Number_of_train}
            </span>
            <button className="update-button" onClick={() => handleGetOne(way.id)}>
              Update
            </button>
            <button className="delete-button" onClick={() => handleDelete(way.id)}>
              Delete
            </button>
          </div>
        ))
      ) : (
        <h3>We don't have any paths.</h3>
      )}
    </div>
  )
}

export default DataDisplay;
