package com.kottesting.PageObjects;

import com.kottesting.util.Util;

/**
 * Created by jasal on 29.2.2016.
 */
public class TaskEntry {

    public String date;
    public String time;
    public String duration;
    public String mode;
    public String comment;
    public String month;
    public String year;

    Util util = new Util();

    public TaskEntry(String date, String time, String duration, String mode, String comment) {
        this.date = date;
        this.time = time;
        this.duration = duration;
        this.mode = mode;
        this.comment = comment;
    }

    public TaskEntry(String date, String duration, String comment) {
        this.date = util.parseDate(date);
        this.time = "00:00";
        this.duration = duration;
        this.mode = "ND";
        this.comment = comment;
        this.year = util.parseYear(date);
        this.month = util.parseMonthName(date);
        System.out.println("MONTH; " + this.month);
    }
}
