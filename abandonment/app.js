var map;
  function init(){
    // initiate leaflet map
    map = new L.Map('map', { 
      center: [38.048976,-84.499819],
      zoom: 15,
      zoomControl: false
    });

    map.attributionControl.addAttribution('<a href="http://fayettepva.com/" target="_blank">Fayette County PVA</a>, LFUCG Vacant Property Review Commission')
    new L.Control.Zoom({ position: 'topright' }).addTo(map);

    L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
      subdomains: 'abcd',
    }).addTo(map);

  var sql = new cartodb.SQL({user: 'lexhousing'});
  var layerUrl = 'https://lexhousing.cartodb.com/api/v2/viz/121fe266-42f2-11e5-8d44-0e853d047bba/viz.json';
  var ownersUrl = 'https://lexhousing.cartodb.com/api/v2/viz/3b6529cc-4394-11e5-aaff-0e9d821ea90d/viz.json';


  var allStyle = "#vacant_owners_allproperties{line-color:#9b59b6;line-width:0.75;line-opacity:0.35;line-comp-op:color-dodge}"
  var allStyleAdd = {
    cartocss: allStyle
  }

  var finnellStyle = "#vacant_owners_allproperties{line-color:#2ecc71;line-width:0.75;line-opacity:0.6;line-comp-op:color-dodge}"
  var finnellStyleAdd = {
    cartocss: finnellStyle
  }



  var topFiveStyle = "#vacant_owners_allproperties{line-color:#3498db;line-width:0.75;line-opacity:0.6;line-comp-op:color-dodge}"
  var topFiveStyleAdd = {
    cartocss: topFiveStyle
  }

  var ownersStyle = "#lex_vacant_owners{marker-fill:#1abc9c;marker-height:4;marker-width:4}";

  var finnellAddStyle = "lex_vacant_owners{marker-fill:#1abc9c;marker-height:10;marker-width:10}";
  var finnellAddStyleAdd = {
    cartocss: finnellAddStyle
  }


  var sublayers = [];

  cartodb.createLayer(map, layerUrl)
    .addTo(map)
    .on('done', function(layer) {
      var subLayerOptions = {
        sql: "SELECT * FROM vacant_owners_allproperties",
        cartocss: allStyle,
        interactivity:'cartodb_id, address',
      }
      var sublayer = layer.getSubLayer(0);
      sublayer.set(subLayerOptions);
      sublayers.push(sublayer);
      sublayer.infowindow.set('template', $('#infowindow_template').html());
    }).on('error', function(){
  //log the error
  });

  // cartodb.createLayer(map, ownersUrl)
  //   .addTo(map)
  //   .on('done', function(layer) {
  //     var ownersLayerOptions = {
  //       sql: "SELECT * FROM lex_vacant_owners",
  //       cartocss: ownersStyle
  //     }
  //     var ownersLayer = layer.getSubLayer(0);
  //     ownersLayer.set(ownersLayerOptions);
  //     sublayers.push(ownersLayer)
  //   }).on('error', function() {
  //   //log the error
  // });

  var LayerActions = {
    all: function() {
      sublayers[0]
        .setSQL("SELECT * FROM vacant_owners_allproperties")
        .set(allStyleAdd);
      return true;
    },
    finnell: function() {
      var finnellQuery = "SELECT * FROM vacant_owners_allproperties WHERE lexvacan_1 = '21'"
      sublayers[0]
        .setSQL(finnellQuery)
        .set(finnellStyleAdd);
        
        sql.getBounds(finnellQuery).done(function(bounds) {
          map.fitBounds(bounds);
        });
      return true;
    },
    morton: function() {
      var mortonQuery = "SELECT * FROM vacant_owners_allproperties WHERE lexvacan_1 = '49'"
      sublayers[0]
        .setSQL(mortonQuery)
        .set(topFiveStyleAdd);
        
        sql.getBounds(mortonQuery).done(function(bounds) {
          map.fitBounds(bounds);
        });
      return true;
    },
    omead: function() {
      var omeadQuery = "SELECT * FROM vacant_owners_allproperties WHERE lexvacan_1 = '54'"
      sublayers[0]
        .setSQL(omeadQuery)
        .set(topFiveStyleAdd);
        
        sql.getBounds(omeadQuery).done(function(bounds) {
          map.fitBounds(bounds);
        });
      return true;
    },
    johnson: function() {
      var johnsonQuery = "SELECT * FROM vacant_owners_allproperties WHERE lexvacan_1 = '37'"
      sublayers[0]
        .setSQL(johnsonQuery)
        .set(topFiveStyleAdd);
        
        sql.getBounds(johnsonQuery).done(function(bounds) {
          map.fitBounds(bounds);
        });
      return true;
    },
    approp: function() {
      var appropQuery = "SELECT * FROM vacant_owners_allproperties WHERE lexvacan_1 = '01'"
      sublayers[0]
        .setSQL(appropQuery)
        .set(topFiveStyleAdd);
        
        sql.getBounds(appropQuery).done(function(bounds) {
          map.fitBounds(bounds);
        });
      return true;
    },
    lowkey: function() {
      var lowkeyQuery = "SELECT * FROM vacant_owners_allproperties WHERE lexvacan_1 = '44'"
      sublayers[0]
        .setSQL(lowkeyQuery)
        .set(topFiveStyleAdd);
        
        sql.getBounds(lowkeyQuery).done(function(bounds) {
          map.fitBounds(bounds);
        });
      return true;
    }
  }
  $('button').click(function() {
    if($(this).hasClass('selectable')){
        $('button').removeClass('selected');
        $(this).addClass('selected');
        LayerActions[$(this).attr('id')]();
      }
    });
  }