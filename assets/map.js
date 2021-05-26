//Icon of the jerseys on the map
let iconPicture = L.icon ({
    iconUrl: '/assets/images/cycling.png',
    iconSize: [25, 25],
    popupAnchor:  [0, -10]
});

 //Card initialization function
 function initMap() {
    var map = L.map('mapId').setView([48.833, 2.333], 10); 

    var osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { 
        attribution: '© OpenStreetMap contributors',
        minZoom: 2,
        maxZoom: 13
    });
    map.addLayer(osmLayer);

    //Checkbox for filters by years
    var command = L.control();
    command.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'command');
        div.innerHTML += '<h5>Filtres <br> par collection</h5>';
        div.innerHTML += '<form><input id="checkboxAll" + type="checkbox"/> Tous les maillots</form>';
        div.innerHTML += '<form><input id="checkbox50_60" + type="checkbox"/> Années 50 - 60</form>';
        div.innerHTML += '<form><input id="checkbox70" + type="checkbox"/> Années 70</form>';
        div.innerHTML += '<form><input id="checkbox80" +  type="checkbox"/> Années 80</form>';
        div.innerHTML += '<form><input id="checkbox90" + type="checkbox"/> Années 90</form>';
        return div;
    };
    //Add leaflet legend control
    command.addTo(map);

    //Constant for checkbox filters
    const cyclingShirts = document.getElementById('checkboxAll');
    const cyclingShirts50_60 = document.getElementById('checkbox50_60');
    const cyclingShirts70 = document.getElementById('checkbox70');
    const cyclingShirts80 = document.getElementById('checkbox80');
    const cyclingShirts90 = document.getElementById('checkbox90');

    //Creating layers and clusters with leaflet class
    var layerGroup = L.layerGroup().addTo(map);
    var markersGroup = L.markerClusterGroup({
        //Added options on the github documentation
        disableClusteringAtZoom: 13,
        spiderfyOnMaxZoom: false,
        removeOutsideVisibleBounds: true,
        showCoverageOnHover: false,
        iconCreateFunction: function(cluster) {
            var count = cluster.getChildCount();
            return L.divIcon({
                html: count,
                className: 'cluster',
                iconSize: null
            })
        }
    });

    //Function for add or remove the markers on the map
    function filterAll() {
        //If the checkbox is checked then we add the markers on the map
        if (cyclingShirts.checked === true) {
            //Asynchronously retrieves data with the server and returns an object of type Promise
            fetch("/api/map")
            .then(response => {
                return response.json()
            })
          .then(result => {
                result.forEach( element => {
                    //Get the coordinates from the Promise to add them to the LayerGroup
                    layerGroup = new L.marker([element.latitude, element.longitude], {icon: iconPicture})
                        .bindPopup(function (layer) {
                            return "<span>" + element.name + "</span>" + "<br>" +  "<div class='img-hover-zoom'>" + "<a href=" + "/collection50_60/" + element.id + ">" + "<img class='picturePopup' src=/assets/images/uploads/" + element.pictureFront + ">" + "</a>" + "</div>" +
                            "<br>" + element.city +"<br>" + "<a href=" + "/collection50_60" + ">" + element.years + "</a>"
                    }, {className: 'pop-up-leaflet', direction: 'top'},
                    )
                    markersGroup.addLayer(layerGroup);
                });
                //Adds all markers to the clusterGroup
                map.addLayer(markersGroup);
            })
            .catch(() => console.error('error'));
        //If the box is not checked, we delete the markers on the map
        } else if (cyclingShirts.checked === false) {
            fetch("/api/map")
            .then(response => { 
                return response.json()
            })
                .then(result => {
                    markersGroup.clearLayers();
                })
                .catch(() => console.error('error'));
        }
    }
    document.getElementById('checkboxAll').addEventListener('click', filterAll, false);

    function filter50_60() {
        if (cyclingShirts50_60.checked === true) {
            fetch("/api/filter50_60")
            .then(response => { 
                return response.json()
            })
            .then(result => {
                result.forEach( element => {
                    layerGroup = new L.marker([element.latitude, element.longitude], {icon: iconPicture})
                        .bindPopup(function (layer) {
                            return "<span>" + element.name + "</span>" + "<br>" +  "<div class='img-hover-zoom'>" + "<a href=" + "/collection50_60/" + element.id + ">" + "<img class='picturePopup' src=/assets/images/uploads/" + element.pictureFront + ">" + "</a>" + "</div>" +
                            "<br>" + element.city +"<br>" + "<a href=" + "/collection50_60" + ">" + element.years + "</a>"
                    }, {className: 'pop-up-leaflet', direction: 'top'},
                    )
                    markersGroup.addLayer(layerGroup);
                });
                map.addLayer(markersGroup);
            })
            .catch(() => console.error('error'));
        }  else if (cyclingShirts.checked === false) {
            fetch("/api/filter50_60")
            .then(response => { 
                return response.json()
            })
                .then(result => {
                    markersGroup.clearLayers();
                })
                .catch(() => console.error('error'));
        }
    }
    document.getElementById('checkbox50_60').addEventListener('click', filter50_60, false);

    function filter70() {
        if (cyclingShirts70.checked === true) {

            fetch("/api/filter70")
            .then(response => { 
                return response.json()
            })
          .then(result => {
                result.forEach( element => {
                    layerGroup = new L.marker([element.latitude, element.longitude], {icon: iconPicture})
                        .bindPopup(function (layer) {
                            return "<span>" + element.name + "</span>" + "<br>" +  "<div class='img-hover-zoom'>" + "<a href=" + "/collection70/" + element.id + ">" + "<img class='picturePopup' src=/assets/images/uploads/" + element.pictureFront + ">" + "</a>" + "</div>" +
                            "<br>" + element.city +"<br>" + "<a href=" + "/collection70" + ">" + element.years + "</a>"
                    }, {className: 'pop-up-leaflet', direction: 'top'},
                    )
                    markersGroup.addLayer(layerGroup);
                });
                map.addLayer(markersGroup);
            })
            .catch(() => console.error('error'));  
        }  else if (cyclingShirts.checked === false) {
            fetch("/api/filter70")
            .then(response => { 
                return response.json()
            })
                .then(result => {
                    markersGroup.clearLayers();
                })
                .catch(() => console.error('error'));
        }
    }
    document.getElementById('checkbox70').addEventListener('click', filter70, false);

    function filter80() {
        if (cyclingShirts80.checked === true) {

            fetch("/api/filter80")
            .then(response => { 
                return response.json()
            })
          .then(result => {
                result.forEach( element => {
                    layerGroup = new L.marker([element.latitude, element.longitude], {icon: iconPicture})
                        .bindPopup(function (layer) {
                            return "<span>" + element.name + "</span>" + "<br>" +  "<div class='img-hover-zoom'>" + "<a href=" + "/collection80/" + element.id + ">" + "<img class='picturePopup' src=/assets/images/uploads/" + element.pictureFront + ">" + "</a>" + "</div>" +
                            "<br>" + element.city +"<br>" + "<a href=" + "/collection80" + ">" + element.years + "</a>"
                    }, {className: 'pop-up-leaflet', direction: 'top'},
                    )
                    markersGroup.addLayer(layerGroup);
                });
                map.addLayer(markersGroup);
            })
            .catch(() => console.error('error'));  
        }  else if (cyclingShirts.checked === false) {
            fetch("/api/filter80")
            .then(response => { 
                return response.json()
            })
                .then(result => {
                    markersGroup.clearLayers();
                })
                .catch(() => console.error('error'));
        }
    }
    document.getElementById('checkbox80').addEventListener('click', filter80, false);

    function filter90() {
        if (cyclingShirts90.checked === true) {

            fetch("/api/filter90")
            .then(response => { 
                return response.json()
            })
          .then(result => {
                result.forEach( element => {
                    layerGroup = new L.marker([element.latitude, element.longitude], {icon: iconPicture})
                        .bindPopup(function (layer) {
                            return "<span>" + element.name + "</span>" + "<br>" +  "<div class='img-hover-zoom'>" + "<a href=" + "/collection90/" + element.id + ">" + "<img class='picturePopup' src=/assets/images/uploads/" + element.pictureFront + ">" + "</a>" + "</div>" +
                            "<br>" + element.city +"<br>" + "<a href=" + "/collection90" + ">" + element.years + "</a>"
                    }, {className: 'pop-up-leaflet', direction: 'top'},
                    )
                    markersGroup.addLayer(layerGroup);
                });
                map.addLayer(markersGroup);
            })
            .catch(() => console.error('error'));  
        }  else if (cyclingShirts.checked === false) {
            fetch("/api/filter90")
            .then(response => { 
                return response.json()
            })
                .then(result => {
                    markersGroup.clearLayers();
                })
                .catch(() => console.error('error'));
        }
    }
    document.getElementById('checkbox90').addEventListener('click', filter90, false);
}

window.onload = function(){
    // Initialization function that runs when the DOM is loaded
    initMap();
};