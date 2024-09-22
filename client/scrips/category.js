//הצגת כל הקטגוריות
function createCategories(){

    var settings = {
       "crossDomain": true,
        "url": "http://localhost:3003/category",
        "method": "GET",
        "Content-Type": "application/json"
      }
      return new Promise((resolve, reject) =>
      {
      $.ajax(settings).done(function (response) {
        //console.log(response.name);
        resolve(response); 
      }).fail (function(error){
        reject(error);
      });
        
      }).then(function(response){
          let categories= [];
          for (const item of response) {
            const category = {
                id: item._id,
                category_name: item.category_name,
                image: item.image
            };
            categories.push(category);
        }
        var main=document.getElementById("categories-row");
        for(let i=0;i<categories.length;i++)
        {
            let div=document.createElement("div");
            div.className="category";
            div.style.backgroundImage= "url('"+categories[i].image+"')";
            div.innerText = categories[i].category_name;
            div.onclick = function(){
               placesByCategory(categories[i].id);
            } 
            main.append(div);
        }
        let email=localStorage.getItem("email");
        if(email== "yael6776727@gmail.com"){
           document.querySelector('.add_category').style.display="block";
        }
      }).catch(function(error) {
    console.log(error);
  });

 }


window.onload = createCategories;


function addCategory(){
    window.location.href="addCategory.html";
}


//הצגת המקומות לפי קטגוריה
function placesByCategory(id){
    var settings = {
        "crossDomain": true,
         "url": `http://localhost:3003/places/by_category/${id}`,
         "method": "GET",
         "Content-Type": "application/json"
       }
       return new Promise((resolve, reject) =>
       {
        $.ajax(settings)
        .done(function (response) {
            let places= [];
            for (const item of response) {
               const place = {
                id: item._id,
                place_name: item.place_name,
                image: item.image,
                adress: item.adress,
                // city: item.adress.city,
                // street: item.adress.street,
                tel: item.tel,
                target_age: item.target_age,
                comments: item.comments
            };
            places.push(place);
        }
            let main = document.getElementById('categories-row');
            main.style.display = 'none'; 
            let mainDiv = document.getElementById('places-row');
            mainDiv.style.display = 'block';
            let row = document.createElement("div"); // צור שורה חדשה
            row.className = "place-row";
            for(let i=0;i<places.length;i++)
            {
              let div=document.createElement("div");
              div.className="place";
              //הוספת התמונה
              let image = document.createElement("img");
              image.src= places[i].image;
              image.alt = places[i].place_name;
              div.appendChild(image);
              //הוספת השם
              let text= document.createElement("h3");
              text.innerText= places[i].place_name;               
              div.appendChild(text);
              div.onclick = function(){
                show_details(places[i]);
              }
              row.appendChild(div);
              if ((i + 1) % 4 === 0 || i === places.length - 1){
                   mainDiv.append(row);
                   row = document.createElement("div");
                   row.className = "place-row";
              }
            }

        })
        .fail(function (jqXHR, status, error) {
          
            console.error("Error:", error);

        });
       });
}


//הצגת הפרטים של המקום שנבחר
function show_details(place){
  const placeDetailsContainer = document.querySelector('.place-details-container');
  const image= document.getElementById('detail_img');
  image.src = place.image;
  const name = document.getElementById('detail_name');
  name.innerText=  place.place_name;
  const adress = document.getElementById('detail_adress');
  adress.innerText= ' כתובת'+ ': ' + place.adress[0].street + ', ' + place.adress[0].city  ;
  const tel = document.getElementById('detail_tel');
  tel.innerText= 'טלפון' + ': '+ place.tel;
  const target_age = document.getElementById('detail_age');
  target_age.innerText= ' גיל יעד'+ ': ' +place.target_age  ;
  const comment = document.getElementById('comment');
  comment.innerText= ' הערות' + ': ' + place.comments ;
  const button = document.getElementById('add_review');
  button.onclick= function() {
    addReview(place.id);
  };
  placeDetailsContainer.style.display = 'block';
  get_reviews(place.id);
}

//הצגת הביקורות של המקום שנבחר
function get_reviews(id){
  var settings = {
    "crossDomain": true,
     "url": `http://localhost:3003/review/${id}`,
     "method": "GET",
     "Content-Type": "application/json"
   }
   return new Promise((resolve, reject) =>
       {
        $.ajax(settings)
        .done(function (response) {
            let reviews= [];
            for (const item of response) {
               const review = {
                value: item.value,
                date: item.date
            };
            reviews.push(review);
        }
        //הוספת הביקורות לטבלת הביקורות
        let table = document.getElementById('reviews-table');
        if(reviews.length == 0)
        {
           var row = table.insertRow();
           row.id="emp";
           row.innerText = 'עדיין אין ביקורות 🙂';
        }
        else{ 
           for (let i=0;i<reviews.length;i++)
           {
              var row = table.insertRow();
              row.innerText = reviews[i].value +'\n'+ reviews[i].date;
           }

        }
        table.style.display="none";
        })
        .fail(function (jqXHR, status, error) {
          
            console.error("Error:", error);

        });
       });

}


//סגירת הפרטים
function closeDetails() {
  const placeDetailsContainer = document.querySelector('.place-details-container');
  placeDetailsContainer.style.display = 'none';
  var reviewsTable = document.getElementById("reviews-table");
  while (reviewsTable.rows.length > 0) {
    reviewsTable.deleteRow(0);
  }
  reviewsTable.style.display = "table";
}


//סגירת ופתיחת הביקורות
function toggleReviews() {
  var reviewsTable = document.getElementById("reviews-table");
  var arrow = document.querySelector(".reviews-header .arrow");

  if (reviewsTable.style.display === "none" || reviewsTable.style.display === "") {
      reviewsTable.style.display = "table";
      arrow.innerHTML = "&#9650;"; // סמל חץ למעלה      
  } else {
      reviewsTable.style.display = "none";
      arrow.innerHTML = "&#9660;"; // סמל חץ למטה
      while (reviewsTable.rows.length > 0) {
        reviewsTable.deleteRow(0);
      }
  }
}


//הוספת ביקורת
function addReview(id) {
  let review_value =document.getElementById('review-input');
  var formData = {
    place_id: id,
    value: review_value.value
  };
  var settings = {
      url: "http://localhost:3003/review",
      method: "POST",
      timeout: 0,
      headers: {
          "Content-Type": "application/json"
      },
      data: JSON.stringify(formData)
  };

  $.ajax(settings)
      .done(function (response) {
          alert("תודה"+', '  + ' ' + '😀\n הביקורת שלך עוזרת למשתמשים שלנו לבחור בבחירה הטובה ביותר.' );    
      })
      .fail(function (jqXHR, status, error) {       
          console.error("Error:", error);
      });

      review_value.value = "";
}


function update()
{
   sessionStorage.setItem('hideSomething', true);
   window.location.href='login.html';
}