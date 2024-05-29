document.addEventListener('DOMContentLoaded', () => {
    const dogList = document.getElementById('dog-list');
    const dogModal = document.getElementById('dog-modal');
    const closeModal = document.getElementById('close-modal');
    const dogTitle = document.getElementById('dog-title');
    const dogImage = document.getElementById('dog-image');
    const dogSex = document.getElementById('dog-sex');
    const dogAge = document.getElementById('dog-age');
    const dogDescription = document.getElementById('dog-description');

    async function fetchDogs() {
        try {
            const response = await fetch('https://usersdogs.dmytrominochkin.cloud/dogs');
            const dogs = await response.json();
            displayDogs(dogs);
        } catch (error) {
            console.error('Error fetching dogs:', error);
        }
    }

    function displayDogs(dogs) {
        dogs.forEach(dog => {
            const dogItem = document.createElement('div');
            dogItem.className = 'dog-item';
            dogItem.innerHTML = `
                <img src="https://usersdogs.dmytrominochkin.cloud${dog.dogImage}" alt="${dog.title}">
                <h3>${dog.title}</h3>
                <p><strong>Sex:</strong> ${dog.sex}</p>
                <p><strong>Age:</strong> ${dog.age}</p>
            `;
            dogItem.addEventListener('click', () => showDogDetails(dog));
            dogList.appendChild(dogItem);
        });
    }

    function showDogDetails(dog) {
        dogTitle.textContent = dog.title;
        dogImage.src = `https://usersdogs.dmytrominochkin.cloud${dog.dogImage}`;
        dogSex.textContent = dog.sex;
        dogAge.textContent = dog.age;
        dogDescription.textContent = dog.description;
        dogModal.style.display = 'flex';
    }

    closeModal.addEventListener('click', () => {
        dogModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === dogModal) {
            dogModal.style.display = 'none';
        }
    });

    fetchDogs();
});
