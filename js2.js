let currentIndex = 0;
const imageGroups = document.querySelectorAll('.image-group');
const totalGroups = imageGroups.length;
let isScrolling = false;

const images = Array.from({ length: 26 }, (_, i) => ({
    blue: `imgs_blue/img_${i + 1}.jpg`,
    color: `imgs/img_${i + 1}.jpg`
}));
const croppedImages = Array.from({ length: 49 }, (_, i) => `Cropped-Blue/img_${i + 1}.jpg`);

function createImageGroup(groupElement) {
    const existingImages = [];
    const containerWidth = window.innerWidth - 10 * parseFloat(getComputedStyle(document.body).fontSize); 
    const spacing = (containerWidth - 10) / 5;
    const totalImages = 5; 

    for (let index = 0; index < totalImages; index++) {
        const isCropped = Math.random() < 0.5;
        const img = document.createElement('img');
        
        if (isCropped) {
            const path = croppedImages[Math.floor(Math.random() * croppedImages.length)];
            img.src = path;

            img.classList.add('moveImg');
            img.onload = () => {
                const height = Math.floor(Math.random() * window.innerHeight * 0.13) + 200;
                const width = height * (img.naturalWidth / img.naturalHeight);
    
                const x = (index * spacing) + ((6 - Math.random() * 8) * parseFloat(getComputedStyle(document.body).fontSize)); // 左右边距各为 5vw
                img.style.width = `${width}px`;
                img.style.height = `${height}px`;
                img.style.position = 'absolute';
                img.style.left = `${x}px`;
                img.style.top = `${(Math.random() * (window.innerHeight - height))}px`;
    
                groupElement.appendChild(img);

                let originalX = x;
                let hasMoved = false;

                img.addEventListener('mouseenter', () => {
                    if (img.classList.contains('moveImg') && !hasMoved && img.parentElement.classList.contains('active')) {
                        const randomOffset = img.width;
                        const direction = Math.random() < 0.5 ? -1 : 1;
                        img.style.transition = 'transform 0.3s ease 0.1s';
                        img.style.transform = `translateX(${direction * randomOffset}px)`;
                        hasMoved = true;
                    }
                });
                
                img.addEventListener('mouseleave', () => {
                    if (img.classList.contains('moveImg') && img.parentElement.classList.contains('active')) {
                        img.style.transition = 'transform 0.3s ease'; 
                        img.style.transform = 'translateX(0)';
                        hasMoved = false;
                    }
                });
    
            };

        } else {
            const selectedImage = images[Math.floor(Math.random() * images.length)];
            img.src = selectedImage.blue; 
            img.classList.add('colorImg');
            const height = Math.floor(Math.random() * window.innerHeight * 0.16) + 200;
            const width = height * (img.naturalWidth / img.naturalHeight);

            const x = (index * spacing) + ((6 - Math.random() * 8) * parseFloat(getComputedStyle(document.body).fontSize)); // 左右边距各为 5vw
            img.style.width = `${width}px`;
            img.style.height = `${height}px`;
            img.style.position = 'absolute';
            img.style.left = `${x}px`;
            img.style.top = `${(Math.random() * (window.innerHeight - height))}px`;
            groupElement.appendChild(img);
            img.onload = () => {
                

                img.addEventListener('mouseenter', () => {
                    if (img.classList.contains('colorImg') && img.parentElement.classList.contains('active')) {
                        img.src = selectedImage.color; 
                    }
                });
                
                img.addEventListener('mouseleave', () => {
                    if (img.classList.contains('colorImg') && img.parentElement.classList.contains('active')) {
                        img.src = selectedImage.blue; 
                    }
                });
            };
        }

        existingImages.push(img);
    }
}


function isOverlapping(newImage, existingImages) {
    const rect1 = newImage.getBoundingClientRect();
    for (const existingImage of existingImages) {
        const rect2 = existingImage.getBoundingClientRect();
        if (
            rect1.left < rect2.left + rect2.width &&
            rect1.left + rect1.width > rect2.left &&
            rect1.top < rect2.top + rect2.top &&
            rect1.top + rect1.height > rect2.top
        ) {
            return true;
        }
    }
    return false; 
}

function createAllImageGroups() {
    imageGroups.forEach((group) => {
        createImageGroup(group);
    });
}

// 显示当前组和下一组
function showCurrentGroups() {
    imageGroups.forEach((group, index) => {
        group.classList.remove('active', 'next');
        if (index === currentIndex) {
            group.style.opacity = '1';
            group.classList.add('active');
        } else if (index === (currentIndex + 1) % totalGroups) {
            group.style.opacity = '0.2';
            group.classList.add('next');
        } else {
            group.style.opacity = '0';
        }
    });
}

window.addEventListener('wheel', (event) => {
    if (!isScrolling) {
        isScrolling = true; 

        if (event.deltaY > 0) {
            currentIndex = (currentIndex + 1) % totalGroups;
        } else {
            currentIndex = (currentIndex - 1 + totalGroups) % totalGroups;
        }
        showCurrentGroups();

        setTimeout(() => {
            isScrolling = false;
        }, 500);
    }
});

createAllImageGroups();
showCurrentGroups();
