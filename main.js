const logout = document.getElementById('logout');
const logo = document.querySelector('.logo');
const convertTxt = document.getElementById('convert-txt')
const convertMp3 = document.getElementById('convert-mp3')
let file = null;

logout.addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "login.html";
})

const display = document.getElementById('pdf-inner');

let browseButton = document.getElementById('pdf-browse-button');
let inputFile = document.getElementById('pdf-input');

browseButton.onclick = () => {
    inputFile.click();
};

inputFile.addEventListener('change', (event) => {
    file = event.target.files[0];
    let fileType = file.type;
    let validFile = ['application/pdf'];

    if (validFile.includes(fileType)) {
        display.innerHTML = `File Name: ${file.name}`;

        const uploadTime = new Date().toLocaleString();
        const fileSize = file.size;

            let uploads = JSON.parse(localStorage.getItem('uploads')) || [];

            uploads.push({ fileName: file.name, 
                uploadTime: uploadTime, 
                fileSize: fileSize 
            });

            localStorage.setItem('uploads', JSON.stringify(uploads));
    }
    else {
        alert("Please upload a valid file type.");
    }
});

convertTxt.addEventListener("click", async () => {
    const file = inputFile.files[0];

    try {
        const arrayBuffer = await file.arrayBuffer();
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });

        const pdfDoc = await loadingTask.promise;
        let extractedText = "";

        for (let i = 1; i <= pdfDoc.numPages; i++) {
            const page = await pdfDoc.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map(item => item.str).join(" ");
            extractedText += `Page ${i}:\n${pageText}\n\n`;
        }

        const blob = new Blob([extractedText], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = file.name.replace(".pdf", ".txt");
        link.click();

        display.innerHTML = "Converted to TXT!";
    } 

    catch (error) {
        alert("An error occurred while converting the PDF.");
    }
});

display.addEventListener('dragover', (event) => {
    event.preventDefault();
    display.style.backgroundColor = "#b9cffc";
});

display.addEventListener('dragleave', (event) => {
    event.preventDefault();
    display.style.backgroundColor = "#faebd7";
});


display.addEventListener('drop', (event) => {
    event.preventDefault();

    display.style.backgroundColor = "#faebd7";

    const file = event.dataTransfer.files[0];
    let fileType = file.type;
    let validFile = ['application/pdf'];

    if (validFile.includes(fileType)) {
        display.innerHTML = `File Name: ${file.name}`;
    }
    else {
        alert("Please upload a valid file type.");
    }

});

convertMp3.addEventListener('click', async () => {
    const file = inputFile_txt.files[0];

    try {
        const fileContent = await file.text();

        const response = await fetch('https://api.openai.com/v1/audio/speech', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer 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`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'tts-1',
                voice: 'alloy',
                input: fileContent
            })
        });

        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const downloadLink = document.createElement('a');
        downloadLink.href = audioUrl;
        downloadLink.download = file.name.replace(".txt", ".mp3");
        downloadLink.click();

    } catch (error) {
        alert('Failed to convert text to speech. Check console for details.');
    }
});

const display_txt = document.getElementById('txt-inner');

let browseButton_txt = document.getElementById('txt-browse-button');
let inputFile_txt = document.getElementById('txt-input');

browseButton_txt.onclick = () => {
    inputFile_txt.click();
};

inputFile_txt.addEventListener('change', (event) => {
    const file = event.target.files[0];
    let fileType = file.type;
    let validFile = ['text/plain'];

    if (validFile.includes(fileType)) {
        display_txt.innerHTML = `File Name: ${file.name}`;
    }
    else {
        alert("Please upload a valid file type.");
    }
});

display_txt.addEventListener('dragover', (event) => {
    event.preventDefault();
    display_txt.style.backgroundColor = "#b9cffc";
});

display_txt.addEventListener('dragleave', (event) => {
    event.preventDefault();
    display_txt.style.backgroundColor = "#faebd7";
});


display_txt.addEventListener('drop', (event) => {
    event.preventDefault();

    display_txt.style.backgroundColor = "#faebd7";

    const file = event.dataTransfer.files[0];
    let fileType = file.type;
    let validFile = ['text/plain'];

    if (validFile.includes(fileType)) {
        display_txt.innerHTML = `File Name: ${file.name}`;
    }
    else {
        alert("Please upload a valid file type.");
    }
});

logo.addEventListener('click', () => {
    window.location.href = 'main.html';
});
