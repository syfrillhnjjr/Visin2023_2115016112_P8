// Inisialisasi peta
var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([0, 0]),
        zoom: 2
    })
});

// Memuat data gempa dari file CSV
fetch('earthquake.csv')
    .then(response => response.text())
    .then(data => {
        // Parsing data CSV menjadi array objek
        var features = [];
        var rows = data.trim().split('\n');
        for (var i = 1; i < rows.length; i++) {
            var row = rows[i].split(',');
            var lon = parseFloat(row[3]);
            var lat = parseFloat(row[2]);
            var depth = parseFloat(row[4]);
            var mag = parseFloat(row[5]);

            // Membuat fitur marker untuk setiap gempa
            var marker = new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.fromLonLat([lon, lat])),
                depth: depth,
                mag: mag
            });
            features.push(marker);
        }

        // Membuat layer vector untuk menampilkan marker
        var vectorSource = new ol.source.Vector({
            features: features
        });
        var vectorLayer = new ol.layer.Vector({
            source: vectorSource
        });
        map.addLayer(vectorLayer);
    })
    .catch(error => {
        console.error('Error:', error);
    });
