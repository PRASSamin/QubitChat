export const getDateString = (date: Date): string => {
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
  
    // Get the start of the current day (midnight) and check if the date is within the last 7 days
    const lastWeekStart = new Date();
    lastWeekStart.setDate(now.getDate() - 6); // 6 days ago from today is the start of "last 7 days"
    lastWeekStart.setHours(0, 0, 0, 0); // Ensure we compare only the date part
  
    if (date >= lastWeekStart) return daysOfWeek[date.getDay()]; // Return day name if within last 7 days
  
    // If older than 7 days, return formatted date
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }