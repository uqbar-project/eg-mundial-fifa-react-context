import React from 'react'
import { Route, Routes, } from 'react-router-dom'
import { CountrySearch } from './components/countrySearch'
import Fixture from './components/fixture'
import { MundialAppBar } from './components/mundialAppBar'

export const MundialRoutes = () => 
    <div>
        <MundialAppBar />
        <Routes>
            <Route exact path="/" element={<CountrySearch/>} />
            <Route path="/fixture" element={<Fixture/>} />
        </Routes>
    </div>


