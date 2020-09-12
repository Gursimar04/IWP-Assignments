$(document).ready(function () {

    $("#test").click(function () {
        let isbn = $("#usename").val();
        isbn = isbn.replace(/-/g, ""); // remove '-' symbols
        isbn = isbn.replace(/ /g, ""); // remove whiteSpace
        if ((isbn.length === 10 || isbn.length === 13)) {
            if(isValidISBN(isbn)){
                $("#result").css('color', 'green')
                fetch("https://www.googleapis.com/books/v1/volumes?q=isbn:"+isbn, {
                    method: 'GET', // or 'PUT'
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then(res => res.json())
                    .then(res => {
                        let text = "Valid ISBN Number <div style='color:blue;font-weight:400'>No Book of this isbn avaliable in Google Book's Database</div>"
                        if (res.totalItems==0)
                            $("#result").html(text)
                        else{
                            $("#result").css('color', 'black')
                            text = "<div style='color:green'>Valid ISBN Number</div>" + "Title: <span style='color:blue;font-weight:400'>" + res.items[0].volumeInfo.title + "</span></span><br>Authors: <span style='color:blue;font-weight:400'>" + res.items[0].volumeInfo.authors.join(",") + "</span><br>Publisher: <span style='color:blue;font-weight:400'>" + res.items[0].volumeInfo.publisher + "</span><br>Publishing Year: <span style='color:blue;font-weight:400'>" + res.items[0].volumeInfo.publishedDate + "</span><br>Ratings: <span style='color:blue;font-weight:400'>" + res.items[0].volumeInfo.averageRating + "</span><br>Description: <span style='color:blue;font-weight:400'>" + res.items[0].volumeInfo.description+"</span>";
                            $("#result").html(text)
                        }    
                    },
                        (e) => { console.warn('fetch failure') }
                    )
            }
            else{
                $("#result").text("Invalid ISBN")
                $("#result").css('color', 'red')
            }
        }
        else{
            $("#result").text("ISBN Number must of length 10 or 13.")
            $("#result").css('color', 'red')
        }
       
    });
});


function isValidISBN(isbn) {

    let result = false;
    result= isbn.length===10?isValidISBN10(isbn):isValidISBN13(isbn);
    return result;
}

function isValidISBN10(isbn) {

    var result = false;

    // Starts with digit 9 and is followed by 9 integers or by 8 integers and the character X
    var regex = new RegExp(/^\d{9}(\d|X){1}$/);

    if (regex.test(isbn)) {
        var sum = 0;
        for (var i = 0; i < 9; i++) {

            sum += isbn[i] * (10-i);
        }
        sum += isbn[9] == 'X' ? 1 : isbn[9] * 1;
        // The summation of every DIGIT of ISBN multiplied by its position must be divisble by 11 
        result = sum % 11 == 0;
    }

    return result;
}

function isValidISBN13(isbn) {

    let result = false;
    let sum = 0;
    //13 digit ISBN can only have Integers
    if(!isNaN(isbn)){
        for (let i = 0; i < isbn.length; i++) {
            sum += isbn[i] * (isEvenIndex(13-i) ? 1 : 3);
        }
        result = sum % 10 == 0;
    }    
    // The summation of digits at odd positions[starting from right] added to the summation of three times the 
    //value of even postions[starting from right] should be divisible by 10
    return result;
}

function isEvenIndex(value) {
    return value % 2 != 0;
}