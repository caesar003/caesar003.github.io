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
  const renderGallery = () => {
    let cards = '';
    for (let i=0; i<Images.length; i++){
      const {img_link} = Images[i];
      cards +=
      `<div class="col-10 col-sm-5 col-md-4 col-lg-3 gallery-col bshd mb-3" data-link="${img_link}" data-key=${i}>
        <div class="card mb-3"
          style="background:url(./img/${img_link});
          background-size:cover;
          background-position:center;
        ">
        </div>
      </div>`
    }
    $('#gallery-row').html(cards);
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

});
