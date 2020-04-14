$(document).ready(function () {
        get_student_detail();
        show_course();
        show_syllabus();
        show_tests();
        $('#mydata').dataTable();
        $('#my_tests').dataTable();
      
        if (window.location.href.indexOf("#syll") > -1) { 
          var uri = window.location.toString();
          var clean_uri = uri.substring(0, uri.indexOf("#"));
          $("#pills-course-tab, ").removeClass("active");
          $("#pills-course").removeClass("active");
          $("#pills-course").removeClass("show");
          $("#pills-syllabus-tab").addClass("active");
          $("#pills-syllabus").addClass("active");
          $("#pills-syllabus").addClass("show");
          window.history.replaceState({}, document.title, clean_uri);
        }
     
        function get_student_detail() {
          var pin = "1234";
          $.ajax({
            type: 'ajax', 
            url: 'http://jrestudentcourse.online/student_single/get_student_info?pin='+pin, 
            dataType : 'json ', 
            success: function(data) { 
              var html = '', 
                  syllabus = '', 
                  edit_student_button= '', 
                  after_teaching_button = '<input type="checkbox" name="after_teaching" id="after_teaching"', 
                  i; 
              for (i = 0; i < data.length;i++) {
                html += '<li class="list-group-item tooltip-bottom" title="Pin number">' + 
                          '<i style="color:green;" class="fas fa-barcode fa-fw fa-lg"></i>' + data[i].pin + 
                        '</li>' + 
                        '<li class="list-group-item tooltip-right" title="Complete name">' + 
                          '<i style="color:red;" class="fa fa-user-circle fa-fw fa-lg"></i>' + data[i].complete_name + 
                        '</li>' + 
                        '<li class="list-group-item tooltip-right" title="Nick name">' + 
                          '<i style="color:rgb(70,0,90);" class="fa fa-user-circle fa-fw fa-lg"></i>' + data[i].nick_name + 
                        '</li>' + 
                        '<li class="list-group-item tooltip-bottom" title="Address">' + 
                          '<i style="color:blue;" class="fa fa-home fa-fw fa-lg"></i>' + data[i].address + 
                        '</li>' + 
                        '<li class="list-group-item tooltip-bottom" title="Place of birth">' + '<i style="color:grey;" class="fa fa-map-marker fa-fw fa-lg"></i>' + data[i].place_of_birth + 
                        '</li>' + 
                        '<li class="list-group-item tooltip-bottom" title="Date or birth">' + '<i style="color:rgb(120,50,255);" class="fa fa-gift fa-fw fa-lg"></i>' + ($.format.date(data[i].date_of_birth, "MMM,dd yyyy")) + 
                        '</li>' + 
                        '<li class="list-group-item tooltip-bottom" title="Phone,click to call">' + 
                        '<i style="color:navy;" class="fa fa-phone-square fa-fw fa-lg"></i><a style="text-decoration:none;" target="_blank" href="https://wa.me/' + data[i].phone + '">' + data[i].phone + '</a>' + 
                        '</li>' + 
                        '<li class="list-group-item tooltip-bottom" title="Study Program">' + 
                          '<i style="color:rgb(162,255,20);" class="fa fa-list-ul fa-fw fa-lg"></i>' + data[i].program + 
                        '</li>' + 
                        '<li class="list-group-item tooltip-bottom" title="Program Duration">' + 
                          '<i style="color:rgb(80,83,210);" class="fa fa-hourglass-end fa-fw fa-lg"></i>' + data[i].program_duration + 
                        ' meetings</li>' + 
                        '<li class="list-group-item tooltip-bottom" title="Starting date">' + 
                          '<i style="color:rgb(80,170,243);" class="fa fa-flag fa-fw fa-lg"></i>' + ($.format.date(data[i].starting_date, "MMM,dd yyyy")) + 
                        '</li>' + 
                        '<li class="list-group-item tooltip-bottom" title="Reason for studying">' + '<i style="color:rgb(80,255,20);" class="fa fa-question-circle fa-fw fa-lg"></i>' + data[i].reason + '</li>' + 
                        '<li class="list-group-item tooltip-bottom" title="Target at the completion">' + 
                          '<i style="color: rgb(190,110,27);" class="fa fa-crosshairs fa-fw fa-lg"></i>' + data[i].target + 
                        '</li>' + 
                        '<li class="list-group-item tooltip-bottom" title="Difficulties">' + 
                          '<i style="color:rgb(255,0,255);" class="fa fa-thumbs-down fa-fw fa-lg"></i>' + data[i].difficulties + '</li>' + 
                        '<li class="list-group-item tooltip-bottom" title="Background">' + 
                          '<i style="color:rgb(100,120,190);" class="fa fa-graduation-cap fa-fw fa-lg"></i>' + data[i].bground + '</li>' + 
                        '<li class="list-group-item tooltip-bottom" title="Self Introduction">' + 
                          '<i style="color:rgb(70,210,155);" class="fa fa-info-circle fa-fw fa-lg"></i>' + data[i].self_introduction + 
                        '</li>' + 
                        '<li class="list-group-item tooltip-bottom" title="Weakness Points">' + 
                          '<i style="color:rgb(255,20,60);" class="fa fa-exclamation-triangle fa-fw fa-lg"></i>' + data[i].weakness_point + 
                        '</li>' + 
                        '<li class="list-group-item tooltip-bottom" title="Action Plan">' + 
                          '<i style="color:rgb(0,120,80);" class="fa fa-wrench fa-fw fa-lg"></i>' + data[i].action_plan + 
                        '</li>';
             
                edit_student_button += '<a title="Edit" href="javascript:void(0);"'+ 
                ' class="btn btn-info student_info_edit tooltip-bottom" '+ 
              
                'data-pin="'+data[i].pin+
                '" data-complete_name="'+data[i].complete_name+
                '" data-nick_name="'+data[i].nick_name+
                '" data-address="'+data[i].address+
                '" data-place_of_birth="'+data[i].place_of_birth+
                '" data-date_of_birth="'+($.format.date(data[i].date_of_birth, "yyyy-MM-dd"))+
                '" data-phone="'+data[i].phone+'" data-program="'+data[i].program+
                '" data-program_duration="'+data[i].program_duration+
                '" data-starting_date="'+($.format.date(data[i].starting_date, "yyyy-MM-dd"))+
                '" data-reason="'+data[i].reason+'" data-target="'+data[i].target+
                '" data-difficulties="'+data[i].difficulties+
                '" data-bground="'+data[i].bground+
                '" data-self_introduction="'+data[i].self_introduction+
                '" data-weakness_point="'+data[i].weakness_point+
                '" data-action_plan="'+data[i].action_plan+
                '"><i class="fas fa-user-edit fa-fw"></i></a>';
         
                syllabus += '<small>Syllabus for </small>' + data[i].program;
             
                if (data[i].after_teaching == 'yes') {
                  after_teaching_button += '';
                } else {
                  after_teaching_button += 'checked';
                }
                after_teaching_button += '> <label for="after_teaching">Remove from after teaching list.</label>';
              }
              $('#edit_student_span').html(edit_student_button);
              $('#student_info').html(html);
              $('#syllabus_tab_header').html(syllabus);
              $('#after_teaching_div').html(after_teaching_button);
            }
          });
        }
        $('#student_info_div').on('click', '.student_info_edit', function(){
	
          var pin=$(this).data('pin'), 
              complete_name=$(this).data('complete_name'),
              nick_name=$(this).data('nick_name'),
              address=$(this).data('address'),
              place_of_birth=$(this).data('place_of_birth'),
              date_of_birth=$(this).data('date_of_birth'),
              phone=$(this).data('phone'),
              program=$(this).data('program'),
              program_duration=$(this).data('program_duration'),
              starting_date=$(this).data('starting_date'),
              reason=$(this).data('reason'),
              target=$(this).data('target'),
              difficulties=$(this).data('difficulties'),
              bground=$(this).data('bground'),
              self_introduction=$(this).data('self_introduction'),
              weakness_point=$(this).data('weakness_point'),
              action_plan=$(this).data('action_plan');
          $('#edit_student_modal').modal('show');
          $('[name="pin_edit"]').val(pin);
          $('[name="complete_name_edit"]').val(complete_name);
          $('[name="nick_name_edit"]').val(nick_name);
          $('[name="address_edit"]').val(address);
          $('[name="place_of_birth_edit"]').val(place_of_birth);
          $('[name="date_of_birth_edit"]').val(date_of_birth);
          $('[name="phone_edit"]').val(phone);
          $('[name="program_edit"]').val(program);
          $('[name="program_duration_edit"]').val(program_duration);
          $('[name="starting_date_edit"]').val(starting_date);
          $('[name="reason_edit"]').val(reason);
          $('[name="target_edit"]').val(target); 
          $('[name="difficulties_edit"]').val(difficulties);
          $('[name="bground_edit"]').val(bground);
          $('[name="self_introduction_edit"]').val(self_introduction);
          $('[name="weakness_point_edit"]').val(weakness_point);
          $('[name="action_plan_edit"]').val(action_plan);
        });
        $('#btn_update_student').on('click',function(){
          var pin=$('#pin_edit').val(),
              complete_name=$('#complete_name_edit').val(),
              nick_name=$('#nick_name_edit').val(),
              address=$('#address_edit').val(),
              place_of_birth=$('#place_of_birth_edit').val(),
              date_of_birth=$('#date_of_birth_edit').val(),
              phone=$('#phone_edit').val(),
              program=$('#program_edit').val(),
              program_duration=$('#program_duration_edit').val(),
              starting_date=$('#starting_date_edit').val(),
              reason=$('#reason_edit').val(),
              target=$('#target_edit').val(),
              difficulties=$('#difficulties_edit').val(),
              bground=$('#bground_edit').val(),
              self_introduction=$('#self_introduction_edit').val(),
              weakness_point=$('#weakness_point_edit').val(),
              action_plan=$('#action_plan_edit').val();
          if (pin=='' || complete_name=='' || address=='' || date_of_birth=='' || phone=='' || program=='' || program_duration==''){ 
            $('#edit_student_feedback').addClass('alert alert-danger'); 
            $('#edit_student_feedback').html('Please fill out all required fields');
          
            if (complete_name=='') {
              $('#complete_name_edit').css('background-color', '#fbe2e6');
            }
            if (address=='') {
              $('#address_edit').css('background-color', '#fbe2e6');
            }
            if (date_of_birth=='') {
              $('#date_of_birth_edit').css('background-color', '#fbe2e6');
            }
            if (phone=='') {
              $('#phone_edit').css('background-color', '#fbe2e6');
            }
            if (program_duration=='') {
              $('#program_duration_edit').css('background-color', '#fbe2e6');
            }
          } else{
              if (isNaN(phone)){
                $('#edit_student_feedback').addClass('alert alert-danger'); 
                $('#edit_student_feedback').html('phone can only consist of number'); 
                $('#phone_edit').css('background-color', '#fbe2e6');
              }else{ 
                if (isNaN(program_duration)){
                  $('#edit_student_feedback').addClass('alert alert-danger');
                  $('#edit_student_feedback').html('Program duration only consist of number'); 
                  $('#program_duration_edit').css('background-color', '#fbe2e6');
                }else{
                  $.ajax({
                    type : "POST", 
                    url : "http://jrestudentcourse.online/student/update",
                    dataType : "JSON",
                    data :{pin:pin, complete_name:complete_name, nick_name:nick_name, address:address, place_of_birth:place_of_birth, date_of_birth:date_of_birth, phone:phone, program:program, program_duration:program_duration, starting_date:starting_date, reason:reason, target:target, difficulties:difficulties, bground:bground, self_introduction:self_introduction, weakness_point:weakness_point, action_plan:action_plan},
                    success: function(data){
                      $('[name="pin_edit"]').val("");
                      $('[name="complete_name_edit"]').val("");
                      $('[name="nick_name_edit"]').val("");
                      $('[name="address_edit"]').val("");
                      $('[name="place_of_birth_edit"]').val("");
                      $('[name="date_of_birth_edit"]').val("");
                      $('[name="phone_edit"]').val("");
                      $('[name="program_edit"]').val("");
                      $('[name="program_duration_edit"]').val("");
                      $('[name="starting_date_edit"]').val("");
                      $('[name="reason_edit"]').val("");
                      $('[name="target_edit"]').val("");
                      $('[name="difficulties_edit"]').val("");
                      $('[name="bground_edit"]').val("");
                      $('[name="self_introduction_edit"]').val("");
                      $('[name="weakness_point_edit"]').val("");
                      $('[name="action_plan_edit"]').val("");
                      $('#edit_student_modal').modal('hide');
                      show_course();
                      show_tests();
                      get_student_detail();
                     show_syllabus();
                    }
                  });
                }
              }
          }
          
          return false;
        });
        function show_course() {
          var pin = "1234";
          $.ajax({
            type: 'ajax',
            url: 'http://jrestudentcourse.online/student_single/course_data?pin='+pin,
            async : false,
            dataType: 'json',
            success: function(data) {
              var html = '';
              var i;
              for (i = 0; i < data.length; i++) {
                html += '<tr>' + 
                  '<td>' + data[i].meeting + '</td>' + 
                  '<td>' + ($.format.date(data[i].course_date, "E, MMM/dd/yy,H:mm ")) + '</td>' + 
                  '<td>' + data[i].teacher + '</td>' + 
                  '<td>' + data[i].duration + '</td>' + 
                  '<td>' + data[i].material + '</td>' + 
                  '<td>' + data[i].evaluation + '</td>' + 
                  '<td>' + data[i].w + '</td>' + 
                  '<td>' + data[i].s + '</td>' + 
                  '<td style="text-align:right;">' + 
                  '<a title="Edit" href="javascript:void(0);" class="btn btn-info btn-sm item_edit tooltip-right" data-meeting="'+data[i].meeting+'" data-course_date="'+data[i].course_date+'" data-teacher="'+data[i].teacher+'" data-duration="'+data[i].duration+'" data-material="'+data[i].material+'" data-evaluation="'+data[i].evaluation+'" data-w="'+data[i].w+'" data-s="'+data[i].s+'" data-test="'+data[i].test+'" data-test_number="'+data[i].test_number+'" data-test_name="'+data[i].test_name+'" data-of_test_number="'+data[i].of_test_number+'" data-of_test="'+data[i].of_test+'"><i class="fas fa-pencil-alt"></i></a>' + ' ' + '</td>' + '</tr>';
              }
              $('#show_data').html(html);
            }
          });
        }
        function show_tests() {
          var pin = "1234";
          $.ajax({
            type: 'ajax',
            url: 'http://jrestudentcourse.online/student_single/test_data?pin='+pin,
            async : false,
            dataType: 'json',
            success: function(data){
              var html = '';
              var i;
              for (i = 0; i<data.length; i++) {
                html += '<tr>' + 
                  '<td>' + data[i].meeting + '</td>' + 
                  '<td>' + ($.format.date(data[i].course_date, "E,MMM/dd/yy,H:mm ")) + '</td>' + 
                  '<td>' + data[i].teacher + '</td>' + 
                  '<td>' + data[i].duration + '</td>' + 
                  '<td>' + data[i].material + '</td>' + 
                  '<td>' + data[i].evaluation + '</td>'; 
                  
                if(data[i].test_name === 'Pre Spoken' || data[i].test_name === 'Pre Written'){
                  html += '<td>' + data[i].test_name + '</td>' + '<td style="text-align:right;">';
                } else {
                  html += '<td>' + data[i].test + '</td>' + '<td style="text-align:right;">';
                }
                  
                html +='<a target="_blank" href="test?pin=1234&meeting=' + data[i].meeting+'&test='+data[i].test+'"><i class="fa fa-eye"></i></a>' + ' ' + '</td>' + '</tr>';
              }
              $('#show_alltest').html(html);
            }
          });
        }
        function show_syllabus() {
          var pin ="1234";
          $.ajax({
            type: 'ajax',
            url: 'http://jrestudentcourse.online/student_single/syllabus_data?pin='+pin,
            async : false,
            dataType: 'json',
            success: function(data) {
              var html = '';
              var i;
              for (i = 0; i < data.length; i++) {
               if (data[i].topic == 0 && data[i].ind == 0) {
                  html += '<div class="col-2 syll_section">' + 
                            data[i].section + 
                          '</div>' + 
                          '<div class="col-10 syll_section">' +
                            data[i].indicator+ 
                          '</div>';
                } else if (data[i].topic != 0 && data[i].ind == 0) { 
                  html += '<div class="col-2 syll_topic">' + 
                            data[i].section + '.' + data[i].topic + 
                          '</div>' + 
                          '<div class="col-10 syll_topic">' + 
                            data[i].indicator + 
                          '</div>';
                } else { 
                
                  if (data[i].status == 1) { 
                    html += '<div class="col-2 syll_ind">' + 
                              data[i].section + '.' + data[i].topic + '.' + data[i].ind + 
                            '</div>' + 
                            '<div class="col-8 syll_ind">'+
                              '<del>' + data[i].indicator + '</del>'+
                            '</div>' + 
                            '<div class="col-2 syll_ind">'+
                              '<a href="student_single/uncheck_syllabus?pin=1234&id=' + data[i].id + '" class="btn btn-default btn-sm"><i class="fa fa-check-square fa-2x"></i></a>'+
                            '</div>';
                  } else {
                    html += '<div class="col-2 syll_ind">' + 
                              data[i].section + '.' + data[i].topic + '.' + data[i].ind + 
                            '</div>' + 
                            '<div class="col-8 syll_ind">' + 
                              data[i].indicator + 
                            '</div>' + 
                            '<div class="col-2 syll_ind">'+
                              '<a href="student_single/check_syllabus?pin=1234&id=' + data[i].id + '" class="btn btn-default btn-sm"><i class="fa fa-square fa-2x"></i></a>'+
                            '</div>';
                  }
                }
            }
            $('#show_syllabus').html(html);
          }
        });
      }
   
      $('select, input, textarea').on('focus', function(){
        $(this).css('background-color', 'white');
        $('#new_session_feedback, #edit_session_feedback, #edit_student_feedback').removeClass("alert alert-danger");
        $('#new_session_feedback, #edit_session_feedback, #edit_student_feedback').html("");
      });
      $('select[name="test_name"]').on('change', function(){
          var test=$(this).val();
          console.log(test);
          if(test == 'Remedial'){
            $('select[name="of_test_number"], select[name="of_test"]').removeAttr('disabled');
           
          } else {
            $('select[name="of_test_number"], select[name="of_test"]').attr('disabled', 'disabled');
          
            $('select[name="of_test_number"], select[name="of_test"]').val('');
          }
        });

      $('#test').on('click', function(){
          if ($(this).is(':checked')){
            console.log('test is on');
            $('#course_div').removeClass('col');
            $('#course_div').addClass('col-7');
            $('#test_div').addClass('col-5');
            $('#test_div').fadeIn('slow');
          } else {
            console.log('test is off');
            $('#course_div').removeClass('col-7');
            $('#course_div').addClass('col');
            $('#test_div').removeClass('col-5');
            $('#test_div').fadeOut('fast');
          }
        });
      /* save course */
      $('#btn_save').on('click', function(){
        var pin = "1234",
            meeting = $('#meeting').val(),
            course_date = $('#course_date').val(),
            teacher = $('#teacher').val(),
            duration = $('#duration').val(),
            material = $('#material').val(),
            evaluation = $('#evaluation').val(),
            w = $('#w').val(),
            s = $('#s').val(),
            test = '',
            test_number = $('#test_number').val(),
            test_name = $('#test_name').val(),
            of_test_number = $('#of_test_number').val(),
            of_test = $('#of_test').val(),
            after_teaching = 'yes';
	
        if (meeting == '' || course_date == '' || teacher == '' || duration == '' || material == '' || evaluation == ''){
          console.log('fill out all required fields');
          if(meeting == ''){
            $('#meeting').css('background-color', 'pink');
          }
          if(course_date == ''){
            $('#course_date').css('background-color', 'pink');
          }
          if(teacher == ''){
            $('#teacher').css('background-color', 'pink');
          }
          if(duration == ''){
            $('#duration').css('background-color', 'pink');
          }
          if(material == ''){
            $('#material').css('background-color', 'pink');
          }
          if(evaluation == ''){
            $('#evaluation').css('background-color', 'pink');
          }
          $('#new_session_feedback').addClass('alert alert-danger');
          $('#new_session_feedback').html("Please fill out all required fields!");
	
        } else {
          if(isNaN(meeting)){
            console.log('meeting not number');
            $('#meeting').css('background-color', 'pink');
            $('#new_session_feedback').addClass('alert alert-danger');
            $('#new_session_feedback').html("Meeting field must only be numbers!");
          } else {
            if(isNaN(w)){
              console.log('writing not number');
            } else {
              if (isNaN(s)){
                console.log('speaking not number');
              } else {
                $.ajax({
                  type: "post",
                  url: "http://jrestudentcourse.online/student_single/meeting_availability",
                  data: {pin: pin, meeting: meeting},
                  success: function (response){
                    if (response == 'true'){
                      console.log("meeting is already conducted");
                      $('#meeting').css('background-color', 'pink');
                      $('#new_session_feedback').addClass('alert alert-danger');
                      $('#new_session_feedback').html('Meeting with this number has already been conducted before!');
                    } else {
                      if ($('#test').is(':checked')){
                        if(test_number == ''){
                          console.log('test number empty');
                          $('#new_session_feedback').addClass('alert alert-danger');
                          $('#new_session_feedback').html("Please complete test details!");
                          $('#test_number').css('background-color', 'pink');
                        } else { 
                          if (test_name == ''){
                            console.log('test name empty');
                            $('#new_session_feedback').addClass('alert alert-danger');
                            $('#new_session_feedback').html("Please complete test details!");
                            $('#test_name').css('background-color', 'pink');
                          } else { 
                            if (test_name != 'Remedial'){
                              test = test_number+" "+test_name;
                              $.ajax({
                                type : "post",
                                url : "http://jrestudentcourse.online/student_single/test_availability'); ?>",
                                data : {pin :pin, test: test},
                                success : function (response){
                                  if(response == 'true'){
                                    console.log(test+' is conducted');
                                    $('#new_session_feedback').addClass('alert alert-danger');
                                    $('#new_session_feedback').html('<em>'+test+'</em> has been conducted before!');
                                    $('#test_number, #test_name').css('background-color', 'pink');
                                  } else { 
                                    console.log('test is available');
                                    console.log('submit the form and the test' + test);
                                    insert_form(pin, meeting, course_date, teacher, duration, material, evaluation, w, s, test, test_number, test_name, of_test_number, of_test);
                                    create_test_table(pin, meeting);
                                  }
                                }
                              })
                            } else { 
                              if (of_test_number == ''){
                                console.log('of_test_number empty');
                                $('#new_session_feedback').addClass('alert alert-danger');
                                $('#new_session_feedback').html('Please complete the test details!');
                                $('#of_test_number').css('background-color', 'pink');
                              } else {
                                if (of_test == ''){
                                  console.log('of_test empty');
                                  $('#new_session_feedback').addClass('alert alert-danger');
                                  $('#new_session_feedback').html('Please complete the test details!');
                                  $('#of_test').css('background-color', 'pink');
                                } else {
                                  test = test_number+" "+test_name+" of "+of_test_number+" "+of_test;
                                  $.ajax({
                                    type : 'post',
                                    url : "http://jrestudentcourse.online/student_single/test_availability');?>",
                                    data: {pin: pin, test : test},
                                    success : function(response){
                                      if(response == 'true'){
                                        console.log(test+' is conducted');
                                        $('#new_session_feedback').addClass('alert alert-danger');
                                        $('#new_session_feedback').html('<em>'+test+'</em> has been conducted before!');
                                        $('#test_number, #test_name, #of_test_number, #of_test').css('background-color', 'pink');
                                      } else {
                                        console.log(test+' is available');
                                        console.log('submit the form and the remedial='+test);
                                        insert_form(pin, meeting, course_date, teacher, duration, material, evaluation, w, s, test, test_number, test_name, of_test_number, of_test);
                                        create_test_table(pin, meeting);
                                      }
                                    }
                                  });
                                }
                              }
                            }
                          }
                        }
                      } else { 
                        console.log('submit the form without the test');
                        insert_form(pin, meeting, course_date, teacher, duration, material, evaluation, w, s, test, test_number, test_name, of_test_number, of_test);
                        set_after_teaching(pin, after_teaching);
                      }
                    }
                  }
                });
              }
            }
          }
        }
      });
      function insert_form(pin, meeting, course_date, teacher, duration, material, evaluation, w, s, test, test_number, test_name, of_test_number, of_test){
        $.ajax({
          type: "POST",
          url: "http://jrestudentcourse.online/student_single/save?pin="+pin,
          dataType: "JSON",
          data: {
            meeting: meeting,
            course_date: course_date,
            teacher: teacher,
            duration: duration,
            material: material,
            evaluation: evaluation,
            w: w,
            s: s,
            test: test,
            test_number : test_number,
            test_name : test_name,
            of_test_number : of_test_number,
            of_test : of_test
          },
          success: function(data) {
            $('[name="meeting"]').val("");
            $('[name="teacher"]').val("");
            $('[name="duration"]').val("");
            $('[name="material"]').val("");
            $('[name="evaluation"]').val("");
            $('[name="w"]').val("");
            $('[name="s"]').val("");
            $('[name="test"]').val("");
            $('[name="test_number"]').val("");
            $('[name="test_name"]').val("");
            $('[name="of_test_number"]').val("");
            $('[name="of_test"]').val(""); 
            $('#new_session_modal').modal('hide');
            show_course();
            show_tests();
            get_student_detail();
           // show_syllabus();
          }
        });
      }
      function create_test_table(pin, meeting){
        $.ajax({
          type: "POST",
          url : "http://jrestudentcourse.online/student_single/create_test');?>",
          dataType : "JSON",
          data : {pin: pin, meeting: meeting},
          success : function(data){
            console.log("Test created");
          }
        });
      }
      function set_after_teaching(pin, after_teaching){
        $.ajax({
          type: "POST",
          url : "http://jrestudentcourse.online/student_single/after_teaching",
          dataType : "JSON",
          data : {pin: pin, after_teaching: after_teaching},
          success : function(data){
            console.log("after after teaching set =" +after_teaching);
          }
        })
      }
     
      $('#new_session_btn').on('click', function(){
        var d = new Date(),
            teacher = "charlie";
        var curr_time = ($.format.date(d, "yyyy-MM-dd\THH:mm"));
        $('#new_session_modal').modal('show');
        $('[name="course_date"]').val(curr_time);
        $('[name="teacher"]').val(teacher);    
      }); 
      $('#show_data').on('click', '.item_edit', function() {
        var meeting = $(this).data('meeting'),
            course_date = ($.format.date($(this).data('course_date'), "yyyy-MM-dd\THH:mm")),
            teacher = $(this).data('teacher'),
            duration = $(this).data('duration'),
            material = $(this).data('material'),
            evaluation = $(this).data('evaluation'),
            w = $(this).data('w'),
            s = $(this).data('s'),
            test = $(this).data('test'),
            test_number = $(this).data('test_number'),
            test_name = $(this).data('test_name'),
            of_test_number = $(this).data('of_test_number'),
            of_test = $(this).data('of_test'),
            test_button = '';        
        $('#edit_session_modal').modal('show');
        $('[name="meeting_edit"]').val(meeting);
        $('[name="course_date_edit"]').val(course_date);
        $('[name="teacher_edit"]').val(teacher);
        $('[name="duration_edit"]').val(duration);
        $('[name="material_edit"]').val(material);
        $('[name="evaluation_edit"]').val(evaluation);
        $('[name="w_edit"]').val(w);
        $('[name="s_edit"]').val(s);
      
        $('[name="test_number_edit"]').val(test_number);
        $('[name="test_name_edit"]').val(test_name);
        $('[name="of_test_number_edit"]').val(of_test_number);
        $('[name="of_test_edit"]').val(of_test);
        if (test == ''){
          test_button += '<input type="checkbox" disabled> Test';
          $('#edit_course_div').removeClass('col-7');
          $('#edit_course_div').addClass('col');
       
          $('#edit_test_div').css('display', 'none');
        } else {
          test_button += '<input title="Test change is disabled" type="checkbox" disabled checked> Test';
          $('#edit_course_div').removeClass('col');
          $('#edit_course_div').addClass('col-7');
          $('#edit_test_div').addClass('col-5');
          $('#edit_test_div').css('display', 'block');
        }
        $('#test_check_edit').html(test_button);
      });
      $('#btn_update').on('click', function() {
        var pin = "1234",
          meeting = $('#meeting_edit').val(),
          course_date = $('#course_date_edit').val(),
          teacher = $('#teacher_edit').val(),
          duration = $('#duration_edit').val(),
          material = $('#material_edit').val(),
          evaluation = $('#evaluation_edit').val(),
          w = $('#w_edit').val(),
          s = $('#s_edit').val(),
          test = '',
          test_number = $('#test_number_edit').val(),
          test_name = $('#test_name_edit').val(),
          of_test_number = $('#of_test_number_edit').val(),
          of_test = $('#of_test_edit').val(),
          //test = $('#test_edit').val(),
          after_teaching = '';
        //if ($('#test').is(':checked')){
        if(test_name!= ''){
          if(test_name != 'Remedial'){
            test = test_number+" "+test_name;
          } else {
            test = test_number+" "+test_name+" of "+of_test_number+" "+of_test;
          }
        } else {
          test = '';
        }
        if ($('#after_teaching').is(':checked')) {
          after_teaching = 'no';
        } else {
          after_teaching = 'yes';
        }
        if (course_date == '' || teacher == '' || duration == '' || material == '' || evaluation == '') {
          if (teacher ==''){
            $('#teacher_edit').css('background-color', 'pink');
          }
          if (course_date == ''){
            $('#course_date_edit').css('background-color', 'pink');
          }
          if (duration == '') {
            $('#duration_edit').css('background-color', 'pink');
          }
          if (material == '') {
            $('#material_edit').css('background-color', 'pink');
          }
          if (evaluation == '') {
            $('#evaluation_edit').css('background-color', 'pink');
          }
          $('#edit_session_feedback').addClass("alert alert-danger");
          $('#edit_session_feedback').html("Please fill out all required fields");
        } else {
          if (isNaN(w) || isNaN(s)) {
            $('#edit_session_feedback').addClass("alert alert-danger");
            $('#edit_session_feedback').html("Assessment can only be number");
            if (isNaN(w)){
              $('#w_edit').css('background-color', 'pink');
            }
            if (isNaN(s)) {
              $('#s_edit').css('background-color', 'pink');
            }
          } else {
            if(isNaN(duration)){
              $('#edit_session_feedback').addClass("alert alert-danger");
              $('#edit_session_feedback').html("Meeting duration can only be numbers");
              $('#duration_edit').css('background-color', 'pink');
            } else{
              $.ajax({
                type: "POST",
                url: "http://jrestudentcourse.online/student_single/update?pin="+pin,
                dataType: "JSON",
                data: {
                  meeting: meeting,
                  course_date: course_date,
                  teacher: teacher,
                  duration: duration,
                  material: material,
                  evaluation: evaluation,
                  w: w,
                  s: s,
                  test: test,
                  test_number : test_number,
                  test_name : test_name,
                  of_test_number : of_test_number,
                  of_test: of_test
                },
                success: function(data) {
                  $('[name="meeting_edit"]').val("");
                  $('[name="course_date_edit"]').val("");
                  $('[name="teacher_edit"]').val("");
                  $('[name="duration_edit"]').val("");
                  $('[name="material_edit"]').val("");
                  $('[name="evaluation_edit"]').val("");
                  $('[name="w_edit"]').val("");
                  $('[name="s_edit"]').val("");
                  $('[name="test_edit"]').val("");
                  //$('[name="test_edit"]').val("");*/
                  $('#edit_session_modal').modal('hide');
                  show_course();
                  show_tests();
                  get_student_detail();
                  //show_syllabus();
                }
              });
              $.ajax({
                type: "POST",
                url: "http://jrestudentcourse.online/student_single/after_teaching",
                dataType: "JSON",
                data: {pin: pin, after_teaching: after_teaching},
                success: function(data) {
                  
                  console.log('after teaching set = '+ after_teaching);
                }
              });
            }
          }
        }
        return false;
      });
      });