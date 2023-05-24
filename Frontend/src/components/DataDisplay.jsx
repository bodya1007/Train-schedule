import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './component.css';
import MyModal from './Modal';
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
      <div className='form-wrapper'>
        <form className="search-form" onSubmit={searchWays}>
          <input
            type="text"
            className="searchInput"
            ref={searched}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search path of train"
          />
          <button id='search-button' className="action-button" type="submit">
            Search
          </button>
          <button id='refresh-button' className="action-button" onClick={refreshData}>
            Refresh
          </button>
          <div className='create-wrapper'>
            <button id='create-button' className="action-button" onClick={() => setShowModal(true)}>
              Create
            </button>
          </div>
        </form>
      </div>

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
              <strong>Train route</strong>
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
              <strong>Train number</strong> <br />
              {way.Number_of_train}
            </span>
            <span className="data-item" title="Type of train">
              <strong>Train type</strong> <br />
              {way.Type_of_train}
            </span>
            <div className='buttons-form'>
              <button id='update-button' className="action-button" onClick={() => handleGetOne(way.id)}>
                Update
              </button>
              <button id='delete-button' className="action-button" onClick={() => handleDelete(way.id)}>
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No data found</p>
      )}
    </div>
  );
}

export default DataDisplay;
