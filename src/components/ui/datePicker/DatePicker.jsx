import React, { useState, useEffect, useRef } from "react";

export const DatePicker = ({ label, setFormData, placeholder = "اختر تاريخ" }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const calendarRef = useRef(null);

  // Generate days for the calendar
  const generateCalendarDays = (month, year) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = new Date(year, month, 1).getDay();
    const days = [];

    // Fill leading empty slots
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }

    // Fill actual days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const days = generateCalendarDays(currentMonth, currentYear);

  // Handle date selection
  const handleDateClick = (day) => {
    if (day) {
      const date = new Date(currentYear, currentMonth, day);
      setFormData((prev) => ({ ...prev, [label]: date.toISOString().split('T')[0] }));
      setSelectedDate(date.toDateString());
      setShowCalendar(false);
    }
  };

  // Handle clicks outside the calendar to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="date-picker w-full"
      style={{ position: "relative", display: "inline-block" }}
    >
      <input
        type="text"
        value={selectedDate || ""}
        placeholder={placeholder}
        readOnly
        onClick={() => setShowCalendar((prev) => !prev)}
        style={{
          padding: "8px",
          width: "100%",
          border: "1px solid black",
          borderRadius: "8px",
        }}
      />
      {showCalendar && (
        <div
          className="calendar"
          ref={calendarRef}
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            background: "#fff",
            border: "1px solid #ccc",
            zIndex: 10,
            padding: "10px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div
            className="calendar-header"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <button
              onClick={() =>
                setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1))
              }
            >
              {"<"}
            </button>
            <span>{`${new Date(currentYear, currentMonth).toLocaleString(
              "default",
              {
                month: "long",
              }
            )} ${currentYear}`}</span>
            <button
              onClick={() =>
                setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1))
              }
            >
              {">"}
            </button>
          </div>
          <div
            className="calendar-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: "5px",
            }}
          >
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                style={{
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {day}
              </div>
            ))}
            {days.map((day, index) => (
              <div
                key={index}
                onClick={() => handleDateClick(day)}
                style={{
                  textAlign: "center",
                  padding: "8px",
                  cursor: day ? "pointer" : "default",
                  background: day ? "#f7f7f7" : "transparent",
                  borderRadius: "4px",
                  border: day ? "1px solid #ddd" : "none",
                  color: day ? "#000" : "#ccc",
                }}
              >
                {day || ""}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
