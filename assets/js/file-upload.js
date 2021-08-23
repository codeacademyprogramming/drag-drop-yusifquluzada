const fileUploadDropzone = document.querySelector('.file-upload-dropzone');
const fileInput = document.getElementById('file-input');
const imagesWrapper = document.getElementById('images-wrapper');

fileUploadDropzone.onclick = function () {
    fileInput.click();
}

fileInput.addEventListener('input', function (e) {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
        alert('You can only upload five images');
        return
    }
    imageMaker(files);
});

['drop', 'dragenter', 'dragover', 'dragleave'].forEach(dragEvent => {
    fileUploadDropzone.addEventListener(dragEvent, e => e.preventDefault());
});

fileUploadDropzone.addEventListener('drop', function (e) {
    const files = Array.from(e.dataTransfer.files);

    imageMaker(files);
});

fileUploadDropzone.addEventListener('dragover', function () {
    this.classList.add('active');
});

fileUploadDropzone.addEventListener('dragenter', function () {
    this.classList.add('active');
});

fileUploadDropzone.addEventListener('dragleave', function () {
    this.classList.remove('active');
});

// HELPERS
function imageMaker(files = []) {
    files.forEach(file => {
        const fileReader = new FileReader();

        fileReader.readAsDataURL(file);

        fileReader.onloadend = function () {
            const wrapper = document.createElement('div');

            const image = document.createElement('img');
            image.src = fileReader.result;
            image.className = 'image';
            image.style.objectFit = 'cover';
            image.style.width = '100%';

            const button = document.createElement('button');
            button.className = 'btn btn-danger w-100 mt-1';
            button.innerText = 'Sil';

            button.onclick = function () {
                wrapper.remove();
            }

            wrapper.append(image, button);

            imagesWrapper.append(wrapper);
        }
    });
}