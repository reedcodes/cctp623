$(document).ready( () => {

  // Set the data to the people JSON file.
  const people = '../../data/people.json';

  // Find the submit button to remix the page.
  const remix = $( 'button.remix' );

  // When the "remix" button is clicked or entered...
  remix.on( 'click', ( e ) => {
    // Stop the default behavior so we can run the remixes.
    e.preventDefault();

    // Grab the user-selected attributes from the form.
    let gender = $( 'fieldset.gender input:checked' ).val(),
        ethnicity = $( 'fieldset.ethnicity input:checked' ).val();

    // Declare other variables we need.
    let name = '';

    // Grab the defined attributes from the JSON.
    $.getJSON( people, ( data ) => {

      // Loop through each person.
      $.each( data, ( i, person ) => {
        // Find the person who matches the user-selected attributes.
        if( gender === person.gender && ethnicity === person.ethnicity ) {
          name = person.name;
        }
      });

      // Display the remixed text.
      $( '#name' ).html( 'Name: ' + name );
      $( '#gender' ).html( 'Gender: ' + gender );
      $( '#ethnicity' ).html( 'Ethnicity: ' + ethnicity );

    });

  });

});
