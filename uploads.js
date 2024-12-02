const uploads = JSON.parse(localStorage.getItem('uploads')) || [];

if (uploads.length > 0) {
    document.getElementById('default').style.display = 'none';

    let fileDisplayHtml = '';
    uploads.forEach(file => {
        fileDisplayHtml += `<p style="margin-bottom: 20px"><b style="color:white; padding:10px">UPLOAD: </b> ${file.fileName} <br> <b style="color:white; padding:10px">DATE: </b> ${file.uploadTime} <br> <b style="color:white; padding:10px">SIZE: </b> ${formatFileSize(file.fileSize)}</p>`;
    });

    document.getElementById('fileDisplay').innerHTML = fileDisplayHtml;
}

function formatFileSize(fileSize) {
    if (fileSize < 1024) {
        return fileSize + ' bytes';
    } else if (fileSize < 1048576) {
        return (fileSize / 1024).toFixed(2) + ' KB';
    } else {
        return (fileSize / 1048576).toFixed(2) + ' MB';
    }
}