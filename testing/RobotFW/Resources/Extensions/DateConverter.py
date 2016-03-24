class DateConverter(object):
    def convert_date(self, day, month, year):
        month_number = ""
        if month == "Jan":
            month_number = "01"
        elif month == "Feb":
            month_number = "02"
        elif month == "Mar":
            month_number = "03"
        elif month == "Apr":
            month_number = "04"
        elif month == "May":
            month_number = "05"
        elif month == "Jun":
            month_number = "06"
        elif month == "Jul":
            month_number = "07"
        elif month == "Aug":
            month_number = "08"
        elif month == "Sep":
            month_number = "09"
        elif month == "Oct":
            month_number = "10"
        elif month == "Nov":
            month_number = "11"
        elif month == "Dec":
            month_number = "12"

        return day + "." + month_number + "." + year
