export const toolbox = [
  {
    type: 'button',
    markdownType: 'wrap',
    id: 'bold',
    title: 'Strong Text',
    icon: 'bold',
    markdown: '**'
  }, {
    type: 'button',
    markdownType: 'wrap',
    id: 'italic',
    title: 'Emphasized Text',
    icon: 'italic',
    markdown: '_'
  }, {
    type: 'button',
    markdownType: 'prefix',
    id: 'quote',
    title: 'Block Quote',
    icon: 'quote-left',
    markdown: '> '
  }, {
    type: 'button',
    markdownType: 'url',
    id: 'link',
    title: 'Link',
    icon: 'link',
    markdown: '[Link](http://)'
  }, {
    type: 'button',
    markdownType: 'url',
    id: 'image',
    title: 'Image',
    icon: 'image',
    markdown: '![Alt Text](http://)'
  }, {
    type: 'button',
    markdownType: 'prefix',
    id: 'listOl',
    title: 'Ordered list',
    icon: 'list-ol',
    markdown: '1. '
  }, {
    type: 'button',
    markdownType: 'prefix',
    id: 'listUl',
    title: 'Unordered list',
    icon: 'list-ul',
    markdown: '- '
  }, {
    type: 'button',
    markdownType: 'wrap',
    id: 'codeInline',
    title: 'Inline Code',
    icon: 'code',
    markdown: '`'
  }, {
    type: 'button',
    markdownType: 'wrap',
    id: 'strikethrough',
    title: 'Strikethrough',
    icon: 'strikethrough',
    markdown: '~~'
  }, {
    type: 'select',
    markdownType: 'prefix',
    optionsNum: 6,
    id: 'heading',
    title: 'Heading',
    icon: 'heading',
    markdown: '#'
  }
]

export const urlModal = [
  {
    type: 'text',
    name: 'text',
    label: 'Text'
  }, {
    type: 'url',
    name: 'url',
    label: 'Url'
  }
];

export const urlPlaceHolders = {
  text: 'text',
  url: 'http://'
}
