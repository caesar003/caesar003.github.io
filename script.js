
      $(document).ready(function(){
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