const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)]

const seedDB = async() => {
    await Campground.deleteMany({});
   for(let i = 0; i < 300; i++){
       const random1000 = Math.floor(Math.random() * 1000)
       const price = Math.floor(Math.random() * 20) + 10;
       const camp = new Campground({
            author: '62b7e4a31c10b0555e8fd83e',
           location: `${cities[random1000].city}, ${cities[random1000].state}`,
           title: `${sample(descriptors)} ${sample(places)}`,
           description: '    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam quasi eaque eveniet placeat, asperiores corrupti harum et beatae fugiat quibusdam hic! Veritatis ut atque ad commodi nisi sapiente temporibus nemo.',
           price,
           geometry: {
            type: 'Point',
            coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude
            ]
           },
           images: [
            {
                url: 'https://res.cloudinary.com/dke70ccha/image/upload/v1656444426/YelpCamp/qzdkhrgsgrwwdc44nkqm.jpg',
                filename: 'YelpCamp/qzdkhrgsgrwwdc44nkqm',
              },
              {
                url: 'https://res.cloudinary.com/dke70ccha/image/upload/v1656389621/YelpCamp/cebwt9vvmljvmpfabiio.jpg',
                filename: 'YelpCamp/cebwt9vvmljvmpfabiio'
            }
           ]
       })
       await camp.save();
   }
}

seedDB().then(() => {
mongoose.connection.close()
})