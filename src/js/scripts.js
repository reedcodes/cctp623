$(document).ready( () => {

  // Set the data to the people JSON file.
  const people = '/cctp623/data/people.json';

  // Find the buttons to remix and restart the app.
  const remix = $( 'button.remix' );
  const restart = $( 'button.restart' );

  // When the "remix" button is clicked or entered...
  remix.on( 'click', ( e ) => {

    // Clear the highlights, if there are any.
    $( '#story .attribute' ).removeClass( 'highlight' );

    // Declare some variables we need.
    let name,
        pronounSubject,
        pronounObject,
        pronounPossAdj,
        photo;

    // Grab the user-selected attributes from the form.
    let original = $( 'fieldset.original input[ type="radio" ]:checked' ).val(),
        same = $( 'fieldset.original input[ type="checkbox" ]:checked' ).val(),
        gender = $( 'fieldset.gender input[ type="radio" ]:checked' ).val(),
        ethnicity = $( 'fieldset.ethnicity input[ type="radio" ]:checked' ).val();

    // Only remix the story if there are selected values...
    if( original != null && gender != null && ethnicity != null ) {

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

        // If we have a person...
        if( name ) {
          // If "same story" is selected...
          let story = same ? same : original;

          // Load the correct story piece.
          $( '#story .text' ).load( '/cctp623/stories/' + story + '.html', () => {

            // Add a class to the selected character.
            $( '#story .' + original ).addClass( 'highlight' );

            // Change the correct character's name only.
            $( '#story .name.' + original ).html( name );

            // Change the selected words with the remixed text.
            $( '#story .pronoun-subject.' + original ).html( pronounSubject );
            $( '#story .pronoun-object.' + original ).html( pronounObject );
            $( '#story .pronoun-poss-adj.' + original ).html( pronounPossAdj );

            // Insert the appropriate image for the character.
            $( '#story .photo' )
              .attr( 'src', photo )
              .attr( 'alt', name )
              .show();
          } );
        } else {
          // Display the "choose again" if there are no matches.
          $( '#story .photo' ).hide();
          $( '#story .text' ).load( '/cctp623/stories/none.html' );
        }

      });
    }

  });

  // When the "restart" button is clicked or entered...
  restart.on( 'click', ( e ) => {
    // Remove the attributes for the photo.
    $( '#story .photo' )
      .attr( 'src', '' )
      .attr( 'alt', '' )
      .hide();

    // Remove the text from the story.
    $( '#story .text' ).html( '' );
  });

});
