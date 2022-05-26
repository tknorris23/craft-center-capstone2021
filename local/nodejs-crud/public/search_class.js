//function to search classes on the /classes page. Doesn't search if nothing is entered in the search bar
function searchClasses() {
    //get the search string 
    var search_classes = document.getElementById('search_classes').value
    if (search_classes.length == 0) {
        window.location.replace('/classes');
        return;
    }
    //construct the URL and redirect to it
    window.location = '/classes/search/' + encodeURI(search_classes)
}

window.addEventListener('DOMContentLoaded', function() {
    var searchClassesButton = document.getElementById('searchClassesButton');
    if (searchClassesButton) {
        searchClassesButton.addEventListener('click', searchClasses);
    }

    document.getElementById('search_classes_form').addEventListener("keypress", function(event) {
        if (event.code === 'Enter' || event.code === 'NumpadEnter') {
            event.preventDefault();
            // Cancel the default action, if needed
            // Trigger the button element with a click
            var searchClassesButton = document.getElementById("searchClassesButton");
            if (searchClassesButton) {
                searchClassesButton.addEventListener('click', searchClasses);
            }
        }
    });

});