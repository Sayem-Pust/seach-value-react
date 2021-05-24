import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
// import {requestSearch} from '../../redux/search/actions'
import {getUsers} from "../../redux/auth/actions"
import {requestTask} from "../../redux/task/actions"
import Select from 'react-select';


function Task(props) {

  const users = useSelector(
    (state) => state.authReducer.users
  );

  const result = useSelector(
    (state) => state.requestTask.result?.payload
  );

  console.log(result)

  console.log(users)

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [user, setUser] = useState('')
  const [selectUsers, setSelectUsers] = useState([]);

  let isEmpty = !fromDate || !toDate || !user
  let dispatch= useDispatch()

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  useEffect(() => {
    if (users.length) {
      setSelectUsers(users.map((i) => ({ value: i.id, label: i.username })));
    }
  }, [users]);

  const handleSubmit = async e => {
    e.preventDefault();
    console.log(fromDate, toDate, user.value)
    dispatch(requestTask(fromDate, toDate, user.value))
  }
  

  return (
    <section className="form section">
      <h2 className="section-title">Search Task</h2>
      <form className="login-form">

      <div className="form-control">
          <label htmlFor="input-value">Select User</label>
          <Select
              options={selectUsers}
              className="basic-single"
              classNamePrefix="select"
              name="colors"
              value={user}
              onChange={(val) => setUser(val)}
            />
        </div>

        <div className="form-control">
          <label htmlFor="input-value">From Date</label>
          <input
            type="datetime-local"
            id="input-value"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>

        <div className="form-control">
          <label htmlFor="search-value">To Date</label>
          <input
            type="datetime-local"
            id="search-value"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>

        {isEmpty && (
          <p className="form-empty">please fill out all form fields</p>
        )}
        {!isEmpty && (
          <button
            type="submit"
            className="btn btn-block btn-primary"
            onClick={handleSubmit}
          >
            submit
          </button>
        )}

      </form>

      { result && <div style={{textAlign: "center", margin:"10px"}}>
        {result.map(user => {
          return <div key={user.id} style={{margin: "15px", padding:"15px"}}>
            <h4>User input value is {user.input_values}</h4>
            <h4>User search value is {user.search_values}</h4>
            <h3>Result: {user.status}</h3>
          </div>
        })}
      </div> }

    </section>
  );
}


export default Task;
