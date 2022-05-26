//function to search in the users_forms page
function searchUsersForms() {
    //get the search string 
    var search_users_forms = document.getElementById('search_users_forms').value
        //construct the URL and redirect to it
    window.location = '/users_forms/search/' + encodeURI(search_users_forms)
}

window.addEventListener('DOMContentLoaded', function() {
    var searchUsersFormsButton = document.getElementById('searchUsersFormsButton');
    if (searchUsersFormsButton) {
        searchUsersFormsButton.addEventListener('click', searchUsersForms);
    }
});