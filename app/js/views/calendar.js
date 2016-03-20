function calculateMeetingPosition(meetings) {
    var i, j, k, totalWidth = 600;
    meetings.sort(function(a,b) {
        return a.start - b.start;
    });

    for (i=0; i<meetings.length; i++) {
        // Find the set of conflicting meetings
        for (j=i+1; j< meetings.length; j++) {
            if (meetings[j].start >= meetings[j-1].end) {
                break;
            }
        }

        //calculate the positions for conflicting meetings
        for (k=i; k<j; k++) {
            meetings[k].top = 2*meetings[k].start;
            meetings[k].width = totalWidth/(j-i);
            meetings[k].left = meetings[k].width*(k-i);
            meetings[k].height = 2*(meetings[k].end - meetings[k].start);
            
        }
        i = j-1;
    }
    
    return meetings;
}

function displayMeetings(meetings) {
    var meetingSpan, processedMeetings = calculateMeetingPosition(meetings);
    processedMeetings.forEach(function(meeting) {
        meetingSpan = document.createElement('span');
        meetingSpan.innerHTML = meeting.id;
        meetingSpan.style.width = meeting.width + "px";
        meetingSpan.style.height = meeting.height + "px";
        meetingSpan.style.top = meeting.top + "px";
        meetingSpan.style.left = meeting.left + "px";
        document.getElementsByClassName('calendarContainer')[0].appendChild(meetingSpan);
    });
}

displayMeetings([{
id : "Meeting 1", start : 60, end : 150
},{
id : "Meeting 2", start : 540, end : 570
},{
id : "Meeting 3", start : 555, end : 600
},{
id : "Meeting 4", start : 585, end : 660
}]);