class ImageDB {
    images = [
        {
            "url": "https://www.frankfurtflyer.de/wp-content/uploads/2018/09/Bildschirmfoto-2018-09-07-um-12.04.24-678x381.png",
            "categories": ["travel"],
            "location": "Tahiti"
        },
        {
            "url": "https://cdn.explora.com/wp-content/uploads/2015/02/Travesia-El-Chalten-in-Patagonia.jpg",
            "categories": ["travel","landscape"],
            "location": "Argentina"
        },
        {
            "url": "https://media-cdn.tripadvisor.com/media/photo-s/0d/f4/d9/26/2-day-hiking-tour-of.jpg",
            "categories": ["travel","landscape"],
            "location": "Argentina"
        },
        {
            "url": "https://gbdmagazine.com/wp-content/uploads/2018/05/Bogota%CC%81-green-building-e1525272094931.jpg",
            "categories": ["travel","urban"],
            "location": "Colombia"
        },
        {
            "url": "https://images.musement.com/cover/0002/49/thumb_148242_cover_header.jpeg?w=1200&h=630&q=60&fit=crop",
            "categories": ["travel","urban"],
            "location": "USA"
        },
        {
            "url": "https://media.kasperskycontenthub.com/wp-content/uploads/sites/67/2015/10/10054515/kamchatka-wonders-45.jpg",
            "categories": ["travel","landscape"],
            "location": "Russia"
        },
        {
            "url": "https://www.naturalworldsafaris.com/~/media/images/destinations/siberia/kamchatka-sophy-roberts.jpg",
            "categories": ["travel","landscape"],
            "location": "Russia"
        },
        {
            "url": "https://www.visitrussia.com/content/images/hotel_static/std/citygroup725x460/citygroup/133.jpg",
            "categories": ["travel","wildlife"],
            "location": "Russia"
        },
        {
            "url": "https://www.freshtrackscanada.com/data/images/articles/canada-wildlife-tour.jpg",
            "categories": ["wildlife"],
            "location": "Canada"
        },
        {
            "url": "https://www.propertiesincostarica.com/blog/wp-content/uploads/2017/12/toucan-2067962_1280.jpg",
            "categories": ["wildlife"],
            "location": "Costa Rica"
        },
        {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGiUKLZh04QtDPtkFiRjy_PUQZFcJAisPOkYOVhlz4AnKK99OpzQ",
            "categories": ["wildlife"],
            "location": "Costa Rica"
        }
    ];

    getAllImages(){
        return this.images;
    }

    getImagesFilteredByProperties(probValObject){
        let res = this.images;
        Object.keys(probValObject).forEach((prop)=>{
            res = res.filter((img)=>{
                return img[prop].includes(probValObject[prop]); //.includes() works for Strings as well as arrays
            });
        });
        return res;
    };

    addImage(image){
        this.images.push(image);
    }
}
module.exports = ImageDB;