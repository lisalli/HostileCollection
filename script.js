const scene = document.getElementById('scene');
const imagePaths = Array.from({ length: 26 }, (_, i) => `imgs/img_${i + 1}.jpg`);
document.getElementById('scene').addEventListener('click', function() {
    window.location.href = 'page2.html';
});
const fixedPositions = [
    { x: 5, y:  4, pass:false},
    { x: 10, y: 30, pass:false},
    { x: 30, y: 30, pass:false},
    { x: 50, y: 27 , pass:false},
    { x:80,y:30,pass:false},
    { x: 90, y: 33, pass:false},
    { x: 30, y: 5 , pass:false},
    { x: 40, y: 5 , pass:false},
    { x: 60, y: 18 , pass:false},
    { x: 70, y:  4 , pass:false},
    { x: 110, y: 7 , pass:false},
    { x: 150, y: 9, pass:false},
    { x: 40, y: 57 ,pass:false},
    { x: 40, y: 46 , pass:false},
    { x: 70, y: 46 , pass:false},
    { x:100, y: 48, pass:false},
    { x: 125, y: 46 , pass:false},
    { x: 155, y: 50 , pass:false},
    { x : 10, y: 65, pass:false},
    { x: 70, y: 65, pass:false},
    { x: 105, y: 68, pass:false},
    { x: 140, y: 73, pass:false}
];

function createCube(images, position) {
    const cube = document.createElement('div');
    cube.className = 'cube';
    
    const allFaces = ['left', 'bottom','top', 'right', 'back', 'front'];
    
    const selectedFaces = [];
    while (selectedFaces.length < 4) {
        const randomFace = allFaces[Math.floor(Math.random() * allFaces.length)];
        if (!selectedFaces.includes(randomFace)) {
            selectedFaces.push(randomFace);
        }
    }

    let idx = 0;
    
    allFaces.forEach(faceClass => {
        const face = document.createElement('div');
        face.className = `face ${faceClass}`;
        let faceRotation = '';
        switch (faceClass) {
            case 'left':
                faceRotation = 'rotate(270deg)';
                break;
            case 'right':
                faceRotation = 'rotate(90deg)';
                break;
            case 'top':
                faceRotation = 'rotate(0deg)';
                break;
            case 'bottom':
                faceRotation = 'rotate(180deg)';
                break;
            case 'front':
                faceRotation = 'rotate(0deg)';
                break;
            case 'back':
                faceRotation = 'rotate(180deg)';
                break;
        }
        // 仅当该面是随机选中的三个面之一时，显示图片

        if (selectedFaces.includes(faceClass)) {
            const imageContainer = document.createElement('div');
            imageContainer.className='image-container'
            for (let i = 0; i < 4; i++) {
                const img_k = document.createElement('div')
                img_k.className = `image${i + 1}`;
                img_k.style.backgroundImage = `url(${images[idx][i]})`;
                img_k.style.transform = faceRotation;
                imageContainer.appendChild(img_k)
            }
            face.appendChild(imageContainer);
            idx++;
        }

        cube.appendChild(face);
    });

    // 设置cube的位置
    cube.style.left = `${position.x}vh`;
    cube.style.top = `${position.y}vh`;

    // 添加cube到场景
    scene.appendChild(cube);
}


img_idx=0
for (let i = 0; i < fixedPositions.length; i++) {
    const randomImages_list = [];
    for(let k = 0; k < 4; k ++){
        let randomImages = []
        for (let j = 0; j < 2; j++) {
            const randomIndex = Math.floor(Math.random() * imagePaths.length);
            randomImages.push(imagePaths[randomIndex]);
        }
        randomImages.push(randomImages[0])
        randomImages_list.push(randomImages)
    }
    

    const position = fixedPositions[i] 
    createCube(randomImages_list, position);
}

