import React from 'react'

function Chart({ catalog, catalogVisits }) {
    var date = new Date();
    var month = date.getMonth();
    let catalogData = catalogVisits.data
    let monthlyArray = [];
    {
        catalogData && catalogData.map((visit) => {
            console.log(parseInt(visit.month))
            if (parseInt(visit.month) === month + 1) {
                monthlyArray.push(visit)
            }
        })
        return (
            <div>
                Chart
                {catalog}
            </div>
        )
    }
}
export default Chart