import React from 'react';
import marked from 'marked';

const Previewer = props => {
  //line breaks
  marked.setOptions({
    breaks: true
  });
  //open links in another tab
  const renderer = new marked.Renderer();
  renderer.link = function(href, title, text) {
    return `<a target="_blank" href="${href}">${text}</a>`;
  };
  return (
    <div className="previewer-wrapper">
      <div id='preview' dangerouslySetInnerHTML={{__html: marked(props.newMarkdown, { renderer: renderer })}} />
    </div>
  )
};

export default Previewer;
