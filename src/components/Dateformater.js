export const Dateformater=(date)=>{
   
    const year=date.split("-")[0];
    const month=date.split("-")[1];
    const day=date.split("-")[2]; 

    const monthName=["Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sept","Oct","Nov","Dec"];

    const formattedDate=`${day} ${monthName[month-1]} ${year}`;

    return formattedDate
    
}
