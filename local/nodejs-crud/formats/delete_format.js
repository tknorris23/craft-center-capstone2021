function deleteForm(form_ID){
    $.ajax({
        url: '/forms/' + form_ID,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
}

<td><button onclick="deleteForm({{form_ID}})">Delete</button></td>
