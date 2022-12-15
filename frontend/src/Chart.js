import React from 'react'
import { useEffect, useState } from 'react';
import {
    LineChart,
    ResponsiveContainer,
    Legend, Tooltip,
    Line,
    XAxis,
    YAxis,
    CartesianGrid
} from 'recharts';

// Sample chart data
const pdata = [
    {
        name: 'MongoDb',
        student: 11,
        fees: 120
    },
    {
        name: 'Javascript',
        student: 15,
        fees: 12
    },
    {
        name: 'PHP',
        student: 5,
        fees: 10
    },
    {
        name: 'Java',
        student: 10,
        fees: 5
    },
    {
        name: 'C#',
        student: 9,
        fees: 4
    },
    {
        name: 'C++',
        student: 10,
        fees: 8
    },
];

function Chart({ monthlyVisits, catalogVisits }) {
    //Works
    let visitorsByDayArray = [];

    monthlyVisits.map((visit, index) => {
        let obj = {}
        obj['day'] = visit.day

        visitorsByDayArray.push(obj)
    })

    let arr = []
    let counter = {}

    visitorsByDayArray.forEach(function (obj) {
        var key = JSON.stringify(obj.day)
        counter[key] = (counter[key] || 0) + 1
    })
    arr.push(counter)

    let finalArr = []
    for (const [key, value] of Object.entries(counter)) {
        let finalObj = {}
        finalObj['day'] = key;
        finalObj["count"] = value;
        console.log(`${key}: ${value}`);
        finalArr.push(finalObj);
    }
    console.log(finalArr)
    //Works

    return (
        <>
            <h1 className="text-heading">
                Visitors This Month
            </h1>
            <ResponsiveContainer width="100%" aspect={3}>
                <LineChart data={finalArr} margin={{ right: 300 }}>
                    <CartesianGrid />
                    <XAxis dataKey="day"
                        interval={'preserveStartEnd'} />
                    <YAxis></YAxis>
                    <Legend />
                    <Tooltip />
                    <Line dataKey="count"
                        stroke="black" activeDot={{ r: 8 }} />
                    <Line dataKey="fees"
                        stroke="red" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </>
    )
}

export default Chart