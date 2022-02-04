function searchClassesByCategory() {
    //get the category 
    var category_search_string  = document.getElementById('category_search_string').value
    //construct the URL and redirect to it
    window.location = '/classes_forms/search/' + encodeURI(category_search_string)
}
