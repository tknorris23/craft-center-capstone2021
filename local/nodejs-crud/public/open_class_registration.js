// const userCardTemplate = document.querySelector("[data-user-template]")
// const userCardContainer = document.querySelector("[data-user-card-container]")


const classes = []
classes.push({
    "className": "Beginning Wheel Throwing Mondays Session A",
    "category": "Ceramics",
    "instructor": "Rachel Kirby (she/her)",
    "date": "Mon Jan 7 - Feb 7",
    "time": " 2:30-5",
    "term": "Winter 2022",
    "fee": "$100",
    "max_enrl": 5,
    "actual_enrl": 4,
    "description": "In this 4 week class, you will learn the basics of throwing. From centering to trimming and glazing, this class will get you going in ceramics!"
})

classes.push({
    "className": "Make a Mug Workshop!",
    "category": "Ceramics",
    "instructor": "Rachel Kirby (she/her)",
    "date": "Mon Jan 7 - Feb 7",
    "time": " 2:30-5",
    "term": "Winter 2022",
    "fee": "$20",
    "max_enrl": 2,
    "actual_enrl": 1,
    "description": "Make your own hand built mug while learning handbuilding techniques!"
})

const myJSON = JSON.stringify(classes);

let data = JSON.parse(myJSON)
// console.log(data)

// data.forEach(classes => {
//   const card = userCardTemplate.content.cloneNode(true).children[0]
//   const card2 = userCardTemplate.content.cloneNode(true).children[0].children[0]
//   const collapsible = card.querySelector("[collapsible-header]")
//   const item1_instructor = card2.querySelector("[item1-instructor-body]")
//   // const item2_dates = card.querySelector("[item2-dates-body]")
//   // const item3_time = card.querySelector("[item3-time-body]")
//   // const item4_fee = card.querySelector("[item4-fee-body]")
//   // const item5_max_enrl = card.querySelector("[item5-max-enrl-body]")
//   // const item6_actual_enrl = card.querySelector("[item6-actual-enrl-body]")
//   // const item7_descrip = card.querySelector("[item7-descrip-body]")
//   //
//   collapsible.textContent = card.className
//   item1_instructor.textContent = card.instructor
//   console.log(item1_instructor)
//   // item2_dates.textContent = card.date
//   // item3_time.textContent = card.time
//   // item4_fee.textContent = card.fee
//   // item5_max_enrl.textContent = card.max_enrl
//   // item6_actual_enrl.textContent = card.actual_enrl
//   // item7_descrip.textContent = card.description
//
//   userCardContainer.append(card)
//   console.log(card)
// })


// function search_animal() {
//   let input = document.getElementById('searchbar').value
//   input = input.toLowerCase();
//   let x = document.querySelector('#list-holder');
//   x.innerHTML = "";
//
//   for (i = 0; i < data.length; i++) {
//     let obj = data[i];
//
//     if (obj.className.toLowerCase().includes(input)) {
//       const elem = document.createElement("li")
//       elem.innerHTML = `${obj.className} - ${obj.category} - ${obj.instructor}`
//       x.appendChild(elem)
//     }
//   }
// }

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}