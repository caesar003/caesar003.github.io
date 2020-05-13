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
      const {link} = img_links[i];
      displayedDiv.push(`
      <div class="col-lg-4 col-sm-6">
        <img data-c="${i}" class="img-fluid img-thumbnail" src="../assets/img/${link}.jpg">
      </div>
      `)
    }
    $('#main-content').html(displayedDiv);
  }

  const previewImage = (c) => {
    const img = `
      <img class="img-fluid" src="../assets/img/${img_links[c].link}.jpg" />
      <a data-link="${c-1}" class="img-nav prev" href="javascript:void(0);"><i class="fas fa-chevron-left fa-fw"></i></a>
      <a data-link="${c+1}" class="img-nav next" href="javascript:void(0);"><i class="fas fa-chevron-right fa-fw"></i></a>`;
    $('#modal-body').css('display', 'none');
    $('#modal-body').html(img);
    $('#imagePreview').modal('show');
    $('#modal-body').fadeIn('fast');
  }

  $('#main-content').on('click', '.img-thumbnail', function(){
    const c = $(this).data('c');
    previewImage(c);
  });

  $('#modal-body').on('click', '.img-nav', function(){
    const link = $(this).data('link');
    // previewImage(link);
    if(link!==-1&&link<img_links.length){
      previewImage(link);
    }
  });

  renderImage();

});
