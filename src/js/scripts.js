$(document).ready( () => {

  const people = '../../data/people.json';
  const remix = $( 'button.remix' );

  remix.on( 'click', ( e ) => {
    e.preventDefault();

    $.getJSON( people, function( data ) {
      $.each( data, function( i, person ) {
        $( '#remixed' ).append( person.name + ' ' );
      });
    });

  });

});
