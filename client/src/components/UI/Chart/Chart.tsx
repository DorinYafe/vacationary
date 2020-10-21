import React, { useState, useEffect, } from 'react';
import classes from './Chart.module.css';
import { useSelector, } from 'react-redux';
import { Bar, } from 'react-chartjs-2';

function Chart() {

    const vacations = useSelector((state: any) => state.vacation.vacations);
    const vacationsDestinations = vacations.map((vacation: any) => vacation.destination);
    const vacationsFollowersAmount = vacations.map((vacation: any) => +vacation.followersAmount);
    const [barData, setBarData]: any = useState(
        {
            labels: null,
            datasets: [{
                label: null,
                data: null,
                backroundColor: null,
            }],
        },
    );

    useEffect(() => {
        setBarData(
            {
                labels: vacationsDestinations,
                datasets: [
                    {
                        label: 'Followers Amount',
                        data: vacationsFollowersAmount,
                        backgroundColor: '#40A4C8',
                    }
                ],
            }
        );
    }, []);

    const options = {
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                stacked: true,
                gridLines: {
                    display: true,
                    color: "rgba(255,99,132,0.2)"
                }
            }],
            xAxes: [{
                gridLines: {
                    display: false
                }
            }]
        }
    };

    return (
        <div className={classes.ChartContainer} >
            <Bar
                data={barData}
                options={options}
            />
        </div >
    );
};

export default Chart;