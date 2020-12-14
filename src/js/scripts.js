$(document).ready( () => {

  // Set the data to the people JSON file.
  const people = '../../data/people.json';

  // Find the submit button to remix the page.
  const remix = $( 'button.remix' );
  const restart = $( 'button.restart' );

  // When the "remix" button is clicked or entered...
  remix.on( 'click', ( e ) => {

    // Grab the user-selected attributes from the form.
    let gender = $( 'fieldset.gender input:checked' ).val(),
        ethnicity = $( 'fieldset.ethnicity input:checked' ).val();

    // Only remix the story if there are selected values...
    if( gender != null && ethnicity != null ) {

      // Stop the default behavior so we can run the remixes.
      e.preventDefault();

      // Declare some variables we need.
      let name,
          pronounSubject,
          pronounObject,
          pronounPossAdj,
          photo;

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
            photo = 'photos/' + person.photo + '.jpg';
          }
        });

        // Display the remixed text.
        $( '#story' ).addClass( 'remixed' );
        $( '#story .name' ).html( name );
        $( '#story .pronoun-subject' ).html( pronounSubject );
        $( '#story .pronoun-object' ).html( pronounObject );
        $( '#story .pronoun-poss-adj' ).html( pronounPossAdj );
        $( '#story .photo' ).attr( 'src', photo );

      });
    }

  });

  // When the "restart" button is clicked or entered...
  restart.on( 'click', ( e ) => {
    $( '#story' ).removeClass( 'remixed' );
  });

});
