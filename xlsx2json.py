import xlrd
import os
from collections import OrderedDict
import simplejson as json

# Get the directory of the script file
script_dir = os.path.dirname(__file__)

# Create an ordered dictionary to hold the GeoJSON data
featureCollection = OrderedDict()
featureCollection['type'] = 'FeatureCollection'
features = []

# Define the names of the Excel files to read
sources = ['Outside', '4545', 'W45', 'W46', 'PDL', 'CPG', 'Haggot', 'McMahon', 'S1', 'PBG']

# Loop over the Excel files
for i in range(len(sources)):

    # Open the workbook and select the first worksheet
    wb = xlrd.open_workbook(os.path.join(script_dir, 'ExcelSheets', sources[i] + '.xlsx'))
    sh = wb.sheet_by_index(0)

    # Iterate through each row in the worksheet and convert to GeoJSON feature
    for rownum in range(1, sh.nrows):

        # Extract values from the row
        row_values = sh.row_values(rownum)

        # Create an ordered dictionary to hold the GeoJSON feature data
        feature = OrderedDict()
        geometry = OrderedDict()
        properties = OrderedDict()

        # Add point coordinates to the geometry dictionary
        geometry['type'] = 'Point'
        geometry['coordinates'] = [row_values[2], row_values[1]]

        # Add properties to the properties dictionary
        properties['Name'] = row_values[0]
        properties['DateTime'] = row_values[3]
        properties['Level'] = row_values[4]
        properties['Folder'] = row_values[5]

        # Add the geometry and properties to the feature dictionary
        feature['type'] = 'Feature'
        feature['geometry'] = geometry
        feature['properties'] = properties

        # Add the feature to the features list
        features.append(feature)

# Add the list of features to the GeoJSON dictionary
featureCollection['features'] = features

# Serialize the GeoJSON dictionary to a JSON string
j = json.dumps(featureCollection)

# Write the JSON string to a file
with open(os.path.join(script_dir, 'json', 'PhotoData.geojson'), 'w') as f:
    f.write(j)
