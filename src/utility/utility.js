export const createFile = text => {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', 'markdown.md');
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

export const calHeadingMarkdown = (num, markdown) => {
  let finalMarkdown = '';
  for(let i = 0; i < num; i++) {
    finalMarkdown += markdown;
  }
  return `${finalMarkdown} `;
}

const calcLength = (start, markdownLength, textLength) => {
  const startSel = start + markdownLength;
  const endSel = startSel + textLength;
  return [startSel, endSel]
}

export const formatSelectedText = (text, selected, start, end, markdown, type) => {
  let startSel, endSel = 0;
  switch (type) {
    case 'wrap':
      [startSel, endSel ] = calcLength(start, markdown.length, selected.length);
      return [`${text.substring(0, start)}${markdown}${selected}${markdown}${text.substring(end, text.length)}`, startSel, endSel];
    case 'prefix':
      [startSel, endSel ] = calcLength(start, markdown.length, selected.length);
      return [`${text.substring(0, start)}${markdown}${selected}${text.substring(end, text.length)}`, startSel, endSel];
    case 'url':
      [startSel, endSel ] = calcLength(start, markdown === 'Image' ? 2 : 1, selected.text.length);
      return [`${text.substring(0, start)}${markdown === 'Image' ? '!' : ''}[${selected.text}](${selected.url})${text.substring(end, text.length)}`, startSel, endSel ];
    default:
      return [start, end, selected];
  }
}
