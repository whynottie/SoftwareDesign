
var form = document.getElementById('submitButton');

   function myFunction() {
     if (form.checkValidity()) {
       alert("Form Successfully Submitted!");
     }
   }
   var form1 = document.getElementById('submit');

   function myFunction2() {
    if (form1.checkValidity()) {
      alert("Successfully Submitted");
    }
  }
   
   function pricing(){
    galreq = document.getElementById("gallons").value;
    address = document.getElementById("address_1").value;
    var galreqfactor
    var locfactor
    var n = address.includes("Texas")
    if (n) {
      locfactor = .02
    }
    else {
      locfactor = .04
    }

    if (galreq > 1000) {
      galreqfactor = .02
    }
    else {
      galreqfactor = .03
    }

    margin = 1.50 * (locfactor - .01 + galreqfactor + .1)
    var suggestedprice = 1.5 + margin
    document.getElementById("suggested_price").value = suggestedprice
    var total = galreq * suggestedprice
    document.getElementById('total').value = total;
    

}
 

$(function() {
    $('form > input[required]').on('input', function() {

        var empty = false;


        $('form > input[required]').each(function() {
            if ($(this).val() == '' || $(this).val() <= 0) {
                empty = true;
            }
            
        });

        if (empty) {
            $('#registerButton').attr('disabled', 'disabled');
            $('#getQB').attr('disabled', 'disabled');

        } else {
          $('#registerButton').removeAttr('disabled');
            $('#getQB').removeAttr('disabled');
        }
    });
})()
   
