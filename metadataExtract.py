# Import necessary libraries
from PIL import Image, ExifTags
from GPSPhoto import gpsphoto
import xlsxwriter, os, glob

# Get the directory path of the script
script_dir = (os.path.dirname(__file__))
# Find the length of the directory path
script_len = len(script_dir)

# List of garage names
garages = ['Outside', '4545', 'W45', 'W46', 'PDL', 'CPG', 'Haggot', 'McMahon', 'S1', 'PBG']

# Loop through each garage
for i in range(len(garages)):
    # Get a list of all the JPEG images in the garage folder
    photos_dir_garage = glob.glob(script_dir + '/photos/' + garages[i] + '/*.jpg')
    # Find the length of the garage directory path
    garage_dir_len = len('/photos/' + garages[i] + '/')
    # Create a dictionary to store photo metadata
    photos = {}
    
    # Loop through each photo in the garage folder
    for j in photos_dir_garage:
        # Get the photo name
        name = j[script_len + garage_dir_len:]
        # Open the image
        img = Image.open(j)
        # Extract the Exif data from the image
        exif = {ExifTags.TAGS[k]: v for k, v in img._getexif().items() if k in ExifTags.TAGS}

        # Initialize a dictionary to store GPS data
        data = {}
        try:
            # Get the GPS data from the image
            data = gpsphoto.getGPSData(j)
        except:
            # If no GPS data is available, set latitude and longitude to zero
            data['Latitude'] = 0
            data['Longitude'] = 0

        # Create a dictionary with the photo metadata
        information = {"Latitude": str(data['Latitude']), "Longitude": str(data['Longitude']), "DateTime": exif['DateTime']}
        # Add the metadata to the photos dictionary
        photos[name] = information

    # Create a new Excel workbook for the current garage
    workbook = xlsxwriter.Workbook(script_dir + '/ExcelSheets/' + garages[i] + '.xlsx')
    # Create a new worksheet in the workbook
    worksheet = workbook.add_worksheet()

    # Initialize row and column indices
    row = 0
    column = 0

    # Write table headers to the worksheet
    worksheet.write(row, column, "Name")
    worksheet.write(row, column + 1, "Latitude")
    worksheet.write(row, column + 2, "Longitude")
    worksheet.write(row, column + 3, "DateTime")
    worksheet.write(row, column + 4, "Level")
    worksheet.write(row, column + 5, "Folder")
    # Increment the row index
    row += 1

    # Write the metadata for each photo to the worksheet
    for k in photos:
        worksheet.write(row, column, k)
        worksheet.write(row, column + 1, photos[k]["Latitude"])
        worksheet.write(row, column + 2, photos[k]["Longitude"])
        worksheet.write(row, column + 3, photos[k]["DateTime"])
        worksheet.write(row, column + 4, 0)  # Default file level is zero
        worksheet.write(row, column + 5, garages[i])
        row += 1

    workbook.close() 
