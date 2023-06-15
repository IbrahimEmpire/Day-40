const express = require("express")
const app = express()


const PORT = 2537
const data = [
    {
        roomId: 301,
        numberOfBet: 2,
        amenities: ["AC,", "Chairs", "Fridge"],
        price: 5000,
        bookedStatus: "booked",
        customerName: "ibrahim",
        date: "05-jan-2023",
        startTime: "10-feb-2023 at 12pm",
        endTime:"11-feb-2023 at 11am",
        
        roomName: "Delux"

    },
    {
        roomId: 302,
        numberOfBet: 1,
        amenities: ["AC"],
        price: 3000,
        bookedStatus: "notBooked",
        customerName: "",
        date: "",
        startTime: "",
        endTime:"",
        
        roomName: "Small"

    },
    {
        roomId: 303,
        numberOfBet: 2,
        amenities: ["AC,", "Chairs"],
        price: 4000,
        bookedStatus: "booked",
        customerName: "mohamed",
        date: "05-jan-2023",
        startTime: "10-feb-2023 at 12pm",
        endTime:"11-feb-2023 at 11am",
        
        roomName: "Normal"

    },
    {
        roomId: 304,
        numberOfBet: 5,
        amenities: ["AC,", "Chairs", "Fridge","extraSpace"],
        price: 8000,
        bookedStatus: "notBooked",
        customerName: "",
        date: "",
        startTime: "",
        endTime:"",
        
        roomName: "Family"

    }
]


app.use(express.json())




app.get("/",(req, res)=>{
    res.status(200).send("Hall Booking")
})



// View All Rooms

app.get("/room", async(req, res)=>{

   const rooms = await data

   res.status(200).json({message:"All Rooms", rooms})
})


//  Checking Available Rooms


app.get("/room/check", (req, res)=>{

const checkRoom = data;

 const filter = checkRoom.filter((room)=> room.bookedStatus == "notBooked")
 
 res.status(200).json({message: "Available Room", filter})
})

// Checking Customer Details

app.get("/room/customer", (req, res)=>{

    const checkRoom = data;
    
     const filter = checkRoom.filter((room)=> room.bookedStatus == "booked")
     console.log(filter)
     res.status(200).json({message: "Available Room", filter})
    })


// View Room By RoomId

app.get("/room/:id", (req, res)=>{
    const {id} = req.params;
    const findHall =  data.filter((hall) => hall.roomId == id);
    res.send(findHall)
})

// Creating Room

app.post("/room", (req, res)=>{
    const newRoom = req.body
    console.log(req.body)
    data.push(newRoom)
    res.send(data)
})


//  Booking A Room

app.put("/room/:id", (req, res)=>{
 const {id} = req.params
 const room = data.find(hall=> hall.roomId == id)
 if(room.bookedStatus === "booked"){
 return  res.status(500).json({message: "Sorry Buddy Room Is Already Booked "} )
}

    room.customerName = req.body.customerName,
    room.date = req.body.date,
    room.startTime = req.body.startTime,
    room.endTime = req.body.endTime,
    room.bookedStatus = "booked"
    return res.status(200).json({message: "hall is booked "} )

})

// List All Room With Booked Data

app.get("/room/listRoom", (req, res)=>{

    const checkRoom = data;
    
     const filter = checkRoom.filter((room)=> room.bookedStatus == "booked")
     console.log(filter)
     res.status(200).json({message: "Available Room", filter})
    })





app.listen(PORT, ()=> console.log("port is Start",PORT))