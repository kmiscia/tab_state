document.addEventListener('DOMContentLoaded', function () {

  var $groups = $("#groups");
  var $groupName = $("#group_name");

  var infoMessage = function(message){
    alert("Attention: " + message);
  }

  var errorMessage = function(message){
    alert("Error: " + message);
  }

  var appendGroupName = function(groupName){
    $groups.append($("<li/>").text($groupName.val()));
  }

  $("#save_group").click(function(){
    if($groupName.val().length)
      appendGroupName($groupName.val());
    else
      errorMessage("Group name is blank");
  });

});
