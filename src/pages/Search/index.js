import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {requestSearch} from '../../redux/search/actions'


function Search(props) {

  const inputDetails = useSelector(
    (state) => state.requestSearch
  );

  console.log(inputDetails)

  const [input, setInput] = useState("");
  const [value, setValue] = useState("");

  let isEmpty = !input || !value
  let dispatch= useDispatch()

  const handleSubmit = async e => {
    e.preventDefault();
    console.log(input, value)
    dispatch(requestSearch(input, value))
  }
  

  return (
    <section className="form section">
      <h2 className="section-title">Search Value</h2>
      <form className="login-form">
        <div className="form-control">
          <label htmlFor="input-value">Input Value</label>
          <input
            type="text"
            id="input-value"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <div className="form-control">
          <label htmlFor="search-value">Search Value</label>
          <input
            type="text"
            id="search-value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
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

      { inputDetails?.searchResult && <div style={{textAlign: "center", margin:"10px"}}>
        <h4>Your input value is {inputDetails.inputValues}</h4>
        <h4>Your search value is {inputDetails.searchValue}</h4>
        <h3>Result: {inputDetails.searchResult}</h3>
      </div> }

    </section>
  );
}


export default Search;
