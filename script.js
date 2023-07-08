const textArea = document.getElementById('textArea');
const btnCopy = document.getElementById('btnCopy');
const btnCut = document.getElementById('btnCut');
const btnPaste = document.getElementById('btnPaste');
const btnFindReplace = document.getElementById('btnFindReplace');
const btnBulletedList = document.getElementById('btnBulletedList');
const btnLineWrap = document.getElementById('btnLineWrap');
const btnUndo = document.getElementById('btnUndo');
const btnRedo = document.getElementById('btnRedo');

btnCopy.addEventListener('click', () => {
  textArea.select();
  document.execCommand('copy');
});

btnCut.addEventListener('click', () => {
  textArea.select();
  document.execCommand('cut');
});

btnPaste.addEventListener('click', async () => {
  try {
    const clipboardText = await navigator.clipboard.readText();
    document.execCommand('insertText', false, clipboardText);
  } catch (error) {
    console.error('Failed to read clipboard data:', error);
  }
});

btnFindReplace.addEventListener('click', () => {
  const findText = prompt('Enter text to find:');
  if (findText) {
    const replaceText = prompt('Enter text to replace:');
    const content = textArea.value;
    const updatedContent = content.replace(new RegExp(findText, 'g'), replaceText);
    textArea.value = updatedContent;
  }
});

btnBulletedList.addEventListener('click', () => {
  const selectedText = textArea.value.substring(textArea.selectionStart, textArea.selectionEnd);
  const lines = selectedText.split('\n');
  const bulletedList = lines.map(line => `- ${line}`).join('\n');
  document.execCommand('insertText', false, bulletedList);
});

btnLineWrap.addEventListener('click', () => {
  textArea.style.whiteSpace = (textArea.style.whiteSpace === 'nowrap') ? 'normal' : 'nowrap';
});

btnUndo.addEventListener('click', () => {
  document.execCommand('undo');
});

btnRedo.addEventListener('click', () => {
  document.execCommand('redo');
});
