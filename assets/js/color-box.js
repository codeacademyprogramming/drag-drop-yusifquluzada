// GETTING ELEMENTS FROM DOM
const colorBoxes = Array.from(document.querySelectorAll('.small-color-boxes-wrapper .small-color-box'));
const bigColorBox = document.querySelector('.big-color-box');



// INITIAL COLORS SETTER
colorMaker(bigColorBox);

colorBoxes.forEach(colorBox => {
    colorMaker(colorBox);
    colorBox.addEventListener('dragstart', function (e) {
        e.dataTransfer.setData('text', JSON.stringify(dataColorAttributesGetter(colorBox)));
    });
});

// LISTENING DRAG & DROP EVENTS
['dragenter', 'dragleave', 'dragover', 'drop'].forEach(dragEvent => {
    bigColorBox.addEventListener(dragEvent, function (e) {
        e.preventDefault();
    });
});

bigColorBox.addEventListener('drop', dropListener);


// HELPER FUNCTIONS
function dropListener(e) {
    const { redTone, greenTone, blueTone } = JSON.parse(e.dataTransfer.getData('text')); // balaca cevrenin reng tonlaridir, mes: 100, 150, 200
    const { redTone: bigColorBoxRedTone, greenTone: bigColorBoxGreenTone, blueTone: bigColorBoxBlueTone } = dataColorAttributesGetter(this); // boyuk cevrenin reng tonlaridir, mes: 50, 100, 30, meselen result: 75, 125, 115
    const resultRed = (parseInt(redTone) + parseInt(bigColorBoxRedTone)) / 2;
    const resultGreen = (Number(greenTone) + Number(bigColorBoxGreenTone)) / 2;
    const resultBlue = (+blueTone + (+bigColorBoxBlueTone)) / 2;

    this.setAttribute('data-red', Math.round(resultRed));
    this.setAttribute('data-green', Math.round(resultGreen));
    this.setAttribute('data-blue', Math.round(resultBlue));

    colorMaker(this);
}

function colorMaker(element) {
    const { redTone, greenTone, blueTone } = dataColorAttributesGetter(element);
    element.style.backgroundColor = `rgb(${redTone}, ${greenTone}, ${blueTone})`;
}

function dataColorAttributesGetter(element) {
    const redTone = element.getAttribute('data-red');
    const greenTone = element.getAttribute('data-green');
    const blueTone = element.getAttribute('data-blue');

    return {
        redTone,
        greenTone,
        blueTone
    }
}