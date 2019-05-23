
$(document).ready(function() {

    $('form').on('submit', (event)=>{

        event.preventDefault();


        $.getJSON("https://stanronzhin.github.io/terugmeld/data.json", function(resp) {
            var feat = resp.features;
            console.log(feat);

            proj4.defs([
                [
                    'EPSG:28992',
                    'urn:ogc:def:crs:EPSG::28992']

            ]);

            for (var i = 0, len = feat.length; i < len; i++) {
                var coordRD = feat[i].geometry.coordinates;

                var coordWGS =  proj4('EPSG:28992', 'WGS84', coordRD);
                console.log(coordWGS);

                var wkt_data = new Wkt.Wkt();
                wkt_data.read(coordWGS);
            }

        });
    });
});
