import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { use, useState } from 'react'
import axios from 'axios'

import HeaderComp from '@/components/header'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [location, setLocation] = useState('');
  const [data, setData] = useState({});
  const [weather, setWeater] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const [temp, setTemp] = useState();
  const [feel, setFeel] = useState();
  const [gust, setGust] = useState();
  const [country, setCountry] = useState();

  const [show, setShow] = useState(false);
  const [recentSearch, setRecentSearch] = useState([]);

  const [change, setChange] = useState("");

  var apiKey ="21e57e200a6ec4b637ee66fc219a2a62";
  var lang = "kr";
  var units = "metric";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&appid=${apiKey}&lang=${lang}`

  const searchLocation = (event) => {
    if(event.key === "Enter") {
      axios.get(url)
      .then((response) => {
        console.clear();
        setData(response.data)
        console.log(response.data);
        
        setWeater(response.data.weather);
        setTemp(response.data.main.temp);
        setFeel(response.data.main.feels_like);
        setGust(response.data.wind.gust);
        setCountry(response.data.sys.country);

        setErrorMessage("")
        setShow(true);
        
        setRecentSearch([...recentSearch, response.data]);
        // console.log(recentSearch);
        setChange(response.data.weather[0].main.toLowerCase());
        console.log("test: " + change);
      }).catch(err => {
        console.log(err);
        setErrorMessage("Please enter another location")
        setData({});
        setWeater("Cannot Find");
        setTemp("Cannot Find");
        setFeel("Cannot Find");
        setGust("Cannot Find");
        setCountry("Cannot Find")
        setShow(false);
      })
      setLocation('')
    }
  }



  return (
    <>
      <Head>
        <title>Weather App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main} style={{backgroundImage: `url("/${change}.jpeg")`, backgroundSize: "cover", }}>
        <HeaderComp />
        <h2 className={styles.heading}>Where do you want to travel?</h2>
        <div className={styles.location}>
          <div style={{paddingBottom: "2em"}}>
            <input 
              value={location}
              onChange={event => setLocation(event.target.value)}
              placeholder="Search for location"
              onKeyDown={searchLocation}
              type="text"
              className={styles.input}
            />
          </div>
          {errorMessage}
        </div>

        {show ? <>
            <div className={styles.mainInfo}>
              <div className={styles.countryInfo}>
                <div style={{fontSize: "150%"}}>{data.name}</div> 
                <div>{country}</div>
              </div>
              <div className={styles.weatherInfo}>
                {
                  weather && weather.map((w, index) => {
                    return(
                      <>
                      <div className={styles.mainWeather}>
                        <div><img src = {`http://openweathermap.org/img/wn/${w.icon}@2x.png` }/></div>
                        <div key={index}>
                          <div>{w.description}</div>
                          <div>{w.main}</div>
                        </div>
                      </div>
                      </>
                    )
                  })
                }
                <div style={{fontSize: "300%"}}>{temp}℃</div>
              </div>
              <div className={styles.restCont}>
                <div className={styles.restInfo}>
                  <img src = "/thermo.png" className={styles.imgIcon}/>
                  <div>Feels like: </div>
                  <div>{feel} ℃</div>
                </div>
                <div className={styles.restInfo}>
                  <img src = "/windicon.png" className={styles.imgIcon}/>
                  <div>Wind speed: </div>
                  <div>{gust} m/s</div>
                </div>
              </div>
            </div>
          </> : null
        }
            
         

        {/* Original */}
        {/* {show ? 
          <>
            <div className={styles.cont}>
              <div className={styles.nameBox}>
                <div className={styles.cityName}>{data.name}</div> 
                <div className={styles.countryName}>{country}</div>
              </div>
              <div className={styles.info}>
                {
                  weather && weather.map((w, index) => {
                    return(
                      <div key={index}>
                        <div>{w.description}</div>
                        <div>{w.main}</div>
                      </div>
                    )
                  })
                }
                <div style={{paddingTop: "1em"}}>Temperature: {temp} ℃</div>
                <div>Feels like: {feel} ℃</div>
                <div>Wind gust: {gust} m/s</div>
              </div>
            </div>
          </> : null
        } */}




        <div style={{paddingTop: "3em"}}>Recent Search Locations</div>
        <div className={styles.outer}>
            {recentSearch.length != 0 ?
              <>
              {
                recentSearch.map((item, index) => {
                  return(
                      <div className={styles.row}>
                        <div className={styles.nameBox}>
                          <div className={styles.cityName}>{item.name}</div> 
                          <div className={styles.countryName}>{item.sys.country}</div>
                        </div>
                        <div className={styles.info}>
                          {
                            item.weather && item.weather.map((w, index) => {
                              return(
                                <div key={index}>
                                  <div>{w.description}</div>
                                  <div>{w.main}</div>
                                </div>
                              )
                            })
                          }
                          <div style={{paddingTop: "1em"}}>Temperature: {item.main.temp} ℃</div>
                          <div>Feels like: {item.main.feels_like} ℃</div>
                          <div>Wind gust: {item.wind.gust} m/s</div>
                        </div>
                      </div>
                  )
                })
              }
              </> : null
            }
        </div>
      </main>
    </>
  )
}
