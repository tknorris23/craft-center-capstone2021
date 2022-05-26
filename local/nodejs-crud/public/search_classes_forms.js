//function to search in the classes_forms page
function searchClassesForms() {
    //get the search string 
    var search_classes_forms = document.getElementById('search_classes_forms').value
        //construct the URL and redirect to it
    window.location = '/classes_forms/search/' + encodeURI(search_classes_forms)
}

window.addEventListener('DOMContentLoaded', function() {
    var searchClassesFormsButton = document.getElementById('searchClassesFormsButton');
    if (searchClassesFormsButton) {
        searchClassesFormsButton.addEventListener('click', searchClassesForms);
    }
});