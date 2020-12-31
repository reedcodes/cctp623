$(document).ready( () => {

  // Set the data to the people JSON file.
  const people = '/cctp623/data/people.json';

  // Find the buttons to remix and restart the app.
  const remix = $( 'button.remix' );
  const restart = $( 'button.restart' );

  // Declare the delay time.
  let delayLoad = 1000;
  let delayStory = 1250;

  // When the "remix" button is clicked or entered...
  remix.on( 'click', ( e ) => {

    // Clear the current story.
    $( '#story' ).fadeOut( delayLoad );

    // Clear the highlights, if there are any.
    setTimeout( () => {
      $( '#story .attribute' ).removeClass( 'highlight' );
    }, delayLoad );

    // Declare some variables we need.
    let name,
        title,
        child,
        sibling,
        pronounSubject,
        pronounObject,
        pronounPossAdj,
        pronounBeingPresent,
        pronounBeingPast,
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

      setTimeout( () => {

        // Grab the defined attributes from the JSON.
        $.getJSON( people, ( data ) => {

          // Loop through each person.
          $.each( data, ( i, person ) => {
            // Find the person who matches the user-selected attributes.
            if( gender === person.gender && ethnicity === person.ethnicity ) {
              name = person.name;
              title = person.title;
              child = person.child;
              sibling = person.sibling;
              pronounSubject = person.pronounSubject;
              pronounObject = person.pronounObject;
              pronounPossAdj = person.pronounPossAdj;
              pronounBeingPresent = person.pronounBeingPresent;
              pronounBeingPast = person.pronounBeingPast;
              photo = '/cctp623/photos/' + person.photo + '.jpg';
            }
          });

          // If we have a person...
          if( name ) {
            // If "same story" is selected...
            let story = same ? same : original;

            // Load the correct story piece.
            $( '#story' ).fadeIn( delayLoad ).delay( delayLoad );
            $( '#story .text' ).load( '/cctp623/stories/' + story + '.html', () => {

              // Add a class to the selected character.
              $( '#story .' + original ).addClass( 'highlight' );

              // Change the correct character's name and attributes.
              $( '#story .name.' + original ).html( name );
              $( '#story .title.' + original ).html( title );
              $( '#story .child.' + original ).html( child );
              $( '#story .sibling.' + original ).html( sibling );

              // Change the selected pronouns for the selected character.
              $( '#story .pronoun-subject.' + original ).html( pronounSubject );
              $( '#story .pronoun-object.' + original ).html( pronounObject );
              $( '#story .pronoun-poss-adj.' + original ).html( pronounPossAdj );
              $( '#story .pronoun-being-present.' + original ).html( pronounBeingPresent );
              $( '#story .pronoun-being-past.' + original ).html( pronounBeingPast );

              // Insert the appropriate image for the character.
              $( '#story .photo' )
                .attr( 'src', photo )
                .attr( 'alt', name )
                .show();
            } );
          } else {
            // Display the "choose again" if there are no matches.
            $( '#story' ).fadeIn( delayLoad ).delay( delayLoad );
            $( '#story .photo' ).hide();
            $( '#story .text' ).load( '/cctp623/stories/none.html' );
          }

        });
      }, delayStory );
    }

  });

  // When the "restart" button is clicked or entered...
  restart.on( 'click', ( e ) => {

    $( '#story' ).fadeOut( delayLoad );

    setTimeout( () => {
      // Remove the attributes for the photo.
      $( '#story .photo' )
        .attr( 'src', '' )
        .attr( 'alt', '' )
        .hide();

      // Remove the text from the story.
      $( '#story .text' ).html( '' );
    }, delayLoad );

  });

});
