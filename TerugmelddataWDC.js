(function () {
	//Create the connector
    var myConnector = tableau.makeConnector();

	myConnector.getSchema = function (schemaCallback) {
		var cols = [{
			id: "basisregistratie",
			dataType: tableau.dataTypeEnum.string
		},  {
			id: "bronhoudernaam",
			alias: "bronhoudernaam",
			dataType: tableau.dataTypeEnum.string
		}, {
			id: "status",
			dataType: tableau.dataTypeEnum.string
		}, {
            id: "location",
            dataType: tableau.dataTypeEnum.geometry
		}];

		var tableSchema = {
			id: "Terugmelddata",
			alias: "Test",
			columns: cols
		};

		schemaCallback([tableSchema]);
	};

	//download the data
	myConnector.getData = function(table, doneCallback) {
		$.getJSON("https://stanronzhin.github.io/terugmeld/data.json", function(resp) {
			var feat = resp.features;
				tableData = [];
            tableau.log(feat);

			// Iterate over the JSON object
			for (var i = 0, len = feat.length; i < len; i++) {
                var wkt_data = new Wkt.Wkt();
                wkt_data.read(feat[i].geometry);
                tableau.log( wkt_data);

				tableData.push({
					"basisregistratie": feat[i].properties.basisregistratie,
					"bronhoudernaam": feat[i].properties.bronhoudernaam,
					"status": feat[i].properties.status,
                    "location": wkt_data.toJson()
				});
			}

			table.appendRows(tableData);
			doneCallback();
		});
	};

    tableau.registerConnector(myConnector);
})();

$(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "BAG Terugmelddata";
        tableau.submit();
    });
});

