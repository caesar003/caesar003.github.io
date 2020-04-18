$(document).ready(function(){
  const img_links = [
    {
      link: "Crocus_Wallpaper_by_Roy_Tanck",
    },
    {
      link: "Cramond_Island_by_Keanu_Kerr",
    },
    {
      link: "Cosmic_Cuttlefish_by_Jim_Coleman",
    },
    {
      link: "Sunset_of_Peloponnesus_by_Simos_Xenitellis",
    },
    {
      link: "Tapiola_Espoo_Cultural_Center_by_Agostino_Faedda",
    },
    {
      link: "Tennis_ball_by_Artem_Kavalerov",
    },
    {
      link: "This_Is_Bionic_Beaver_by_Pierre_Cante",
    },
    {
      link: "Wall_with_door_on_Gozo_by_Matthias_Niess",
    },
    {
      link: "Water_of_Leith_by_Keanu_Kerr",
    },
  ];

  const renderImage = () => {
    const displayedDiv = [];
    for (let i = 0; i < img_links.length; i++){
      displayedDiv.push(`
      <div class="col-lg-4 col-sm-6">
        <img class="img-fluid img-thumbnail" src="../assets/img/${img_links[i].link}.jpg">
      </div>
      `)
    }
    $('#main-content').html(displayedDiv);
  }

  renderImage();    

});