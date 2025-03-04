const gifts = [
    { image: 'pz/x.png', text: 'Чтобы чистить зубки с удовольствием 💖' },
    { image: 'pz/y.png', text: 'Прекрасная сумка, чтобы все было под рукой ' },
    { image: 'gift3.jpg', text: 'Подарок 3: Романтический ужин! 🍷' },
    { image: 'gift4.jpg', text: 'Подарок 4: Сюрприз каждый день! 🎁' },
];

let currentGiftIndex = 0; // Индекс текущего подарка

document.getElementById('surpriseButton').addEventListener('click', function() {
    const overlay = document.querySelector('.overlay');
    const modal = document.getElementById('modal');
    const modalBalloon = document.getElementById('modalBalloon');
    const giftCard = document.getElementById('giftCard');
    const giftImage = document.getElementById('giftImage');
    const giftText = document.getElementById('giftText');
    const popAnotherButton = document.getElementById('popAnotherButton');
    const getGiftsButton = document.getElementById('getGiftsButton');
    const popSound = document.getElementById('popSound');
    const confettiSound = document.getElementById('confettiSound');
    const backgroundMusic = document.getElementById('backgroundMusic');

    // Показываем оверлей и модальное окно
    overlay.classList.remove('hidden');
    modal.classList.remove('hidden');
    modalBalloon.classList.remove('hidden');
    giftCard.classList.add('hidden');
    popAnotherButton.classList.add('hidden');
    getGiftsButton.classList.add('hidden');

    // Воспроизводим фоновую музыку
    backgroundMusic.play();

    // Обработка клика на шарик
    modalBalloon.addEventListener('click', () => {
        popSound.currentTime = 0;
        popSound.play();

        // Анимация лопания шарика
        modalBalloon.style.animation = 'pop 0.5s forwards';
        setTimeout(() => {
            modalBalloon.classList.add('hidden');

            // Показываем текущий подарок
            const currentGift = gifts[currentGiftIndex];
            giftImage.src = currentGift.image;
            giftText.textContent = currentGift.text;

            giftCard.classList.remove('hidden'); // Показываем карточку с подарком

            // Если это последний подарок, показываем кнопку "Получить подарки"
            if (currentGiftIndex === gifts.length - 1) {
                getGiftsButton.classList.remove('hidden');
            } else {
                popAnotherButton.classList.remove('hidden'); // Показываем кнопку "Лопнуть еще шарик"
            }

            // Увеличиваем индекс для следующего подарка
            currentGiftIndex++;
        }, 500);
    });

    // Обработка клика на кнопку "Лопнуть еще шарик"
    popAnotherButton.addEventListener('click', () => {
        modalBalloon.classList.remove('hidden');
        modalBalloon.style.animation = 'float 4s ease-in-out infinite';
        giftCard.classList.add('hidden');
        popAnotherButton.classList.add('hidden');
    });

    // Обработка клика на кнопку "Получить подарки"
    getGiftsButton.addEventListener('click', () => {
        overlay.classList.add('hidden');
        modal.classList.add('hidden');
        confettiSound.currentTime = 0; // Воспроизводим звук конфетти
        confettiSound.play();
        createConfetti(); // Запускаем анимацию конфетти
    });
});

// Закрытие модального окна при клике на оверлей
document.querySelector('.overlay').addEventListener('click', function() {
    const overlay = document.querySelector('.overlay');
    const modal = document.getElementById('modal');
    const backgroundMusic = document.getElementById('backgroundMusic');

    overlay.classList.add('hidden');
    modal.classList.add('hidden');
    backgroundMusic.pause(); // Останавливаем музыку
});

// Функция для создания конфетти
function createConfetti() {
    const confettiContainer = document.getElementById('confetti');
    const numberOfConfetti = 100;

    for (let i = 0; i < numberOfConfetti; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.animationDuration = `${Math.random() * 2 + 1}s`;
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confettiContainer.appendChild(confetti);
    }

    setTimeout(() => {
        confettiContainer.innerHTML = ''; // Очищаем конфетти через 5 секунд
    }, 1000000);
}