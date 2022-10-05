
var model = {
    currentcar: null,
    cars: [
        {
            clickCount : 0,
            name : 'Jeep Wrangler Rubicon',
            imgSrc : 'https://cdn.motor1.com/images/mgl/LZbwQ/s1/2021-jeep-wrangler-rubicon-392-front-view.webp',
            imgAttribution : 'https://www.flickr.com/photos/bigtallguy/434164568'
        },
        {
            clickCount : 0,
            name : 'Ford Ranger',
            imgSrc : 'https://www.wallpaperflash.id/wallpaper/wallpaper/20220423/ford-raptor-desktop-wallpaper-ford-ranger-raptor-modified-wallpaper-preview.webp',
            imgAttribution : 'https://www.flickr.com/photos/xshamx/4154543904'
        },
        {
            clickCount : 0,
            name : 'Mercedes-AMG G 63',
            imgSrc : 'https://images2.alphacoders.com/105/thumb-1920-1058423.jpg',
            imgAttribution : 'https://www.flickr.com/photos/kpjas/22252709'
        },
        {
            clickCount : 0,
            name : 'BMW X6',
            imgSrc : 'https://cdn-images.motor.es/image/m/800w/fotos-noticias/2019/10/bmw-x6-m-2020-201961291-1570009121_1.jpg',
            imgAttribution : 'https://www.flickr.com/photos/malfet/1413379559'
        },
        {
            clickCount : 0,
            name : 'Audi A7',
            imgSrc : 'https://wallpaperaccess.com/full/3659174.jpg',
            imgAttribution : 'https://www.flickr.com/photos/onesharp/9648464288'
        }
    ]
};

/* ======= carChecker ======= */

var carChecker = {

    init: function() {
        // set our current car to the first one in the list
        model.currentcar;

        // tell our views to initialize
        carListView.init();
        carView.init();
    },

    getCurrentcar: function() {
        return model.currentcar;
    },

    getcars: function() {
        return model.cars;
    },

    // set the currently-selected car to the object passed in
    setCurrentcar: function(car) {
        model.currentcar = car;
    },

    // increments the counter for the currently-selected car
    incrementCounter: function() {
        model.currentcar.clickCount++;
        carView.render();
    }
};


/* ======= View ======= */

var carView = {

    init: function() {
        // store pointers to our DOM elements for easy access later
        this.carElem = document.getElementById('car');
        this.carNameElem = document.getElementById('car-name');
        this.carImageElem = document.getElementById('car-img');
        this.countElem = document.getElementById('car-count');

        // on click, increment the current car's counter
        this.carImageElem.addEventListener('click', function(){
            carChecker.incrementCounter();
        });

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        // update the DOM elements with values from the current car
        var currentcar = carChecker.getCurrentcar();
        this.countElem.textContent = currentcar.clickCount;
        this.carNameElem.textContent = currentcar.name;
        this.carImageElem.src = currentcar.imgSrc;
    }
};

var carListView = {

    init: function() {
        // store the DOM element for easy access later
        this.carListElem = document.getElementById('car-list');

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        var car, elem, i;
        // get the cars we'll be rendering from the carChecker
        var cars = carChecker.getcars();

        // empty the car list
        this.carListElem.innerHTML = '';

        // loop over the cars
        for (i = 0; i < cars.length; i++) {
            // this is the car we're currently looping over
            car = cars[i];

            // make a new car list item and set its text
            elem = document.createElement('li');
            elem.textContent = car.name;

            // on click, setCurrentcar and render the carView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the car variable to the click event function)
            elem.addEventListener('click', (function(carCopy) {
                return function() {
                    carChecker.setCurrentcar(carCopy);
                    carView.render();
                };
            })(car));

            // finally, add the element to the list
            this.carListElem.appendChild(elem);
        }
    }
};

// make it go!
carChecker.init();
