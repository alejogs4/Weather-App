const currentPosition=()=>{
    if(!navigator.geolocation){
        console.log("The geolocation is not supported in this browser")
    }
    let position=navigator.geolocation.getCurrentPosition((positionData)=>{
        getcurrentWeather(positionData.coords.altitude,positionData.coords.longitude)
    },
    (err)=>{

    })
}
const getcurrentWeather=(altitude,longitude)=>{
    let xr=new XMLHttpRequest()
    
}

window.onload=currentPosition()