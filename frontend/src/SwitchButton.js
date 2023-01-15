import React, { useState } from 'react'
import './styles/SwitchButton/SwitchButton.css'

function SwitchButton({
    setData,
    yearlyUniqueVisitors,
    yearlyData,
    monthlyUniqueVisitors,
    monthlyData,
    dataInterval,
    lineDataKey, }) {

    const toggleData = (dataInterval) => {

        switch (dataInterval) {
            case 'year':
                lineDataKey === 'visitors' ?
                    setData(yearlyUniqueVisitors, 'month', 'unique visitors this year', "uniqueVisitors", dataInterval) :
                    setData(yearlyData, 'month', 'all visits this year', "visitors", dataInterval)

                break;
            case 'month':
                lineDataKey === 'visitors' ?
                    setData(monthlyUniqueVisitors, 'day', 'unique visitors this month', "uniqueVisitors", dataInterval) :
                    setData(monthlyData, 'day', 'all visits this month', "visitors", 'month', dataInterval)

                break;
            default:
        }

    }

    return (
        <button className="SwitchButton" onClick={() => toggleData(dataInterval)}>
            view {lineDataKey === 'visitors' ? 'unique visitors instead' : 'all visits instead'}
        </button>
    )
}

export default SwitchButton