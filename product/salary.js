const renderEmployees = () => {
  let rows = [];
  for (let i = 0; i<employees.length; i++){
    const {id, name, dept, day, salary, food, trsp, ov, ded, paid} = employees[i];
    const thp = ((day*food)+(day*trsp)+ov+salary)-ded;
    rows.push(
      `<tr class="${paid?'paid':''} ${thp<0?'minus':''}">
        <td>${id}</td>
        <td class="left">${name}</td>
        <td class="left">${dept}</td>
        <td>${day}</td>
        <td>${formatIDR(salary)}</td>
        <td>${formatIDR(food)}</td>
        <td>${formatIDR(trsp)}</td>
        <td>${formatIDR(ov)}</td>
        <td>${formatIDR(ded)}</td>
        <td>${formatIDR(thp)}</td>
        <td>
          <a
            class="btn btn-sm btn-secondary payEmployee"
            href="javascript:void(0);"
            data-paid="${paid}" data-id="${i}"
          ><i class="fas ${paid?'fa-check-square':'fa-square'} fa-fw"></i></a>
          <a
            class="btn btn-sm btn-info editEmployee" data-i="${i}" href="javascript:void(0);"><i class="fas fa-pencil-alt fa-fw"></i></a>
        </td>
      </tr>
      `
    );
  }
  $('#employeeList').html(rows);
  rows = [];
}
$('#newEmployeeBtn').on('click', function(){
  $('#newEmployee').modal('show');
});

$('#btnAddEmployee').on('click', function(){
  const emId =$('#emId').val(),
        emName =$('#emName').val(),
        dept =$('#dept').val(),
        workday =$('#workday').val(),
        salary =$('#salary').val(),
        food =$('#food').val(),
        transport =$('#transport').val(),
        overtime =$('#overtime').val(),
        ded =$('#ded').val();
  employees.push({
    id : Number(emId),
    name : emName,
    dept : dept,
    day : Number(workday),
    salary : Number(salary),
    food : Number(food),
    trsp : Number(transport),
    ov : Number(overtime),
    ded: Number(ded),
    paid : false,
  });
  $('#newEmployee').modal('hide');
  renderEmployees();
});

$('#employeeList').on('click', '.payEmployee', function(){
  const paid = $(this).data('paid');
  const id = $(this).data('id');
  const newForm = {
    id :employees[id].id ,
    name :employees[id].name ,
    dept :employees[id].dept ,
    day :employees[id].day ,
    salary :employees[id].salary ,
    food :employees[id].food ,
    trsp :employees[id].trsp ,
    ov :employees[id].ov ,
    ded:employees[id].ded ,
    paid : !paid,
  }
  employees.splice(id, 1, newForm);
  renderEmployees();
});

$('#employeeList').on('click', '.editEmployee', function(){
  $('#editEmployee').modal('show');
  const i = $(this).data('i');
  const {id, name, dept, day, salary, food, trsp, ov, ded, paid} = employees[i];
  $('#id_e').val(i);
 $('#emId_e').val(id);
 $('#emName_e').val(name);
 $('#dept_e').val(dept);
 $('#workday_e').val(day);
 $('#salary_e').val(salary);
 $('#food_e').val(food);
 $('#transport_e').val(trsp);
 $('#overtime_e').val(ov);
 $('#ded_e').val(ded);
});

$('#btnUpdateEmployee').on('click', function(){
  const i = $('#id_e').val(),
        id = $('#emId_e').val(),
        name = $('#emName_e').val(),
        dept = $('#dept_e').val(),
        day = $('#workday_e').val(),
        salary = $('#salary_e').val(),
        food = $('#food_e').val(),
        trsp = $('#transport_e').val(),
        ov = $('#overtime_e').val(),
        ded = $('#ded_e').val();
    const newForm = {
        id : id ,
        name : name ,
        dept : dept ,
        day : Number(day) ,
        salary : Number(salary) ,
        food : Number(food) ,
        trsp : Number(trsp) ,
        ov : Number(ov) ,
        ded: Number(ded) ,
        paid :  employees[i].paid,
    }
    employees.splice(i, 1, newForm);
    renderEmployees();
    $('#editEmployee').modal('hide');
})
