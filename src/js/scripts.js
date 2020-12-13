$(document).ready( () => {

  const attributes = '../../data/attributes.json';
  const remix = $( 'button.remix' );

  remix.on( 'click', ( e ) => {
    e.preventDefault();

    $.getJSON( attributes, function( data ) {
      $.each( data, function( i, person ) {
        $( '#remixed' ).append( person.name + ' ' );
      });
    });

  });

});
