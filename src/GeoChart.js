import React, { Component } from 'react'
import Chart from 'react-google-charts'
const geoData = [
  ['Country', 'Visited'],
  ['Germany', 200],
  ['Brazil', 400],
  ['Canada', 500],
  ['France', 600],
  ['RU', 700],
  ['Colorado', 700],
]
class GeoChart extends Component {
    render() {
        return (
            <div className="container mt-5">
                <h2>World</h2>
                <Chart
                width={'80vw'}
                height={'80vw'}
                chartType="GeoChart"
                data={geoData}
                Color='#000000'
                // Note: you will need to get a mapsApiKey for your project.
                // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
                mapsApiKey="test"
                rootProps={{ 'data-testid': '1' }}
                />
            </div>
        )
    }
}
export default GeoChart