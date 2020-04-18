/* pattern/script.js */

$(document).ready(function(){
  const img_links = [
    {
      link:"Black_sand_beach_by_Mads_Rosendahl",
    },
    {
      link:"Capucijnengang_by_Artem_Kavalerov",
    },
    {
      link:"Carriage_Return_by_mendhak",
    },
    {
      link:"Cathédrale_Marie-Rheine-du-Monde_by_Thierry_Pon",
    },
    {
      link:"Cosmic_Cuttlefish_by_Jim_Coleman",
    },
    {
      link:"Cramond_Island_by_Keanu_Kerr",
    },
    {
      link:"Crocus_Wallpaper_by_Roy_Tanck",
    },
    {
      link:"Definitive_Light_Zen_Orange_by_Pierre_Cante",
    },
    {
      link:"e439c7ce1e762f2e372be2acda20ebd9",
    },
    {
      link:"El_Haouaria_by_Nusi_Nusi",
    },
    {
      link:"Encounter_by_Lazardjin",
    },
    {
      link:"f94bc1c104cae2777e43c5769c9aa3ae",
    },
    {
      link:"Fairground_at_Night_by_martin",
    },
    {
      link:"Flower_Gate_Bridge_by_Michele_Agostini",
    },
    {
      link:"Halifax_Sunset_by_Vlad_Drobinin",
    },
    {
      link:"Image_of_Mount_Parnassus_by_simosx",
    }
  ];

  const renderImage = () => {
    const displayedImages = [];
    for (let i = 0; i < img_links.length; i++){
      displayedImages.push(`
      <div class="col-md-6 col-lg-4 mb-4">
      <div class="card">
        <img src="img/${img_links[i].link}.jpg" alt="${img_links[i].link}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">Title here</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" class="btn btn-success btn-sm"><i class="fas fa-download"></i></a>
          <a href="#" class="btn btn-outline-danger btn-sm"><i class="far fa-heart"></i></a>
        </div>
      </div>
    </div> 
      `);
    }
    $('#main-content').html(displayedImages);
  }
  renderImage();
})