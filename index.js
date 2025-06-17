const express = require("express");
const Hotel = require("./models/hotel.models");
const mongoose = require("mongoose");
const {initializeDatabase} = require("./db/db.connect");
const app = express();
const cors = require("cors");

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());
initializeDatabase();


async function createHotelData(newHotel) {
    try{
        const newHotelData = new Hotel(newHotel);
        const saveHotelData = await newHotelData.save();

        return saveHotelData
    }catch(error){
        console.log(error);
    }
};

app.post("/hotels",async (req,res) => {
    try{
        const hotelData = await createHotelData(req.body);

        res.status(201).json({message:"Hotel data added successfully",hotel:hotelData});
    }catch(error){
        res.status(500).json({error:"Failed to fetch data"})
    }
})

// Create an API with route "/hotels" to read all hotels from the Database

async function readAllHotel() {
    try{
        const allhotel = await Hotel.find();

        return allhotel;
    }catch(error){
        console.log(error);
    }
}

app.get("/hotels",async (req,res)=>{
    try{
        const hotels = await readAllHotel();

        if(hotels && hotels.length !== 0){
            res.json(hotels);
        }else{
            res.status(404).json({error:"Hotel not found"})
        }
    }catch(error){
        res.status(500).json({error:"Failed to Fetch the hotel data."})
    }
});

// Create an API with route "/hotels/:hotelName" to read a hotel by its name

async function readHotelByName(hotelName) {
    try{
        const hotelByName = await Hotel.findOne({name:hotelName});

        return hotelByName;
    }catch(error){
        console.log(error);
    }   
}

app.get("/hotels/:hotelName",async (req,res)=>{
    try{
        const hotel = await readHotelByName(req.params.hotelName);

        if(hotel){
            res.json(hotel);
        }else{
            res.status(404).json({error:"Hotel not found"})
        }
    }catch(error){
        res.status(500).json({error:"Failed to fetch the data"})
    }
});

// Create an API with route "/hotels/directory/:phoneNumber" to read a hotel by phone number.

async function readHotelByPhoneNumber(hotelPhoneNumber) {
    try{
        const hotelByPhoneNumber = await Hotel.findOne({phoneNumber:hotelPhoneNumber});

        return hotelByPhoneNumber;
    }catch(error){
        console.log(error);
    }
}

app.get("/hotels/directory/:phoneNumber",async (req,res)=>{
    try{
        const hotel = await readHotelByPhoneNumber(req.params.phoneNumber);

        if(hotel){
            res.json(hotel);
        }else{
            res.status(404).json({error:"Hotel not found."})
        }
    }catch(error){
        res.status(500).json({error:"Failed to fetch the hotel data."})
    }
});

// Create an API with route "/hotels/rating/:hotelRating" to read all hotels by rating

async function readHotelByRatings (hotelRating) {
    try{
        const hotel = await Hotel.find({rating:hotelRating});
        return hotel;
    }catch(error){
        console.log(error);
    }
};

app.get("/hotels/rating/:hotelRating",async (req,res)=>{
    try{
        const hotel = await readHotelByRatings(req.params.hotelRating);

        if(hotel && hotel.length !== 0){
            res.json(hotel);
        }else{
            res.status(404).json({error:"Hotel not found"})
        }
    }catch(error){
        res.status(500).json({error:"Failed to Fetch the hotel data."})
    }
});

// Create an API with route "/hotels/category/:hotelCategory" to read all hotels by category

async function readHotelByCategory(hotelCategory) {
        try{
            const hotelByCategory = await Hotel.find({category:hotelCategory});
            return hotelByCategory;
        }catch(error){
            console.log(error);
        }
}

app.get("/hotels/category/:hotelCategory",async (req,res)=>{
        try{
            const hotel = await readHotelByCategory(req.params.hotelCategory);

            if(hotel && hotel.length !== 0){
                res.json(hotel);
            }else{
                res.status(404).json({error:"Hotel not found"})
            }
        }catch(error){
            res.status(500).json("Failed to fetch the hotel data")
        }
})

async function updateHotelData(hotelId,dataToUpdate) {
    try{
        const hotelUpdatedData = await Hotel.findByIdAndUpdate(hotelId,dataToUpdate,{new:true});

        return hotelUpdatedData;
    }catch(error){
        console.log("Error occurred while updating the data",error);
    }
}

app.post("/hotels/:hotelId",async (req,res) => {
    try{
        const hotel = await updateHotelData(req.params.hotelId,req.body);

        if(hotel){
            res.status(200).json({message:"Hotel updated successfully",hotel:hotel})
        }else{
            res.status(404).json({error:"Hotel not found"})
        }
    }catch(error){
           res.status(500).json({error:"Failed to update the data"})
    }
})

async function deleteHotelData (hotelId){
    try{
        const deletedHotel = await Hotel.findByIdAndDelete(hotelId);
        return deletedHotel;
    }catch(error){
        console.log(error);
    }
}

app.delete("/hotels/:hotelId",async (req,res) => {
    try{
        const hotel = await deleteHotelData(req.params.hotelId);

        if(hotel){
            res.status(200).json({message:"Hotel data deleted successfully" , hotel:hotel})
        }else{
            res.status(404).json({error:"Hotel is not found"})
        }
    }catch(error){
        res.status(500).json({error:"Failed to delete the hotel data"})
    }
})

const PORT = 3000;

app.listen(PORT,()=>{
    console.log("Server is running on port",PORT);
})