const idInstance = document.getElementById('idInstance');
const apiTokenInstance = document.getElementById('apiTokenInstance');
const getSettings = document.getElementById('getSettings');
const getStateInstance = document.getElementById('getStateInstance');
const chatId = document.getElementById('chatId');
const message = document.getElementById('message');
const sendMessage = document.getElementById('sendMessage');
const fileChatId = document.getElementById('fileChatId');
const urlFile = document.getElementById('urlFile');
const sendFileByUrl = document.getElementById('sendFileByUrl');
const responseArea = document.getElementById('responseArea');
const fileName = document.getElementById('fileName');


function addEventListeners() {
  idInstance.addEventListener('input', checkCredentials);
  apiTokenInstance.addEventListener('input', checkCredentials);
  chatId.addEventListener('input', checkMessageFields);
  message.addEventListener('input', checkMessageFields);
  fileChatId.addEventListener('input', checkFileFields);
  urlFile.addEventListener('input', checkFileFields);
  getSettings.addEventListener('click', getSettingsRequest);
  getStateInstance.addEventListener('click', getState);
  sendMessage.addEventListener('click', sendMessageRequest);
  sendFileByUrl.addEventListener('click', sendFileRequest);
  fileName.addEventListener('input', checkFileFields);
}

function checkCredentials() {
  const hasCredentials = idInstance.value && apiTokenInstance.value;
  getSettings.disabled = !hasCredentials;
  getStateInstance.disabled = !hasCredentials;
  checkMessageFields(); //если сначала ввели данные для sendMessage и sendFile, а потом уже данные инстанса
  checkFileFields();
}

function checkMessageFields() {
  const hasCredentials = idInstance.value && apiTokenInstance.value;
  sendMessage.disabled = !(hasCredentials && chatId.value && message.value);
}

function checkFileFields() {
  const hasCredentials = idInstance.value && apiTokenInstance.value;
  sendFileByUrl.disabled = !(hasCredentials && fileChatId.value && urlFile.value && fileName.value);
}


function updateResponse(data) {
  responseArea.value = JSON.stringify(data, null, 2);
}


async function getState() {
  const url = "https://1103.api.green-api.com/waInstance"+idInstance.value+"/getStateInstance/"+apiTokenInstance.value;
  const response = await fetch(url);
  const data = await response.json();
  updateResponse(data);
}


async function getSettingsRequest() {
  const url = "https://1103.api.green-api.com/waInstance" + idInstance.value + "/getSettings/"+apiTokenInstance.value;
  const response = await fetch(url);
  const data = await response.json();
  updateResponse(data);
}



async function sendMessageRequest() {
  const url = "https://1103.api.green-api.com/waInstance" +  idInstance.value + "/sendMessage/" + apiTokenInstance.value;
  const body = {
    chatId: chatId.value,
    message: message.value
  };
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  });
  const data = await response.json();
  updateResponse(data);
}

async function sendFileRequest() {
  const url = "https://1103.api.green-api.com/waInstance"+idInstance.value+"/sendFileByUrl/"+apiTokenInstance.value;
  const body = {
    chatId: fileChatId.value,
    urlFile: urlFile.value,
    fileName: fileName.value,
  };
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  });
  const data = await response.json();
  updateResponse(data);
}


addEventListeners();
