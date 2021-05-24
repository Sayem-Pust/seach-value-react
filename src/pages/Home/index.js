import React from "react";
import {Link} from 'react-router-dom'
import Hero from '../../components/Hero'


export default function Home() {
    return <>
    <Hero>
      <Link to="/login" className="btn btn-primary btn-hero">Search Value to login first</Link>
      </Hero>
      </>;
  }