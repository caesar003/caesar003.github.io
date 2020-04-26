const renderProduct = (data=products) => {
  let rows = [];
  for (let i = 0; i<data.length; i++){
    rows.push(`
      <tr>
        <td>${data[i][0]}</td>
        <td class="left">${data[i][1]}</td>
        <td>${formatIDR(data[i][2])}</td>
        <td>
          <a title="remove item" class="btn btn-danger btn-sm deleteProductBtn" href="javascript:void(0);" data-id="${i}">
            <i class="fas fa-trash fa-fw"></i>
          </a>
          <a title="edit item" class="btn btn-warning btn-sm editProductBtn" href="javascript:void(0);"
          data-id="${i}"
          data-product-id="${data[i][0]}"
          data-name="${data[i][1]}"
          data-price="${data[i][2]}">
            <i class="fas fa-pencil-alt fa-fw"></i>
          </a>
        </td>
      </tr>`
    );
  }
  $('#productList').html(rows);
}
$('#newItemBtn').on('click', function(){
  $('#newItem').modal('show');
  $('#productId').val("");
  $('#productName').val("");
  $('#productPrice').val("");
});

$('#btnAdd').on('click', function(){
  const nIF = $('#newItemFeedback');
  const id = $('#productId').val(),
        name = $('#productName').val(),
        price = $('#productPrice').val();
  if(id===''||name===''||price===''){
    displayError(nIF, 'form incomplete');
  } else {
    if(isNaN(id)){
      displayError(nIF, 'id is not number');
    } else {
      if(isNaN(price)){
        displayError(nIF, 'price is not number');
      } else {
        const fData = [
          Number(id),
          name,
          Number(price)
        ];
        products.push(fData);
        renderProduct();
        $('#newItem').modal('hide');
      }
    }
  }
});

$('#productList').on('click', '.editProductBtn', function(){
  const id = $(this).data('id'),
        productId = $(this).data('product-id'),
        name = $(this).data('name'),
        price = $(this).data('price');
  $('#editItem').modal('show');
  $('#id').val(id)
  $('#productId_e').val(productId);
  $('#productName_e').val(name);
  $('#productPrice_e').val(price);
});


$('#btnUpdate').on('click', function(){
  const eEF = $('#editItemFeedback');
  const id = $('#id').val(),
        productId = $('#productId_e').val(),
        name = $('#productName_e').val(),
        price = $('#productPrice_e').val();
  // console.log(id, productId, name, price);
  if(productId === '' || name === ''|| price === ''){
    displayError(eEF, 'form incomplete');
  } else {
    if(isNaN(productId)){
      displayError(eEF, 'id is not number');
    } else {
      if(isNaN(price)){
        displayError(eEF, 'price is not number');
      } else {
        const fData = [productId, name, price];
        products.splice(id, 1, fData);
        renderProduct();
        $('#editItem').modal('hide');
      }
    }
  }
});
$('#productList').on('click', '.deleteProductBtn', function(){
  const id = $(this).data('id');
  $('#idDelete').val(id);
  $('#deleteItem').modal('show');
});
$('#btnDelete').on('click', function(){
  const id = $('#idDelete').val();
  products.splice(id, 1);
  renderProduct();
  $('#deleteItem').modal('hide');
  $('#idDelete').val("");
});
