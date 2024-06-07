import React, { useEffect, useState } from 'react'
import DataTable from './components/tabledata/DataTable';
import SearchComp from './components/SearchComp';
import TempCard from './components/tempCard/TempCard';

function App() {


  const [cityData, setCityData] = useState([])
  const [searchValue, setSearchValue] = useState("");
  const [cityName, setCityName] = useState("Pune");
  const [cityNameWeatherData, setCityNameWeatherData] = useState();


  useEffect(() => {

    async function getCityListData(cityDataLimit) {

      //cities from india
      const cityListURL = `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=${cityDataLimit}&lang=en&refine=timezone%3A%22Asia%22&refine=cou_name_en%3A%22India%22&start=0`

      const response = await fetch(cityListURL);

      if (!response.ok) {
        throw new Error(response.statusText)
      }
      const data = await response.json();

      const result = await data?.results

      if (result.length > 0) {

        const addIdToData = result?.map((val, i) => {
          return {
            ...val,
            id: i + 1
          }
        })
        setCityData(addIdToData)
      }
    }

    getCityListData(50)

  }, [])


  console.log(cityData)





  useEffect(() => {

    async function getCityWeatherData(cityName) {

      //Get weather data on clicking the city name...
      const cityNameWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=a6ff0dd3241dc627e2ef6cec45c2f619&units=metric`

      const response = await fetch(cityNameWeatherURL);

      if (!response.ok) {
        throw new Error(response.statusText)
      }
      const data = await response.json();
      const result = await data

      setCityNameWeatherData(result)
    }

    getCityWeatherData(cityName)

    document.title = cityName

  }, [cityName])



  // console.log(cityNameWeatherData?.name)
  // console.log(cityName)



  // ---------------------------------------------------------------



  // City table data is based on this function...if there is nothing in search box then all data will be displayed...

  function handleSearch() {
    return [...cityData]?.filter((val, i) => {
      return (
        filterFunForDiffValue(val?.name) ||
        filterFunForDiffValue(val?.cou_name_en) ||
        filterFunForDiffValue(val?.country_code) ||
        filterFunForDiffValue(val?.timezone)
      )
    })
  }



  // Filter function is helpful to filter data based on city name, country name, country code and time zone...

  function filterFunForDiffValue(byfilterValue) {
    return byfilterValue
      .split(" ")
      .map((num, i) => {
        return num.toLowerCase();
      })
      .join(" ")
      .toLowerCase()
      .includes(searchValue);
  }

  // ---------------------------------------------------------------


  return (

    // (handleSearch() && handleSearch()?.length > 0) ?

      <div className="App">

        <div className='searchTempCardSec'>

          <SearchComp searchValue={searchValue} setSearchValue={setSearchValue} />
          <TempCard cityNameWeatherData={cityNameWeatherData} />

        </div>
        <DataTable handleSearch={handleSearch} setCityName={setCityName} />

      </div> 
      
      // : <h1>loading....</h1>
  );
}

export default App;
