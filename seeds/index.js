const mongoose = require('mongoose');

const cities = require('./cities');
const Campground = require('../models/campground');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("DataBase Connected")
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 40) + 10;
        const camp = new Campground({
            author: '62c4cc7f74dc418b4b4c2cba',
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,

            description: 'Lorem dwnqdx xnqxkxk xnxnaxx xnxanxxa kqxxx,wnx wqnxxn,w xqjnxnxx xqnjxqwx  xqjnxx,xwn wxjnxqwnj qjnnjqwnd nqw,dxxnd, nqdkdqwx qwxnxwnnxk',
            price: price,
            geometry: {
                type: "Point",
                coordinates: [-113.1331, 47.0202]
            },
            images: [

                {
                    url: 'https://res.cloudinary.com/buddycamp/image/upload/v1657339647/buddycamp/sklfclmyohup6k7umygi.jpg',
                    filename: 'buddycamp/sklfclmyohup6k7umygi'

                },
                {
                    url: 'https://res.cloudinary.com/buddycamp/image/upload/v1657339647/buddycamp/qt4bxwqeag9fsj5l3wxl.jpg',
                    filename: 'buddycamp/qt4bxwqeag9fsj5l3wxl'

                }
            ]

        })

        await camp.save();
    }

}

seedDB().then(() => {
    mongoose.connection.close()
});

