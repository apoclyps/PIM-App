function confirmAndDelete( listitem, transition ) {
// Highlight the list item that will be removed
listitem.addClass( "ui-btn-down-d" );
// Inject topic in confirmation popup after removing any previous injected topics
$( "#confirm .topic" ).remove();
listitem.find( ".topic" ).clone().insertAfter( "#question" );
// Show the confirmation popup
$( "#confirm" ).popup( "open" );
// Proceed when the user confirms
$( "#confirm #yes" ).on( "click", function() {
// Remove with a transition
if ( transition ) {
listitem
// Remove the highlight
.removeClass( "ui-btn-down-d" )
// Add the class for the transition direction
.addClass( transition )
// When the transition is done...
.on( "webkitTransitionEnd transitionend otransitionend", function() {
// ...the list item will be removed
listitem.remove();
// ...the list will be refreshed and the temporary class for border styling removed
$( "#list" ).listview( "refresh" ).find( ".ui-li.border" ).removeClass( "border" );
})
// During the transition the previous list item should get bottom border
.prev( "li.ui-li" ).addClass( "border" );
}
// If it's not a touch device or the CSS transition isn't supported just remove the list item and refresh the list
else {
listitem.remove();
$( "#list" ).listview( "refresh" );
}
});
// Remove active state and unbind when the cancel button is clicked
$( "#confirm #cancel" ).on( "click", function() {
listitem.removeClass( "ui-btn-down-d" );
$( "#confirm #yes" ).off();
});
} 