$(document).ready(function(){
  /* display content */

  const images_links = [
    {
      image : "single_carousel.jpg",
      title : "Single Page Carousel",
      link : "single_carousel",
      description : "Single page website which becomes more popular among modern web applications",
    },
    {
      image : "strapped.jpg",
      title : "Strapped",
      link : "strapped",
      description : "Multi pages profile website is good option once you need to separate your content into different pages.",
    },
    {
      image : "pattern.jpg",
      title : "Pattern",
      link : "pattern",
      description : "An image gallery accompanied with catchy caption and description. ",
    },
    {
      image : "museum_of_candy.jpg",
      title : "Museum of Candy",
      link : "museum_of_candy",
      description : "Single page two-column website, for those who need several paragraphs but still want the images to stand out.",
    },
    {
      image : "landing_page1.jpg",
      title : "Landing Page",
      link : "landing_page",
      description : "The first impression you want visitors to see once they come across your site.",
    },
    {
      image : "landing_page2.jpg",
      title : "Landing Page",
      link : "landing_page_2",
      description : "Another landing page",
    },
    {
      image : "image_gallery.jpg",
      title : "Image Gallery",
      link : "image_gallery",
      description : "A perfect choice to display collection of your photos.",
    },
    {
      image : "carousel.jpg",
      title : "Carousel",
      link : "carousel",
      description : "Provide a compact view for bunch of your product in a single page. ",
    },
    {
      image: "blog.jpg",
      title : "Blog post",
      link : "blog",
      description : "Aimple blog post template which is worth considering for those who like writing and sharing ideas about particular subject such as food and travelling."
    }
  ];
  const renderCards = () => {
    const displayedCard = [];
    for (let i = 0; i<images_links.length; i++){
      const {image, title, link, description} = images_links[i];
      displayedCard.push(
        `<div class="col-md-6 col-lg-4 mb-4">
           <div class="card" data-link="${link}">
             <img src="assets/img/${image}" alt="${title}" class="card-img-top bshd">
            <div class="card-body">
              <h5 class="card-title tshd">${title}</h5>
              <p class="card-text tshd">${description}</p>
              <a href="${link}" class="btn btn-success btn-sm tshd bshd">See</a>
             </div>
           </div>
         </div>`
      )
    }
    //console.log(displayedCard);
    $('#portfolio-card').html(displayedCard);
  }
  renderCards();

  $('#portfolios').on('click', '.card', function(){
    const link = $(this).data('link');
    const currentPage = location.href;
    location = currentPage+link;
  });

  let lastSection = '';
  const sectionList = $('.navbar-nav').find("a");
  let sectionItems = sectionList.map(function(){
    let x = $($(this).attr("href"));
    if(x.length){
      return x;
    }
  });

  $('a[href^="#"]').on('click', function(e){
    e.preventDefault();
    const sectionId = $(this).attr("href");
    const fromTop = $(sectionId).offset().top;
    $('html, body').stop().animate({
      scrollTop:fromTop}, 1000);
  });

  $(window).scroll(function(){
    const fromTop = $(this).scrollTop()+10;
    let currentSection = sectionItems.map(function(){
      if($(this).offset().top < fromTop) return this;
    });
    currentSection = currentSection[currentSection.length-1];
    const id = currentSection && currentSection.length ? currentSection[0].id:"";
    if(lastSection !== id){
      lastSection = currentSection;
      sectionList.parent().removeClass('active').end().filter('[href="#'+id+'"]').parent().addClass('active');
    }
  });
  $('#contactForm').on('submit', function(event){
    event.preventDefault();
  });
  /*$('#contactForm').on('submit', function(event){
    event.preventDefault();
    console.log('submitted');
    //const name = $('#name').val(), email = $('#email').val(), message = $('#message').val();
    const formData = [$('#name').val(), $('#email').val(), $('#message').val() ];
    console.log(formData);
    $.ajax({
      type:"post",
      url: "submit-form.php",
      data : {name:formData[0], email: formData[1], message:formData[2]},
      success : function(response){
        console.log(response);
      }
    })
  }) */
});
