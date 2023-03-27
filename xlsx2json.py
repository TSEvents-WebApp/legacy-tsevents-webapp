import xlrd, os
from collections import OrderedDict
import simplejson as json

script_dir = (os.path.dirname(__file__))  # getting file directory path
script_len = len(script_dir) # finding the length of directory path

# List to hold dictionaries
featureCollection =OrderedDict()
featureCollection['type'] = 'FeatureCollection'
features = []

sources =['Outside', '4545', 'W45', 'W46', 'PDL', 'CPG', 'Haggot', 'McMahon', 'S1', 'PBG']

for i in range(len(sources)):

    # Open the workbook and select the first worksheet
    wb = xlrd.open_workbook(script_dir + '/ExcelSheets/'+sources[i]+'.xlsx')
    sh = wb.sheet_by_index(0)

    # Iterate through each row in worksheet and fetch values into dict
    for rownum in range(1, sh.nrows):

        row_values = sh.row_values(rownum)

        feature = OrderedDict()
        geometry = OrderedDict()
        properties = OrderedDict()

        geometry['type'] = 'Point'
        geometry['coordinates'] = [row_values[2] , row_values[1]]

        properties['Name'] = row_values[0]
        properties['DateTime'] = row_values[3]
        properties['Level'] = row_values[4]
        properties['Folder'] = row_values[5]

        feature['type'] = 'Feature'
        feature['geometry'] = geometry
        feature['properties'] = properties
        
        features.append(feature)


featureCollection['features'] = features
# Serialize the list of dicts to JSON
j = json.dumps(featureCollection)
# Write to file
with open(script_dir + '/json/PhotoData.geojson', 'w') as f:
    f.write(j)
