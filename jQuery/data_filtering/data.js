$(document).ready(function() {

  var data = [{
    "title": "The Legend of Zelda: Majora's Mask 3D",
    "id": 1,
    "category": "Nintendo 3DS"
  }, {
    "title": "Super Smash Bros.",
    "id": 2,
    "category": "Nintendo 3DS"
  }, {
    "title": "Super Smash Bros.",
    "id": 3,
    "category": "Nintendo WiiU"
  }, {
    "title": "LEGO Batman 3: Beyond Gotham",
    "id": 4,
    "category": "Nintendo WiiU"
  }, {
    "title": "LEGO Batman 3: Beyond Gotham",
    "id": 5,
    "category": "Xbox One"
  }, {
    "title": "LEGO Batman 3: Beyond Gotham",
    "id": 6,
    "category": "PlayStation 4"
  }, {
    "title": "Far Cry 4",
    "id": 7,
    "category": "PlayStation 4"
  }, {
    "title": "Far Cry 4",
    "id": 8,
    "category": "Xbox One"
  }, {
    "title": "Call of Duty: Advanced Warfare",
    "id": 9,
    "category": "PlayStation 4"
  }, {
    "title": "Call of Duty: Advanced Warfare",
    "id": 10,
    "category": "Xbox One"
  }],
      $items = $('.itemlist li'),
      $categories = $(':checkbox');

  $categories.on('change', function() {
    var toggled_ids,
        toggled_name = $(this).attr('name');

    toggled_ids = data.filter(function(element) {
      return element["category"] === toggled_name;
    }).map(function(obj) {
      return obj["id"]
    });

    $.each($items, function() {
      var element_id = $(this).data('id');
      if (toggled_ids.indexOf(element_id) !== -1) {
        $(this).toggle();
      }
    });
  });
});
