$(document).ready(function(){
  const Images = [
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
      `<div class="col-sm-5 col-md-4 col-lg-3 gallery-col bshd mb-3" data-link="${img_link}">
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

  $('#gallery-row').on('click', '.gallery-col', function(){
    const link = $(this).data('link');
    $('#modal-body').html(`<img src="./img/${link}" alt="${link}" style="width:100%;">`);
    $('#gallery-preview').modal('show');
  })

  renderGallery();

});
