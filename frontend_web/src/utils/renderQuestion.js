import html2pdf from 'html2pdf.js/dist/html2pdf.min';

const answerMapping = (number) => {
    return String.fromCharCode(65 + number);
}

export const exportAnswerLetter = (answerIndex) => {
    let nameConverted = answerMapping(answerIndex);
    if(!!nameConverted) return nameConverted 
    else
        return '';
} 

export const renderQuestion = (element, data, index) => {
    const answersData = data.answers;
    const length = answersData.length;
    let queryAnswer = ``;
    answersData.map((answer, index) => queryAnswer += `<p class="answer">${answerMapping(index)}. ${answer.answer_name}</p>`)
    const queryHTML = `<div class="question-content">
                        <p class="question bold">Câu ${index + 1}: <span>${data.question_name}</span></p>
                        <div class="answer-list">
                            ${queryAnswer}
                        </div>
                        </div>
                        `
    
    element.innerHTML += queryHTML;
}

export const Export2Word = (element, filename = '') => {
    var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
    var postHtml = "</body></html>";
    var html = preHtml + document.getElementById(element).innerHTML + postHtml;

    var blob = new Blob(['\ufeff', html], {
        type: 'application/msword'
    });
    
    // Specify link url
    var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
    
    // Specify file name
    filename = filename?filename+'.doc':'document.doc';
    
    // Create download link element
    var downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);
    
    if(navigator.msSaveOrOpenBlob ){
        navigator.msSaveOrOpenBlob(blob, filename);
    }else{
        // Create a link to the file
        downloadLink.href = url;
        
        // Setting the file name
        downloadLink.download = filename;
        
        //triggering the function
        downloadLink.click();
    }
    
    document.body.removeChild(downloadLink);
}

export const exportToPdf = async (idElement, nameData, type) => {
    let element = document.getElementById(idElement);
    let fileName = `${type} ${nameData.course_code}_${nameData.exam_type}_${nameData.semester}_Mã ${nameData.id}`;
    if (idElement === 'table-answer') {
        element.style.display = 'block';
        await html2pdf().set({filename: fileName}).from(element).save();
        element.style.display = 'none';
    }
    else {
        html2pdf().set({filename: fileName}).from(element).save();
    }
}