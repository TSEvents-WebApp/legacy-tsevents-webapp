
$(function () {

    var garage = null;
    var currentLevel = null;
    // Setting up the map


    var mapExtent = [-122.32354839, 47.64710235, -122.28590335, 47.66764306];
    var mapMinZoom = 13;
    var mapMaxZoom = 20;
    var bounds = new L.LatLngBounds(
        new L.LatLng(mapExtent[1], mapExtent[0]),
        new L.LatLng(mapExtent[3], mapExtent[2]));
    var map = L.map('map').fitBounds(bounds);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    var layer;
    var options = {
        minZoom: mapMinZoom,
        maxZoom: mapMaxZoom,
        opacity: 1.0,
        attribution: 'Rendered with <a href="http://www.maptiler.com/desktop/">MapTiler Desktop</a>',
        tms: false
    };
    map.flyTo([47.655906726878456, -122.30409622192384], 15.5);

    layer = L.tileLayer('{z}/{x}/{y}.png', options).addTo(map);

    // Right click for coordinates
    var mouseLat, mouseLng;

    map.addEventListener('mousemove', function (ev) {
        mouseLat = ev.latlng.lat;
        mouseLng = ev.latlng.lng;
    });

    document.getElementById('map').addEventListener('contextmenu', function (event) {
        // Prevent the browser's context menu from appearing
        event.preventDefault();

        // Add marker
        alert(mouseLat + ',' + mouseLng);

        return true; // To disable default popup.
    });

    // panning to location
    $('.lot').on('click', function () {
        // parse lat and lng from the divs data attribute
        var latlng = $(this).data().point.split(',');
        var lat = latlng[0];
        var lng = latlng[1];
        var zoom = 19;
        var schemBox = document.querySelector("#schematicBox");
        var boxStyle = window.getComputedStyle(schemBox);
        var display = boxStyle.display;
        if (display != "none") {
            document.getElementById("schematicBox").style.display = "none";
            document.getElementById(garage + "_schem").style.display = "none";
            if (map.getZoom() >= 16.5) {
                map.addLayer(garageLayer);
                if (map.getZoom() >= 19) {
                    map.addLayer(picturesLayer);
                }
            }
        }

        // add a marker
        //var marker = L.marker([lat, lng],{}).addTo(map);
        // set the view
        map.flyTo([lat, lng], zoom);
    });

    // Picture Icons 
        function picIconCreation(n) {
        var ans = L.icon({
            iconUrl: "png/" + n + '.png',
            iconSize: [36, 45],
            iconAnchor: [20, 50],
            popupAnchor: [0, -40]
        });
        return ans;
    };

    // Parking Garage Icons
    function iconCreation(n) {
        var ans = L.icon({
            iconUrl: "png/" + n,
            iconSize: [50, 50],
            iconAnchor: [25, 25]
        });
        return ans;
    };
    // icons close



    // Extracting josn data
    var picturesLayer = L.geoJson();
    var garageLayer = L.geoJson();
    var garageSingleLayer = L.geoJson().addTo(map);
    var searchLayer = L.geoJson();

    var CPG_1Layer = L.geoJson();
    var CPG_2Layer = L.geoJson();
    var CPG_3Layer = L.geoJson();
    var CPG_4Layer = L.geoJson();
    var CPG_5Layer = L.geoJson();
    var CPG_6Layer = L.geoJson();

    var PBG_0Layer = L.geoJson();
    var PBG_1Layer = L.geoJson();
    var PBG_2Layer = L.geoJson();
    var PBG_3Layer = L.geoJson();
    var PBG_4Layer = L.geoJson();
    var PBG_5Layer = L.geoJson();
    var PBG_6Layer = L.geoJson();

    var S1_1Layer = L.geoJson();
    var S1_2Layer = L.geoJson();
    var S1_3Layer = L.geoJson();

    var MMG_1Layer = L.geoJson();
    var MMG_2Layer = L.geoJson();
    var MMG_3Layer = L.geoJson();

    var HG_1Layer = L.geoJson();
    var HG_2Layer = L.geoJson();
    var HG_3Layer = L.geoJson();

    var PDL_1Layer = L.geoJson();
    var PDL_2Layer = L.geoJson();
    var PDL_3Layer = L.geoJson();
    var PDL_31Layer = L.geoJson();
    var PDL_4Layer = L.geoJson();
    var PDL_41Layer = L.geoJson();

    var W45_LLLayer = L.geoJson();
    var W45_1Layer = L.geoJson();
    var W45_2Layer = L.geoJson();
    var W45_3Layer = L.geoJson();
    var W45_4Layer = L.geoJson();
    var W45_5Layer = L.geoJson();

    var W46_1Layer = L.geoJson();
    var W46_2Layer = L.geoJson();
    var W46_3Layer = L.geoJson();
    var W46_4Layer = L.geoJson();
    var W46_5Layer = L.geoJson();
    var W46_6Layer = L.geoJson();

    var G4545_1Layer = L.geoJson();
    var G4545_2Layer = L.geoJson();
    var G4545_3Layer = L.geoJson();
    var G4545_4Layer = L.geoJson();
    var G4545_5Layer = L.geoJson();
    var G4545_6Layer = L.geoJson();
    var G4545_7Layer = L.geoJson();
    var G4545_8Layer = L.geoJson();

    var CGE_1Layer = L.geoJson();
    var CGE_2Layer = L.geoJson();

    var CGW_1Layer = L.geoJson();
    var CGW_2Layer = L.geoJson();

    var W27Layer = L.geoJson();
    var W29Layer = L.geoJson();
    var W32Layer = L.geoJson();
    var W33Layer = L.geoJson();
    var W39Layer = L.geoJson();


    $.getJSON('json/PhotoData.geojson', function (json) {
        // Icon Setup

        // Outside pics
        picturesLayer.options.pointToLayer = function (feature, latlng) {
            var ans = L.marker(latlng, { icon: picIconCreation(feature.properties["Type"]) });
            ans.bindPopup(feature.properties["Name"] + "<br />" + feature.properties["DateTime"].substring(0, 10));
            ans.on('mouseover', function () {
                this.openPopup();
            });
            ans.on('mouseout', function () {
                this.closePopup();
            });
            return ans;
        }

        // Single Level Garages
        W27Layer.options.pointToLayer = function (feature, latlng) {
            var ans = L.marker(latlng, { icon: picIconCreation(feature.properties["Type"]) }); ans.bindPopup(feature.properties["Name"] + "<br />" + feature.properties["DateTime"].substring(0, 10)); ans.on('mouseover', function () { this.openPopup(); }); ans.on('mouseout', function () { this.closePopup(); }); return ans;
        }
        W29Layer.options.pointToLayer = function (feature, latlng) {
            var ans = L.marker(latlng, { icon: picIconCreation(feature.properties["Type"]) }); ans.bindPopup(feature.properties["Name"] + "<br />" + feature.properties["DateTime"].substring(0, 10)); ans.on('mouseover', function () { this.openPopup(); }); ans.on('mouseout', function () { this.closePopup(); }); return ans;
        }
        W32Layer.options.pointToLayer = function (feature, latlng) {
            var ans = L.marker(latlng, { icon: picIconCreation(feature.properties["Type"]) }); ans.bindPopup(feature.properties["Name"] + "<br />" + feature.properties["DateTime"].substring(0, 10)); ans.on('mouseover', function () { this.openPopup(); }); ans.on('mouseout', function () { this.closePopup(); }); return ans;
        }
        W33Layer.options.pointToLayer = function (feature, latlng) {
            var ans = L.marker(latlng, { icon: picIconCreation(feature.properties["Type"]) }); ans.bindPopup(feature.properties["Name"] + "<br />" + feature.properties["DateTime"].substring(0, 10)); ans.on('mouseover', function () { this.openPopup(); }); ans.on('mouseout', function () { this.closePopup(); }); return ans;
        }
        W39Layer.options.pointToLayer = function (feature, latlng) {
            var ans = L.marker(latlng, { icon: picIconCreation(feature.properties["Type"]) }); ans.bindPopup(feature.properties["Name"] + "<br />" + feature.properties["DateTime"].substring(0, 10)); ans.on('mouseover', function () { this.openPopup(); }); ans.on('mouseout', function () { this.closePopup(); }); return ans;
        }

        // Central Plaza Garage
        CPG_1Layer.options.pointToLayer = function (feature, latlng) {
            var ans = L.marker(latlng, { icon: picIconCreation(feature.properties["Type"]) }); ans.bindPopup(feature.properties["Name"] + "<br />" + feature.properties["DateTime"].substring(0, 10)); ans.on('mouseover', function () { this.openPopup(); }); ans.on('mouseout', function () { this.closePopup(); }); return ans;
        }
        CPG_2Layer.options.pointToLayer = function (feature, latlng) {
            var ans = L.marker(latlng, { icon: picIconCreation(feature.properties["Type"]) }); ans.bindPopup(feature.properties["Name"] + "<br />" + feature.properties["DateTime"].substring(0, 10)); ans.on('mouseover', function () { this.openPopup(); }); ans.on('mouseout', function () { this.closePopup(); }); return ans;
        }
        CPG_3Layer.options.pointToLayer = function (feature, latlng) {
            var ans = L.marker(latlng, { icon: picIconCreation(feature.properties["Type"]) }); ans.bindPopup(feature.properties["Name"] + "<br />" + feature.properties["DateTime"].substring(0, 10)); ans.on('mouseover', function () { this.openPopup(); }); ans.on('mouseout', function () { this.closePopup(); }); return ans;
        }
        CPG_4Layer.options.pointToLayer = function (feature, latlng) {
            var ans = L.marker(latlng, { icon: picIconCreation(feature.properties["Type"]) }); ans.bindPopup(feature.properties["Name"] + "<br />" + feature.properties["DateTime"].substring(0, 10)); ans.on('mouseover', function () { this.openPopup(); }); ans.on('mouseout', function () { this.closePopup(); }); return ans;
        }
        CPG_5Layer.options.pointToLayer = function (feature, latlng) {
            var ans = L.marker(latlng, { icon: picIconCreation(feature.properties["Type"]) }); ans.bindPopup(feature.properties["Name"] + "<br />" + feature.properties["DateTime"].substring(0, 10)); ans.on('mouseover', function () { this.openPopup(); }); ans.on('mouseout', function () { this.closePopup(); }); return ans;
        }
        CPG_6Layer.options.pointToLayer = function (feature, latlng) {
            var ans = L.marker(latlng, { icon: picIconCreation(feature.properties["Type"]) }); ans.bindPopup(feature.properties["Name"] + "<br />" + feature.properties["DateTime"].substring(0, 10)); ans.on('mouseover', function () { this.openPopup(); }); ans.on('mouseout', function () { this.closePopup(); }); return ans;
        }

        // Portage Bay Garage
        PBG_0Layer.options.pointToLayer = function (feature, latlng) {
            var ans = L.marker(latlng, { icon: picIconCreation(feature.properties["Type"]) }); ans.bindPopup(feature.properties["Name"] + "<br />" + feature.properties["DateTime"].substring(0, 10)); ans.on('mouseover', function () { this.openPopup(); }); ans.on('mouseout', function () { this.closePopup(); }); return ans;
        }
        PBG_1Layer.options.pointToLayer = function (feature, latlng) {
            var ans = L.marker(latlng, { icon: picIconCreation(feature.properties["Type"]) }); ans.bindPopup(feature.properties["Name"] + "<br />" + feature.properties["DateTime"].substring(0, 10)); ans.on('mouseover', function () { this.openPopup(); }); ans.on('mouseout', function () { this.closePopup(); }); return ans;
        }
        PBG_2Layer.options.pointToLayer = function (feature, latlng) {
            var ans = L.marker(latlng, { icon: picIconCreation(feature.properties["Type"]) }); ans.bindPopup(feature.properties["Name"] + "<br />" + feature.properties["DateTime"].substring(0, 10)); ans.on('mouseover', function () { this.openPopup(); }); ans.on('mouseout', function () { this.closePopup(); }); return ans;
        }
        PBG_3Layer.options.pointToLayer = function (feature, latlng) {
            var ans = L.marker(latlng, { icon: picIconCreation(feature.properties["Type"]) }); ans.bindPopup(feature.properties["Name"] + "<br />" + feature.properties["DateTime"].substring(0, 10)); ans.on('mouseover', function () { this.openPopup(); }); ans.on('mouseout', function () { this.closePopup(); }); return ans;
        }
        PBG_4Layer.options.pointToLayer = function (feature, latlng) {
            var ans = L.marker(latlng, { icon: picIconCreation(feature.properties["Type"]) }); ans.bindPopup(feature.properties["Name"] + "<br />" + feature.properties["DateTime"].substring(0, 10)); ans.on('mouseover', function () { this.openPopup(); }); ans.on('mouseout', function () { this.closePopup(); }); return ans;
        }
        PBG_5Layer.options.pointToLayer = function (feature, latlng) {
            var ans = L.marker(latlng, { icon: picIconCreation(feature.properties["Type"]) }); ans.bindPopup(feature.properties["Name"] + "<br />" + feature.properties["DateTime"].substring(0, 10)); ans.on('mouseover', function () { this.openPopup(); }); ans.on('mouseout', function () { this.closePopup(); }); return ans;
        }
        PBG_6Layer.options.pointToLayer = function (feature, latlng) {
            var ans = L.marker(latlng, { icon: picIconCreation(feature.properties["Type"]) }); ans.bindPopup(feature.properties["Name"] + "<br />" + feature.properties["DateTime"].substring(0, 10)); ans.on('mouseover', function () { this.openPopup(); }); ans.on('mouseout', function () { this.closePopup(); }); return ans;
        }

        // S1
        S1_1Layer.options.pointToLayer = function (feature, latlng) {
            var ans = L.marker(latlng, { icon: picIconCreation(feature.properties["Type"]) }); ans.bindPopup(feature.properties["Name"] + "<br />" + feature.properties["DateTime"].substring(0, 10)); ans.on('mouseover', function () { this.openPopup(); }); ans.on('mouseout', function () { this.closePopup(); }); return ans;
        }
        S1_2Layer.options.pointToLayer = function (feature, latlng) {
            var ans = L.marker(latlng, { icon: picIconCreation(feature.properties["Type"]) }); ans.bindPopup(feature.properties["Name"] + "<br />" + feature.properties["DateTime"].substring(0, 10)); ans.on('mouseover', function () { this.openPopup(); }); ans.on('mouseout', function () { this.closePopup(); }); return ans;
        }
        S1_3Layer.options.pointToLayer = function (feature, latlng) {
            var ans = L.marker(latlng, { icon: picIconCreation(feature.properties["Type"]) }); ans.bindPopup(feature.properties["Name"] + "<br />" + feature.properties["DateTime"].substring(0, 10)); ans.on('mouseover', function () { this.openPopup(); }); ans.on('mouseout', function () { this.closePopup(); }); return ans;
        }

        // McMahon Garage
        MMG_1Layer.options.pointToLayer = function (feature, latlng) {
            var ans = L.marker(latlng, { icon: picIconCreation(feature.properties["Type"]) }); ans.bindPopup(feature.properties["Name"] + "<br />" + feature.properties["DateTime"].substring(0, 10)); ans.on('mouseover', function () { this.openPopup(); }); ans.on('mouseout', function () { this.closePopup(); }); return ans;
        }
        MMG_2Layer.options.pointToLayer = function (feature, latlng) {
            var ans = L.marker(latlng, { icon: picIconCreation(feature.properties["Type"]) }); ans.bindPopup(feature.properties["Name"] + "<br />" + feature.properties["DateTime"].substring(0, 10)); ans.on('mouseover', function () { this.openPopup(); }); ans.on('mouseout', function () { this.closePopup(); }); return ans;
        }
        MMG_3Layer.options.pointToLayer = function (feature, latlng) {
            var ans = L.marker(latlng, { icon: picIconCreation(feature.properties["Type"]) }); ans.bindPopup(feature.properties["Name"] + "<br />" + feature.properties["DateTime"].substring(0, 10)); ans.on('mouseover', function () { this.openPopup(); }); ans.on('mouseout', function () { this.closePopup(); }); return ans;
        }

        // Haggett Garage
        HG_1Layer.options.pointToLayer = function (feature, latlng) {
            var ans = L.marker(latlng, { icon: picIconCreation(feature.properties["Type"]) }); ans.bindPopup(feature.properties["Name"] + "<br />" + feature.properties["DateTime"].substring(0, 10)); ans.on('mouseover', function () { this.openPopup(); }); ans.on('mouseout', function () { this.closePopup(); }); return ans;
        }
        HG_2Layer.options.pointToLayer = function (feature, latlng) {
            var ans = L.marker(latlng, { icon: picIconCreation(feature.properties["Type"]) }); ans.bindPopup(feature.properties["Name"] + "<br />" + feature.properties["DateTime"].substring(0, 10)); ans.on('mouseover', function () { this.openPopup(); }); ans.on('mouseout', function () { this.closePopup(); }); return ans;
        }
        HG_3Layer.options.pointToLayer = function (feature, latlng) {
            var ans = L.marker(latlng, { icon: picIconCreation(feature.properties["Type"]) }); ans.bindPopup(feature.properties["Name"] + "<br />" + feature.properties["DateTime"].substring(0, 10)); ans.on('mouseover', function () { this.openPopup(); }); ans.on('mouseout', function () { this.closePopup(); }); return ans;
        }

        // Padelford Garage
        PDL_1Layer.options.pointToLayer = function (feature, latlng) {
            var ans = L.marker(latlng, { icon: picIconCreation(feature.properties["Type"]) }); ans.bindPopup(feature.properties["Name"] + "<br />" + feature.properties["DateTime"].substring(0, 10)); ans.on('mouseover', function () { this.openPopup(); }); ans.on('mouseout', function () { this.closePopup(); }); return ans;
        }
        PDL_2Layer.options.pointToLayer = function (feature, latlng) {
            var ans = L.marker(latlng, { icon: picIconCreation(feature.properties["Type"]) }); ans.bindPopup(feature.properties["Name"] + "<br />" + feature.properties["DateTime"].substring(0, 10)); ans.on('mouseover', function () { this.openPopup(); }); ans.on('mouseout', function () { this.closePopup(); }); return ans;
        }
        PDL_3Layer.options.pointToLayer = function (feature, latlng) {
            var ans = L.marker(latlng, { icon: picIconCreation(feature.properties["Type"]) }); ans.bindPopup(feature.properties["Name"] + "<br />" + feature.properties["DateTime"].substring(0, 10)); ans.on('mouseover', function () { this.openPopup(); }); ans.on('mouseout', function () { this.closePopup(); }); return ans;
        }
        PDL_31Layer.options.pointToLayer = function (feature, latlng) {
            var ans = L.marker(latlng, { icon: picIconCreation(feature.properties["Type"]) }); ans.bindPopup(feature.properties["Name"] + "<br />" + feature.properties["DateTime"].substring(0, 10)); ans.on('mouseover', function () { this.openPopup(); }); ans.on('mouseout', function () { this.closePopup(); }); return ans;
        }
        PDL_4Layer.options.pointToLayer = function (feature, latlng) {
            var ans = L.marker(latlng, { icon: picIconCreation(feature.properties["Type"]) }); ans.bindPopup(feature.properties["Name"] + "<br />" + feature.properties["DateTime"].substring(0, 10)); ans.on('mouseover', function () { this.openPopup(); }); ans.on('mouseout', function () { this.closePopup(); }); return ans;
        }
        PDL_41Layer.options.pointToLayer = function (feature, latlng) {
            var ans = L.marker(latlng, { icon: picIconCreation(feature.properties["Type"]) }); ans.bindPopup(feature.properties["Name"] + "<br />" + feature.properties["DateTime"].substring(0, 10)); ans.on('mouseover', function () { this.openPopup(); }); ans.on('mouseout', function () { this.closePopup(); }); return ans;
        }

        //W45
        W45_1Layer.options.pointToLayer = function (feature, latlng) {
            var ans = L.marker(latlng, { icon: picIconCreation(feature.properties["Type"]) }); ans.bindPopup(feature.properties["Name"] + "<br />" + feature.properties["DateTime"].substring(0, 10)); ans.on('mouseover', function () { this.openPopup(); }); ans.on('mouseout', function () { this.closePopup(); }); return ans;
        }
        W45_2Layer.options.pointToLayer = function (feature, latlng) {
            var ans = L.marker(latlng, { icon: picIconCreation(feature.properties["Type"]) }); ans.bindPopup(feature.properties["Name"] + "<br />" + feature.properties["DateTime"].substring(0, 10)); ans.on('mouseover', function () { this.openPopup(); }); ans.on('mouseout', function () { this.closePopup(); }); return ans;
        }
        W45_3Layer.options.pointToLayer = function (feature, latlng) {
            var ans = L.marker(latlng, { icon: picIconCreation(feature.properties["Type"]) }); ans.bindPopup(feature.properties["Name"] + "<br />" + feature.properties["DateTime"].substring(0, 10)); ans.on('mouseover', function () { this.openPopup(); }); ans.on('mouseout', function () { this.closePopup(); }); return ans;
        }
        W45_4Layer.options.pointToLayer = function (feature, latlng) {
            var ans = L.marker(latlng, { icon: picIconCreation(feature.properties["Type"]) }); ans.bindPopup(feature.properties["Name"] + "<br />" + feature.properties["DateTime"].substring(0, 10)); ans.on('mouseover', function () { this.openPopup(); }); ans.on('mouseout', function () { this.closePopup(); }); return ans;
        }
        W45_5Layer.options.pointToLayer = function (feature, latlng) {
            var ans = L.marker(latlng, { icon: picIconCreation(feature.properties["Type"]) }); ans.bindPopup(feature.properties["Name"] + "<br />" + feature.properties["DateTime"].substring(0, 10)); ans.on('mouseover', function () { this.openPopup(); }); ans.on('mouseout', function () { this.closePopup(); }); return ans;
        }
        W45_LLLayer.options.pointToLayer = function (feature, latlng) {
            var ans = L.marker(latlng, { icon: picIconCreation(feature.properties["Type"]) }); ans.bindPopup(feature.properties["Name"] + "<br />" + feature.properties["DateTime"].substring(0, 10)); ans.on('mouseover', function () { this.openPopup(); }); ans.on('mouseout', function () { this.closePopup(); }); return ans;
        }

        // W46
        W46_1Layer.options.pointToLayer = function (feature, latlng) {
            var ans = L.marker(latlng, { icon: picIconCreation(feature.properties["Type"]) }); ans.bindPopup(feature.properties["Name"] + "<br />" + feature.properties["DateTime"].substring(0, 10)); ans.on('mouseover', function () { this.openPopup(); }); ans.on('mouseout', function () { this.closePopup(); }); return ans;
        }
        W46_2Layer.options.pointToLayer = function (feature, latlng) {
            var ans = L.marker(latlng, { icon: picIconCreation(feature.properties["Type"]) }); ans.bindPopup(feature.properties["Name"] + "<br />" + feature.properties["DateTime"].substring(0, 10)); ans.on('mouseover', function () { this.openPopup(); }); ans.on('mouseout', function () { this.closePopup(); }); return ans;
        }
        W46_3Layer.options.pointToLayer = function (feature, latlng) {
            var ans = L.marker(latlng, { icon: picIconCreation(feature.properties["Type"]) }); ans.bindPopup(feature.properties["Name"] + "<br />" + feature.properties["DateTime"].substring(0, 10)); ans.on('mouseover', function () { this.openPopup(); }); ans.on('mouseout', function () { this.closePopup(); }); return ans;
        }
        W46_4Layer.options.pointToLayer = function (feature, latlng) {
            var ans = L.marker(latlng, { icon: picIconCreation(feature.properties["Type"]) }); ans.bindPopup(feature.properties["Name"] + "<br />" + feature.properties["DateTime"].substring(0, 10)); ans.on('mouseover', function () { this.openPopup(); }); ans.on('mouseout', function () { this.closePopup(); }); return ans;
        }
        W46_5Layer.options.pointToLayer = function (feature, latlng) {
            var ans = L.marker(latlng, { icon: picIconCreation(feature.properties["Type"]) }); ans.bindPopup(feature.properties["Name"] + "<br />" + feature.properties["DateTime"].substring(0, 10)); ans.on('mouseover', function () { this.openPopup(); }); ans.on('mouseout', function () { this.closePopup(); }); return ans;
        }
        W46_6Layer.options.pointToLayer = function (feature, latlng) {
            var ans = L.marker(latlng, { icon: picIconCreation(feature.properties["Type"]) }); ans.bindPopup(feature.properties["Name"] + "<br />" + feature.properties["DateTime"].substring(0, 10)); ans.on('mouseover', function () { this.openPopup(); }); ans.on('mouseout', function () { this.closePopup(); }); return ans;
        }

        // G4545
        G4545_1Layer.options.pointToLayer = function (feature, latlng) {
            var ans = L.marker(latlng, { icon: picIconCreation(feature.properties["Type"]) }); ans.bindPopup(feature.properties["Name"] + "<br />" + feature.properties["DateTime"].substring(0, 10)); ans.on('mouseover', function () { this.openPopup(); }); ans.on('mouseout', function () { this.closePopup(); }); return ans;
        }
        G4545_2Layer.options.pointToLayer = function (feature, latlng) {
            var ans = L.marker(latlng, { icon: picIconCreation(feature.properties["Type"]) }); ans.bindPopup(feature.properties["Name"] + "<br />" + feature.properties["DateTime"].substring(0, 10)); ans.on('mouseover', function () { this.openPopup(); }); ans.on('mouseout', function () { this.closePopup(); }); return ans;
        }
        G4545_3Layer.options.pointToLayer = function (feature, latlng) {
            var ans = L.marker(latlng, { icon: picIconCreation(feature.properties["Type"]) }); ans.bindPopup(feature.properties["Name"] + "<br />" + feature.properties["DateTime"].substring(0, 10)); ans.on('mouseover', function () { this.openPopup(); }); ans.on('mouseout', function () { this.closePopup(); }); return ans;
        }
        G4545_4Layer.options.pointToLayer = function (feature, latlng) {
            var ans = L.marker(latlng, { icon: picIconCreation(feature.properties["Type"]) }); ans.bindPopup(feature.properties["Name"] + "<br />" + feature.properties["DateTime"].substring(0, 10)); ans.on('mouseover', function () { this.openPopup(); }); ans.on('mouseout', function () { this.closePopup(); }); return ans;
        }
        G4545_5Layer.options.pointToLayer = function (feature, latlng) {
            var ans = L.marker(latlng, { icon: picIconCreation(feature.properties["Type"]) }); ans.bindPopup(feature.properties["Name"] + "<br />" + feature.properties["DateTime"].substring(0, 10)); ans.on('mouseover', function () { this.openPopup(); }); ans.on('mouseout', function () { this.closePopup(); }); return ans;
        }
        G4545_6Layer.options.pointToLayer = function (feature, latlng) {
            var ans = L.marker(latlng, { icon: picIconCreation(feature.properties["Type"]) }); ans.bindPopup(feature.properties["Name"] + "<br />" + feature.properties["DateTime"].substring(0, 10)); ans.on('mouseover', function () { this.openPopup(); }); ans.on('mouseout', function () { this.closePopup(); }); return ans;
        }
        G4545_7Layer.options.pointToLayer = function (feature, latlng) {
            var ans = L.marker(latlng, { icon: picIconCreation(feature.properties["Type"]) }); ans.bindPopup(feature.properties["Name"] + "<br />" + feature.properties["DateTime"].substring(0, 10)); ans.on('mouseover', function () { this.openPopup(); }); ans.on('mouseout', function () { this.closePopup(); }); return ans;
        }
        G4545_8Layer.options.pointToLayer = function (feature, latlng) {
            var ans = L.marker(latlng, { icon: picIconCreation(feature.properties["Type"]) }); ans.bindPopup(feature.properties["Name"] + "<br />" + feature.properties["DateTime"].substring(0, 10)); ans.on('mouseover', function () { this.openPopup(); }); ans.on('mouseout', function () { this.closePopup(); }); return ans;
        }

        // Cedar East
        CGE_1Layer.options.pointToLayer = function (feature, latlng) {
            var ans = L.marker(latlng, { icon: picIconCreation(feature.properties["Type"]) }); ans.bindPopup(feature.properties["Name"] + "<br />" + feature.properties["DateTime"].substring(0, 10)); ans.on('mouseover', function () { this.openPopup(); }); ans.on('mouseout', function () { this.closePopup(); }); return ans;
        }
        CGE_2Layer.options.pointToLayer = function (feature, latlng) {
            var ans = L.marker(latlng, { icon: picIconCreation(feature.properties["Type"]) }); ans.bindPopup(feature.properties["Name"] + "<br />" + feature.properties["DateTime"].substring(0, 10)); ans.on('mouseover', function () { this.openPopup(); }); ans.on('mouseout', function () { this.closePopup(); }); return ans;
        }

        // Cedar West
        CGW_1Layer.options.pointToLayer = function (feature, latlng) {
            var ans = L.marker(latlng, { icon: picIconCreation(feature.properties["Type"]) }); ans.bindPopup(feature.properties["Name"] + "<br />" + feature.properties["DateTime"].substring(0, 10)); ans.on('mouseover', function () { this.openPopup(); }); ans.on('mouseout', function () { this.closePopup(); }); return ans;
        }
        CGW_2Layer.options.pointToLayer = function (feature, latlng) {
            var ans = L.marker(latlng, { icon: picIconCreation(feature.properties["Type"]) }); ans.bindPopup(feature.properties["Name"] + "<br />" + feature.properties["DateTime"].substring(0, 10)); ans.on('mouseover', function () { this.openPopup(); }); ans.on('mouseout', function () { this.closePopup(); }); return ans;
        }



        $.each(json.features, function (key, val) {
            // console.log(val );
            if ((val.properties.Folder == 'Outside')) {
                picturesLayer.addData(val);
            }
            if (val.properties.Folder == 'CPG') {
                if (val.properties.Level == '1') {
                    CPG_1Layer.addData(val);
                }
                if (val.properties.Level == '2') {
                    CPG_2Layer.addData(val);
                }
                if (val.properties.Level == '3') {
                    CPG_3Layer.addData(val);
                }
                if (val.properties.Level == '4') {
                    CPG_4Layer.addData(val);
                }
                if (val.properties.Level == '5') {
                    CPG_5Layer.addData(val);
                }
                if (val.properties.Level == '6') {
                    CPG_6Layer.addData(val);
                }
            }

            if (val.properties.Folder == 'PBG') {
                if (val.properties.Level == '0') {
                    PBG_0Layer.addData(val);
                }
                if (val.properties.Level == '1') {
                    PBG_1Layer.addData(val);
                }
                if (val.properties.Level == '2') {
                    PBG_2Layer.addData(val);
                }
                if (val.properties.Level == '3') {
                    PBG_3Layer.addData(val);
                }
                if (val.properties.Level == '4') {
                    PBG_4Layer.addData(val);
                }
                if (val.properties.Level == '5') {
                    PBG_5Layer.addData(val);
                }
                if (val.properties.Level == '6') {
                    PBG_6Layer.addData(val);
                }
            }

            if (val.properties.Folder == 'S1') {
                if (val.properties.Level == '1') {
                    S1_1Layer.addData(val);
                }
                if (val.properties.Level == '2') {
                    S1_2Layer.addData(val);
                }
                if (val.properties.Level == '3') {
                    S1_3Layer.addData(val);
                }
            }

            if (val.properties.Folder == 'McMahon') {
                if (val.properties.Level == '1') {
                    MMG_1Layer.addData(val);
                }
                if (val.properties.Level == '2') {
                    MMG_2Layer.addData(val);
                }
                if (val.properties.Level == '3') {
                    MMG_3Layer.addData(val);
                }
            }

            if (val.properties.Folder == 'Haggot') {
                if (val.properties.Level == '1') {
                    HG_1Layer.addData(val);
                }
                if (val.properties.Level == '2') {
                    HG_2Layer.addData(val);
                }
                if (val.properties.Level == '3') {
                    HG_3Layer.addData(val);
                }
            }

            if (val.properties.Folder == 'PDL') {
                if (val.properties.Level == '1') {
                    PDL_1Layer.addData(val);
                }
                if (val.properties.Level == '2') {
                    PDL_2Layer.addData(val);
                }
                if (val.properties.Level == '3') {
                    PDL_3Layer.addData(val);
                }
                if (val.properties.Level == '3.1') {
                    PDL_31Layer.addData(val);
                }
                if (val.properties.Level == '4') {
                    PDL_4Layer.addData(val);
                }
                if (val.properties.Level == '4.1') {
                    PDL_41Layer.addData(val);
                }
            }


            if (val.properties.Folder == 'W45') {
                if (val.properties.Level == '1') {
                    W45_1Layer.addData(val);
                }
                if (val.properties.Level == '2') {
                    W45_2Layer.addData(val);
                }
                if (val.properties.Level == '3') {
                    W45_3Layer.addData(val);
                }
                if (val.properties.Level == '4') {
                    W45_4Layer.addData(val);
                }
                if (val.properties.Level == '5') {
                    W45_5Layer.addData(val);
                }
                if (val.properties.Level == 'LL') {
                    W45_LLLayer.addData(val);
                }
            }

            if (val.properties.Folder == 'W46') {
                if (val.properties.Level == '1') {
                    W46_1Layer.addData(val);
                }
                if (val.properties.Level == '2') {
                    W46_2Layer.addData(val);
                }
                if (val.properties.Level == '3') {
                    W46_3Layer.addData(val);
                }
                if (val.properties.Level == '4') {
                    W46_4Layer.addData(val);
                }
                if (val.properties.Level == '5') {
                    W46_5Layer.addData(val);
                }
                if (val.properties.Level == '6') {
                    W46_6Layer.addData(val);
                }
            }

            if (val.properties.Folder == '4545') {
                if (val.properties.Level == '1') {
                    G4545_1Layer.addData(val);
                }
                if (val.properties.Level == '2') {
                    G4545_2Layer.addData(val);
                }
                if (val.properties.Level == '3') {
                    G4545_3Layer.addData(val);
                }
                if (val.properties.Level == '4') {
                    G4545_4Layer.addData(val);
                }
                if (val.properties.Level == '5') {
                    G4545_5Layer.addData(val);
                }
                if (val.properties.Level == '6') {
                    G4545_6Layer.addData(val);
                }
                if (val.properties.Level == '7') {
                    G4545_7Layer.addData(val);
                }
                if (val.properties.Level == '8') {
                    G4545_8Layer.addData(val);
                }
            }

            if (val.properties.Folder == 'CGE') {
                if (val.properties.Level == '1') {
                    CGE_1Layer.addData(val);
                }
                if (val.properties.Level == '2') {
                    CGE_2Layer.addData(val);
                }
            }

            if (val.properties.Folder == 'CGW') {
                if (val.properties.Level == '1') {
                    CGW_1Layer.addData(val);
                }
                if (val.properties.Level == '2') {
                    CGW_2Layer.addData(val);
                }
            }

            if(val.properties.Folder == 'W29'){
                W29Layer.addData(val);
            }
            if(val.properties.Folder == 'W27'){
                W27Layer.addData(val);
            }
            if(val.properties.Folder == 'W32'){
                W32Layer.addData(val);
            }
            if(val.properties.Folder == 'W33'){
                W33Layer.addData(val);
            }
            if(val.properties.Folder == 'W39'){
                W39Layer.addData(val);
            }

        });
        //picturesLayer.addData(json);//.addTo(map);
        //picturesLayer.addTo(map);
        //map.addLayer(picturesLayer);
    });
    
    //map.addLayer(CPG_3Layer);

    $(".floorShape, .floorLine").click(function () {
        var level = $(this).data().point + "Layer";
        if (currentLevel != null) {
            map.removeLayer(currentLevel);
            $(".floorShape, .floorLine").css("stroke", "#ffffff");
        }
        $(this).css("stroke", "#FFA500");

        map.addLayer(eval(level));
        currentLevel = eval(level);
        console.log(currentLevel);
    });

    $.getJSON('json/ParkingGarage.geojson', function (json) {
        garageLayer.options.pointToLayer = function (feature, latlng) {
            var ans = L.marker(latlng, { icon: iconCreation(feature.properties.Icon), title: feature.properties["Parking Garage"] });
            ans.bindPopup(feature.properties["Parking Garage"]);
            ans.on('mouseover', function () {
                this.openPopup();
            });
            ans.on('mouseout', function () {
                this.closePopup();
            });
            return ans;
        }
        $.each(json.features, function (key, val) {
            garageLayer.addData(val);
        });
    });

    $.getJSON('json/ParkingGarageSingle.geojson', function (json) {
        garageSingleLayer.options.pointToLayer = function (feature, latlng) {
            var ans = L.marker(latlng, { icon: iconCreation(feature.properties.Icon), title: feature.properties["Parking Garage"] });
            ans.bindPopup(feature.properties["Parking Garage"]);
            ans.on('mouseover', function () {
                this.openPopup();
            });
            ans.on('mouseout', function () {
                this.closePopup();
            });
            ans.on('click', function(){
                var level = feature.properties.Data + "Layer";
                if (currentLevel != null) {
                    map.removeLayer(currentLevel);
                    
                }
                map.addLayer(eval(level));
                currentLevel = eval(level);
                console.log(currentLevel);
            });
            
            return ans;
        }
        $.each(json.features, function (key, val) {
            garageSingleLayer.addData(val);
            console.log(val.properties["Parking Garage"]);
            console.log(val);
            console.log(val.properties.Area);

            
            /*
            if(val.properties["Parking Garage"] == "W29 Garage"){
                W29poly = L.polygon(val.properties.Area,{opacity: 1.0, fill: true}).addTo(map);
            } else if (val.properties["Parking Garage"] == "W32 Garage"){
                W32poly = L.polygon(val.properties.Area).addTo(map); 
            } else if (val.properties["Parking Garage"] == "W33 Garage"){
                W33poly = L.polygon(val.properties.Area).addTo(map); 
            }else if (val.properties["Parking Garage"] == "W39 Garage"){
                W39poly = L.polygon(val.properties.Area).addTo(map); 
            }
            */
        });
        // console.log(W29poly);

    });

    $.getJSON('json/searchData.geojson', function (json) {
        searchLayer.options.pointToLayer = function (feature, latlng) {
            var ans = L.marker(latlng, {
                opacity: 0,
                title: feature.properties.Name
            });
            ans.bindPopup(feature.properties.Name);
            ans.on('mouseover', function () {
                if (map.getZoom() > 17) {
                    this.openPopup();
                }

            });
            ans.on('mouseout', function () {
                this.closePopup();
            });
            return ans;
        }
        $.each(json.features, function (key, val) {
            searchLayer.addData(val);
        });
    });

    var searchLayers = L.layerGroup([searchLayer, garageLayer]).addTo(map);
    // Behavior of each item in given layer  

    // pictures
    function picOnEach(feature, layer) {
        layer.on('click', function () {
            console.log(feature.properties.Folder + '/' + feature.properties.Name);
            openModal(feature.properties.Folder + '/' + feature.properties.Name);
            document.getElementById("dateTakenDisplay").innerHTML = feature.properties.Name + "<br />Taken on: " + feature.properties.DateTime;
        });
    }

    // garage icons
    function garageOnEach(feature, layer) {

        layer.on('click', function () {
            console.log(feature)
            document.getElementById("schematicBox").style.display = "block";
            garage = feature.properties.Icon
            garage = garage.substring(0, garage.length - 4)
            console.log(garage + "_schem")
            document.getElementById("garageName").innerHTML = feature.properties["Parking Garage"]
            document.getElementById(garage + "_schem").style.display = "block";
            map.removeLayer(picturesLayer);
            map.removeLayer(garageLayer);
            map.removeLayer(garageSingleLayer);
            map.flyTo([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], 19);
            $(".alert1").css("visibility", "visible")
        });
    }

    function garageSingleOnEach(feature, layer) {

        layer.on('click', function () {
            map.removeLayer(picturesLayer);
            map.removeLayer(garageLayer);
            map.removeLayer(garageSingleLayer);
            map.flyTo([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], 19)
            $(".alert1").css("visibility", "visible")
        });
    }

    //Applying on Each behaviors
    picturesLayer.options.onEachFeature = picOnEach;

    CPG_1Layer.options.onEachFeature = picOnEach;
    CPG_2Layer.options.onEachFeature = picOnEach;
    CPG_3Layer.options.onEachFeature = picOnEach;
    CPG_4Layer.options.onEachFeature = picOnEach;
    CPG_5Layer.options.onEachFeature = picOnEach;
    CPG_6Layer.options.onEachFeature = picOnEach;

    PBG_0Layer.options.onEachFeature = picOnEach;
    PBG_1Layer.options.onEachFeature = picOnEach;
    PBG_2Layer.options.onEachFeature = picOnEach;
    PBG_3Layer.options.onEachFeature = picOnEach;
    PBG_4Layer.options.onEachFeature = picOnEach;
    PBG_5Layer.options.onEachFeature = picOnEach;
    PBG_6Layer.options.onEachFeature = picOnEach;

    S1_1Layer.options.onEachFeature = picOnEach;
    S1_2Layer.options.onEachFeature = picOnEach;
    S1_3Layer.options.onEachFeature = picOnEach;

    MMG_1Layer.options.onEachFeature = picOnEach;
    MMG_2Layer.options.onEachFeature = picOnEach;
    MMG_3Layer.options.onEachFeature = picOnEach;

    HG_1Layer.options.onEachFeature = picOnEach;
    HG_2Layer.options.onEachFeature = picOnEach;
    HG_3Layer.options.onEachFeature = picOnEach;

    PDL_1Layer.options.onEachFeature = picOnEach;
    PDL_2Layer.options.onEachFeature = picOnEach;
    PDL_3Layer.options.onEachFeature = picOnEach;
    PDL_31Layer.options.onEachFeature = picOnEach;
    PDL_4Layer.options.onEachFeature = picOnEach;
    PDL_41Layer.options.onEachFeature = picOnEach;

    W45_LLLayer.options.onEachFeature = picOnEach;
    W45_1Layer.options.onEachFeature = picOnEach;
    W45_2Layer.options.onEachFeature = picOnEach;
    W45_3Layer.options.onEachFeature = picOnEach;
    W45_4Layer.options.onEachFeature = picOnEach;
    W45_5Layer.options.onEachFeature = picOnEach;

    W46_1Layer.options.onEachFeature = picOnEach;
    W46_2Layer.options.onEachFeature = picOnEach;
    W46_3Layer.options.onEachFeature = picOnEach;
    W46_4Layer.options.onEachFeature = picOnEach;
    W46_5Layer.options.onEachFeature = picOnEach;
    W46_6Layer.options.onEachFeature = picOnEach;

    G4545_1Layer.options.onEachFeature = picOnEach;
    G4545_2Layer.options.onEachFeature = picOnEach;
    G4545_3Layer.options.onEachFeature = picOnEach;
    G4545_4Layer.options.onEachFeature = picOnEach;
    G4545_5Layer.options.onEachFeature = picOnEach;
    G4545_6Layer.options.onEachFeature = picOnEach;
    G4545_7Layer.options.onEachFeature = picOnEach;
    G4545_8Layer.options.onEachFeature = picOnEach;

    CGE_1Layer.options.onEachFeature = picOnEach;
    CGE_2Layer.options.onEachFeature = picOnEach;

    CGW_1Layer.options.onEachFeature = picOnEach;
    CGW_2Layer.options.onEachFeature = picOnEach;

    W27Layer.options.onEachFeature = picOnEach;
    W29Layer.options.onEachFeature = picOnEach;
    W32Layer.options.onEachFeature = picOnEach;
    W33Layer.options.onEachFeature = picOnEach;
    W39Layer.options.onEachFeature = picOnEach;

    garageLayer.options.onEachFeature = garageOnEach;
    garageSingleLayer.options.onEachFeature = garageSingleOnEach;

    // Icon appear/ disappear based on zoom level
    map.on('zoomend', function () {
        var schemBox = document.querySelector("#schematicBox");
        var boxStyle = window.getComputedStyle(schemBox);
        var display = boxStyle.display;
        if ((display == "none")&&(currentLevel == null)) {
            if (map.getZoom() < 16.5) {
                if (map.hasLayer(garageLayer)) {
                    map.removeLayer(garageLayer);
                }
                if (map.hasLayer(garageSingleLayer)) {
                    map.removeLayer(garageSingleLayer);
                }
            }
            if (map.getZoom() >= 16.5) {

                if (map.hasLayer(garageLayer) == false) {
                    map.addLayer(garageLayer);
                }
                if (map.hasLayer(garageSingleLayer) == false) {
                    map.addLayer(garageSingleLayer);
                }
            }
            if (map.getZoom() < 19) {
                if (map.hasLayer(picturesLayer)) {
                    map.removeLayer(picturesLayer);
                }
            }
            if (map.getZoom() >= 19) {
                if (map.hasLayer(picturesLayer) == false) {
                    map.addLayer(picturesLayer);
                }
            }
        }

    })



    // viewer for 360 image  https://pannellum.org/ <-- check this for "tours"




    $(".floorShape, .floorLine").hover(function () {
        if (eval($(this).data().point + "Layer") != currentLevel) {

            $(this).css('stroke', '#b7a57a');
        }
    }, function () {
        if (eval($(this).data().point + "Layer") != currentLevel) {
            $(this).css('stroke', '#ffffff');
        }
    });


    $(".closeGarage").click(function () {
        document.getElementById("schematicBox").style.display = "none";
        document.getElementById(garage + "_schem").style.display = "none";
        if (map.getZoom() >= 16.5) {
            map.addLayer(garageLayer);
            if (map.getZoom() >= 19) {
                map.addLayer(picturesLayer);
            }
        }
        map.removeLayer(currentLevel);
        $(".floorShape, .floorLine").css("stroke", "#ffffff");
        currentLevel = null;
    });

    $(document).keyup(function (e) {
        if (e.key === "Escape") { // escape key maps to keycode `27`
            console.log(document.getElementById("photoViewer"));
            if ((document.getElementById("photoViewer") != null) && (document.getElementById("photoViewer").style.display != "none")&& (document.getElementById("photoViewer").style.display != "")) {
                    closeModal();
            }else {
                console.log(document.getElementById("schematicBox"));
                if (document.getElementById("schematicBox") != null){
                    if ((document.getElementById("schematicBox").style.display != "none") && (document.getElementById("schematicBox").style.display != "")) {
                        document.getElementById("schematicBox").style.display = "none";
                        document.getElementById(garage + "_schem").style.display = "none";
                        
        
                    }
                    
                } 
                if (map.getZoom() >= 16.5) {
                    map.addLayer(garageLayer);
                    map.addLayer(garageSingleLayer);
                    if (map.getZoom() >= 19) {
                        map.addLayer(picturesLayer);
                    }
                }
                if (currentLevel != null){
                    map.removeLayer(currentLevel);
                    currentLevel = null;
                }
            }
        }
    });


    var controlSearch = new L.Control.Search({
        layer: searchLayers,
        initial: false,
        zoom: 19,
        //marker: false
        hideMarkerOnCollapse: true,
        marker: {
            circle: {
                radius: 20,
                color: '#0a0',
                opacity: 1
            }
        }
    });
    
    map.addControl(controlSearch);
    /*
    var overlayMaps = {
        "Garages" : garageLayer,
        "Pictures" : picturesLayer
    };
    L.control.layers(null,overlayMaps).addTo(map);
    */
    

});

function openModal(n) {
    document.getElementById("photoViewer").style.display = "block";
    selectImage(n);
    console.log(n);
}

function closeModal() {
    document.getElementById("photoViewer").style.display = "none";
    viewer.destroy();
}
// function openNav() {
//     document.getElementById("mySidenav").style.width = "250px";
// }

// function closeNav() {
//     document.getElementById("mySidenav").style.width = "0";
// }
var viewer;
function selectImage(n) {
    viewer = pannellum.viewer('panorama', {
        "type": "equirectangular",
        "panorama": "photos/" + n,
        "autoLoad": true,
        "minPitch": -60,
        "maxPitch": 90,
        "compass": true,
        "northOffset": 180,
        "yaw": 180
    });
}



// leaflet credits

L.controlCredits = function (options) {
    return new L.CreditsControl(options);
}

L.CreditsControl = L.Control.extend({
    options: {
        position: 'bottomright'
    },
    initialize: function (options) {
        if (!options.text) throw "L.CreditsControl missing required option: text";
        if (!options.image) throw "L.CreditsControl missing required option: image";
        if (!options.link) throw "L.CreditsControl missing required option: link";

        L.setOptions(this, options);
    },
    onAdd: function (map) {
        this._map = map;

        // create our container, and set the background image
        var container = L.DomUtil.create('div', 'leaflet-credits-control', container);
        container.style.backgroundImage = 'url(' + this.options.image + ')';
        if (this.options.width) container.style.paddingRight = this.options.width + 'px';
        if (this.options.height) container.style.height = this.options.height + 'px';

        // generate the hyperlink to the left-hand side
        var link = L.DomUtil.create('a', '', container);
        link.target = '_blank';
        link.href = this.options.link;
        link.innerHTML = this.options.text;

        // create a linkage between this control and the hyperlink bit, since we will be toggling CSS for that hyperlink section
        container.link = link;

        // clicking the control (the image bit) expands the left-hand hyperlink/text bit
        L.DomEvent
            .addListener(container, 'mousedown', L.DomEvent.stopPropagation)
            .addListener(container, 'click', L.DomEvent.stopPropagation)
            .addListener(container, 'dblclick', L.DomEvent.stopPropagation)
            .addListener(container, 'click', function () {
                var link = this.link;
                if (L.DomUtil.hasClass(link, 'leaflet-credits-showlink')) {
                    L.DomUtil.removeClass(link, 'leaflet-credits-showlink');
                } else {
                    L.DomUtil.addClass(link, 'leaflet-credits-showlink');
                }
            });

        // afterthought keep a reference to our container and to the link,
        // in case we need to change their content later via setText() et al
        this._container = container;
        this._link = link;

        // all done
        return container;
    },
    setText: function (html) {
        this._link.innerHTML = html;
    }
});

