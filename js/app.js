$(document).ready(function() {
	// bootstrap validation for the form
	$('#signupForm').bootstrapValidator({
		framework: 'bootstrap',

		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},

		fields: {
			firstname: {
				validators: {
					notEmpty: {
						message: 'Please supply your first name'
					}
				}	
			},

			lastname: {
				validators: {
					notEmpty: {
						message: 'Please supply your last name'
					}
				}	
			},

			email: {
				validators: {
					notEmpty: {
						message: 'Please supply your email address'
					}
				}	
			}
		}
	})

	// submit trial
	$('#signupForm').submit(function(event){
		event.preventDefault();

		// getting input's values
		var firstName = $('#firstname').val();
		var lastName = $('#lastname').val();
		var emailAddress = $('#email').val();
		var dataForServer = {
				data: [firstName, lastName, emailAddress]
		};

		// ajax call to send data to the server
		$.ajax({
			url: 'http://tiny.cc/cl-email-api-test/',
			method: 'GET',
			jsonp: false,
			jsonpCallback: 'jsonCallback',
			dataType: 'jsonp',
			data: dataForServer,
			success:  function (response) {
				var info = response.message.message;
				if (info === "Successfully subscribed") {
					$('#signupForm').on('success.form.bv', function(){
					$('#successInfo').show();
					$('#signupForm').data('bootstrapValidator').resetForm();
					});
				} else {
					$('#failureInfo').show();	
				};	
			}
		});

		// reset fields
		$('input#firstname').val("");
		$('input#lastname').val("");
		$('input#email').val("");
	})
 });	
	

