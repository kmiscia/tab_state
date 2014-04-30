document.addEventListener('DOMContentLoaded', function () {

  var $groups = $("#groups");
  var $groupName = $("#group_name");

  var initialize = function(){
    initializeGroupNames();
    initializeEvents();
  }

  var initializeGroupNames = function(){
    chrome.storage.local.get('savedGroups', function(items){
      for (var groupName in items['savedGroups'])
        appendUIGroupName(groupName);
    });
  }

  var initializeEvents = function(){
    
    $("#clear").on('click', function(){
      chrome.storage.local.clear();
      removeUIGroupNames();
    });

    $("#groups").on('click', '.delete', function(){
      groupName = $(this).parents("tr").children(".name").html();
      removeFromStorage(groupName, function(){
        removeUIGroupName(groupName);
      });
    })

    $("#save_group").on('click', function(){
      if($groupName.val().length)
        addToStorage($groupName.val(), function(){
          appendUIGroupName($groupName.val());
          $groupName.val("");
        });
      else
        errorMessage("Group name is blank");        
    });
  }

  var addToStorage = function(groupName, callback){
    chrome.storage.local.get('savedGroups', function(items){

      var savedGroups = (items['savedGroups'] == undefined) ? {} : items['savedGroups'];
      savedGroups[groupName] = groupName;

      chrome.storage.local.set({'savedGroups': savedGroups}, callback);
    });
  }

  var removeFromStorage = function(groupName, callback){
    chrome.storage.local.get('savedGroups', function(items){

      var savedGroups = items['savedGroups'] || {};
      delete savedGroups[groupName];

      chrome.storage.local.set({'savedGroups': savedGroups}, callback);
    });
  }

  var infoMessage = function(message){
    alert("Attention: " + message);
  }

  var errorMessage = function(message){
    alert("Error: " + message);
  }

  var appendUIGroupName = function(groupName){
    $row = $("<tr/>");
    $row
      .append($("<td/>", {
        'class': 'name',
        'text': groupName
      }))
      .append($("<td/>").append(deleteUILink()));
    $groups.append($row);
  }

  var removeUIGroupName = function(groupName){
    $groups
      .find("td:contains('" + groupName + "')")
      .parent("tr")
      .remove();
  }

  var removeUIGroupNames = function(){
    $groups.empty();
  }

  var deleteUILink = function(){
    return $("<a/>", {
      'href': '#',
      'class': 'delete',
      'html': 'Delete'
    })
  }

  initialize();
});
