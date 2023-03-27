from PIL import Image, ExifTags
from GPSPhoto import gpsphoto
import xlsxwriter, os, glob

script_dir = (os.path.dirname(__file__))  # getting file directory path
script_len = len(script_dir) # finding the length of directory path

#photos 

garages =['Outside', '4545', 'W45', 'W46', 'PDL', 'CPG', 'Haggot', 'McMahon', 'S1', 'PBG']

for i in range(len(garages)):
    photos_dir_garage = glob.glob( script_dir + '/photos/' +garages[i]+'/*.jpg' ) # list of photos (jpg)
    garage_dir_len = len('/photos/' +garages[i]+'/')
    photos = {} # dictionary of photo and meta data
    for j in photos_dir_garage:
        name = j[script_len + garage_dir_len:]
        img = Image.open(j)
        exif = { ExifTags.TAGS[k]: v for k, v in img._getexif().items() if k in ExifTags.TAGS }
        print (exif)

        data = {}
        try:
            data = gpsphoto.getGPSData(j)
        except:
            data['Latitude']= 0
            data['Longitude'] = 0
        #latlng = str(data['Latitude']) + ',' +  str(data['Longitude'])

        # dictionary of photo metadata
        information ={"Latitude" : str(data['Latitude']), "Longitude" : str(data['Longitude']), "DateTime" : exif['DateTime']}
        photos[name] = information


    workbook = xlsxwriter.Workbook(script_dir +'/ExcelSheets/' + garages[i] + '.xlsx') # creating new excel book 
    worksheet = workbook.add_worksheet() # creating worksheets in the excel book

    row = 0
    column = 0

    # table headers
    worksheet.write(row, column, "Name")
    worksheet.write(row, column +1, "Latitude")
    worksheet.write(row, column +2, "Longitude")
    worksheet.write(row, column +3, "DateTime")
    worksheet.write(row, column +4, "Level")
    worksheet.write(row, column +5, "Folder")
    row += 1

    # importing data from each file
    for k in photos:
        worksheet.write(row, column , k)
        worksheet.write(row, column + 1, photos[k]["Latitude"])
        worksheet.write(row, column + 2, photos[k]["Longitude"])
        worksheet.write(row, column + 3, photos[k]["DateTime"])
        worksheet.write(row, column + 4, 0) # default file level is zero
        worksheet.write(row, column + 5, garages[i])
        row += 1

    workbook.close() 
