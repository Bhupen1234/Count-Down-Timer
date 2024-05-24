
import { Box, Button, Input } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import styles from "./TimerDashboard.module.css"



const TimerDashboard = () => {
    const [maxDate ,setMaxDate] = useState('');
    const [targetDate,setTargetDate]= useState(null);
    const [remainingTime,setRemainingTime]= useState({
       days:0,
       hours:0,
       minutes:0,
       seconds:0
    });

    const [isActive,setIsActive] = useState(false);
    const timeRef = useRef(null);



   
    useEffect(()=>{
         const currentDate = new Date();
         const maxAllowedDate = new Date(currentDate);
         maxAllowedDate.setDate(currentDate.getDate()+99);
         const formattedMaxDate = maxAllowedDate.toISOString().slice(0,16);
         setMaxDate(formattedMaxDate)
    },[]);




    const handleChange = (e)=>{
        console.log(e.target.value)
        console.log(new Date(e.target.value)) 
        setTargetDate(new Date(e.target.value)) 
    }


    useEffect(()=>{
      if(isActive && targetDate){
        timeRef.current = setInterval(()=>{
           const now = new Date();

           const distance = new Date(targetDate) - now;
           
           if(distance<0){
            clearInterval(timeRef.current);
            setIsActive(false);
            setRemainingTime({
                days:0,
                hours:0,
                minutes:0,
                seconds:0
            })
            
           }

           else {
            const days = Math.floor(distance/(1000 * 60 * 60 * 24));
            const hours = Math.floor((distance%(1000 * 60 * 60 * 24))/(1000 * 60 * 60));
            const minutes = Math.floor((distance%(1000 * 60 * 60))/(1000 * 60));
            const seconds = Math.floor((distance%(1000 * 60))/(1000));

            setRemainingTime({days,hours,minutes,seconds});

           }
           

        },1000);

        return ()=> clearInterval(timeRef.current)
      }
    },[isActive,targetDate])


    const startTimer =()=>{
      if(targetDate && targetDate > new Date()){
        setIsActive(true);
      }
    }

    const stopTimer = () => {
      setIsActive(false);
      clearInterval(timeRef.current);
      setRemainingTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    };

    

  return (
    <Box>
        <h1>Countdown Timer</h1>

        <input type="datetime-local"  onChange={(e)=>handleChange(e)} max={maxDate} className={styles.input}/>

         <br />

         {
          isActive? (
            <Button sx={{marginTop:"5px"}} variant="contained" onClick={stopTimer}>Stop Timer</Button>
          ) : (
            <Button sx={{marginTop:"5px"}} variant="contained" onClick={startTimer}>Start Timer</Button>
          )
         }


      <Box sx={{display:"flex",justifyContent:"center"}}>
       <Box className={styles.timeBox}>
      {`${remainingTime.days} Days`} 
       </Box>

       <Box className={styles.timeBox}>
       {`${remainingTime.hours} Hours`} 
       </Box>

       <Box className={styles.timeBox}>
       {`${remainingTime.minutes} Minutes`} 
       </Box>

       <Box className={styles.timeBox}>
       {`${remainingTime.seconds} Seconds`}   
       </Box>
   </Box>
    </Box>
  )
}

export default TimerDashboard
