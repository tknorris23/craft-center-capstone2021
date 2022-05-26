//function to search in the users_classes page
function searchUsersClasses() {
    //get the search string 
    var search_users_classes = document.getElementById('search_users_classes').value
        //construct the URL and redirect to it
    window.location = '/users_classes/search/' + encodeURI(search_users_classes)
}

window.addEventListener('DOMContentLoaded', function() {
    var searchUsersClassesButton = document.getElementById('searchUsersClassesButton');
    if (searchUsersClassesButton) {
        searchUsersClassesButton.addEventListener('click', searchUsersClasses);
    }
});