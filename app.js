
console.log('hi')
function createListingCard(listing) {
    const listingCard = document.createElement("div");
    listingCard.classList.add("listing-card");

    listingCard.innerHTML = `
        <img src="${listing.images[0]}" alt="${listing.name}">
        <div class="listing-info">
            <h2>${listing.name}</h2>
            <p>${listing.type} · ${listing.beds} beds · ${listing.bathrooms} bathrooms</p>
            <p>${listing.price.total} per night</p>
            <p>${listing.address}</p>
            <p>Amenities: ${listing.previewAmenities.join(", ")}</p>
        </div>
    `;
     // Add a button for booking cost breakdown
     const costButton = document.createElement("button");
     costButton.innerText = "Show Booking Cost Breakdown";
     costButton.addEventListener("click", () => showBookingCostBreakdown(listing));
     listingCard.appendChild(costButton);

     // After creating the listingCard

    // Add a paragraph for the reviews count and average rating
    const reviewsP = document.createElement("p");
    reviewsP.innerHTML = `Reviews: ${listing.reviewsCount} | Average Rating: ${listing.rating}`;
    listingCard.appendChild(reviewsP);

     // Add a superhost indicator if the host is a superhost
     if (listing.isSuperhost) {
        const superhostIndicator = document.createElement("p");
        superhostIndicator.innerText = "Superhost";
        superhostIndicator.style.color = "red";
        listingCard.appendChild(superhostIndicator);
    } 

    // Add a 'rare find' indicator if the listing is a 'rare find'
    if (listing.rareFind) {
        const rareFindIndicator = document.createElement("p");
        rareFindIndicator.innerText = "Rare Find";
        rareFindIndicator.style.color = "green";
        listingCard.appendChild(rareFindIndicator);
    }
    
    // Add an amenities preview
    const amenitiesPreview = document.createElement("p");
    amenitiesPreview.innerText = `Amenities: ${createAmenitiesPreview(listing.previewAmenities)}`;
    listingCard.appendChild(amenitiesPreview);

    // Add host details
    // const hostDetails = document.createElement("p");
    // hostDetails.innerText = `Hosted by ${createHostDetails(listing.host)}`;
    // listingCard.appendChild(hostDetails);

    // Add a directions button
    const directionsButton = document.createElement("button");
    directionsButton.innerText = "Get Directions";
    directionsButton.addEventListener("click", function() {
        openDirections(listing);
    });
    listingCard.appendChild(directionsButton);

    return listingCard;
}

function openDirections(location) {
    // Open Google Maps directions in a new tab
    const url = `https://www.google.com/maps/dir//${location.lat},${location.lng}`;
    window.open(url, "_blank");
}


function createAmenitiesPreview(amenities) {
    // Show the first 3 amenities and the total count
    const previewAmenities = amenities.slice(0, 3);
    let previewText = previewAmenities.join(", ");

    if (amenities.length > 3) {
        const extraCount = amenities.length - 3;
        previewText += `, and ${extraCount} more`;
    }

    return previewText;
}


function showBookingCostBreakdown(listing) {
    // Calculate additional fees and total cost
    const additionalFees = listing.price.total * 0.10; // Assuming additional fees are 10% of base price
    const totalCost = listing.price.total + additionalFees;

    // Create a modal dialog box
    const modal = document.createElement("div");
    modal.style.display = "block";
    modal.style.width = "300px";
    modal.style.height = "200px";
    modal.style.backgroundColor = "#fff";
    modal.style.position = "fixed";
    modal.style.top = "50%";
    modal.style.left = "50%";
    modal.style.transform = "translate(-50%, -50%)";
    modal.style.padding = "20px";
    modal.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";

    // Add booking cost breakdown to the modal
    modal.innerHTML = `
        <h2>Booking Cost Breakdown</h2>
        <p>Base Rate: $${listing.price.total.toFixed(2)}</p>
        <p>Additional Fees: $${additionalFees.toFixed(2)}</p>
        <p>Total Cost: $${totalCost.toFixed(2)}</p>
    `;

    // Add a close button to the modal
    const closeButton = document.createElement("button");
    closeButton.innerText = "Close";
    closeButton.addEventListener("click", () => modal.style.display = "none");
    modal.appendChild(closeButton);

    // Add the modal to the body
    document.body.appendChild(modal);
}

const searchButton = document.getElementById("search-button");


searchButton.addEventListener("click", () => {
    const searchInput = document.getElementById("search-input").value;
///// api.example has to be replaced with rapid api
const url = 'https://airbnb13.p.rapidapi.com/search-location?location=Paris&checkin=2023-09-16&checkout=2023-09-17&adults=1&children=0&infants=0&pets=0&page=1&currency=USD';
const options = {
    	method: 'GET',
    	headers: {
    		'X-RapidAPI-Key': '58aafddc1dmsh92b8fee641b49d7p1d5a5ajsn92782ab3b273',
    		'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
    	}
    };

    fetch(url,options)
        .then(response => response.json())
        .then(data => {
            console.log(data)

    const listingsContainer = document.getElementById("listings-container");

    listingsContainer.innerHTML = "";

    // Append new listings
    data.results.forEach(listing => {
        const listingCard = createListingCard(listing);
        listingsContainer.appendChild(listingCard);
    });
})
        .catch(error => console.error('Error:', error));
});




