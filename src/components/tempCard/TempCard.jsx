import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function TempCard({ cityNameWeatherData }) {
    return (
        cityNameWeatherData  ?

            <Card sx={{
                maxWidth: "auto", minWidth: 300, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row",
                "@media (max-width: 640px)": {
                    flexDirection: "column",
                    minWidth: 230,
                }

            }}
                className='cardClass'>
                <CardMedia
                    sx={{ width: 100, height: 80, }}
                    image={`http://openweathermap.org/img/w/${cityNameWeatherData?.weather?.at(0)?.icon}.png`}
                    title=""
                />
                <CardContent>
                    <Typography gutterBottom variant="h2" component="div"

                        sx={{
                            fontWeight: "800",
                            fontSize: "250%",
                            "@media (max-width: 410px)": {
                                fontSize: "200%",
                            }
                        }}
                    >
                        {cityNameWeatherData?.name}
                    </Typography>
                    <Typography variant="h5" sx={{ paddingBottom: 5 }}>
                        {cityNameWeatherData?.weather?.at(0).description}
                    </Typography>
                    <Typography variant="h4" >
                        <span>{cityNameWeatherData?.main?.temp}</span> <b><sup>o</sup>C</b>
                    </Typography>
                </CardContent>
            </Card> : <h1>loading....</h1>
    );
}
