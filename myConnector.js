(function() {
    // Create the connector object
// tableau.init();
    // tableau.extensions.initializeAsync().then(function() {
    var myConnector = tableau.makeConnector();
    console.log(tableau);
    // Initialize Tableau
    

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "timestamp", dataType: tableau.dataTypeEnum.int
        }, {
            id: "open", dataType: tableau.dataTypeEnum.float
        }, {
            id: "high", dataType: tableau.dataTypeEnum.float
        }, {
            id: "low", dataType: tableau.dataTypeEnum.float
        }, {
            id: "close", dataType: tableau.dataTypeEnum.float
        }];

        var tableSchema = {
            id: "intradayData",
            alias: "Intraday Data",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/new-intraday.json", function(resp) {
            var tableData = [];

            // Iterate over the JSON object
            for (var i = 0; i < resp.length; i++) {
                tableData.push({
                    "timestamp": resp[i][0],
                    "open": resp[i][1],
                    "high": resp[i][2],
                    "low": resp[i][3],
                    "close": resp[i][4]
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };

    // Register the connector
    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    jQuery(document).ready(function($) {

        $("#submitButton").click(function() {
            tableau.connectionName = "Tableau JSON file"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})
();
