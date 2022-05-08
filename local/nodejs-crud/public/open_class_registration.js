var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

function mySearchFunction() {
  // Declare variables
  var input, cards, collapsible, item, i, j, txtValue, card, instructor, description;
  // User Input
  input = document.getElementById("searchbar").value.toLowerCase();
  // Grabs the parent element by id
  cards = document.getElementById("cards");
  // Individual item on list
  collapsible = cards.getElementsByClassName("collapsible");

  instructor = cards.getElementsByClassName("item1-instructor");

  description = cards.getElementsByClassName("item7-descrip");

  card = cards.getElementsByClassName("card");
  console.log(collapsible);

  // Treats lists items like an array, where each item can be accessed through it's index
  for (i = 0; i < collapsible.length; i++) {
    item = collapsible[i];
    console.log(item.innerHTML);
    // Iterate over each list item to see if the value of the input, ignoring case, matches the inner text or inner html of the item.
    txtValue = item.innerHTML;
    if (txtValue.toLowerCase().indexOf(input) > -1) {
      // Displays list items that are a match, and nothing if no match
      card[i].style.display = "";
    } else {
      card[i].style.display = "none";
    }
  }
}