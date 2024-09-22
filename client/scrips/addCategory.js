
function addCategory(){
    var formData = {
        category_name: $("#categoryName").val(),
        image: $("#imageAddress").val()
    };
    var settings = {
        url: "http://localhost:3003/category",
        method: "POST",
        timeout: 0,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(formData)
    };
  
    $.ajax(settings)
        .done(function (response) {
            window.location.href = "category.html";
            alert( "!!הקטגוריה נוספה בהצלחה");       
        })
        .fail(function (jqXHR, status, error) {       
            console.error("Error:", error);
        });
  }