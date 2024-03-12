document.addEventListener('DOMContentLoaded', function() {
    // Initialize Date Picker
    flatpickr("#datePicker", {
        altInput: true,
        altFormat: "F j, Y",
        dateFormat: "Y-m-d",
        minDate: "today",
        "disable": [
            function(date) {
                return (date.getDay() === 1 || date.getDay() === 7); // Disable weekends
            }
        ]
    });

    const slots = [
        { from: "09:30", to: "11:30" },
        { from: "11:30", to: "13:30" },
        { from: "14:30", to: "16:30" },
        { from: "16:30", to: "18:30" }
    ];

    const timeSlotsContainer = document.getElementById('timeSlots');

    function to12HourFormat(time) {
        const [hour, minute] = time.split(':');
        const hourInt = parseInt(hour, 10);
        const suffix = hourInt >= 12 ? 'PM' : 'AM';
        const hour12 = hourInt % 12 || 12;
        return `${hour12}:${minute} ${suffix}`;
    }

    slots.forEach(slot => {
        const slotDiv = document.createElement('div');
        slotDiv.classList.add('time-slot');
        slotDiv.textContent = `${to12HourFormat(slot.from)} - ${to12HourFormat(slot.to)}`;
        slotDiv.onclick = () => {
            Array.from(timeSlotsContainer.children).forEach(child => child.classList.remove('selected'));
            slotDiv.classList.add('selected');
        };
        timeSlotsContainer.appendChild(slotDiv);
    });

    const bookVisitBtn = document.getElementById('bookVisit');
 
    const confirmVisitBtn = document.getElementById('confirmVisit');
    const selectedExpertElem = document.getElementById('selectedExpert');
    const selectedExpertImgElem = document.getElementById('selectedExpertImg'); // For the expert image
    const selectedDateElem = document.getElementById('selectedDate');
    const selectedTimeSlotElem = document.getElementById('selectedTimeSlot');
    const visitTypeTextElem = document.getElementById('visitTypeText');
    const visitTypeSelect = document.getElementById('visitType');

        // Modal initialization with options to prevent closing
        const bookingModalElement = document.getElementById('bookingModal');
        const bookingModal = new bootstrap.Modal(bookingModalElement, {
            backdrop: 'static', // Prevent closing by clicking outside
            keyboard: false // Prevent closing with the escape key
        });
    

    function updateAndShowModal() {
        const selectedExpertCard = document.querySelector('.expert-card.card-highlighted');
        const selectedExpert = selectedExpertCard ? selectedExpertCard.querySelector('.card-title').textContent : 'Not selected';
        const selectedExpertImg = selectedExpertCard ? selectedExpertCard.querySelector('img').src : ''; // Get expert image source
        const selectedSlot = document.querySelector('.time-slot.selected');
        selectedExpertElem.textContent = `Selected expert: ${selectedExpert}`;
        selectedExpertImgElem.src = selectedExpertImg; // Set image source
        selectedDateElem.textContent = `Selected Date: ${document.getElementById('datePicker').value}`;
        selectedTimeSlotElem.textContent = `Selected Time Slot: ${selectedSlot ? selectedSlot.textContent : 'Not selected'}`;
        visitTypeTextElem.textContent = `Type of Visit: ${visitTypeSelect.options[visitTypeSelect.selectedIndex].text}`;
        bookingModal.show();
    }

    bookVisitBtn.addEventListener('click', updateAndShowModal);

    confirmVisitBtn.addEventListener('click', function() {
        alert('Visit confirmed!');
        bookingModal.hide();
    });

    document.querySelectorAll('.expert-card').forEach(card => {
        card.addEventListener('click', function() {
            document.querySelectorAll('.expert-card').forEach(c => c.classList.remove('card-highlighted'));
            this.classList.add('card-highlighted');
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Date Picker Initialization and Time Slot Selection Code Here

    const bookVisitBtn = document.getElementById('bookVisit');
    const bookingModal = new bootstrap.Modal(document.getElementById('bookingModal'));
    // Other booking modal related code here

    // Expert Card interaction and modal update functionality
    document.querySelectorAll('.expert-card').forEach(card => {
        card.addEventListener('click', function() {
            document.querySelectorAll('.expert-card').forEach(c => c.classList.remove('card-highlighted'));
            this.classList.add('card-highlighted');

            // Scroll to the booking form
            document.getElementById('bookingForm').scrollIntoView({ behavior: 'smooth', block: 'start' });

            // Update and show modal with selected information if needed here
            // For instance, you can call updateAndShowModal() here if you want to open the modal immediately
            // after selecting an expert.
        });
    });
});

