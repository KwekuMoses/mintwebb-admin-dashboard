import React from 'react'
import { useEffect, useState } from 'react';
import Chart from './Chart';
import './styles/StatisticModule/StatisticModule.css'

function StatisticModule({ catalog, catalogVisits, productsVisited }) {
    var date = new Date();
    var month = date.getMonth();
    var year = date.getFullYear();
    var day = date.getDay();




    let catalogData = catalogVisits.data
    let monthlyVisits = [];
    let yearlyVisits = [];
    let dailyVisits = [];
    let [visitorsThisMonth, setVisitorsThisMonth] = useState(monthlyVisits.length)
    let [visitorsThisYear, setVisitorsThisYear] = useState(yearlyVisits.length)
    let [visitorsToday, setDailyVisits] = useState(dailyVisits.length)

    Date.prototype.yyyymmdd = function () {
        var mm = this.getMonth() + 1; // getMonth() is zero-based
        var dd = this.getDate();

        return [this.getFullYear(),
        (mm > 9 ? '' : '0') + mm,
        (dd > 9 ? '' : '0') + dd
        ].join('');
    };

    var today = new Date();
    let todayDate = today.yyyymmdd()


    useEffect(() => {
        setDailyVisits(dailyVisits.length)
    }, [dailyVisits])

    useEffect(() => {
        setVisitorsThisMonth(monthlyVisits.length)
    }, [monthlyVisits])

    useEffect(() => {
        setVisitorsThisYear(yearlyVisits.length)
    }, [yearlyVisits])



    catalogData && catalogData.map((visit) => {
        let visitMonth = parseInt(visit.month)
        if (visitMonth === month + 1) {
            monthlyVisits.push(visit)
        }
    })
    catalogData && catalogData.map((visit) => {
        let visitYear = parseInt(visit.year)
        if (visitYear === year) {
            yearlyVisits.push(visit)
        }
    })

    catalogData && catalogData.map((visit) => {
        let fullDate = (JSON.stringify(visit.date))
        let visitDate = fullDate.substring(0, fullDate.length - 6)

        if (visitDate === todayDate) {
            dailyVisits.push(visit)
        }
    })

    return (
        <div className="StatisticModule">
            <div className="StatisticModule__Overview">
                <span className="StatisticModule__CatalogName"> {catalog}</span>
                <div className="StatisticModule__StatlineWrapper">
                    <div className="StatisticModule__Statline">
                        <span className="StatisticModule__Text">Visitors this year </span>
                        <span className="StatisticModule__Number">{visitorsThisYear}</span>
                    </div>
                    <div className="StatisticModule__Statline">
                        <span className="StatisticModule__Text">Visitors this month </span>
                        <span className="StatisticModule__Number">{visitorsThisMonth}</span>
                    </div>
                    <div className="StatisticModule__Statline">
                        <span className="StatisticModule__Text">Visitors today</span>
                        <span className="StatisticModule__Number"> {visitorsToday}</span>
                    </div>
                </div>
            </div>
            <Chart monthlyVisits={monthlyVisits} yearlyVisits={yearlyVisits} catalogVisits={catalogVisits} />
        </div>
    )
}
export default StatisticModule