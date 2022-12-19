import React, { useState } from 'react'
import {
    LineChart,
    ResponsiveContainer,
    Legend, Tooltip,
    Line,
    XAxis,
    YAxis,
    CartesianGrid, Label
} from 'recharts';
import './styles/Chart/Chart.css'

function Chart({ monthlyVisits, yearlyVisits }) {
    let monthlyData = formatMonthlyStats(monthlyVisits)
    let yearlyData = formatYearlyStats(yearlyVisits)
    let productCountMonthly = countVisitorsByProduct(monthlyVisits)
    let productCountYearly = countVisitorsByProduct(yearlyVisits)
    let monthlyUniqueVisitors = countMonthlyUniqueVisitors(monthlyVisits)
    let yearlyUniqueVisitors = countYearlyUniqueVisitors(yearlyVisits)
    let strokeColor = '#000AFF'
    let axisColor = '#000'



    const [xAxisData, setXAxisdata] = useState('day')
    const [chartData, setChartData] = useState(monthlyData)
    const [title, setTitle] = useState("")
    const [lineDataKey, setLineDataKey] = useState("visitors")

    const setData = (interval, xAxisData, title, lineDataKey) => {
        setXAxisdata(xAxisData)
        setChartData(interval)
        setTitle(title)
        setLineDataKey(lineDataKey)
    }


    return (
        <div className="Chart">
            <div className="Chart__ButtonGroup">
                <span className="Chart__DataTitle">Display Visitor Data</span>
                <button className="Chart__Button" onClick={() => setData(monthlyData, 'day', 'visitors this month', "visitors")}>Monthly Visitors</button> <br />
                <button className="Chart__Button" onClick={() => setData(monthlyUniqueVisitors, 'day', 'unique visitors this month', "uniqueVisitors")}>Unique Monthly Visitors</button> <br />
                <button className="Chart__Button" onClick={() => setData(yearlyData, 'month', 'visitors this year', "visitors")}>Yearly Visitors</button> <br />
                <button className="Chart__Button" onClick={() => setData(yearlyUniqueVisitors, 'month', 'unique visitors this year', "uniqueVisitors")}>Unique Yearly Visitors</button> <br />
                <button className="Chart__Button" onClick={() => setData(productCountMonthly, 'product', 'products by month', "visitors")}>By Product This Month</button> <br />
                <button className="Chart__Button" onClick={() => setData(productCountYearly, 'product', 'products by year', "visitors")}>By Product This Year</button> <br />
            </div>
            <ResponsiveContainer className="Chart__Chart" width="100%" aspect={3}>
                <LineChart data={chartData.length === 0 ? monthlyData : chartData} margin={{ right: 300 }}>
                    <CartesianGrid stroke={'#fff'} strokeWidth={2} />
                    <XAxis
                        dataKey={xAxisData}
                        interval={'preserveStartEnd'}
                        stroke={axisColor}
                        strokeWidth={3}
                    >
                        <Label value={xAxisData} offset={0} position="insideBottom"
                            style={{ textAnchor: 'middle', fontSize: '100%', fill: "#000AFF" }}
                        />
                    </XAxis>
                    <YAxis
                        label={{ value: 'visitors', angle: -90, position: 'insideLeft', textAnchor: 'middle', fontSize: '100%', fill: "#000AFF" }}
                        stroke={axisColor}
                        strokeWidth={3}

                    >
                    </YAxis>
                    <Tooltip />
                    <Line
                        dataKey={lineDataKey}
                        stroke={strokeColor}
                        strokeWidth={6}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

const countUniqueVisitors = (visits) => {
    let _visits = []
    visits.map((visit) => {
        _visits.push(visit.userData.ip)
    })
    let uniqueVisitors = new Set(_visits).size

    return uniqueVisitors
}
const countVisitorsByProduct = (visits) => {
    let visitorsByMonthArray = [];
    let visitedProducts = []

    visits.map((visit) => {
        let obj = {}
        let product = visit.product
        var formattedProducString = product.substring(product.lastIndexOf("/") + 1);
        obj['product'] = formattedProducString
        obj['ip'] = visit.userData.ip
        visitorsByMonthArray.push(obj)
        visitedProducts.push(visit.userData.ip)
    })
    let arr = []
    let counter = {}

    visitorsByMonthArray.forEach(function (obj) {
        var key = JSON.stringify(obj.product)
        counter[key] = (counter[key] || 0) + 1
    })
    arr.push(counter)

    let finalArr = []
    for (const [key, value] of Object.entries(counter)) {
        var formattedKey = key.substring(1, key.length - 1);
        let finalObj = {}
        finalObj['product'] = formattedKey;
        finalObj['visitors'] = value;
        // finalObj['uniqueVisitors'] = uniqueVisitors
        finalArr.push(finalObj);
    }

    return finalArr
}
const formatYearlyStats = (visits) => {
    let uniqueVisitors = countUniqueVisitors(visits)

    let visitorsByMonthArray = [];
    visits.map((visit) => {
        let obj = {}
        obj['month'] = visit.month
        visitorsByMonthArray.push(obj)
    })
    let arr = []
    let counter = {}

    visitorsByMonthArray.forEach(function (obj) {
        var key = JSON.stringify(obj.month)
        counter[key] = (counter[key] || 0) + 1
    })
    arr.push(counter)

    let finalArr = []

    for (const [key, value] of Object.entries(counter)) {
        let finalObj = {}
        finalObj['month'] = key;
        finalObj["visitors"] = value;
        finalObj['uniqueVisitors'] = uniqueVisitors;
        finalArr.push(finalObj);
    }
    return finalArr

}
const formatMonthlyStats = (visits) => {
    let visitorsByDayArray = [];

    visits.map((visit) => {
        let obj = {}
        obj['day'] = visit.day
        obj['ip'] = visit.userData.ip
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
        finalObj["visitors"] = value;
        finalArr.push(finalObj);
    }


    return finalArr

}
const countMonthlyUniqueVisitors = (visits) => {
    let visitorsByDayArray = [];


    visits.map((visit) => {
        let obj = {}
        obj['day'] = visit.day
        obj['ip'] = visit.userData.ip
        visitorsByDayArray.push(obj)
    })

    let stringifiedVisitorsByDayArray = []

    visitorsByDayArray.map((obj) => {
        stringifiedVisitorsByDayArray.push(JSON.stringify(obj))
    })


    let uniqueVisits = [...new Set(stringifiedVisitorsByDayArray)];
    let uniqueVisitors = []


    uniqueVisits.map((visit) => {
        uniqueVisitors.push(JSON.parse(visit))
    })


    let arr = []
    let counter = {}


    uniqueVisitors.forEach(function (obj) {
        var key = JSON.stringify(obj.day)
        counter[key] = (counter[key] || 0) + 1


    })

    arr.push(counter)

    let finalArr = []



    for (const [key, value] of Object.entries(counter)) {
        let finalObj = {}
        finalObj['day'] = key;
        finalObj["uniqueVisitors"] = value;
        finalArr.push(finalObj);
    }


    return finalArr
}
const countYearlyUniqueVisitors = (visits) => {
    let visitorsByDayArray = [];


    visits.map((visit) => {
        let obj = {}
        obj['month'] = visit.month
        obj['ip'] = visit.userData.ip
        visitorsByDayArray.push(obj)
    })

    let stringifiedVisitorsByDayArray = []

    visitorsByDayArray.map((obj) => {
        stringifiedVisitorsByDayArray.push(JSON.stringify(obj))
    })


    let uniqueVisits = [...new Set(stringifiedVisitorsByDayArray)];
    let uniqueVisitors = []


    uniqueVisits.map((visit) => {
        uniqueVisitors.push(JSON.parse(visit))
    })


    let arr = []
    let counter = {}


    uniqueVisitors.forEach(function (obj) {
        var key = JSON.stringify(obj.month)
        counter[key] = (counter[key] || 0) + 1


    })

    arr.push(counter)

    let finalArr = []

    for (const [key, value] of Object.entries(counter)) {
        let finalObj = {}
        finalObj['month'] = key;
        finalObj["uniqueVisitors"] = value;
        finalArr.push(finalObj);
    }
    return finalArr
}
export default Chart