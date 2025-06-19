# Hotel Management API

A RESTful API for managing hotel data, buit with Node.js, Express and MongoDB

## Features

- Create, read, update and delete hotel data
- Search hotel data by name, phone Number, rating or category
- Comprehensive hotel data model including amenities, price and availability

## API Endpoints
Base URL: https://backend-hotel-api-phi.vercel.app

### Hotels Collection

| Method | Endpoint                          | Description                                  |
|--------|-----------------------------------|----------------------------------------------|
| POST   | `/hotels`                         | Create a new hotel record                    |
| GET    | `/hotels`                         | Get all hotels                               |
| GET    | `/hotels/:hotelName`              | Get a hotel by name                          |
| GET    | `/hotels/directory/:phoneNumber`  | Get a hotel by phone number                  |
| GET    | `/hotels/rating/:hotelRating`     | Get all hotels with a specific rating        |
| GET    | `/hotels/category/:hotelCategory` | Get all hotels in a specific category        |
| POST   | `/hotels/:hotelId`                | Update a hotel's data (using POST)           |
| DELETE | `/hotels/:hotelId`                | Delete a hotel record                        |
