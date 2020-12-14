$(document).ready( () => {

  // Set the data to the people JSON file.
  const people = '/cctp623/data/people.json';

  // Find the submit button to remix the page.
  const remix = $( 'button.remix' );
  const restart = $( 'button.restart' );

  // When the "remix" button is clicked or entered...
  remix.on( 'click', ( e ) => {

    // Grab the user-selected attributes from the form.
    let gender = $( 'fieldset.gender input:checked' ).val(),
        ethnicity = $( 'fieldset.ethnicity input:checked' ).val();

    // Declare some variables we need.
    let name,
        pronounSubject,
        pronounObject,
        pronounPossAdj,
        photo;

    // Only remix the story if there are selected values...
    if( gender != null && ethnicity != null ) {

      // Stop the default behavior so we can run the remixes.
      e.preventDefault();

      // Grab the defined attributes from the JSON.
      $.getJSON( people, ( data ) => {

        // Loop through each person.
        $.each( data, ( i, person ) => {
          // Find the person who matches the user-selected attributes.
          if( gender === person.gender && ethnicity === person.ethnicity ) {
            name = person.name;
            pronounSubject = person.pronounSubject;
            pronounObject = person.pronounObject;
            pronounPossAdj = person.pronounPossAdj;
            photo = '/cctp623/photos/' + person.photo + '.jpg';
          }
        });

        if( name ) {
          // Display the remixed text.
          $( '#none' ).hide();
          $( '#story' ).show();

          $( '#story .name' ).html( name );
          $( '#story .pronoun-subject' ).html( pronounSubject );
          $( '#story .pronoun-object' ).html( pronounObject );
          $( '#story .pronoun-poss-adj' ).html( pronounPossAdj );
          $( '#story .photo' ).attr( 'src', photo );
        } else {
          // Display the "choose again".
          $( '#none' ).show();
          $( '#story' ).hide();
        }

      });
    }

  });

  // When the "restart" button is clicked or entered...
  restart.on( 'click', ( e ) => {
    $( '#none, #story' ).hide();
  });

});
