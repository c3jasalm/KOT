package com.kottesting.util;

import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;

import java.text.SimpleDateFormat;
import java.util.Locale;
import java.text.DateFormatSymbols;

/**
 * Created by jasal on 1.3.2016.
 */
public class Util {

    public DateTime roundToNearestQuarter(DateTime dt) {
        int mod = dt.getMinuteOfHour() % 15;
        dt = dt.plusMinutes(mod < 8 ? -mod : (15-mod));

        return dt;
    }

    public String parseDate(String date) {
        return date.split("-")[0];
    }

    public String parseMonthName(String date) {
        int monthNumber = Integer.parseInt(date.split("-")[1]);

        SimpleDateFormat dateFormat = new SimpleDateFormat("MMM", Locale.ENGLISH);
        return dateFormat.format(monthNumber);
    }

    public String parseYear(String date) {
        return Integer.toString(Integer.parseInt(date.split("-")[2]) + 2000);
    }
}
