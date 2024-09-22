//לטעון את הקטגוריות
async function getCategories(){
    var settings = {
       "crossDomain": true,
        "url": "http://localhost:3003/category",
        "method": "GET",
        "Content-Type": "application/json"
      }
      return new Promise((resolve, reject) =>
      {
      $.ajax(settings).done(function (response) {
        console.log(response);
        resolve(response); 
      }).fail (function(error){
        reject(error);
      });
        
      }).then(function(response){
        localStorage.setItem("categories",response)
        const categoriesArray = [];
        for (const item of response) {
            const category = {
                value: item._id,
                text: item.category_name
            };
            categoriesArray.push(category);
        }
        const selectElement = document.getElementById('category');
        categoriesArray.forEach(category => {
          const option = document.createElement('option');
          option.value = category.value;
          option.text = category.text;
          selectElement.appendChild(option);
        });
          
      }).catch(function(error) {
    console.log(error);
  });

}

window.onload = getCategories;



async function addPlace(){

  let category = document.getElementById('category');
  var selectedIndex = category.selectedIndex;
  var selectedText = category.options[selectedIndex].text;
  const place = {
    category_id: $("#category").val(),
    place_name: $("#placeName").val(),
    image: $("#imageAddress").val(),
    adress: {
      street: $("#address").val(),
      city: $("#city").val()
    },
    tel: $("#phone").val(),
    target_age: $("#targetAge").val(),
    comments: $("#comments").val()
  };
  var settings = {
      url: "http://localhost:3003/places",
      method: "POST",
      timeout: 0,
      headers: {
          "Content-Type": "application/json"
      },
      data: JSON.stringify(place)
  };

  $.ajax(settings)
      .done(function (response) {
          alert( "ה" + selectedText + "👍שלך נוספה בהצלחה" );     
          window.location.href="category.html";  
      })
      .fail(function (jqXHR, status, error) {
          console.error("Error:", error);
      });
      
}