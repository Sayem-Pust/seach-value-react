import React from "react";
import {Link} from 'react-router-dom'
import { useDispatch } from "react-redux";
import {logout} from '../../redux/auth/actions'


export default function Header(props) {
  const dispatch = useDispatch();
  const onRequestLogout = () => dispatch(logout());
  let username = localStorage.getItem("user");
    return (
        <header className="header">
      <h1 style={{textAlign: "center"}}>Search Tracker</h1>
      <nav>
        <ul>
          <div>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/search">Search</Link>
            </li>

            <li>
              <Link to="/task">User Activities</Link>
            </li>
            
          </div>

          {username ? <p>Welcome To {username}</p> : null}

          <div>
            {props.isAuthenticated ? (
              <li>
                <Link to="/" onClick={onRequestLogout}>
                  Logout
                </Link>
              </li>
            ) : (
              <li>
                <Link to={{
                  pathname:"/login",
                  hash: '#submit'
                }}>Login</Link>
              </li>
            )}
          </div>
        </ul>
      </nav>
    </header>
    )
}
