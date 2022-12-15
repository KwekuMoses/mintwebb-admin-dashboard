import React from 'react'
import { useEffect, useState } from 'react';
import Chart from './Chart';

function StatisticModule({ catalog, catalogVisits }) {
    var date = new Date();
    var month = date.getMonth();
    let catalogData = catalogVisits.data
    let monthlyVisits = [];

    let [visitorsThisMonth, setVisitorsThisMonth] = useState(monthlyVisits.length)

    useEffect(() => {
        setVisitorsThisMonth(monthlyVisits.length)
    }, [monthlyVisits])


    {
        catalogData && catalogData.map((visit) => {
            let visitMonth = parseInt(visit.month)
            if (visitMonth === month + 1) {
                monthlyVisits.push(visit)
            }
        })
        return (
            <div>
                Chart
                {catalog}<br /><br />
                Total visitors this month <br />
                {visitorsThisMonth} <br /> <br />
                <Chart monthlyVisits={monthlyVisits} catalogVisits={catalogVisits} />
            </div>
        )
    }
}
export default StatisticModule