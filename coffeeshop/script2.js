$(document).ready(function(){
  const Images = [
    {
      img_link:"BHINEKA-20.jpg",
    },
    {
      img_link:"BHINEKA-21.jpg",
    },
    {
      img_link:"BHINEKA-22.jpg",
    },
    {
      img_link:"BHINEKA-2.jpg",
    },
    {
      img_link:"BHINEKA-43.jpg",
    },
    {
      img_link:"BHINEKA-8.jpg",
    },
    {
      img_link:"warung_bhineka_muda___B_by9gBlYym___.jpg",
    },
    {
      img_link:"warung_bhineka_muda___B_e0NislAU-___.jpg",
    },
    {
      img_link:"warung_bhineka_muda___B_hIp9_lZ8e___.jpg",
    },
    {
      img_link:"warung_bhineka_muda___B_jZmijlggG___.jpg",
    },
    {
      img_link:"warung_bhineka_muda___B_l5ORMAOK3___.jpg",
    },
    {
      img_link:"warung_bhineka_muda___B_mTcDwgTbK___.jpg",
    },
    {
      img_link:"warung_bhineka_muda___B_WbDzjFigC___.jpg",
    },
    {
      img_link:"warung_bhineka_muda___B_wpMT1AiZT___.jpg",
    },
    {
      img_link:"warung_bhineka_muda___B_Z4lN8gJG____.jpg",
    },
    {
      img_link:"warung_bhineka_muda___B700lBRAtP0___.jpg",
    },
    {
      img_link:"warung_bhineka_muda___B746QpulAEd___.jpg",
    },
    {
      img_link:"warung_bhineka_muda___B7-r4g1AEuC___.jpg",
    },
    {
      img_link:"warung_bhineka_muda___B8d5myBAa_1___.jpg",
    },
    {
      img_link:"warung_bhineka_muda___B8Ljcfcglfl___.jpg",
    },
    {
      img_link:"warung_bhineka_muda___B8x-zf_lqV2___.jpg",
    },
    {
      img_link:"warung_bhineka_muda___B9f02RFgmE0___.jpg",
    },
  ];
  const Menus =  [
    {
      product_name:"Product 1",
      img_link:"warung_bhineka_muda___B_l5ORMAOK3___.jpg",
      price : 12500,
    },
    {
      product_name:"Product 2",
      img_link:"warung_bhineka_muda___B700lBRAtP0___.jpg",
      price : 28300,
    },
    {
      product_name:"Product 3",
      img_link:"warung_bhineka_muda___B746QpulAEd___.jpg",
      price : 14700,
    },
    {
      product_name:"Product 4",
      img_link:"warung_bhineka_muda___B7-r4g1AEuC___.jpg",
      price : 19000,
    },
    {
      product_name:"Product 5",
      img_link:"warung_bhineka_muda___B8x-zf_lqV2___.jpg",
      price : 19000,
    },
    {
      product_name:"Product 6",
      img_link:"warung_bhineka_muda___B9f02RFgmE0___.jpg",
      price : 21500,
    },
  ];

  const convertIDR = (n) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(n);
  }
  
  const renderGallery = () => {
    let cards = '';
    for (let i=0; i<Images.length; i++){
      const {img_link} = Images[i];
      cards +=
      `<div class="col-10 col-sm-5 col-md-4 col-lg-3 gallery-col bshd mb-3" data-link="${img_link}" data-key="${i}">
        <div class="card mb-3"
          style="background:url('./img/${img_link}');
          background-size:cover;
          background-position:center;
        ">
        </div>
      </div>`
    }
    $('#gallery-row').html(cards);
  }

  const renderMenu = () => {
    let menus = '';
    for(let i=0; i<Menus.length; i++){
      const {product_name, img_link, price} = Menus[i];
      menus += `
      <div class="col-10 col-sm-5 col-md-4 mb-3">
        <div class="card">
          <div class="card-body"
          style=
            "background:url('./img/${img_link}');
            background-size:cover;
            background-position:center center;">
          </div>
          <div class="card-footer">
            <p class="card-text">${product_name} <span class="float-right">${convertIDR(price)}</span></p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <a href="javascript:void(0);" class="btn btn-warning btn-sm"><i class="fas fa-cart-plus fa-fw"></i> Order now</a>
          </div>
        </div>
      </div>`;
    }
    $('#menuRow').html(menus);
  }

  const previewImage = (key) => {
    $('#modal-body').html(`
      <img src="./img/${Images[key].img_link}" alt="${Images[key].img_link}" style="width:100%;">
      <a data-key="${key-1}" class="gallery-control prev" href="javascript:void(0);"><i class="fas fa-chevron-left"></i></a>
      <a data-key="${key+1}" class="gallery-control next disabled" href="javascript:void(0);"><i class="fas fa-chevron-right"></i></a>`);
    $('#gallery-preview').modal('show');
    $('#modal-body').css('display', 'none');
    $('#modal-body').fadeIn('fast');
  }

  $('#gallery-row').on('click', '.gallery-col', function(){
    const key = $(this).data('key');
    previewImage(key);
  });

  $('#modal-body').on('click', '.gallery-control', function(){
    const key= $(this).data('key');
    if(Number(key)>=0&&Number(key)!==Images.length){
      previewImage(key);
    }
  });


  renderGallery();
  renderMenu();
});
