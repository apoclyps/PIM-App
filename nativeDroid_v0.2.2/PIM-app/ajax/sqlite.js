// Wait for device API libraries to load
document.addEventListener("deviceready", onDeviceReady, false);

// device APIs are available
function onDeviceReady() {
    var db = window.openDatabase("Database", "1.0", "PIM", 200000);
    db.transaction(populateDB, errorCB, successCB);
}

// Populate the database
function populateDB(tx) {
    //tx.executeSql('DROP TABLE IF EXISTS DEMO');
    tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
    tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
    tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
}

// Transaction error callback
function errorCB(tx, err) {
    alert("Error processing SQL: " + err);
}

// Transaction success callback
function successCB() {
    alert("success!");
}